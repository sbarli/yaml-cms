export const contentKeyMap = {
  PARAGRAPH: 'description',
  HEADER: 'header',
  CODEBLOCK: 'codeblock',
  TAGLINE: 'tagline',
  TOPICS: 'topics',
  UNORDERED_LIST: 'unorderedList',
  ORDERED_LIST: 'orderedList',
  LIST_ITEM: 'listItem',
  NESTED_CONTENT: 'content',
};

export const contentPageProps = {
  subunit: {
    name: 'Subunit',
    contentType: 'subunit',
    fetchBaseEndpoint: 'subunits',
  },
  unit: {
    name: 'Unit',
    contentType: 'unit',
    fetchBaseEndpoint: 'units',
    subItem: 'subunit',
  },
  track: {
    name: 'Track',
    contentType: 'track',
    fetchBaseEndpoint: 'tracks',
    subItem: 'unit'
  },
  trackList: {
    name: 'Track List',
    contentType: 'trackList',
    fetchBaseEndpoint: 'tracks',
    subItem: 'track'
  },
};