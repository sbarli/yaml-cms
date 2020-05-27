import React from 'react';
import { contentKeyMap } from './constants';

import Paragraph from '../ui/Paragraph/Paragraph';
import Header from '../ui/Header/Header';
import Codeblock from '../ui/Codeblock/Codeblock';

export const generateContent = (rawContent, contentId) => {
  console.log('rawContent: ', rawContent);
  if (typeof rawContent === 'string') {
    console.log('raw content is string');
    return <Paragraph key={contentId} content={rawContent} />;
  }
  if (Array.isArray(rawContent)) {
    console.log('raw content is array');
    return rawContent.map((item, contentIdx) => {
      console.log('generating content for item: ', item);
      return generateContent(item, `${contentId}-${contentIdx}`);
    });
  }
  console.log('raw content is object');
  return Object.keys(rawContent)
    .map((key, contentIdx) => {
      switch (key) {
        case contentKeyMap.PARAGRAPH:
          console.log(`hit ${contentKeyMap.PARAGRAPH}`);
          return <Paragraph key={contentId} content={rawContent[key]} />;
        case contentKeyMap.CODEBLOCK:
          console.log(`hit ${contentKeyMap.CODEBLOCK}`);
          return (
            <Codeblock
              key={contentId}
              codeblock={rawContent[key]}
              codeblockId={`${contentId}-codeblock`}
            />
          );
        case contentKeyMap.HEADER:
          console.log(`hit ${contentKeyMap.HEADER}`);
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
          console.log(`hit ${contentKeyMap.NESTED_CONTENT}`);
          return generateContent(rawContent[key], `${contentId}-content`);
        default:
          console.log(`hit default case for key ${key}`);
          return null;
      }
    })
    .filter((item) => item !== null);
};
