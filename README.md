# YAML CMS

This project highlights a custom content management system using [YAML](https://yaml.org/), [React.js](https://reactjs.org/), and [Node.js](https://nodejs.org/).

## Getting Started

* run `npm install` to ensure you have the latest dependencies
* for general development purposese, run `npm run dev`: this will startup both the React app (on port 3000) and the Node API (on port 8080). A proxy is alredy configured to send the API requests to 8080 without CORS issue.

### Additional scripts

* all the basic CRA scripts (more details [here](./docs/CRA-README.md))
* `dev:server`: runs the `npm run start:server` script with the `NODE_ENV` set to `development`
* `start:server`: starts up the API with nodemon to watch for changes

## Requesting Content

All yaml content lives within the `views` directory. This content should be fetched from the Node.js API because it does not simply serve the static yaml files, but processes and formats them for the React app.

### API endpoints for requesting data

* `/api/tracks`: serves the overall tracks list (references to specific track files)
* `/api/tracks/:trackName`: serves specific track data, including references to unit files that fall within that track
* `/api/units/:unitName`: serves specific unit data, including references to subunit files that fall within that unit
* `/api/subunits/:subunitName`: serves specific subunit data, and populates any modularized content (i.e. Codeblock content that lives within a `.txt` file)

## Content Rendering

Any yaml content fetched from the API can be run through the `generateContent` function from the `src/utils/contentParser.js` file. This function is a recursive function which parses through the returned track list / track / unit / subunit data and dynamically renders JSX components based on specific keys. For more specifics on the available keys, please see the [YAML Dictionary](./docs/YAMLDictionary.md) doc.

## Shout out to these other open-source libraries

* [js-yaml](https://www.npmjs.com/package/js-yaml) 
* [react-syntax-highlighter](https://www.npmjs.com/package/react-syntax-highlighter)