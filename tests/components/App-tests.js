import React from 'react';
import { shallow, mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import sinon from 'sinon';
import SearchService from '../../src/api/SearchService';
import App from '../../src/components/App';
import Header from '../../src/components/Header';
import SearchBar from '../../src/components/SearchBar';
import LoadingIndicator from '../../src/components/LoadingIndicator';
import BeerList from '../../src/components/BeerList';

describe('<App />', () => {
  const searchService = new SearchService();
  let findBeer;
  
  beforeEach(() => {
    jasmineEnzyme();
    
    findBeer = sinon.stub(searchService, 'findBeer');
  });
  
  afterEach(() => {
    findBeer.restore();
  });
  
  it('sets initial state', () => {
    const app = shallow(<App searchService={searchService} />);
    
    expect(app.state('beers').length).toBe(0);
    expect(app.state('isSearching')).toBe(false);
  });
  
  it('renders a header', () => {
    const app = shallow(<App searchService={searchService} />);
    const header = app.find(Header);
    
    expect(header).not.toBeNull();
  });
  
  it('renders a search bar', () => {
    const app = shallow(<App searchService={searchService} />);
    const searchBar = app.find(SearchBar);
    
    expect(searchBar).not.toBeNull();
  });
  
  it('renders a loading indicator', () => {
    const app = shallow(<App searchService={searchService} />);
    const loadingIndicator = app.find(LoadingIndicator);
    
    expect(loadingIndicator).not.toBeNull();
    expect(loadingIndicator.prop('isLoading')).toBe(false);
  });
  
  it('renders a beer list', () => {
    const app = shallow(<App searchService={searchService} />);
    const list = app.find(BeerList);
    
    expect(list).not.toBeNull();
    expect(list.children().length).toBe(0);
  });
  
  it('buffers input changes before searching', done => {
    const app = mount(<App searchService={searchService} />);
    const input = app.find(SearchBar).find('input');
    findBeer.returns(Promise.resolve([]));
    
    for (let i = 0; i < 100; i++) {
      input.simulate('change', { target: { value: i.toString() } });
    }
    
    setTimeout(() => {
      expect(findBeer.calledOnce).toBe(true);
      done();
    }, 300);
  });
  
  it('updates state with search results', done => {
    const beer = { name: 'Pale 31' };
    const app = mount(<App searchService={searchService} />);
    const input = app.find(SearchBar).find('input');
    findBeer.returns(Promise.resolve([beer]));
    
    input.simulate('change', { target: { value: beer.name } });
    
    setTimeout(() => {
      expect(findBeer.calledOnce).toBe(true);
      expect(app.state('beers')[0]).toBe(beer);
      done();
    }, 300);
  });
});