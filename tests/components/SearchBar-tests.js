import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import sinon from 'sinon';
import SearchBar from '../../src/components/SearchBar';

describe('<SearchBar />', () => {
  let searchHandler;
  
  beforeEach(() => {
    jasmineEnzyme();
    
    searchHandler = sinon.spy();
  });
  
  it('renders an input', () => {
    const searchBar = shallow(<SearchBar searchHandler={searchHandler} />);
    const input = searchBar.find('input');
    
    expect(input).not.toBeNull();
    expect(input.prop('placeholder')).toBe('beer or brewery name');
  });
  
  it('relays input to searchHandler prop', () => {
    const searchInput = 'Pale 31';
    const searchBar = shallow(<SearchBar searchHandler={searchHandler} />);
    const input = searchBar.find('input');
    
    input.simulate('change', { target: { value: searchInput } });
    
    expect(searchHandler.withArgs(searchInput).calledOnce).toBe(true);
  });
});