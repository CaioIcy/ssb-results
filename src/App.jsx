import React from 'react';
import './App.css';
import htmlToImage from 'html-to-image';
import downloadjs from 'downloadjs';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import assetBank from './Assets.jsx';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
    return;
  });
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
          skin: "Default",
          player: "caioicy",
        },
        {
          character: "falco",
          skin: "Default",
          player: "caioicy",
        },
        {
          character: "marth",
          skin: "Default",
          player: "caioicy",
        },
        {
          character: "sheik",
          skin: "Default",
          player: "caioicy",
        },
        {
          character: "fox",
          skin: "Default",
          player: "caioicy",
        },
        {
          character: "falco",
          skin: "Default",
          player: "caioicy",
        },
        {
          character: "marth",
          skin: "Default",
          player: "caioicy",
        },
        {
          character: "sheik",
          skin: "Default",
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
    const img = `${assetBank.melee.characters[slot.character].colors[slot.skin]}`;
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

        <div>
          <button onClick={this.downloadExport}>
            Download
          </button>
        </div>

        <div>
          {this.state.slots.map((slot, idx) =>
            <FormControl>
              <InputLabel id="demo-simple-select-label">#{idx+1}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.slots[idx].character}
                onChange={(ev) => this.handleCharChange(ev, idx)}
              >
                {this.renderDropdownOptions()}
              </Select>
            </FormControl>
          )}
        </div>
      </div>
    );
  }

  renderDropdownOptions() {
    const charKeys = Object.keys(assetBank.melee.characters);
    const res = charKeys.map((ch, idx) =>
      <MenuItem key={idx} value={ch}>{assetBank.melee.characters[ch].name}</MenuItem>
    );
    return res;
  }

  handleCharChange = (event, slotIdx) => {
    const ch = event.target.value;
    const { slots } = this.state;
    slots[slotIdx].character = ch;
    slots[slotIdx].skin = 'Default';
    this.setState({slots});
  };

  downloadExport() {
    htmlToImage.toPng(document.getElementById('export'))
      .then((dataUrl) => {
        downloadjs(dataUrl, 'export.png');
      });
  }
}

export default App;
