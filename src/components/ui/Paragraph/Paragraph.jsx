import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components/macro';

const singleSpacedStyles = `
  margin-top: 0;
  margin-bottom: 0;
`;

const ParagraphWrapper = styled.p(({ center, singleSpaced }) => `
  color: var(--charcoal-medium);
  ${singleSpaced ? singleSpacedStyles : ''}
  ${center ? 'text-align: center;' : ''}
`);

const Paragraph = (props) => {
  if (props.isHTML) return (
    <ParagraphWrapper {...props} dangerouslySetInnerHTML={{ __html: props.content }}></ParagraphWrapper>
  );
  return (
    <ParagraphWrapper {...props}>{props.content}</ParagraphWrapper>
  );
};

Paragraph.defaultProps = {
  isHTML: false,
};

Paragraph.propTypes = {
  content: PropTypes.any.isRequired,
  isHTML: PropTypes.bool.isRequired,
  // styles
  singleSpaced: PropTypes.bool,
  center: PropTypes.bool,
};

export default Paragraph;
