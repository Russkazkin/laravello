import './bootstrap';
import 'alpinejs';
import Vue from 'vue';
import apolloProvider from './apollo.config';

import Board from './Board'

window.Vue = Vue;

Vue.component("Board", Board);

const app = new Vue({
  el: "#app",
  apolloProvider
});
