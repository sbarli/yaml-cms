import React from 'react';
import PropTypes from 'prop-types';

import Paragraph from './ui/Paragraph/Paragraph';

// styled components
import styled from 'styled-components/macro';

const TopicsWrapper = styled.div`
`;

const TOPICS_INTRO = 'This following topics will be covered:';

const Topics = (props) => {
  return (
    <TopicsWrapper {...props}>
      <Paragraph content={TOPICS_INTRO} singleSpaced/>
      {props.children}
    </TopicsWrapper>
  );
};

Topics.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Topics;
