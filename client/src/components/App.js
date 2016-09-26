import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/main.css';

class App extends Component {
  render() {
    return (
      <div className="container-fullwidth">
        <NavigationBar />
        <FlashMessagesList /><br />
        {this.props.children}
      </div>
    )
  }
}

export default App;
