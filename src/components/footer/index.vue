<template>
  <div class="footer-wrapper">This is footer wrapper!</div>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      msg: 'Welcome to your VueName'
    }
  }
}
</script>

<style scoped lang="less">
.footer-wrapper {
  width: 100%;
  height: 30px;
  position: fixed;
  bottom: 0;
  background: #ccc;
}
</style>
