'use strict';

var fixtures;

module.exports = {
  fixtures: {
    createFixtures: function createFixtures(){
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
    },

    clearFixtures: function clearFixtures(){
      document.body.removeChild(fixtures);
    }
  },

  getNamedValues: function getNamedValues(data, namedValue){
    return data.filter(function(d){
      return d.name === namedValue;
    });
  }
};