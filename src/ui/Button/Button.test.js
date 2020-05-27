import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button theme="transparent">Test Button</Button>, div);
  ReactDOM.unmountComponentAtNode(div);
});
