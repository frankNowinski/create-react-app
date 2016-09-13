import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';

class App extends Component {
  render() {
    return (
      <div className="container-fullwidth">
        <NavigationBar />
        <FlashMessagesList />
        {this.props.children}
      </div>
    )
  }
}

export default App;
