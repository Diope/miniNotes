import React, { Component } from 'react';
import SimpleMDEReact from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";
// import AutoSave from './Autosave';

class InputField extends Component {
  constructor(props) {
    super()

    this.handleTextField = this.handleTextField.bind(this)
  }

  state = { text: "" }

  handleTextField (value) {
    this.setState({text: value})
  }

  render() { 
    return (
      <React.Fragment>
        <div className="menu-dropdown" />
        <div className="notes-field">
          <SimpleMDEReact 
            value={this.state.text}
            onChange={this.handleTextField}
            options={{
              autofocus: true,
              spellChecker: false,
              forceSync: true,
              status: false,
              toolbar: false,
              codeSyntaxHighlighting: true
            }}

          />
          
        </div>
      </React.Fragment>
     );
  }
}
 
export default InputField;

