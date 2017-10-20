'use strict';
const fs = require('fs');
const XlsxPopulate = require('xlsx-populate');

function populate(specs, name) {
   return new Promise((resolve, reject) => {
      const column = 'ABCDEFGHIJK';

      const dimensions = 'A1:' + column.charAt(specs[0].length) + specs.length;
      // console.log(dimensions);

      if (name === undefined) {
         name = 'out';
      }

      XlsxPopulate.fromBlankAsync()
         .then(workbook => {

            workbook.sheet('Sheet1').range(dimensions)
               .value(specs);

            //write to file.
            return resolve(workbook.toFileAsync(`./${ name }.xlsx`));
         });
   })
}
// return console.log(workbook.sheet('Sheet1'));
function readOutputtedSheet(specs) {
   const column = 'ABCDEFGHIJK';

   const dimensions = 'A1:' + column.charAt(specs[0].length) + specs.length;

   return XlsxPopulate.fromFileAsync('./test/stub.xlsx')
      .then(workbook => {
         // Modify the workbook.

         // you must provide an argument for the range
         const value = workbook.sheet("Sheet1").range(dimensions).value()[0].slice(0, -1);

         return value;
      })
}

module.exports = {
   populate,
   readOutputtedSheet
}