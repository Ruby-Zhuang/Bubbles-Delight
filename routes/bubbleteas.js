/*
 * All routes for Bubbleteas are defined here
 * Since this file is loaded in server.js into /bubbleteas, these routes are mounted onto /bubbleteas
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Get all bubbleteas
  router.get("/", (req, res) => {
    const queryString = `SELECT * FROM bubbleteas;`;
    db.query(queryString)
      .then(data => {
        const bubbleteas = data.rows;
        const userID = req.session['user_id'];
        const templateVars = { bubbleteas, userID };
        console.log("userID", userID);
        res.render("bubbleteas", templateVars);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
