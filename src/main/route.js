import dva from 'dva';
import { BrowserRouter, Route, Switch, Redirect } from 'dva/router';
import { browserHistory } from 'react-router'
import React from 'react';
import MainContent from './content/mainContent'
import LandingPage from './landing_page'
import demo from '../model/demo';

export default class MyData extends React.Component{
  componentWillMount(){
    const app = dva({history : browserHistory});
    app.model(demo)
    app.router(({history}) =>{
      return(
        <BrowserRouter>
          <Switch>
            <Route path = '/main' component = {MainContent} />
            <Route path = '/landing' component = {LandingPage} />
            <Redirect to='/landing' />
          </Switch>
        </BrowserRouter>
      );
    });
    app.start('#main');
  }

  componentDidCatch(er){
    console.log(er)
  }
  
  render(){
    return(
      <div></div>
    );
  }
}
