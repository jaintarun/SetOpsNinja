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
      <!-- <div class="col-sm-6">
        <span class="font-weight-normal">Lines</span>
        <span class="font-weight-light mr-1">1092</span>
        <span class="font-weight-normal">Duplicates</span>
        <span class="font-weight-light mr-1">1987</span>
      </div> -->
    </div>
    <textarea
      :value="value"
      @input="textUpdated"
      class="setOpsTextArea"
    ></textarea>
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
    this.$emit("removeDuplicates", '');
  }

  removeEmptyLinesEvent() {
    this.$emit("removeEmptyLines", '');
  }  

  sortEvent() {
    this.$emit("sort", '');
  }

  textUpdated(event: Event) {
    this.$emit("input", (event.target as HTMLTextAreaElement).value);
  }
}
</script>

<style scoped lang="less">
.setOpsTextArea {
  width: 100%;
  height: 100%;
  resize: none;
}

.form-control::placeholder {
  color: lightgrey;
  opacity: 1;
}
</style>
