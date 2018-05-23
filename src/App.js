import React, { Component } from 'react';
import ArrowKeysReact from 'arrow-keys-react';
import './App.css';
import goomba from './assets/img/goomba.png';

class App extends Component {

  constructor(props) {
    super(props);

    // this.state = { bWidth: prompt("Enter board width"), bHeight: prompt("Enter board height"),boardArr: [] }
    this.state = {bWidth: 5, bHeight: 5, boardArr: []};

    this.drawBoard = this.drawBoard.bind(this);
    this.spawnCharacters = this.spawnCharacters.bind(this);
    this.playerMove = this.playerMove.bind(this);
  }

  drawBoard() {
    let counter = 0;
    for(let i = 0; i<this.state.bHeight; i++) {
      for(let j = 0; j<this.state.bWidth; j++) {
        this.state.boardArr.push(counter++);
      }
    }

    console.log(this.state.boardArr);
  }

  spawnCharacters() {
    //This method will spawn number of goombas in random locations
    let spawnGoombas = 5;
    let arrIndex = Math.floor(Math.random() * this.state.boardArr.length);
    let counter = 0;
    
    for(let i = 0; i<spawnGoombas; i++) {
      this.state.boardArr[Math.floor(Math.random() * this.state.boardArr.length)] = 'X';
    }

    //Spawn player on the array for datastructure
    if(this.state.boardArr[arrIndex] !== 'X') {
      this.state.boardArr[arrIndex] = 'P';
    } else {
      this.state.boardArr[arrIndex+1] = 'P';
    }

    //Render characters on board
    for(let i = 0; i<this.state.bWidth; i++) {
      for(let j = 0; j<this.state.bHeight; j++) {
        counter++;
        if(this.state.boardArr[counter] === 'X' || this.state.boardArr[counter] === 'P') {
          document.getElementById(`${counter}`).appendChild(document.createTextNode(this.state.boardArr[counter]))
        }
      }
    }
  }

  playerMove(position) {

    let counter = 0;
    
    for(let i = 0; i<this.state.bWidth; i++) {
      for(let j = 0; j<this.state.bHeight; j++) {
        counter++;
        if(this.state.boardArr[counter] === 'P') {
          this.state.boardArr[counter + position] = 'P';
          console.log(this.state.boardArr);
          return;
        }
      }
    }
  }

  componentWillMount() {
    this.drawBoard();
  }
  
  componentDidMount() {
    this.spawnCharacters();
  }

  render() {
    let rows = [];
    let counter = 0;
    for (let i = 0; i < this.state.bWidth; i++) {
      let rowID = `row${i}`;
      let cell = [];
      for (let j = 0; j < this.state.bHeight; j++) {
        let cellID = `cell${i}-${j}`;
        cell.push(<td key={cellID} id={`${counter++}`} className="rowCell"></td>);
      }
      rows.push(<tr key={i} className="rows">{cell}</tr>);
    }

    ArrowKeysReact.config({
      left: () => {
        this.playerMove((-1));
      },
      right: () => {
        this.playerMove(1);
      },
      up: () => {
        this.playerMove(this.bWidth);
      },
      down: () => {
        this.playerMove(-(this.bWidth))
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