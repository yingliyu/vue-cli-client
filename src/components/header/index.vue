<template>
  <div class="header-wrapper">This is header wrapper!</div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      msg: 'Welcome to your VueName'
    }
  }
}
</script>

<style scoped lang="less">
.header-wrapper {
  width: 100%;
  height: 30px;
  position: fixed;
  top: 0;
  background: #ccc;
}
</style>
