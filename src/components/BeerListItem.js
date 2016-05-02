import React from 'react';

const BeerListItem = (props) => (
  <li>
    <h2 className="name">{props.beer.name}</h2>
    
    <em className="breweries">
      {(props.beer.breweries || []).map(brewery => brewery.name).join(', ')}
    </em>
    
    <p className="abv">
      {props.beer.abv || 'Unknown'}%
    </p>
  </li>
);

BeerListItem.propTypes = {
  beer: React.PropTypes.object.isRequired
};

export default BeerListItem;