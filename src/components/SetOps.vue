<template>
  <div class="h-100">
    <nav class="navbar navbar-dark bg-dark" role="navigation">
      <a class="navbar-brand" href="/">SetOpsNinja - Perform set operations on your text like a Ninja!</a>
    </nav>
    <div class="container-fluid p-3 fill">
        <div class="row">
            <div class="col form-inline mb-3">
                <BaseButton @click="subtract(left, right)">Left minus Right</BaseButton>                
                <BaseButton @click="subtract(right, left)">Right minus Left</BaseButton>
                <BaseButton @click="union(right, left)">Left union Right</BaseButton>
                <BaseButton @click="intersection(right, left)">Left intersect Right</BaseButton>
                <BaseButton @click="showDuplicates(left)">Show duplicates in Left</BaseButton>
                <BaseButton @click="showDuplicates(right)">Show duplicates in Right</BaseButton>

                <CheckBox v-model="caseSensitive" label="Case-sensitive"></CheckBox>
                <CheckBox v-model="trimLines" label="Trim lines"></CheckBox>
                <CheckBox v-model="ignoreEmptyLines" label="Ignore empty lines"></CheckBox>                

                <BaseButton @click="clearAll">Clear All</BaseButton>
                <!-- <BaseButton @click="showDebug">Debug</BaseButton> -->                
            </div>
        </div>            
        <div id="setOpsTextAreaDiv" class="row">
            <SetopsTextArea v-model="left" textAreaName="List A" withButtons="true" @removeDuplicates="removeDuplicates(left, 'left')" @removeEmptyLines="removeEmptyLines(left, 'left')" @sort="setOpsSort(left, 'left')" />
            <SetopsTextArea v-model="right" textAreaName="List B" withButtons="true"  @removeDuplicates="removeDuplicates(right, 'right')" @removeEmptyLines="removeEmptyLines(right, 'right')" @sort="setOpsSort(right, 'right')"/>
            <SetopsTextArea v-model="result" textAreaName="Result" />
        </div>
    </div>
    <footer class="footer pl-3">
        <span class="text-muted">&copy; SetOps</span>
    </footer>
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
  left = "";
  right = "";
  result = "";
  caseSensitive = true;
  trimLines = true;
  ignoreEmptyLines = true;

  showDuplicates(inputText: string) {
    const inputArray = setOpsLogic.stringToArray(inputText);
    const resultArray = setOpsLogic.getDuplicates(inputArray,
      this.caseSensitive,
      this.trimLines,
      this.ignoreEmptyLines);
    this.result = setOpsLogic.arrayToString(resultArray);    
  }

  setOpsSort(inputText: string, to: string) {    
    if (to == 'left') {
      this.left = this.setOpsSortImpl(inputText);
    } else if (to == 'right') {
      this.right = this.setOpsSortImpl(inputText);
    } 
  }

  setOpsSortImpl(inputString: string): string {
    const inputArray = setOpsLogic.stringToArray(inputString);
    const resultArray = setOpsLogic.sort(inputArray,
      this.caseSensitive,
      this.trimLines,
      this.ignoreEmptyLines);
    return setOpsLogic.arrayToString(resultArray);
  }

  removeEmptyLines(inputText: string, to: string) {    
    if (to == 'left') {
      this.left = this.removeEmptyLinesImpl(inputText);
    } else if (to == 'right') {
      this.right = this.removeEmptyLinesImpl(inputText);
    } 
  }

  removeEmptyLinesImpl(inputString: string): string {
    const inputArray = setOpsLogic.stringToArray(inputString);
    const resultArray = setOpsLogic.removeEmptyLines(inputArray);
    return setOpsLogic.arrayToString(resultArray);
  }

  removeDuplicates(inputText: string, to: string) {    
    if (to == 'left') {
      this.left = this.removeDuplicatesImpl(inputText);
    } else if (to == 'right') {
      this.right = this.removeDuplicatesImpl(inputText);
    } else if (to == 'result') {
      this.result = this.removeDuplicatesImpl(inputText);
    }
  }

  removeDuplicatesImpl(input: string): string {
    const inputArray = setOpsLogic.stringToArray(input);
    const resultArray = setOpsLogic.getUnique(
      inputArray,
      this.caseSensitive,
      this.trimLines,
      this.ignoreEmptyLines
    );
    return setOpsLogic.arrayToString(resultArray);
  }  

  subtract(source: string, toRemove: string) {
    
    const aArray = setOpsLogic.stringToArray(source);
    const bArray = setOpsLogic.stringToArray(toRemove);
    const resultArray = setOpsLogic.subtract(
      aArray,
      bArray,
      this.caseSensitive,
      this.trimLines,
      this.ignoreEmptyLines
    );
    this.result = setOpsLogic.arrayToString(resultArray);
  }

  union(a: string, b: string) {
    const aArray = setOpsLogic.stringToArray(a);
    const bArray = setOpsLogic.stringToArray(b);
    const resultArray = setOpsLogic.union(
      aArray,
      bArray,
      this.caseSensitive,
      this.trimLines,
      this.ignoreEmptyLines
    );
    this.result = setOpsLogic.arrayToString(resultArray);
  }

  intersection(a: string, b: string) {
    const aArray = setOpsLogic.stringToArray(a);
    const bArray = setOpsLogic.stringToArray(b);
    const resultArray = setOpsLogic.intersection(
      aArray,
      bArray,
      this.caseSensitive,
      this.trimLines,
      this.ignoreEmptyLines
    );
    this.result = setOpsLogic.arrayToString(resultArray);
  }

  clearAll() {
    this.left = "";
    this.right = "";
    this.result = "";
  }

  showDebug(){
    console.log('caseSensitive:' + this.caseSensitive);
    console.log('trimLines:' + this.trimLines);
    console.log('ignoreEmptyLines:' + this.ignoreEmptyLines);
  }

}
</script>

<style scoped lang="less">

    #setOpsTextAreaDiv {
        height: 100%;
        padding-bottom: 90px;
        overflow-y: auto;
    }

    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #f5f5f5;
    }            

</style>
