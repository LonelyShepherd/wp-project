import React from 'react';

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
  }

  changeHandler = e => {
    this.setState({value: e.target.value});
    this.props.onChange(e);
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

export default TextInput;