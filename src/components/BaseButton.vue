<template>
  <button v-on="$listeners" type="button" class="btn-secondary btn-sm mr-2">
    <slot />
  </button>
</template>

<style scoped lang="less">
// button {
//   font-size: 0.8em;  padding-top: 0em;
// }
</style>
