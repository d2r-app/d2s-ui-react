# d2s-ui-react

React components based on [d2s-ui](https://github.com/dschu012/d2s-ui)

- Includes [d2s v2.0.34](https://github.com/dschu012/d2s/releases/tag/v2.0.34)
- Implements stat layout from [PoD](https://pathofdiablo.com)
- Used by [d2r.app](https://d2r.app)

## Table of contents

- [Preface](#preface)
- [Data directory](#data-directory)
- [Working example (clone repo)](#working-example-clone-repo)
- [Integration (install via npm)](#integration-install-via-npm)
- [Dev](#dev)

## Preface

For item images to render, the project needs access to a copy of Diablo II's extracted data. Suggest reading through the next two sections, and checking out the working example, prior to integrating with another project.

## Data directory

- Download [Ladik's CASC Viewer](http://www.zezula.net/en/casc/main.html)
- Choose "open storage" and select D2R's data directory, e.g...
  - `C:\Program Files (x86)\Diablo II Resurrected\Data`
- Right click "data" in the navigation pane, then export
- When we refer to "d2d" below, we're referring to that exported data directory

```
-d2d
--global
--local
```

## Working example (clone repo)

```
git clone git@github.com:d2r-app/d2s-ui-react.git
cd d2s-ui-react
cp -r [your-d2d] svr/d2d
cp [your-hero-save-file] hero.d2s
npm i
node svr/api
(open new terminal)
npm start
```

If you receive the error `sh: 1: sass: not found`, then install sass... `sudo apt install sass`

![Example Hero](https://github.com/d2r-app/d2s-ui-react/blob/main/example.png)

## Integration (install via npm)

### Installation

Example project structure with existing API:

````
```
-project
--src
--svr
---api.js
```
````

```
npm i d2s-ui-react
tar xzf node_modules/d2s-ui-react/dist/d2s.tar.gz -C svr
echo "/svr/d2s" >> .gitignore
```

- Note the the newly created/ignored d2s directory
  - It contains d2s and a modified d2s-ui API

### Usage, client-side

```jsx
import { Hero } from 'd2s-ui-react';
<Hero hero={parsedSaveFile} onClose={optionalCloseFunction}>
```

Include `onClose` for a "close hero" button.

You must also include one of the following two Hero attributes for item images to render:
- `api="/api/d2s/img"`
  - Web API for responding to d2s-ui image requests
  - See Express App below
- `handleImgReq={yourAPI.d2sAPI.handleImgReq}`
  - Local API for responding to d2s-ui image requests
  - See Native App below

### Usage, server-side (Express App)

```javascript
const d2sAPI = require('./d2s/api');
const yourApp = express();
d2sAPI.init({ app: yourApp });
```

This configures an Express route for `/api/d2s/img`

### Usage, server-side (Native App)

```javascript
const d2sAPI = require('./d2s/api');
const yourAPI = {...};
d2sAPI.init({ api: yourAPI });
```

This exposes d2sAPI's image handler as `yourAPI.d2sAPI.handleImgReq`

### Usage, parsing save files

```javascript
const d2s = require('./d2s');
const hero = await d2s.read(await fs.promises.readFile('hero.d2s'), d2s.constants));
```

## Dev

### To update d2s...

Download `d2s.bundle.js` and `constants_99.bundle.js` from a d2s release, then combine:

```
cd ~/Downloads
rm index.js
for f in d2s.bundle.js constants_99.bundle.js; do (cat ${f}; echo) >> index.js; done
echo -e "\nd2s.constants = constants_99.constants;\nmodule.exports = d2s;\n" >> index.js
cp index.js /d2s-ui-react/svr/d2s/
```

### To build d2s-ui-react...

Execute `npm run build` (creates `dist/`)
