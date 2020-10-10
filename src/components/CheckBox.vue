<template>
  <div class="form-check form-group">
    <label class="form-check-label mr-3 noselect">
      <input
        class="form-check-input"
        type="checkbox"
        id="inlineFormCheck"
        :checked="value"
        @change="clicked"
      />
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class SetopsTextArea extends Vue {
  @Prop() value!: boolean;
  @Prop() label!: string;

  constructor() {
    super();
  }

  clicked(event: Event) {
      this.$emit("input", (event.target as HTMLInputElement).checked);    
  }

}
</script>

<style scoped lang="less">

input {
  margin-bottom: -2px;
}

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
