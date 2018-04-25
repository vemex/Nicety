 //import assert from '@assert'

import Vue from 'vue'
import Dashboard from '../../../webapp/app/components/app.dashboard'
const assert = require('assert');
window.$ = require('jquery');
describe('#app.dashboard.vue', () => {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(Dashboard)
        const vm = new Constructor().$mount() 
        expect($('#dashboard-app',vm.$el))
          .to.be.a('object')
      })
});