import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components/macro';

const ListItemWrapper = styled.li``;

const ListItem = (props) => {
  if (typeof props.content === 'object')
    return <ListItemWrapper {...props}>{props.content}</ListItemWrapper>;
  return (
    <ListItemWrapper
      {...props}
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
  );
};

ListItem.propTypes = {
  content: PropTypes.any.isRequired,
};

export default ListItem;
