import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';

SyntaxHighlighter.registerLanguage('javascript', js);

/**
 * ==================
 *       STYLED
 * ==================
 */
const StyledCodeblock = styled.div`
  pre {
    width: 100%;
    max-width: 100rem;
  }
`;

/**
 * ==================
 *     COMPONENT
 * ==================
 */
const Codeblock = ({ codeblock, codeblockId }) => {
  return (
    <StyledCodeblock id={codeblockId}>
      <SyntaxHighlighter language="javascript" style={prism}>
        {codeblock}
      </SyntaxHighlighter>
    </StyledCodeblock>
  );
};

/**
 * ==================
 *     PROP-TYPES
 * ==================
 */
Codeblock.propTypes = {
  codeblock: PropTypes.string.isRequired,
  codeblockId: PropTypes.string.isRequired,
};

export default Codeblock;
