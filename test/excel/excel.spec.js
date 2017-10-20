'use strict';
const util = require('util');
const expect = require('chai').expect;
const Excel = require('../../excel');
const fs = require('fs');


describe('Excel.js', function () {

   it('should exist', function () {
      const Excel = require('../../excel');
      expect(Excel).to.not.be.undefined;
   });
})


describe('readOutputtedSheet()', function () {

   const test = [
         ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
      ];


   it('should be a two dimensional array', function (done) {

      Excel.populate(test, 'test/stub').then(() => {
            return Promise.resolve(Excel.readOutputtedSheet(test));
         })
         .then(data => {
            expect(data).to.be.an('Array');
            done();
         })
         .catch(err => {
            console.log(err);
         })
   })


   it('should allocate more or less cells depending on the number of rows', (done) => {
      Excel.readOutputtedSheet(test)
         .then(data => {
            expect(data).to.have.lengthOf(8);
         })
         .then(() => {
            fs.unlink('./test/stub.xlsx', function () {
               done(); 
            })
         })
         .catch(err => {
            console.log(err);
         })
   });
})