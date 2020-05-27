import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components/macro';

const UnorderedListWrapper = styled.ul`
  list-style: disc;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 5rem;
`;

const UnorderedList = (props) => {
  return (
    <UnorderedListWrapper {...props}>{props.children}</UnorderedListWrapper>
  );
};

UnorderedList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UnorderedList;
