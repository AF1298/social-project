import React from 'react';

export default class Navbar extends React.Component {
  
  render() {
    return (
      <div>
        <div className="navbar-fixed" >
          <nav >
            <div className="nav-wrapper">
              <ul className=" hide-on-med-and-down" id="parent">
                {menuItems.call(this)}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
  componentWillUnmount() {
    this.subscription.dispose();
  }

  navigateTo = url => window.history.pushState(null, null, url)
}

function menuItems() {
  return (
    <div>
      <li id="child">
        <a onClick={() => this.navigateTo("/landing")}>
          Landing Page
        </a>
      </li>
      <li id="child">
        <a onClick={() => this.navigateTo("/main")}>
          TODO APP
        </a>
      </li>
    </div>
  )
}
