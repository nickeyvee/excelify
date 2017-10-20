'use strict';
const cheerio = require('cheerio');
const fs = require('fs');

let $, HTMLdoc;

function loadHtml(fileName) {
   HTMLdoc = fs.readFileSync(fileName, "utf8")

   $ = cheerio.load( HTMLdoc );

   return {
      HTMLdoc: HTMLdoc,
      DOM_Model: $
   }
}

function findHtmlElements(arr) {
   // returns an array with valid nodes.
   const Nodes = arr.map(query => {
      if ($(query).html() === null) {
         onErr(new Error('Query is invalid'));
      }
      return $(query);
   });
   return Nodes;
}

function mapHtmlElementData(el_arr, options_arr) {
   // should return a 2 dimensional array
   const cache = [];
   let options;

   if (options_arr === undefined) {
      options = [false, false];
   } else {
      options = options_arr;
      // console.log("options_arr exists");
   }

   el_arr.map(parent => {
      parent.map((i, node) => {

         const FirstRow = ['_id', 'name', 'value', 'checked'];

         const Row = [
            $(node).attr('id'),
            $(node).attr('name'),
            $(node).val(),
            $(node).prop('checked')
         ];


         // option1 to select the type of element..
         if (options[1]) {
            Row.push($(node).attr('type'));
            FirstRow.push('type');
         }

         // option2 to select the text body..
         if (options[2]) {
            Row.push($(node).text().trim());
            FirstRow.push('textbody');
         }

         const Parsed = Row.map(item => {
            if (item === undefined) item = '';
            return item;
         });

         if (i === 0) {
            cache.push(FirstRow);
         }
         cache.push(Parsed);
      })
   })
   return cache;
}

function onErr(err) {
   throw err;
}

module.exports = {
   findHtmlElements,
   mapHtmlElementData,
   loadHtml
}