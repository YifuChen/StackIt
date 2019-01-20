import React from 'react';
import PropTypes from 'prop-types';
import '../../css/layout/listlayout.css';

function ListLayout(props) {
  return (
    <ul className="list-layout">
      {
        React.Children.map(props.children, (item, index) => (
          <li key={index}>{item}</li>
        ))
      }
    </ul>
  );
}

ListLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ListLayout;
