import React, { useEffect, useState } from 'react';

import { generateContent } from '../utils/contentParser';

const subItemsMap = {
  track: {
    id: 'units',
    name: 'Unit',
    type: 'unit',
  },
  unit: {
    id: 'subunits',
    name: 'Subunits',
    type: 'subunit',
  },
};

const ContentPage = ({ contentType, contentFetchEndpoint }) => {
  const [error, setError] = useState(false);
  const [pageData, setPageData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [subItemsData] = useState(subItemsMap[contentType]);

  useEffect(() => {
    const fetchContentPage = async () => {
      try {
        const fetchReq = await fetch(`/api/${contentFetchEndpoint}`, {
          headers: { Accept: 'application/json' },
        });
        const resData = await fetchReq.json();
        if (!resData.success)
          throw new Error(
            `fetch to /api/${contentFetchEndpoint} returned not successful`
          );
        setPageData(resData[contentType]);
      } catch (e) {
        setError(true);
      }
    };
    fetchContentPage();
  }, [contentType, contentFetchEndpoint]);

  if (error) return <div>An error occurred.</div>;
  if (!pageData.id) return null;

  const StaticPageContent = generateContent(pageData, contentType);
  console.log('StaticPageContent: ', StaticPageContent);

  const SubItemOptions = subItemsData
    ? pageData[subItemsData.id]
        .filter((item) => item !== selectedItem)
        .map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => setSelectedItem(item)}
          >
            {item}
          </button>
        ))
    : [];
  return (
    <div>
      {StaticPageContent}
      {selectedItem && (
        <ContentPage
          contentType={subItemsData.type}
          contentFetchEndpoint={`${subItemsData.id}/${selectedItem}`}
        />
      )}
      {SubItemOptions.length ? (
        <>
          <h2>
            {selectedItem && 'More '}
            {subItemsData.name} Options
          </h2>
          {SubItemOptions}
        </>
      ) : null}
    </div>
  );
};

export default ContentPage;
