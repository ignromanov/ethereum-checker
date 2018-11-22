import React, {Component} from 'react';
import './App.css';
import Layouts from './components/Layouts'
import {Provider} from 'react-redux'
import configureStore from './store'

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layouts/>
      </Provider>
    )
  }
}

export default App;
