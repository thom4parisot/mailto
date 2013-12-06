'use strict';

var Mailto = require('../../index.js');
var expect = require('chai').expect;
var h = require('../helpers');
var createFixtures = h.fixtures.createFixtures;
var clearFixtures = h.fixtures.clearFixtures;

describe('#getSerialisedData', function(){
  beforeEach(createFixtures);
  afterEach(clearFixtures);

  it('should return an empty value for a form without any named input', function(){
    var m = new Mailto('#fixtures-empty .mailto-form');

    expect(m.getSerialisedData()).to.eq('');
  });

  it('should return a GET form serialised data', function(){
    var m = new Mailto('#fixtures-default .mailto-form');

    m.form.querySelector('[name="from"]').value = 'bill@murray.com';
    m.form.querySelector('[name="message"]').value = 'How do you feel today?';

    expect(m.getSerialisedData()).to.eq('?from=bill%40murray.com&subject=Default%20value&message=How%20do%20you%20feel%20today%3F');
  });
});