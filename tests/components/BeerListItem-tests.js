import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import BeerListItem from '../../src/components/BeerListItem';

describe('<BeerListItem />', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });
  
  it('renders the item in a li', () => {
    const beer = { name: 'Pale 31' };
    const item = shallow(<BeerListItem beer={beer} />);
    
    expect(item).toHaveTagName('li');
  });
  
  it('displays the beer name', () => {
    const beer = { name: 'Pale 31' };
    const item = shallow(<BeerListItem beer={beer} />);
    const heading = item.find('.name');
    
    expect(heading).toHaveTagName('h2');
    expect(heading.text()).toBe(beer.name);
  });
  
  it('displays the brewery name', () => {
    const beer = { name: 'Pale 31', breweries: [{ name: 'Firestone Walker' }] };
    const item = shallow(<BeerListItem beer={beer} />);
    const breweries = item.find('.breweries');
    
    expect(breweries).toHaveTagName('em');
    expect(breweries.text()).toBe('Firestone Walker');
  });
  
  it('displays multiple brewery names', () => {
    const beer = { name: 'NXS IPA', breweries: [{ name: 'Stone' }, { name: 'Sierra Nevada' }] };
    const item = shallow(<BeerListItem beer={beer} />);
    const breweries = item.find('.breweries');
    
    expect(breweries).toHaveTagName('em');
    expect(breweries.text()).toBe('Stone, Sierra Nevada');
  });
  
  it('displays no breweries', () => {
    const beer = { name: 'Pale 31' };
    const item = shallow(<BeerListItem beer={beer} />);
    const breweries = item.find('.breweries');
    
    expect(breweries).toHaveTagName('em');
    expect(breweries.text()).toBeEmpty();
  });
  
  it('displays the ABV', () => {
    const beer = { name: 'Pale 31', abv: 4.9 };
    const item = shallow(<BeerListItem beer={beer} />);
    const abv = item.find('.abv');
    
    expect(abv).toHaveTagName('p');
    expect(abv.text()).toBe('4.9%');
  });
  
  it('displays unknown ABV', () => {
    const beer = { name: 'Pale 31' };
    const item = shallow(<BeerListItem beer={beer} />);
    const abv = item.find('.abv');
    
    expect(abv).toHaveTagName('p');
    expect(abv.text()).toBe('Unknown%');
  });
});