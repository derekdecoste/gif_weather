import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLonChange = this.handleLonChange.bind(this);
  }

  handleLatChange(e) {
    e.preventDefault();
    this.props.onLatChange(e.target.value);
  }

  handleLonChange(e) {
    e.preventDefault();
    this.props.onLonChange(e.target.value);
  }


  render() {
    //const lat = this.props.lat;
    const lon = this.props.lon;
    return (
      <div>
        <label>
          <a>Latitude: </a>
          <input type="text" name="lat" onChange={this.handleLatChange}/>
          <a> Longitude: </a>
          <input type="text" name="lon" onChange={this.handleLonChange}/>
        </label>
        <a> </a>
        <input type="submit" value="Submit" onClick={this.props.onPush}/>
      </div>
    )
  }
}


export default Search;