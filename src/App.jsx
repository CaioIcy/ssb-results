import React from 'react';
import './App.css';
import htmlToImage from 'html-to-image';
import downloadjs from 'downloadjs';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournament: {
        name: "Netplay Coronga #4",
        date: "2020-May-24",
      },
      slots: [
        {
          character: "fox",
          skin: "0",
          player: "caioicy",
        },
        {
          character: "falco",
          skin: "0",
          player: "caioicy",
        },
        {
          character: "marth",
          skin: "0",
          player: "caioicy",
        },
        {
          character: "sheik",
          skin: "0",
          player: "caioicy",
        },
        {
          character: "fox",
          skin: "1",
          player: "caioicy",
        },
        {
          character: "falco",
          skin: "1",
          player: "caioicy",
        },
        {
          character: "marth",
          skin: "1",
          player: "caioicy",
        },
        {
          character: "sheik",
          skin: "1",
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
        <div className="row" key={`slot-row-${row}`}>
          {ch[row].map((slot, index) => this.renderSlot(slot, (row*cols)+index))}
        </div>
      ));
    }
    return content
  }

  renderSlot(slot, placementIndex) {
    const img = `${slot.character}_${slot.skin}.png`;
    return (
      <div key={`slot-${placementIndex}`} style={{backgroundImage: `url(${images[img]})`}} className="character-slot">
        <p className="slot-text-top">#{placementIndex+1} {slot.player}</p>
        <p className="slot-text-bot">{slot.character}</p>
      </div>
    );
  }

  renderTournament() {
    return (
      <div>
      {this.state.tournament.name} {this.state.tournament.date}
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <div>
          <div id="export" className="main-card">
            {this.renderSlots()}
            {this.renderTournament()}
          </div>
        </div>

        <button onClick={this.downloadExport}>
          Download
        </button>
      </div>
    );
  }

  downloadExport() {
    htmlToImage.toPng(document.getElementById('export'))
      .then((dataUrl) => {
        downloadjs(dataUrl, 'export.png');
      });
  }
}

export default App;
