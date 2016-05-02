import React from 'react';
import BeerListItem from './BeerListItem';

const BeerList = (props) => (
  <ul>
    {props.beers.map(beer => <BeerListItem beer={beer} key={beer.id} />)}
  </ul>
);

BeerList.propTypes = {
  beers: React.PropTypes.array.isRequired
};

export default BeerList;