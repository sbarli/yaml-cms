import React from 'react';
import styled from 'styled-components/macro';
import { contentPageProps } from '../utils/constants';
import Content from './ContentPage';
import Header from '../ui/Header/Header';

const StyledApp = styled.main`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 2rem;
  grid-template-rows: 1fr 11fr;
  margin: 10rem 15rem;
`;

function App() {
  return (
    <StyledApp>
      <Header size="h1" includeWrapper center>YAML CMS Demo</Header>
      <Content {...contentPageProps.trackList} />
    </StyledApp>
  );
}

export default App;
