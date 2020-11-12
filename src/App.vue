<template>
  <div id="app">
    <SetOps />   
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SetOps from "./components/SetOps.vue";
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

@Component({
  components: {
    SetOps,
  },
})
export default class App extends Vue {}
</script>
