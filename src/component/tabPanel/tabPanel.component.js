import React from 'react'
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

export default class TabComp extends React.Component {

  flag = (val) => {
    if(this.props.bool) !val
    return val
  }
  render() {
    const {component, active, action, bool} = this.props
    return (
      <Tabs activeKey={active}>
        {
          component.map(item => {
            return <TabPane tab={item.name} key={item.key} disabled={() => this.flag(item.disabled)}>{item.content}</TabPane>
          })
        }
      </Tabs>
    )
  }
}