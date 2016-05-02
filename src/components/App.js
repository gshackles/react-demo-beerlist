import React, { Component } from 'react';
import SearchService from '../api/SearchService';
import Header from './Header';
import SearchBar from './SearchBar';
import BeerList from './BeerList';
import _ from 'lodash';
import LoadingIndicator from './LoadingIndicator';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      beers: [],
      isSearching: false
    };
    
    this._searchHandler = _.debounce(this._searchHandler.bind(this), 250);
  }
  
  _searchHandler(input) {
    this.setState({ isSearching: true });
    
    this.props.searchService.findBeer(input).then(matches => {
      this.setState({
        beers: matches,
        isSearching: false
      });
    });
  }
  
  render() {
    return (
      <div>
        <Header title="Beer Directory" />
        <SearchBar searchHandler={this._searchHandler} />
        <LoadingIndicator isLoading={this.state.isSearching} />
        <BeerList beers={this.state.beers} />
      </div>
    );
  }
}

App.propTypes = {
  searchService: React.PropTypes.instanceOf(SearchService).isRequired
};

export default App;