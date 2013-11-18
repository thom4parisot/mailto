'use strict';

var Mailto = require('../../index.js');
var expect = require('chai').expect;
var fixtures;

function createFixtures(){
  fixtures = document.createElement('div');
  fixtures.id = 'fixtures';

  Object.keys(window.__html__).forEach(function(location){
    location.match(/(\w+).html$/);

    var el = document.createElement('div');
    el.id = 'fixtures-'+RegExp.$1;
    el.innerHTML = window.__html__[location];

    fixtures.appendChild(el);
  });

  document.body.appendChild(fixtures);
}

function clearFixtures(){
  document.body.removeChild(fixtures);
}

describe('Mailto Constructor', function(){
  before(createFixtures);
  after(clearFixtures);

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

describe('Mailto.getFormData()', function(){
  before(createFixtures);
  after(clearFixtures);

  it('should collect default form data', function(){
    var m = new Mailto('#fixtures-default .mailto-form');

    expect(m.getFormData()).to.have.lengthOf(3);
    expect(m.getFormData()[0]).to.deep.eq({ name: 'from', label: 'User Email', value: '' });
    expect(m.getFormData()[1]).to.deep.eq({ name: 'subject', label: '', value: 'Default value' });
    expect(m.getFormData()[2]).to.deep.eq({ name: 'message', label: 'Message Content:', value: '' });
  });
});