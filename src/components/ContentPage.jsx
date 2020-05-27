import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import Header from '../ui/Header/Header';
import Button from '../ui/Button/Button';
import Group from '../ui/Group/Group';

import { contentPageProps } from '../utils/constants';
import { generateContent } from '../utils/contentParser';

const ButtonGroup = styled.div`
  max-width: 100rem;
`;

const Content = ({
  contentType,
  fetchBaseEndpoint,
  fetchSpecificEndpoint,
  subItem,
}) => {
  const [error, setError] = useState(false);
  const [pageData, setPageData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchContentPage = async () => {
      try {
        let endpoint = `/api/${fetchBaseEndpoint}/`;
        if (fetchSpecificEndpoint) endpoint += fetchSpecificEndpoint;
        const fetchReq = await fetch(endpoint, {
          headers: { Accept: 'application/json' },
        });
        const resData = await fetchReq.json();
        if (!resData.success)
          throw new Error(
            `fetch to /api/${fetchBaseEndpoint} returned not successful`
          );
        setPageData(resData[contentType]);
      } catch (e) {
        setError(true);
      }
    };
    fetchContentPage();
  }, [contentType, fetchBaseEndpoint, fetchSpecificEndpoint]);

  if (error) return <div>An error occurred.</div>;
  if (!pageData.id) return null;

  const StaticPageContent = generateContent(pageData, contentType);

  const SubItemOptions = subItem
    ? pageData[contentPageProps[subItem].fetchBaseEndpoint]
        .filter((item) => item !== selectedItem)
        .map((item) => (
          <Button
            key={item}
            onClick={() => setSelectedItem(item)}
            theme="primaryFilled"
            size="sm"
          >
            {item}
          </Button>
        ))
    : [];

  let nestedContentPageProps;
  if (selectedItem && subItem && contentPageProps[subItem]) {
    nestedContentPageProps = contentPageProps[subItem];
    nestedContentPageProps.fetchSpecificEndpoint = selectedItem;
  }
  return (
    <div>
      {StaticPageContent}
      {selectedItem && <Content {...nestedContentPageProps} />}
      {SubItemOptions.length ? (
        <>
          <Header size="h2">
            {selectedItem && 'More '}
            {contentPageProps[subItem].name} Options
          </Header>
          <ButtonGroup>
            <Group theme="horizontal">{SubItemOptions}</Group>
          </ButtonGroup>
        </>
      ) : null}
    </div>
  );
};

export default Content;
