import React from 'react';
import PropTypes from 'prop-types';

/**
 * ===========================
 *     STYLED COMPONENTS
 * ===========================
 */
import styled from 'styled-components/macro';

const centeredHeader = `
  display: flex;
  justify-content: center;
`;

const HeaderWrapper = styled.header(({ center }) => `
  ${center ? centeredHeader : ''}
`);

const sharedHeaderStyles = ({
  removeMarginBottom,
  removeMarginTop, 
  addPaddingTop, 
}) => (`
  font-family: var(--font-stack-headers);
  font-weight: var(--font-weight-default);
  color: var(--teal-medium);
  width: fit-content;
  ${removeMarginTop ? 'margin-top: 0;' : ''}
  ${removeMarginBottom ? 'margin-bottom: 0;' : ''}
  ${addPaddingTop ? 'padding-top: 5rem;' : ''}
`);

const headerStyles = {
  h1: styled.h1((props) => {
    // borderImage: ['var(--teal-dark)', 'var(--teal-light)', '6px']
    const sharedProps = { ...props };
    return (`
      ${sharedHeaderStyles(sharedProps)}
      font-weight: var(--font-weight-bold);
      font-size: 4.8rem;
      color: var(--teal-dark);
  `)
  }),
  h2: styled.h2((props) => {
    const sharedProps = { ...props };
    return (`
      ${sharedHeaderStyles(sharedProps)}
      font-size: 3.6rem;
  `)
  }),
  h3: styled.h3((props) => `
    ${sharedHeaderStyles(props)}
    font-size: 2.8rem;
  `),
};

/**
 * ==================
 *     COMPONENT
 * ==================
 */
const Header = (props) => {
  const HeaderToRender = headerStyles[props.size];
  return (props.includeWrapper
    ? (
      <HeaderWrapper {...props}>
        <HeaderToRender {...props}>{props.children}</HeaderToRender >
      </HeaderWrapper>
    )
    : <HeaderToRender {...props}>{props.children}</HeaderToRender >
  );
};

/**
 * ==================
 *     PROP-TYPES
 * ==================
 */
Header.defaultProps = {
  includeWrapper: false,
};

Header.propTypes = {
  children: PropTypes.any.isRequired,
  size: PropTypes.oneOf([
    'h1', 'h2', 'h3',
  ]).isRequired,
  includeWrapper: PropTypes.bool.isRequired,
  // styles
  center: PropTypes.bool,
  addPaddingTop: PropTypes.bool,
  removeMarginTop: PropTypes.bool,
};

export default Header;
