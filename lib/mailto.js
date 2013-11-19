'use strict';

/**
 *
 * @param {HTMLElement|String} form
 * @param {Object=} options
 * @constructor
 */
function Mailto(form, options){
  /**
   *
   * @type {HTMLElement}
   */
  this.form = null;

  /**
   *
   * @type {boolean}
   */
  this.preventDefault = true;

  /**
   *
   * @type {Function}
   */
  this.formatter = Mailto.defaultFormatter;

  /**
   *
   * @type {Function}
   */
  this.onSubmit = function(m){};

  this.initFormObject(form);
  this.initOptions(options);
  this.initFormHandler();
}

/**
 * @prototype
 */
Mailto.prototype = {
  initFormObject: function initFormObject(formOrSelector){
    if (typeof formOrSelector === 'string'){
      this.form = document.querySelector(formOrSelector);
    }
    else{
      this.form = formOrSelector;
    }

    if (!this.form || !this.form.hasOwnProperty('nodeName') || this.form.nodeName !== 'FORM'){
      throw new Error('Mailto first argument should be a valid CSS selector or a form instance.');
    }
  },

  initOptions: function initOptions(options){
    options = options || {};

    if (options.hasOwnProperty('preventDefault')){
      this.preventDefault = !!options.preventDefault;
    }

    if (typeof options.onSubmit === 'function'){
      this.onSubmit = options.onSubmit;
    }

    if (typeof options.formatter === 'function'){
      this.formatter = options.formatter;
    }
  },

  initFormHandler: function initFormHandler(){
    var self = this;

    this.form.addEventListener('submit', function(event){
      if (self.preventDefault){
        event.preventDefault();
      }

      self.onSubmit(self);
    });
  },

  /**
   * Returns the filtered values of a form.
   *
   * They are basically:
   * - for named options
   * - one entry per input/checked/selected option (even if they have the same name)
   *
   * @returns {Array.<{name: String, label: String, value: String|Boolean|Number}>}
   */
  getFormData: function getFormData(){
    var form = this.form;
    var selector = ['input', 'select', 'textarea'].join(',');

    return [].slice.call(form.querySelectorAll(selector))
      .filter(Mailto.formDataFilter)
      .map(Mailto.formDataMapper(form));
  },

  /**
   * Returns an aggregated object of form values.
   *
   * If form fields has the same name, their value will be aggregated as an array for this given name.
   *
   * @returns {Object}
   */
  getData: function getData(){
    var data = {};

    this.getFormData().forEach(function(d){
      if (Array.isArray(data[d.name])){
        data[d.name].push(d.value);
      }
      else if (data[d.name] !== undefined){
        data[d.name] = [data[d.name], d.value];
      }
      else {
        data[d.name] = d.value;
      }
    });

    return data;
  }
};

Mailto.formDataFilter = function formDataFilter(el){
  if (!el.name){
    return false;
  }

  if ((el.type === 'checkbox' || el.type === 'radio') && el.checked === false){
    return false;
  }

  return true;
};

Mailto.formDataMapper = function formDataMapper(form){
  return function (el){
    var value = el.value;

    if (el.hasOwnProperty('selectedIndex')) {
      value = el.options[el.selectedIndex].getAttribute('value');
    }

    return {
      name: el.name,
      label: el.title || (el.id && form.querySelector('label[for="'+el.id+'"]').innerText),
      value: value === null ? '' : value
    };
  }
};

Mailto.defaultFormatter = function(data){
  return data.join("\n");
};

module.exports = Mailto;