import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components/macro';

const themes = {
  vertical: `
    display: flex;
    flex-direction: column;

    > * {
      margin-top: 3rem;
    }

    > :last-child {
      margin-bottom: 3rem;
    }
  `,
  horizontal: `
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  `,
};

const GroupWrapper = styled.div(({ theme, center }) => `
${themes[theme]}

${center ? 'align-items: center;' : ''}
`);

const Group = (props) => {
  return (
    <GroupWrapper {...props}>{props.children}</GroupWrapper>
  );
};

Group.defaultProps = {
  theme: 'vertical',
};

Group.propTypes = {
  children: PropTypes.any.isRequired,
  // styles
  theme: PropTypes.oneOf([
    'vertical', 'horizontal',
  ]).isRequired,
  center: PropTypes.bool,
};

export default Group;
