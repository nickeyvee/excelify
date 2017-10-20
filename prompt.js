'use strict';
const util = require('util');
const fs = require('fs');

const cache = [];

const yes = /^y(es)?/;
const no = /^n(o)?/;

function prompt(question, type) {
   // console.log("called prompt");

   return new Promise((resolve, reject) => {
      console.log(question)

      function callback(text) {
         // console.log(question, type);
         // console.log('--------------------------------------')

         validate(text, type, valid => {
            if (valid) {
               resolve(text);
               process.stdin.removeListener('data', callback);
            }
         });
      }

      // STDIN.ON() is being called once more for every input..
      // figure out how stdin actually works..
      process.stdin.on('data', callback);
   })
}

function chain() {
   process.stdin.resume();
   process.stdin.setEncoding('utf8');

   return new Promise((resolve, reject) => {
      prompt('Name of file to parse : ', 'filename')
         .then(data => {
            cache.push(data);
            return prompt('Include element type?', 'bool');
         })
         .then(data => {
            cache.push(data);
            return prompt('Include element text-body?', 'bool');
         })
         .then(data => {
            cache.push(data);
            return prompt('File name : ', 'text');
         }).then(data => {
            cache.push(data);

            const parsed = cache.map(data => {
               return data.replace(/\r?\n|\r/gm, '');
            });
            return resolve(convertToBool(parsed));
         });
   })
}

// why is validate being called twice?

function validate(input, type, callback) {
   // console.log( "VALIDATE");
   // console.log( input, type );
   // console.log("--------------------------------------------------------------");
   if (type === 'bool') {
      return yes.test(input) || no.test(input) ? callback(true) : callback(false);
   } else if (type === 'text') {
      return callback(true);
   } else if (type === 'filename') {

      let fileName = input.replace(/\r?\n|\r/gm, '');
      let fileContents;

      try {
         fileContents = fs.readFileSync(`./${ fileName }`);
      } catch (err) {
         // Here you get the error when the file was not found,
         // but you also get any other error
         if (err) {
            console.log(`No such file or directory : ${ err.path }\nPlease try again : `);
            return callback(false);
         }
      }
      if (fileContents) {
         return callback(true);
      }
   }
}

function convertToBool(arr) {
   return arr.map((data, i) => {
      if (i === 1 || i === 2) {
         return yes.test(data) ? true : false;
      } else {
         return data;
      }
   })
}

module.exports = {
   chain,
   validate,
   convertToBool
}