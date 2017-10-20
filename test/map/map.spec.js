'use strict';
const expect = require('chai').expect;

// Make sure our module to test
// is included..

describe('Map.js', function () {
   it('should exist', function () {
      const Map = require('../../map.js');
      expect(Map).to.not.be.undefined;
   });
});

const Map = require('../../map.js');

describe('loadHtml', function() {
   it('html document stub should exist', function() {
      expect(Map.loadHtml('./test/stub.html').HTMLdoc).to.be.a('string');
   })

   it('cheerio.js should sucessfully load the document', function() {
      expect(Map.loadHtml('./test/stub.html').DOM_Model).to.be.a('function');     
   })
})

Map.loadHtml('./test/stub.html');

describe('findHtmlElements()', function () {

   it('should accept an array of strings and return valid html nodes', function () {
      let parsed = Map.findHtmlElements(['html']);
      expect(parsed).to.not.be.undefined;
   })

   it('should throw an Exception when any arguments are invalid', function () {
      expect(
         Map.findHtmlElements.bind(Map.findHtmlElements, ['div', 'divinput'])
      ).to.throw('Query is invalid');
   })
});


describe('mapHtmlElementData()', function () {
   const elements = Map.findHtmlElements(['step1 input', 'step2 input']);
   const data = Map.mapHtmlElementData(elements);

   it('should return a 2D array containing the mapped attributes from each HTML element', function () {

      expect(Map.mapHtmlElementData(elements)).to.not.be.undefined;

      // check if it returns an array type..
      expect(data).to.be.an("Array");

      // ...make sure the returned array is 2-Dimensional
      expect(data.map(nested => nested)).to.be.an("Array");
   });

   it('should return at least one item', function () {
      expect(data).to.have.lengthOf.at.least(1);
   });

   it('should replace any undefined attributes with an empty string', function () {
      data.map(nested => {
         nested.map(val => {
            expect(val).to.not.be.undefined;
         });
      });
   });

   it('should return optional html elements if specified', function () {
      // console.log("What is this");
      console.log(Map.mapHtmlElementData(elements, ['test/stub.html', true, false])[0]);
      // console.log('----------------------------------------------------')

      expect( Map.mapHtmlElementData(elements, ['test/stub.html', true, false])[0] ).to.have.lengthOf(5);
      // Ex: [ '_id', 'name', 'value', 'checked', 'type' ]
      expect( Map.mapHtmlElementData(elements, ['test/stub.html', true, true])[0] ).to.have.lengthOf(6);      
   })
});