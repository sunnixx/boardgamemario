/*
  - This is a simple board game of saving the princess. 
  - The code is created using React.js. 
  - Feel free to fiddle around
*/ 


import React, { Component } from 'react';
import ArrowKeysReact from 'arrow-keys-react';
import './App.css';
import goomba from './assets/img/goomba.png';
import mario from './assets/img/mario.png';
import { spawn } from 'child_process';

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
    /*
      This function will create the data-structure of the application.
      An array is being used for track Mario and Goombas position.
    */
    let counter = 0;
    for (let i = 0; i < this.bHeight; i++) {
      for (let j = 0; j < this.bWidth; j++) {
        this.boardArr.push(counter++);
      }
    }
  }

  spawnCharacters() {
    /* 
      This function will spawn the characters on the board inside the DOM.
      The characters are being tracked from the Array that was populated in drawboard() function.
    */
    let spawnGoombas = 0; //The variable to control goombas spawning

    if((this.bHeight * this.bWidth) < 10){
      spawnGoombas = 4;
    } else if((this.bHeight * this.bWidth) > 10 && (this.bHeight * this.bWidth) < 30 ) {
      spawnGoombas = 8;
    } else if((this.bHeight * this.bWidth) > 30 && (this.bHeight * this.bWidth) < 50) {
      spawnGoombas = 15;
    } else if((this.bHeight * this.bWidth) > 50) {
      spawnGoombas = 30;
    }

    //Randomly select locations for spawning them
    let arrIndex = Math.floor(Math.random() * this.boardArr.length);

    for (let i = 0; i < spawnGoombas; i++) {
      //The data structure of handling goomba spawns
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

    /*
      - Spawn characters on the board.
      - The function adds HTML elements of images based on the location of the Array.
    */
    
    let counter = 0;

    for (let i = 0; i < this.bWidth; i++) {
      for (let j = 0; j < this.bHeight; j++) {

        //By default the board is first cleared off.
        if (document.getElementById(`${counter}`).hasChildNodes()) {
          document.getElementById(`${counter}`).removeChild(document.getElementById(`${counter}`).firstChild);
        }
        counter++
      }
    }

    counter = 0;

    //The logic below renders the characters on the board
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

    //The function that handles the player movements
    let counter = 0;
    this.moves++;

    let maxWidth = this.boardArr.length - 1;
    
    for (let i = 0; i < this.bWidth; i++) {
      for (let j = 0; j < this.bHeight; j++) {
        if (this.boardArr[counter] === 'P') {
          //Player movements are handled based on the Array location of the board.
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
    //The function that checks if the player has won the game
    //The function checks for 'X' in the Array, and then it doesn't find any 'X' means the player has won the game
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

    //The logic below draws the cells of the table.
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