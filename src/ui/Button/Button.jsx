import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components/macro';

const createFilledButton = (mainColor, hoverColor, fontColor, fontHover = null) => `
  color: ${fontColor};
  background-color: ${mainColor};
  border: 4px solid ${mainColor};
  border-radius: var(--radius-default);

  &:hover {
    color: ${fontHover ? fontHover : fontColor};
    border-color: ${hoverColor};
    background-color: ${hoverColor};
  }
`;

const createOutlineButton = (mainColor, hoverColor, fontColor, fontHover = null) => `
  color: ${fontColor};
  border: 4px solid ${mainColor};
  border-radius: var(--radius-default);

  &:hover {
    color: ${fontHover ? fontHover : fontColor};
    border-color: ${hoverColor};
  }
`;

const buttonSizes = {
  sm: `
    padding: 8px;
    font-size: 1.8rem;
  `,
  md: `
    padding: 10px;
    font-size: 2rem;
  `,
  lg: `
  padding: 15px;
  font-size: 2.2rem;
  `,
};

const themes = {
  primaryOutline: createOutlineButton('var(--color-primary-light)', 'var(--color-primary-medium)', 'var(--color-primary-medium)', 'var(--color-primary-medium)'),
  primaryFilled: createFilledButton('var(--color-primary-light)', 'var(--color-primary-medium)', 'var(--charcoal-dark)'),
  transparent: `
    background: transparent;
    border: none;
    border-radius: none;
  `,
};

const ButtonWrapper = styled.button(({ theme, size }) => `
  font-weight: var(--font-weight-bold);
  color: var(--charcoal-medium);
  cursor: pointer;

  ${buttonSizes[size]}
  ${themes[theme]}

  &:disabled {
    color: var(--charcoal-light);
    border-color: var(--charcoal-light);
    cursor: default;
  }
`);

const Button = (props) => {
  return (
    <ButtonWrapper {...props} />
  );
};

Button.defaultProps = {
  type: 'button',
  size: 'md',
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  size: PropTypes.oneOf([
    'sm', 'md', 'lg',
  ]).isRequired,
  theme: PropTypes.oneOf([
    'transparent', 'primaryOutline', 'primaryFilled',
  ]).isRequired,
  type: PropTypes.oneOf([
    'button', 'submit'
  ]).isRequired,
};

export default Button;
