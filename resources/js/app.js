import './bootstrap';
import 'alpinejs';
import Vue from 'vue';

import Board from './Board'

window.Vue = Vue;

Vue.component("Board", Board);

const app = new Vue({
  el: "#app",
});
