import React from 'react';
import { contentKeyMap } from './constants';

import Paragraph from '../ui/Paragraph/Paragraph';
import Header from '../ui/Header/Header';
import Codeblock from '../ui/Codeblock/Codeblock';

export const generateContent = (rawContent, contentId) => {
  if (typeof rawContent === 'string') {
    return <Paragraph key={contentId} content={rawContent} />;
  }
  if (Array.isArray(rawContent)) {
    return rawContent.map((item, contentIdx) => {
      return generateContent(item, `${contentId}-${contentIdx}`);
    });
  }
  return Object.keys(rawContent)
    .map((key, contentIdx) => {
      switch (key) {
        case contentKeyMap.PARAGRAPH:
          return <Paragraph key={contentId} content={rawContent[key]} />;
        case contentKeyMap.CODEBLOCK:
          return (
            <Codeblock
              key={contentId}
              codeblock={rawContent[key]}
              codeblockId={`${contentId}-codeblock`}
            />
          );
        case contentKeyMap.HEADER:
          const headerData = rawContent[key];
          const HeaderContent =
            typeof headerData.content === 'string'
              ? headerData.content
              : generateContent(headerData.content, `${contentId}-header`);
          return (
            <Header key={contentId} size={headerData.size}>
              {HeaderContent}
            </Header>
          );
        case contentKeyMap.NESTED_CONTENT:
          return generateContent(rawContent[key], `${contentId}-content`);
        default:
          return null;
      }
    })
    .filter((item) => item !== null);
};
