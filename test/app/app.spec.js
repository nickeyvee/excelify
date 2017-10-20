'use strict';
const Chai = require('chai').expect;

describe('index.js', function() {
   it('should exsist', function() {
      const app = require('../../app');
      expect(app).to.no.be.undefined;
   })
});