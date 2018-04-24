 //import assert from '@assert'

import Vue from 'vue'
import Dashboard from '@/webapp/app/components/app.dashboard'
const assert = require('assert');
window.$ = require('jquery');
describe('#app.main.vue', () => {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(Dashboard)
        const vm = new Constructor().$mount()
        expect(vm.$el.querySelector('#dashboard-app'))
          .to.equal('Welcome to Your Vue.js App')
      })
});