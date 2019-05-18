import React from 'react'
import {
  HashRouter
} from "react-router-dom"
import MyData from "./route"
import 'antd/dist/antd.css'

export default class Root extends React.Component {

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    return(
      <MyData />
    );
  }
}
