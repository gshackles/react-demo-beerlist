import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    
    this._keyChange = this._keyChange.bind(this);
  }
  
  _keyChange(event) {
    const searchKey = event.target.value;
    
    this.props.searchHandler(searchKey);
  }
  
  render() {
    return (
      <div>
        <input type="text" onChange={this._keyChange} autoFocus="true" placeholder="beer or brewery name" />
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchHandler: React.PropTypes.func.isRequired
};

export default SearchBar;