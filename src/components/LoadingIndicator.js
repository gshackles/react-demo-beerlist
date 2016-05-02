import React from 'react';

const LoadingIndicator = (props) => {
  const classes = `load-bar ${props.isLoading ? 'active' : ''}`;
  
  return (
    <div className={classes}>
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
    </div>
  );
};

LoadingIndicator.propTypes = {
  isLoading: React.PropTypes.bool.isRequired
};

export default LoadingIndicator;