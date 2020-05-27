import React from 'react';
import ReactDOM from 'react-dom';
import Group from './Group';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Group />, div);
  ReactDOM.unmountComponentAtNode(div);
});
