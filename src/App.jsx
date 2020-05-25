import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slots: [
        {
          character: "fox",
          player: "caioicy",
        },
        {
          character: "falco",
          player: "caioicy",
        },
        {
          character: "marth",
          player: "caioicy",
        },
        {
          character: "puff",
          player: "caioicy",
        },
        {
          character: "sheik",
          player: "caioicy",
        },
        {
          character: "captain",
          player: "caioicy",
        },
        {
          character: "peach",
          player: "caioicy",
        },
        {
          character: "pikachu",
          player: "caioicy",
        },
      ],
    };
  }

  chunkArray(arr, n) {
    return Array(Math.ceil(arr.length/n)).fill().map((_,i) => arr.slice(i*n,i*n+n));
  }

  renderSlots() {
    const cols = 4;
    const ch = this.chunkArray(this.state.slots, cols);
    const content = [];
    for(let row = 0; row < ch.length; row++) {
      content.push((
        <div className="row" key={`slot-row-{row}`}>
          {ch[row].map((slot, index) => this.renderSlot(slot, (row*cols)+index))}
        </div>
      ));
    }
    return content
  }

  renderSlot(slot, placementIndex) {
    return (
      <div key={`slot-${placementIndex}`} style={{backgroundImage: "url(" + logo + ")"}} className="character-slot">
        <p>#{placementIndex+1} {slot.character}</p>
        <p>{slot.player}</p>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        {this.renderSlots()}
      </div>
    );
  }
}

export default App;
