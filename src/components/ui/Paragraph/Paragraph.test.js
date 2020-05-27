import React from 'react';
import ReactDOM from 'react-dom';
import Paragraph from './Paragraph';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Paragraph content="test paragraph"/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
