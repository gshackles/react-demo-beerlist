import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import Header from '../../src/components/Header';

describe('<Header />', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });
  
  it('renders title', () => {
    const title = 'Beer Directory';
    
    const h1 = shallow(<Header title={title} />);
    
    expect(h1.text()).toBe(title);
    expect(h1).toHaveTagName('h1');
  });
});