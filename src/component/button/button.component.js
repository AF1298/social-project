import React from 'react'
import { Button, Icon, Tooltip, Input } from 'antd'
const Search = Input.Search
import 'antd/dist/antd.css'
import './style.css'

export default class ButtonComp extends React.Component {

  render() {
    const {type, exec, getSearch} = this.props

    switch(type){
      case 'add':
        return ( 
          <Tooltip title="Add" placement="bottom">
            <Button type="primary" onClick={exec}><Icon type="plus" /></Button>
          </Tooltip>
        )
      case 'back':
        return ( 
          <Tooltip title="Back" placement="bottom">
            <Button type="primary" onClick={exec}><Icon type="arrow-left" /></Button>
          </Tooltip>
        )
      case 'save':
        return ( 
          <Tooltip title="Save" placement="bottom">
            <Button type="primary" htmlType="submit"><Icon type="form" /></Button>
          </Tooltip>
        )
      case 'reload':
        return ( 
          <Tooltip title="Reload" placement="bottom">
            <Button type="primary" onClick={exec}><Icon type="reload" /></Button>
          </Tooltip>
        )
      case 'search':
          return (
            <Input.Search
              placeholder="Find Name or Code ..."
              id = "search"
              onSearch = {(e) => getSearch(e)}
            />
          )
    }
  }
}