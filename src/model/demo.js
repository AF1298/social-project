import request from '../service'
const SIZE = 5

async function getData(PAGE = 1, query = false) {
  const result = await request({url: 'http://localhost:5000/people'},query)
  return {
    Total: result.length,
    dataSource: result.filter((e,i) => i >= ((PAGE - 1 ) * SIZE) && i < SIZE * PAGE ),
    page: PAGE
  }
}

async function getIndex() {
  const data = await request({url: 'http://localhost:5000/people'})
  let avail = 0
  data.map((item,index) => {
    if(avail < item.id * 1){
      avail = item.id * 1 
    }
  })
  return (avail + 1).toString()
}

function getCode(number = 0) {
  return '0'.repeat(6 - number.toString().length) + number.toString()
}

export default ({
  namespace: 'demo',
  state: {
    panel: {
      flagPanel: false,
      keyPanel: '1'
    },
    data: {
      Total: 0,
      dataSource: [],
      page: 1
    },
    column_table: [],
    form_item: [],
    pop: {
      popShow: false,
      popTitle: ''
    },
    entryData : []
  },
  reducers: {
    userSave(state,{payload: {data}}){
      return { ...state, data }
    },
    first(state, {payload: {column_table, form_item}}){
      return { ...state, column_table, form_item }
    },
    swapPanel(state, {payload: {panel, entryData}}){
      return {...state, panel, entryData}
    },
    showPop(state, {payload: {pop}}){
      return {...state, pop}
    }
  },
  effects: {
    * save({payload : { data = false}}, {put, select, call}){ 
      if (data === false){
        data = yield select (state => state.demo.data)
      }
      yield put({type: 'userSave', payload: {data}})
    },
    * load(action, {put}){
      const result = yield(request({url: 'http://localhost:5001/template'}))
      yield put({type: 'first',payload: {column_table: result.column || [], form_item : result.form || [] }})
    },
    * swap({payload: {panel, entryData}}, {put}){
      yield put({type: 'swapPanel', payload: {panel, entryData}})
    },
    * POP({payload: {pop}}, {put}){
      yield put({type: 'showPop', payload: {pop}})
    },
    * update({payload: {data,code}}, {put, select}){
      const index = yield select(state => state.demo.data.page)
      const packages = {url: `http://localhost:5000/people/${code}`, method: 'patch', data}
      const result = yield (request(packages))
      yield put({type: 'reload', payload: {index}})
    },
    * create({payload: {data}}, {put, call, select}){
      const x = yield select(state => state.demo.data.page)
      const fetchData = yield call(getData)
      const index = yield call(getIndex)
      const code = yield call(getCode, index)
      data['code'] = data['key'] = code
      data['id'] = index.toString() 
      const packages = {url: 'http://localhost:5000/people', method: 'post', data}
      yield (request(packages))
      yield put({type: 'reload', payload: {index: x}})
    },
    * search({payload: {query}}, {put, call}){
      const data = yield call(getData,1,query)
      yield put({type: 'save', payload: {data}})
    },
    * delete({payload: {id}}, {put, select}){
      const index = yield select(state => state.demo.data.page)
      const packages = {url: `http://localhost:5000/people/${id}`, method: 'delete'}
      yield (request(packages))
      yield put({type: 'reload', payload: {index}})
    },
    * reload({payload: {index = 1}},{put, call}){
      yield put({ type: 'save', payload: { data: yield call(getData, index) } })
    }
  },
  subscriptions: {
    async setup({ dispatch }) {
      const pathname = window.location.pathname  
      if(pathname === '/main'){
        dispatch({ type: 'load' })
        dispatch({ type: 'save', payload: { data: await getData() } })
      }
    }
  }
})
