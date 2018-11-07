import React, { Component } from 'react';

// controlled component - better to be separated then to store separate values for
// each input in App's state; it's easier to manage
class UpdateInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler = e => {
    this.setState({value: e.target.value});
    this.props.onValueChange(e);
  }

  render = () => {
    return (
      <input 
        type='text'
        name={this.props.name}
        value={this.state.value}
        onChange={this.changeHandler}
      />
    );
  }
}

export default UpdateInput;