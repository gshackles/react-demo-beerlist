import React from 'react';

const BeerListItem = (props) => (
  <li>
    <h2>{props.beer.name}</h2>
    
    <em>
      {(props.beer.breweries || []).map(brewery => brewery.name).join(', ')}
    </em>
    
    <br /><br />
    
    {props.beer.abv || 'Unknown'}%
  </li>
);

BeerListItem.propTypes = {
  beer: React.PropTypes.object.isRequired
};

export default BeerListItem;