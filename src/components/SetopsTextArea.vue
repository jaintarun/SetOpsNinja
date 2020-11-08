<template>
  <div class="col">
    <div class="form-row align-items-center">
      <div class="col">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">{{ textAreaName }}</div>
          </div>
          <input type="text" class="form-control mr-2" placeholder="Note" />

          <BaseButton v-if="withButtons == 'true'" @click="removeDuplicatesEvent">&darr;&nbsp;Remove duplicates</BaseButton>
          <BaseButton v-if="withButtons == 'true'" @click="removeEmptyLinesEvent">&darr;&nbsp;Remove empty lines</BaseButton>
          <BaseButton v-if="withButtons == 'true'" @click="sortEvent">&darr;&nbsp;Sort</BaseButton>
        </div>
      </div>
    </div>
    <textarea :value="value" @input="textUpdated" class="setOpsTextArea"></textarea>
    <div>
      <span>Lines</span>
      <span class="font-weight-bolder mx-2">1092</span>
    </div>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue, Prop } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";

@Component({ components: { BaseButton } })
export default class SetopsTextArea extends Vue {
  @Prop() value!: string;
  @Prop() withButtons!: boolean;
  @Prop({ required: true }) readonly textAreaName!: string;

  constructor() {
    super();
  }

  removeDuplicatesEvent() {
    this.$emit("removeDuplicates", "");
  }

  removeEmptyLinesEvent() {
    this.$emit("removeEmptyLines", "");
  }

  sortEvent() {
    this.$emit("sort", "");
  }

  textUpdated(event: Event) {
    this.$emit("input", (event.target as HTMLTextAreaElement).value);
  }
}
</script>

<style scoped lang="less">
.setOpsTextArea {
  width: 100%;
  height: calc(100% - 20px);
  resize: none;
  line-height: 20px;
}

.form-control::placeholder {
  color: lightgrey;
  opacity: 1;
}
</style>
