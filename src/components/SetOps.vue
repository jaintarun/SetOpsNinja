<template>
  <div class="d-flex flex-column vh-100">
    <header class="bg-dark text-light p-2">SetOpsNinja - Perform set operations on your text like a Ninja!</header>
    <div class="p-1 d-flex justify-content-between flex-nowrap">
      <span>
        <BaseButton @click="subtract(getString('left'), getString('right'))">Left minus Right</BaseButton>
        <BaseButton @click="subtract(getString('right'), getString('left'))">Right minus Left</BaseButton>
        <BaseButton @click="union(getString('right'), getString('left'))">Left union Right</BaseButton>
        <BaseButton @click="intersection(getString('right'), getString('left'))">Left intersect Right</BaseButton>
        <BaseButton @click="showDuplicates(getString('left'))">Show duplicates in Left</BaseButton>
        <BaseButton @click="showDuplicates(getString('right'))">Show duplicates in Right</BaseButton>
      </span>
      <span>
        <CheckBox v-model="caseSensitive" label="Case-sensitive"></CheckBox>
        <CheckBox v-model="trimLines" label="Trim lines"></CheckBox>
        <CheckBox v-model="ignoreEmptyLines" label="Ignore empty lines"></CheckBox>
      </span>
      <span>
        <BaseButton @click="clearAll">Clear All</BaseButton>
      </span>
    </div>
    <main id="mainDiv" class="flex-grow-1 bg-secondary d-flex">
      <SetopsTextArea
        ref="leftset"
        textAreaName="List A"
        withButtons="true"
        @removeDuplicates="removeDuplicates(getString('left'), 'left')"
        @removeEmptyLines="removeEmptyLines(getString('left'), 'left')"
        @sort="setOpsSort(getString('left'), 'left')"
      />
      <SetopsTextArea
        ref="rightset"
        textAreaName="List B"
        withButtons="true"
        @removeDuplicates="removeDuplicates(getString('right'), 'right')"
        @removeEmptyLines="removeEmptyLines(getString('right'), 'right')"
        @sort="setOpsSort(getString('right'), 'right')"
      />
      <SetopsTextArea ref="resultset" textAreaName="Result" />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import setOpsLogic from "@/logic/SetopsLogic";
import SetopsTextArea from "@/components/SetopsTextArea.vue";
import CheckBox from "@/components/CheckBox.vue";
import BaseButton from "@/components/BaseButton.vue";

@Component({ components: { SetopsTextArea, CheckBox, BaseButton } })
export default class SetOps extends Vue {
  caseSensitive = true;
  trimLines = true;
  ignoreEmptyLines = true;

  showDuplicates(inputText: string) {
    const inputArray = setOpsLogic.stringToArray(inputText);
    const resultArray = setOpsLogic.getDuplicates(inputArray, this.caseSensitive, this.trimLines, this.ignoreEmptyLines);
    this.setText("result", setOpsLogic.arrayToString(resultArray));
  }

  setOpsSort(inputText: string, to: string) {
    if (to == "left") {
      this.setText("left", this.setOpsSortImpl(inputText));
    } else if (to == "right") {
      this.setText("right", this.setOpsSortImpl(inputText));
    }
  }

  setOpsSortImpl(inputString: string): string {
    const inputArray = setOpsLogic.stringToArray(inputString);
    const resultArray = setOpsLogic.sort(inputArray, this.caseSensitive, this.trimLines, this.ignoreEmptyLines);
    return setOpsLogic.arrayToString(resultArray);
  }

  removeEmptyLines(inputText: string, to: string) {
    if (to == "left") {
      this.setText("left", this.removeEmptyLinesImpl(inputText));
    } else if (to == "right") {
      this.setText("right", this.removeEmptyLinesImpl(inputText));
    }
  }

  removeEmptyLinesImpl(inputString: string): string {
    const inputArray = setOpsLogic.stringToArray(inputString);
    const resultArray = setOpsLogic.removeEmptyLines(inputArray);
    return setOpsLogic.arrayToString(resultArray);
  }

  removeDuplicates(inputText: string, to: string) {
    if (to == "left") {
      this.setText("left", this.removeDuplicatesImpl(inputText));
    } else if (to == "right") {
      this.setText("right", this.removeDuplicatesImpl(inputText));
    } else if (to == "result") {
      this.setText("result", this.removeDuplicatesImpl(inputText));
    }
  }

  removeDuplicatesImpl(input: string): string {
    const inputArray = setOpsLogic.stringToArray(input);
    const resultArray = setOpsLogic.getUnique(inputArray, this.caseSensitive, this.trimLines, this.ignoreEmptyLines);
    return setOpsLogic.arrayToString(resultArray);
  }

  subtract(source: string, toRemove: string) {
    const aArray = setOpsLogic.stringToArray(source);
    const bArray = setOpsLogic.stringToArray(toRemove);
    const resultArray = setOpsLogic.subtract(aArray, bArray, this.caseSensitive, this.trimLines, this.ignoreEmptyLines);
    this.setText("result", setOpsLogic.arrayToString(resultArray));
  }

  union(a: string, b: string) {
    const aArray = setOpsLogic.stringToArray(a);
    const bArray = setOpsLogic.stringToArray(b);
    const resultArray = setOpsLogic.union(aArray, bArray, this.caseSensitive, this.trimLines, this.ignoreEmptyLines);
    this.setText("result", setOpsLogic.arrayToString(resultArray));
  }

  intersection(a: string, b: string) {
    const aArray = setOpsLogic.stringToArray(a);
    const bArray = setOpsLogic.stringToArray(b);
    const resultArray = setOpsLogic.intersection(aArray, bArray, this.caseSensitive, this.trimLines, this.ignoreEmptyLines);
    this.setText("result", setOpsLogic.arrayToString(resultArray));
  }

  getString(setName: string): string {
    let setOpsArea = {} as SetopsTextArea;

    if (setName == "left") {
      setOpsArea = this.$refs.leftset as SetopsTextArea;
    }

    if (setName == "right") {
      setOpsArea = this.$refs.rightset as SetopsTextArea;
    }

    if (setName == "result") {
      setOpsArea = this.$refs.resultset as SetopsTextArea;
    }

    return setOpsArea.textValue();
  }

  setText(setName: string, value: string) {
    let setOpsArea = {} as SetopsTextArea;

    if (setName == "left") {
      setOpsArea = this.$refs.leftset as SetopsTextArea;
    }

    if (setName == "right") {
      setOpsArea = this.$refs.rightset as SetopsTextArea;
    }

    if (setName == "result") {
      setOpsArea = this.$refs.resultset as SetopsTextArea;
    }

    return setOpsArea.setTextValue(value);
  }

  clearAll() {
    if (confirm("Do you really want to clear all content?")) {
      this.setText("left", "");
      this.setText("right", "");
      this.setText("result", "");
    }
  }
}
</script>

<style scoped lang="less">
#setOpsTextAreaDiv {
  height: 100%;
  padding-bottom: 90px;
  overflow-y: auto;
}

.vh-100 {
  min-height: 100vh;
}

.setopsArea {
  flex-basis: calc(33.33% - 3px);
  min-width: 200px;
  width: calc(33.33% - 3px);
  overflow: auto;
}

#mainDiv {
  height: calc(100vh - 200px);
}
</style>
