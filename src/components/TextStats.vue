<template>
  <div>
    <div>Lines: {{ numberOfLines }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
//import { Metrics } from "@/logic/Metrics";

@Component
export default class TextStats extends Vue {
  //@Prop() inputStats: Metrics;

  constructor() {
    super();
    //this.inputStats = new Metrics();
  }
}
</script>

<style scoped lang="less">
</style>
