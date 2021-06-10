import './bootstrap';
import 'alpinejs';
import Vue from 'vue';

import Index from './Index'

window.Vue = Vue;

Vue.component("index", Index);

const app = new Vue({
  el: "#app",
});
