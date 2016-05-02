import React from 'react';

const Header = (props) => <h1>{props.title}</h1>;

Header.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default Header;