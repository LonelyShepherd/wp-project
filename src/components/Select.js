import React from 'react';

export default class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || 'select',
      data: []
    };
  }

  changeHandler = e => {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  }

  componentDidMount() {
    this.props.data()
      .then(data => {
        this.setState({ data })
      });
  }

  render() {
    return (
      <select 
        name={this.props.name}
        value={this.state.value} 
        onChange={this.changeHandler}
      >
        <option>Select...</option>
        {this.state.data.map(item => 
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        )}
      </select>
    );
  }
}