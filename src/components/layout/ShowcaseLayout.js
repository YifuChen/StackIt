import React from 'react';
import PropTypes from 'prop-types';
import '../../css/layout/showcaselayout.css';

function ShowcaseLayout(props) {
  return (
    <div className="showcase-layout">
      <div className="showcase-layout-top">{props.showcase}</div>
      <ul className="showcase-layout-bottom">
        {
          React.Children.map(props.children, (item, index) => (
            <li key={index}>{item}</li>
          ))
        }
      </ul>
    </div>
  );
}

ShowcaseLayout.propTypes = {
  showcase: PropTypes.element.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ShowcaseLayout;
