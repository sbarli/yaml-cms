# YAML Dictionary

**Goals**: Keep a dictionary & example list of availble keys for yaml content

**Skip to**:

- [Index](#index)
- [Dictionary](#dictionary)

<hr id="index" />

## Index

- [codeblock](#codeblock)
- [content](#content)
- [description](#description)
- [header](#header)
- [id](#id)
- [listItem](#list-item)
- [orderedList](#ordered-list)
- [tagline](#tagline)
- [topics](#topics)
- [unorderedList](#unordered-list)

<hr id="dictionary" />

## Dictionary

<div id="codeblock"></div>

- **codeblock**: _string_ containing the filename for the codeblock text file:
  - ex.
  ```yaml
  codeblock: 'read-composite-data-types-block-1'
  ```
  - usually found within [content](#content) on a subunit file

<div id="content"></div>

- **content**: can be one of two uses:
  1. _string_ containing primitive data as the content for the outer parent component
  1. _object_ containing nested yaml content
  - ex. (string)
  ```yaml
  content: 'I am some basic content'
  ```
  - ex. (object)
  ```yaml
  content: 
    - description: 'Hey there, I'm a description!'
    - orderedList:
      - listItem: I am an ordered list item.
  ```

<div id="description"></div>

- **description**: _string_ containing text to be rendered in a Paragraph component which may contain HTML:
  - ex.
  ```yaml
  description: 'I am a description with some <em>HTML</em> in here. Hope I get <strong>rendered properly</strong>.'
  ```
  - usually found within [content](#content)

<div id="header"></div>

- **header**: _object_ containing the props for a Header component:
  - [content](#content)
  - size: _string_ representing any valid <h#> tag 
  - ex.
  ```yaml
  header: 
    - content: "I'm a big 'ol header!"
    - size: h1
  ```

<div id="id"></div>

- **id**: _string_ representing the id of the content. Required on every file:
  - ex.
  ```yaml
  id: read-composite-data-types
  ```

<div id="list-item"></div>

- **listItem**: _string_ containing text to be rendered in a ListItem component:
  - ex.
  ```yaml
  listItem: 'I am a listItem with some <em>HTML</em> in here. Hope I get <strong>rendered properly</strong>.'
  ```
  - should only be found within [orderedList](#orderedList) or [unorderedList](#unorderedList) keys

<div id="ordered-list"></div>

- **orderedList**: _array_ containing data to be rendered in an OrderedList component:
  - typically going to see [listItem](#listItem) keys as children
  - ex.
  ```yaml
  - orderedList:
      - listItem: I am one of those list item things!
  ```

<div id="tagline"></div>

- **tagline**: _string_ containing text to be rendered in a Tagline component which may contain HTML:
  - ex.
  ```yaml
  tagline: 'I am a tagline with some <em>HTML</em> in here. Hope I get <strong>rendered properly</strong>.'
  ```
  - usually found within at the top level of a track or unit

<div id="topics"></div>

- **topics**: _object_ containing data to be rendered in a topics component:
  - typically going to see [unorderedList](#unorderedList) key as only prop
  - ex.
  ```yaml
  - topics:
      - unorderedList:
        - listItem: Topic 1
        - listItem: Topic 2
  ```
  - usually found within at the top level of a track or unit

<div id="unordered-list"></div>

- **unorderedList**: _array_ containing data to be rendered in an UnorderedList component:
  - typically going to see [listItem](#listItem) keys as children
  - ex.
  ```yaml
  - unorderedList:
      - listItem: I am one of those list item things!
  ```