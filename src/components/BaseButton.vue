<template>
  <button v-on="$listeners" type="button" class="btn btn-secondary btn-sm mr-2 noselect">
    <slot />
  </button>
</template>

<style scoped lang="less">
.btn:focus {
  box-shadow: none;
}
</style>
