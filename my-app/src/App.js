import React, { PureComponent } from 'react';

import logo from './logo.svg';
import './App.css';



class sudoku extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      squarePx: "100%",
      map: []
    }
  }
  componentDidMount() {
    let Fthis = this
    let squarePx = window.innerHeight
    if (window.innerWidth < squarePx) {
      squarePx = window.innerWidth
    }
    squarePx = squarePx - 48
    let map = []
    for (let i = 0; i < 9; i++) {
      let childArray = []
      for (let i = 0; i < 9; i++) {
        childArray.push(-1)
      }
      map.push(childArray)
    }
    this.setState({ squarePx: squarePx, map: map })
    setTimeout(() => {
      let copy = function (source) { return JSON.parse(JSON.stringify(source)) }
      //坐标1-9
      //横的
      let getNumbersInRow = function () { }
      //竖的
      let getNumbersInCol = function () { }
      //方块内
      let getNumbersInSquare = function () { }

      let XYposTrans2BlockPosAndChildPos = function (x, y) {
        let hashTable = {
          y: {
            1: 0,
            2: 0,
            3: 0,
            4: 1,
            5: 1,
            6: 1,
            7: 2,
            8: 2,
            9: 2,
          },
          x: {
            1: 1,
            2: 1,
            3: 1,
            4: 2,
            5: 2,
            6: 2,
            7: 3,
            8: 3,
            9: 3,
          },
        }
        let blockPos = 1
        blockPos = hashTable.x[x] + hashTable.y[y] * 3
        let childPos = 1
        
        console.log("XYposTrans", "c1",((y - 1) * 9 + x) )
        console.log("XYposTrans", "c2", ( (blockPos - 1) * 9))
        childPos = ((y - 1) * 9 + x) - ((blockPos - 1) * 9)////////!!!!!!!!!!

        return { blockPos, childPos }
      }
      let setNumberByXY = function (num, x, y) {
        console.log("set",x,y,num)
        let transResult = XYposTrans2BlockPosAndChildPos(x, y)
        let blockPos = transResult["blockPos"]
        let childPos = transResult["childPos"]
        console.log("bc",blockPos,childPos)
        let newArray = copy(Fthis.state.map)
        newArray[blockPos][childPos] = num
        Fthis.setState({ map: newArray })
        setTimeout(() => {
          console.log("after",Fthis.state.map)
        }, 100);
      }

      let startAtX = Math.ceil(Math.random() * 8) + 1;
      let startAtY = Math.ceil(Math.random() * 8) + 1;
     
      setNumberByXY((Math.ceil(Math.random() * 8) + 1), startAtX, startAtY)
    }, 100);
  }

  render() {
    return (
      <div className="App">
        <style>
          {`
            .BlockBox{
              display: inline-block;
              width: calc(33.333% - 0px);
              height: calc(33.333% - 0px);
              text-align: left;
              // border: 1px solid black;
              // border-right-width: 0px;
              // border-bottom-width: 0px;
            }
            .ChildBox{
              display: inline-block;
              width: calc(33.333% - 1px);
              height: calc(33.333% - 1px);
              text-align: left;
              border: 1px solid black;
              border-right-width: 0px;
              border-bottom-width: 0px;
              text-align: center;
            }
            .borderBoxLine{
              width: 100%;
              height: 33.333%;
              text-align: left;
            }
            .borderBox{
              display: inline-block;
              width: calc(33.333% - 1px);
              height: calc(33.333% - 1px);
              height: 100%;
              border: 1px solid black;
              border-right-width: 0px;
              border-bottom-width: 0px;
            }
          `}
        </style>
        <header className="App-header">
          <div style={{
            width: this.state.squarePx,
            height: this.state.squarePx,
            background: "#ffffffdb",
            color: "#000",
            textAlign: "left",

          }}>
            {Array.from(this.state.map).map((childArray, pos) => {
              let realBlockPos = pos + 1
              // console.log("realBlockPos",realBlockPos)
              return <div key={"B-"+pos} className={"BlockBox"}>
                {Array.from(childArray).map((num, pos) => {
                  let realChildPos = pos + 1
                  // console.log(num, pos)
                  return <div key={"C-"+pos} className={"ChildBox"}>
                    {num}
                  </div>
                })}
              </div>
            })}



          </div>

        </header>
      </div>
    );
  }
  componentWillUnmount() {
  }
}

export default sudoku;
