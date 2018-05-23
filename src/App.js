import React, { Component } from 'react';
import ArrowKeysReact from 'arrow-keys-react';
import './App.css';
import goomba from './assets/img/goomba.png';
import mario from './assets/img/mario.png';

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.bHeight = parseInt(prompt("Enter height of the board"));
    this.bWidth = parseInt(prompt("Enter Width of the board"));
    this.boardArr = [];
    this.moves = 0;

    this.drawBoard = this.drawBoard.bind(this);
    this.spawnCharacters = this.spawnCharacters.bind(this);
    this.playerMove = this.playerMove.bind(this);
    this.renderCharacters = this.renderCharacters.bind(this);
    this.win = this.win.bind(this);
  }

  drawBoard() {
    let counter = 0;
    for (let i = 0; i < this.bHeight; i++) {
      for (let j = 0; j < this.bWidth; j++) {
        this.boardArr.push(counter++);
      }
    }
  }

  spawnCharacters() {
    //This method will spawn number of goombas in random locations
    let spawnGoombas = 5;
    let arrIndex = Math.floor(Math.random() * this.boardArr.length);

    for (let i = 0; i < spawnGoombas; i++) {
      this.boardArr[Math.floor(Math.random() * this.boardArr.length)] = 'X';
    }

    //Spawn player on the array for datastructure
    if (this.boardArr[arrIndex] !== 'X') {
      this.boardArr[arrIndex] = 'P';
    } else {
      this.boardArr[arrIndex + 1] = 'P';
    }

  }

  renderCharacters() {

    //Render characters on board
    let counter = 0;

    for (let i = 0; i < this.bWidth; i++) {
      for (let j = 0; j < this.bHeight; j++) {


        if (document.getElementById(`${counter}`).hasChildNodes()) {
          document.getElementById(`${counter}`).removeChild(document.getElementById(`${counter}`).firstChild);
        }
        counter++
      }
    }

    counter = 0;

    for (let i = 0; i < this.bWidth; i++) {
      for (let j = 0; j < this.bHeight; j++) {

        if (this.boardArr[counter] === 'X') {
          let enemy = document.createElement('img');
          enemy.setAttribute('src', goomba);
          document.getElementById(`${counter}`).appendChild(enemy);
        }

        if (this.boardArr[counter] === 'P') {
          let player = document.createElement('img');
          player.setAttribute('src', mario);
          document.getElementById(`${counter}`).appendChild(player);
        }
        counter++;
      }
    }
  }

  playerMove(position) {

    let counter = 0;
    this.moves++;

    let maxWidth = this.boardArr.length - 1;
  
    for (let i = 0; i < this.bWidth; i++) {
      for (let j = 0; j < this.bHeight; j++) {
        if (this.boardArr[counter] === 'P') {
          if ((counter + position) <= maxWidth && (counter + position) >= 0) {
            this.boardArr[counter + position] = 'P';
            this.boardArr[counter] = counter;
          }

          console.log(this.boardArr);
          return;
        }
        counter++;
      }
    }
  }

  win() {
    let counter = 0;
    let Xcounter = 0;
    for (let i = 0; i < this.bHeight; i++) {
      for (let j = 0; j < this.bWidth; j++) {
        if (this.boardArr[counter] === 'X') {
          Xcounter++;
        }
        counter++;
      }
    }
    if (Xcounter === 0) {
      alert(`princess is saved, it took you ${this.moves} moves to save her`);
    }
  }

  componentWillMount() {
    this.drawBoard();
  }

  componentDidMount() {
    this.spawnCharacters();
    this.renderCharacters();
  }

  render() {
    let rows = [];
    let counter = 0;
    for (let i = 0; i < this.bHeight; i++) {
      let cell = [];
      for (let j = 0; j < this.bWidth; j++) {
        let cellID = `cell${i}-${j}`;
        cell.push(<td key={cellID} id={`${counter++}`} className="rowCell"></td>);
      }
      rows.push(<tr key={i} className="rows">{cell}</tr>);
    }

    ArrowKeysReact.config({
      left: () => {
        this.playerMove((-1));
        this.renderCharacters()
        this.win();
      },
      right: () => {
        this.playerMove(1);
        this.renderCharacters()
        this.win();
      },
      up: () => {
        this.playerMove(-this.bWidth);
        this.renderCharacters()
        this.win();
      },
      down: () => {
        this.playerMove(this.bWidth)
        this.renderCharacters()
        this.win();
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