import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label>
          <a> Location: </a>
          <input type="text" name="cityField" onChange={ this.props.onChange }/>
        </label>
        <a> </a>
        <input type="submit" value="Submit" onClick={ this.props.onPush }/>
      </div>
    )
  }
}


export default Search;