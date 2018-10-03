import React, { Component } from 'react';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer

class App extends Component {
  constructor(props) {
    super()

    this.handleInput = this.handleInput.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  state = {
    value: '',
    notes: []
  }

  handleInput = (e) => {
    this.setState({
      value: e.target.value
    })
  };

  handleSave = (e) => {
    e.preventDefaults();
    if (this.state.value.length === 0) {
      return;
    }
    const notes = [...this.state.notes]
    notes.push(this.state.value)
    this.setState({
      notes: notes,
      value: ""
    }, () => {ipcRenderer.send('notes', this.state.notes)})
  }

  handleDelete = (key) => {
    const {notes} = this.state;
    const filteredNotes = notes.filtered((note) => {
      return note.key !== key
    });
    this.setState({
      notes: filteredNotes,
      value: ""
    })
  }

  render() {
    const {notes, value} = this.state
    return (
      <React.Fragment>
        <div className="menu-dropdown" />
        <div className="App">
          <form className = "input" onSubmit={this.handleSave}>
            <input type="text" value={value} onChange={this.handleInput}/>
            <button type="submit" className="submit-btn">✓</button>
          </form>
          <ul className="notes">
            {notes.map((e) => {
              return (
                <li key={e}>
                  <p>{e}</p>
                  <button className="delete-btn" onClick={this.handleDelete}>X</button>
                </li>
              )
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
