import React from 'react';
import { contentKeyMap } from './constants';

import Topics from '../components/Topics';
import Paragraph from '../components/ui/Paragraph/Paragraph';
import Header from '../components/ui/Header/Header';
import Codeblock from '../components/ui/Codeblock/Codeblock';
import Tagline from '../components/ui/Tagline/Tagline';
import OrderedList from '../components/ui/OrderedList/OrderedList';
import UnorderedList from '../components/ui/UnorderedList/UnorderedList';
import ListItem from '../components/ui/ListItem/ListItem';

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
        case contentKeyMap.TOPICS:
          const TopicsList = generateContent(rawContent[key], `${contentId}-${key}`);
          return <Topics key={`${contentId}-${key}`}>{TopicsList}</Topics>;
        case contentKeyMap.TAGLINE:
          return <Tagline key={contentId}>{rawContent[key]}</Tagline>;
        case contentKeyMap.CODEBLOCK:
          return (
            <Codeblock
              key={`${contentId}-${key}`}
              codeblock={rawContent[key]}
              codeblockId={`${contentId}-${key}`}
            />
          );
        case contentKeyMap.HEADER:
          const headerData = rawContent[key];
          const HeaderContent =
            typeof headerData.content === 'string'
              ? headerData.content
              : generateContent(headerData.content, `${contentId}-${key}`);
          return (
            <Header key={`${contentId}-${key}`} size={headerData.size}>
              {HeaderContent}
            </Header>
          );
        case contentKeyMap.ORDERED_LIST:
          const OrderedListContent = generateContent(
            rawContent[key],
            `${contentId}-${key}`
          );
          return (
            <OrderedList key={`${contentId}-${key}`}>
              {OrderedListContent}
            </OrderedList>
          );
        case contentKeyMap.UNORDERED_LIST:
          const UnorderedListContent = generateContent(
            rawContent[key],
            `${contentId}-${key}`
          );
          return (
            <UnorderedList key={`${contentId}-${key}`}>
              {UnorderedListContent}
            </UnorderedList>
          );
        case contentKeyMap.LIST_ITEM:
          const ListItemContent =
            typeof rawContent[key] === 'string'
              ? rawContent[key]
              : generateContent(rawContent[key], `${contentId}-${key}`);
          return (
            <ListItem
              key={`${contentId}-${key}`}
              content={ListItemContent}
            ></ListItem>
          );
        case contentKeyMap.NESTED_CONTENT:
          return generateContent(rawContent[key], `${contentId}-${key}`);
        default:
          return null;
      }
    })
    .filter((item) => item !== null);
};
