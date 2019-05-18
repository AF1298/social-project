import React from 'react';
import ButtonComp from '../../component/button/button.component'
import TableComp from '../../component/table/table.component'
import { Button } from 'antd';

export default class View extends React.Component {

  render() {
    const { click, column, data, updateData, deleteData, moveTo, getSearch } = this.props
    return (
      <div>
        <div style={{padding: '10px 0'}}>
          <span style = {{marginRight: '10px'}}>
            <ButtonComp type='add' exec={() => click('2','add')}/> 
          </span>
          <span style = {{float: 'right'}}>
            <ButtonComp type = 'search' getSearch = {getSearch} />
          </span>
        </div>
        <TableComp 
          columns={column} 
          data = {data} 
          updateData = {updateData} 
          deleteData = {deleteData}
          moveTo = {moveTo}
        />
      </div>
    )
  }
}