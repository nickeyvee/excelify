#!/usr/bin/env node
'use strict';

const Prompt = require('./prompt.js');
const Excel = require('./excel.js');
const Map = require('./map.js');
const util = require('util');

// const params = process.argv.slice(2);

// const Elements = Map.findHtmlElements(params);

function bootstrap(params) {
   // The user is first prompted for additional info.
   Prompt.chain().then(options => {

         Map.loadHtml(options[0]);
         // findHtmlElements() takes our html queries
         // and returns an array with the selected elements

         // our html elments along with the additional user options
         // are passed to the mapHtmlElementData() function where our
         // html attributes are extracted and mapped to a
         // 2-dimensional array...which is then passed to our
         // populate() function to be inputted to our new spreadsheet.

         Excel.populate(
            Map.mapHtmlElementData(
               Map.findHtmlElements(params), options
            ),
            options[3]
         ).then(() => {
            process.exit()
         })
      })
      .catch(err => {
         console.log(err);
      });
}

module.exports = bootstrap;