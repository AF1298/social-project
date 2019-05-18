import React from 'react';
import { connect } from 'dva'
import TabComp from '../../component/tabPanel/tabPanel.component'
import View from './view'
import Form from './form'
import request from '../../service'

let action
let id
function MainContent ({demo, dispatch}){
  const {keyPanel, flagPanel} = demo.panel
  const {popShow, popTitle} = demo.pop
  
  function swap(index, type = 'add', entryData = []) {
    const panel = {
      keyPanel: index,
      flagPanel: !demo.flagPanel
    }
    action = type
    dispatch({type: 'demo/swap', payload: {panel, entryData}})
  }
  
  function select(e) {
    const pop = {
      popShow: true,
      popTitle: e.code
    }
    dispatch({type: 'demo/POP', payload: {pop}})
  }

  function update(e) {
    const entryData = demo.data.dataSource.filter(it => it.code === e)[0]
    id = entryData.id
    swap('2','update', entryData)
  }

  function deleteUser(e) {
    const stor = demo.data.dataSource.filter(it => it.code === e)[0]
    id = stor.id
    dispatch({type: 'demo/delete', payload: {id}})
  }

  function moveTo(e) {
    dispatch({type: 'demo/reload', payload: {index: e}})
  }

  function getSearch (e){
    dispatch({type: 'demo/search', payload: {query: e}})
  }

  const main_content = [
    {
      name: 'VIEW',
      key: '1',
      disabled: false,
      content: <View 
        click={() => swap('2')} 
        getSearch = {getSearch}
        column = {demo.column_table} 
        data = {demo.data}
        updateData = {update}
        deleteData = {deleteUser}
        moveTo = {moveTo}
      />
    },
    {
      name: 'FORM',
      key: '2',
      disabled: true,
      content: <Form 
        click={() => swap('1')}
        id = {id} 
        entryData = {demo.entryData}
        formItem = {demo.form_item}
        action = {action}
        dispatch = {dispatch}
      />
    }
  ]

  const popContent = (
    <div>Hellow</div>
  )
  return (
    <div style={{padding: '10px 20px'}}>
      <TabComp component = {main_content} active = {keyPanel} bool = {flagPanel}/>
    </div>
  );
}

function mapState(state) {
  return {
    demo: state.demo
  }
}

export default connect(mapState)(MainContent);