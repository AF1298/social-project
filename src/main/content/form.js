import React from 'react'
import {FormComp} from '../../component/form'


export default class Form extends React.Component {

  render() {
    const { formItem, entryData, dispatch, click, action, id } = this.props
    return (
      <div>
        <div>
          <FormComp 
            formItem = {formItem}
            dataEntry = {entryData}
            dispatch = {dispatch}
            id = {id} 
            click = {click}
            action = {action}
          />
        </div>
      </div>
      
    )
  }
}