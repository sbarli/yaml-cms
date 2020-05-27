import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components/macro';

const OrderedListWrapper = styled.ol`
  list-style: decimal;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 5rem;
`;

const OrderedList = (props) => {
  return (
    <OrderedListWrapper {...props}>{props.children}</OrderedListWrapper>
  );
};

OrderedList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OrderedList;
