import React, { Component } from 'react';
import ArrowKeysReact from 'arrow-keys-react';
import './App.css';
import goomba from './assets/img/goomba.png';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { bWidth: prompt("Enter board width"), bHeight: prompt("Enter board height"),boardArr: [] }

    this.drawBoard = this.drawBoard.bind(this);
    this.spawnCharacters = this.spawnCharacters.bind(this);
  }

  drawBoard() {
    let counter = 0;
    for(let i = 0; i<this.state.bHeight; i++) {
      for(let j = 0; j<this.state.bWidth; j++) {
        this.state.boardArr.push(counter++);
      }
    }
  }

  spawnCharacters() {
    //This method will spawn number of goombas in random locations
    let spawnGoombas = 5;
    let arrIndex = Math.floor(Math.random() * this.state.boardArr.length);
    
    for(let i = 0; i<spawnGoombas; i++) {
      this.state.boardArr[Math.floor(Math.random() * this.state.boardArr.length)] = 'X';
    }

    //Spawn player on the board
    if(this.state.boardArr[arrIndex] !== 'X') {
      this.state.boardArr[arrIndex] = 'P';
    } else {
      this.state.boardArr[arrIndex+1] = 'P';
    }
  }

  componentDidMount() {
    this.drawBoard();
    this.spawnCharacters();
  }

  render() {
    let rows = [];
    for (let i = 0; i < this.state.bWidth; i++) {
      let rowID = `row${i}`;
      let cell = [];
      for (let j = 0; j < this.state.bHeight; j++) {
        let cellID = `cell${i}-${j}`;
        cell.push(<td key={cellID} id={`${i}${j}`} className="rowCell"></td>);
      }
      rows.push(<tr key={i} className="rows">{cell}</tr>);
    }

    ArrowKeysReact.config({
      left: () => {
        console.log('Left');
      },
      right: () => {
        console.log('right');
      },
      up: () => {
        console.log('up');
      },
      down: () => {
        console.log('down');
      }
    });

    return (
      <div className="App">
        <div>
          <center>
            <table {...ArrowKeysReact.events} tabIndex="1">
              <tbody>
                {rows}
              </tbody>
            </table>
          </center>
        </div>
      </div>
    );
  }
}

export default App;
