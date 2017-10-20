'use strict';
const util = require('util');
const expect = require('chai').expect;
const Prompt = require('../../prompt.js');


describe('prompt.js', function () {
   it('should exist', function () {
      const Prompt = require('../../prompt.js');
      expect(Prompt).to.not.be.undefined;
   });
});


describe('validate()', function () {

   it('should return a boolean type', function () {
      Prompt.validate(['y', 'foo', './test/stub.html'], 'bool', valid => {
         expect(valid).to.be.a('Boolean');
      });
   });

   it('should correctly validate user inputs', function () {
      Prompt.validate(['yes', 'bar', 'test/stub'], valid => {
         expect(valid).to.equal(false);
      });

      Prompt.validate(['y', 'n', 'test/stub'], valid => {
         expect(valid).to.equal(true);
      });

      Prompt.validate(['5456', 'no', 'test/stub'], valid => {
         expect(valid).to.equal(true);
      });

      Prompt.validate(['y', 'n', 'test/dummy'], valid => {
         expect(valid).to.equal(false);
      });

   })
});


describe('convertToBool()', function () {

   it('should return each user input as a boolean', function () {
      Prompt.convertToBool(['test/stub.html', 'y', 'n']).map((val, i) => {
         if (i > 0) {
            expect(val).to.be.a('boolean');
         }
      })
   })
});