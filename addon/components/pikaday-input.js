/* globals Pikaday */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',

  setupPikaday: function() {
    var that = this;

    var options = {
      field: this.$()[0],
      onSelect: function() {
        Ember.run(function() {
          that.userSelectedDate();
        });
      },
      firstDay: 1,
      minDate: this.get('minDate') || moment.utc(),
      maxDate: this.get('maxDate'),
      format: this.get('format') || 'DD.MM.YYYY'
    };

    if (this.get('i18n')) {
      options.i18n = this.get('i18n');
    }

    var pikaday = new Pikaday(options);

    this.set('pikaday', pikaday);
    this.get('pikaday').setDate(this.get('value'), true);
  }.on('didInsertElement'),

  teardownPikaday: function() {
    this.get('pikaday').destroy();
  }.on('willDestroyElement'),

  userSelectedDate: function() {
    this.set('value', this.get('pikaday').getDate());
  },

  setDate: function() {
    this.get('pikaday').setDate(this.get('value'), true);
  }.observes('value'),

  setMinDate: function() {
    var minDate = this.get('minDate');
    if (minDate) {
      minDate = minDate.toDate();
      this.get('pikaday').setMinDate(minDate)
    } else {
      this.get('pikaday').setMinDate(null)
    }
  }.observes('minDate'),
});
