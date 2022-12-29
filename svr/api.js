const cors = require('cors');
const d2s = require('./d2s');
const d2sAPI = require('./d2s/api');
const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

const api = {
  init: async () => {
    // Initialize d2s API-- read game data and listen for image requests
    d2sAPI.init({ app: app, base: 'svr/d2d' });
    // Listen for hero requests
    app.get('/api/hero', async (req, res) => {
      // Read save file
      let data;
      try {
        data = await fs.promises.readFile('hero.d2s');
      }
      catch (e) {
        return api.out(res, { err: e.message, msg: 'Place "hero.d2s" in d2s-ui-react root!' });
      }
      // Parse save file
      let hero;
      try {
        hero = await d2s.read(data, d2s.constants);
      }
      catch (e) {
        return api.out(res, { err: e.message, msg: 'Error parsing hero.d2s' });
      }
      // Verify save file and send response
      if (!hero?.header?.name) {
        return api.out(res, { err: 'Invalid d2s save file-- header missing character name' });
      }
      return api.out(res, hero);
    });
  },
  out: (res, data) => {
    if (data.err) {
      console.log(data.err);
    }
    if (data.msg) {
      console.log(data.msg);
    }
    res.json(data);
  }
};

(async () => {
  await api.init();
  app.listen(8080);
})();
