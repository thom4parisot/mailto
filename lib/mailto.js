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
  }
};

Mailto.defaultFormatter = function(data){
  return data.join("\n");
};

module.exports = Mailto;