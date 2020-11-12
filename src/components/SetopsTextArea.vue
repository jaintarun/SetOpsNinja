<template>
  <div class="bg-light flex-fill setopsArea d-flex flex-column">
    <div class="border p-1">
      <div class="form-row align-items-center">
        <div class="col">
          <div class="input-group align-items-center flex-nowrap">
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
    </div>
    <div v-bind:id="editorId" class="border flex-grow-1"></div>
    <div class="border p-1">
      <label class="col-form-label">Total Lines:</label>
      {{ numOfLines }}
    </div>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue, Prop } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";

declare const ace: any;

@Component({ components: { BaseButton } })
export default class SetopsTextArea extends Vue {
  @Prop() value!: string;
  @Prop() withButtons!: boolean;
  @Prop({ required: true }) readonly textAreaName!: string;
  localEditor: any;
  localDocument: any;
  numOfLines = 0;
  withinChange = false;

  constructor() {
    super();
  }

  get editorId(): string {
    return "editor_" + this.textAreaName.toLowerCase().replace(" ", "_");
  }

  setTextValue(value: string) {
    this.localEditor.session.setValue(value);
  }

  textValue(): string {
    return this.localDocument.getValue();
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

  mounted() {
    this.localEditor = ace.edit(this.editorId);
    this.localEditor.session.setMode("ace/mode/text");
    this.localDocument = this.localEditor.session.getDocument();

    this.localEditor.setOptions({
      selectionStyle: "text",
      highlightActiveLine: true,
      highlightSelectedWord: false,
      readOnly: false,
      cursorStyle: "slim",
      mergeUndoDeltas: true,
      behavioursEnabled: false,
      wrapBehavioursEnabled: false,
      autoScrollEditorIntoView: false,
      copyWithEmptySelection: true,
      useSoftTabs: false,
      navigateWithinSoftTabs: false,
      enableMultiselect: true,
      hScrollBarAlwaysVisible: false,
      vScrollBarAlwaysVisible: false,
      highlightGutterLine: false,
      animatedScroll: false,
      showInvisibles: false,
      showPrintMargin: false,
      printMarginColumn: 300,
      printMargin: false,
      fadeFoldWidgets: false,
      showFoldWidgets: false,
      showLineNumbers: false,
      showGutter: false,
      displayIndentGuides: false,
    });

    this.localDocument.on("change", () => {
      this.numOfLines = this.localDocument.getLength();
    });
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
