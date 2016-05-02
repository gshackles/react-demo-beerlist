import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import BeerList from '../../src/components/BeerList';
import BeerListItem from '../../src/components/BeerListItem';

describe('<BeerList />', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });
  
  it('renders a non-empty list', () => {
    const beers = [{ name: 'Pale 31' }, { name: 'Union Jack' }];
    const list = shallow(<BeerList beers={beers} />);
    
    expect(list).toHaveTagName('ul');
    expect(list.children().length).toBe(beers.length);
    
    const items = list.find(BeerListItem);
    expect(items.length).toBe(beers.length);
  });
});