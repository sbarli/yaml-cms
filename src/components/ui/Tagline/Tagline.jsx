import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components/macro';

const TaglineWrapper = styled.p(({ center }) => `
  font-weight: var(--font-weight-bold);
  color: var(--charcoal-dark);
  ${center ? 'text-align: center;' : ''}
`);

const Tagline = (props) => {
  return (
    <TaglineWrapper {...props}>{props.children}</TaglineWrapper>
  );
};

Tagline.propTypes = {
  children: PropTypes.string.isRequired,
  // styles
  center: PropTypes.bool,
};

export default Tagline;
