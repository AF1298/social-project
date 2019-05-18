import React from 'react'
import { Table, Icon, Pagination, Tooltip, Popconfirm } from 'antd'
import {SIZE_PAGE} from '../../../global/page_size'
import './style.css'

const { Column, ColumnGroup} = Table

export default class TableComp extends React.Component {

  columnItem = (item,key) => {
    return (
      <Column
        title = {item.title}
        dataIndex = {item.dataIndex}
        key = {key}
        width = {item.width}
        align = 'center'
        size = 'small'
        fixed = {item.fixed || null}
      />
    )
  }

  setColumn = (col,i = '') => {
    return (
      col.map((item, key) => {
        const keys = i.toString().concat(key)
        if(item.child){
          return (
            <ColumnGroup title={item.title} width = {item.width} key={keys} >
              { this.setColumn(item.child, keys) }
            </ColumnGroup>
          )
        }
        else{
          return this.columnItem(item,keys)
        }
      })
    )
  }

  sumWidth = (cols) =>{
    let width = 0;
    cols.map(it =>{
      width += it.width;
    })
    return width;
  }

  confirmDelete = (key) => {
    
  }

  actionComponent = (key) => {
    const { deleteData, updateData } = this.props
    
    return(
      <div style={{display: 'incline'}}>
        <Tooltip title="Edit">
          <Icon type="edit" theme="filled" className = "iconEdit" onClick = {() => updateData(key)}/>
        </Tooltip>
        <Tooltip title="Delete">
          <Popconfirm 
            title="Are you sure want to delete this data ?" 
            onConfirm={() => deleteData(key)} 
            placement = "left"
            okText="Yes" 
            cancelText="No"
          >
            <Icon type="delete" theme="filled" className = "iconDelete" />
          </Popconfirm>
        </Tooltip>
      </div>
    )
  }

  increaseAction = (data) => {
    data.map((item,i) => {
      item['action'] = this.actionComponent(item.code)
    })
  }

  render() {
    const { columns, data, moveTo } = this.props
    const { dataSource, page, Total } = data
    this.increaseAction(dataSource || [])
    return(
      <div>
        <div>
          <Table 
            column = {columns}
            dataSource={dataSource} 
            pagination = {false}
            bordered
            size = 'small'
            scroll={{ x: this.sumWidth(columns)}} 
          >
          {this.setColumn(columns)}
          </Table>
        </div>
        <div>
          <Pagination
            total={Total}
            size='small'
            current={page}
            pageSize={SIZE_PAGE}
            style = {{float:'right', marginTop : '10px'}}
            onChange = {(e) => moveTo(e)}
          />
        </div>
      </div>
    )
  }
}