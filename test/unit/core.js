'use strict';

var Mailto = require('../../index.js');
var expect = require('chai').expect;

describe('Mailto Constructor', function(){
  var fixtures;

  before(function(){
    fixtures = document.createElement('div');
    fixtures.id = 'fixtures';
    fixtures.innerHTML = window.__html__['test/fixtures/default.html'];
    document.body.appendChild(fixtures);
  });

  after(function(){
    document.body.removeChild(fixtures);
  });

  it('should accept a valid CSS selector string', function(){
    expect(new Mailto('.mailto-form')).to.be.an.instanceof(Mailto);
    expect(function(){ new Mailto('body'); }).to.throw();
    expect(function(){ new Mailto('.idontexist'); }).to.throw();
  });

  it('should accept a DOM element form', function(){
    expect(new Mailto(document.querySelector('.mailto-form'))).to.be.an.instanceof(Mailto);
    expect(function(){ new Mailto(document.querySelector('body')); }).to.throw();
    expect(function(){ new Mailto(document.querySelector('.idontexist')); }).to.throw();
  });

  it('should accept documented options only', function(){
    var form = document.querySelector('.mailto-form');
    var m = new Mailto(form);

    // default options
    expect(m.preventDefault).to.be.true;
    expect(m.onSubmit).to.be.a('function');
    expect(m.formatter).to.be.a('function');


    // deactivated preventDefault
    expect(new Mailto(form, { preventDefault: false }).preventDefault).to.be.false;

    // onSubmit
    expect(new Mailto(form, { onSubmit: function(){ return 'hey'; } })).to.satisfy(function(m){ return m.onSubmit() === 'hey'; });
    expect(new Mailto(form, { onSubmit: '' }).onSubmit).to.be.a('function');

    // formatter
    expect(new Mailto(form, { formatter: function(data){ return 'hey'+data; } })).to.satisfy(function(m){ return m.formatter('hey') === 'heyhey'; });
    expect(new Mailto(form, { formatter: '' }).formatter).to.be.a('function');
  });
});