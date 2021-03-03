import React, { PureComponent } from 'react';

import logo from './logo.svg';
import './App.css';



class sudoku extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      squarePx: "100%"
    }
  }
  componentDidMount() {
    let squarePx = window.innerHeight
    if (window.innerWidth < squarePx) {
      squarePx = window.innerWidth
    }
    squarePx = squarePx - 48
    this.setState({ squarePx: squarePx })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div style={{
            width: this.state.squarePx,
            height: this.state.squarePx,
            background: "#ffffffdb",
            color: "#000"
          }}>
            233
</div>

        </header>
      </div>
    );
  }
  componentWillUnmount() {
  }
}

export default sudoku;
