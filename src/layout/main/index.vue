<template>
  <div class="main-layout">
    <page-header />
    <div class="main-content-wrapper">
      <router-view />
    </div>
    <page-footer />
  </div>
</template>

<script>
import PageHeader from '@/components/header'
import PageFooter from '@/components/footer'

export default {
  name: 'LayoutMain',
  components: {
    PageHeader,
    PageFooter
  },
  data() {
    return {
      msg: 'Welcome to your VueName'
    }
  }
}
</script>

<style scoped lang="less">
.main-layout {
  width: 100%;
}
</style>
