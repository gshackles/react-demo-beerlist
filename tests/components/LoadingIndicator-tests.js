import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import LoadingIndicator from '../../src/components/LoadingIndicator';

describe('<LoadingIndicator />', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });
  
  it('does not have `active` class when not loading', () => {
    const wrapper = shallow(<LoadingIndicator isLoading={false} />);
    
    expect(wrapper).toHaveTagName('div');
    expect(wrapper).toHaveClassName('load-bar');
    expect(wrapper).not.toHaveClassName('active');
    
    const bars = wrapper.children();
    
    expect(bars.length).toBe(3);
    bars.forEach(bar => {
      expect(bar).toHaveTagName('div');
      expect(bar).toHaveClassName('bar');
    });
  });
  
  it('has `active` class when loading', () => {
    const wrapper = shallow(<LoadingIndicator isLoading />);
    
    expect(wrapper).toHaveTagName('div');
    expect(wrapper).toHaveClassName('load-bar');
    expect(wrapper).toHaveClassName('active');
    
    const bars = wrapper.children();
    
    expect(bars.length).toBe(3);
    bars.forEach(bar => {
      expect(bar).toHaveTagName('div');
      expect(bar).toHaveClassName('bar');
    });
  });
});