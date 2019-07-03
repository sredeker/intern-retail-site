<template>
  <div id="app">
    <globalHeader></globalHeader>
    <div class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import GlobalHeader from '@/components/GlobalHeader'

export default {
  name: 'App',
  components: {
    'globalHeader': GlobalHeader
  }
}
</script>

<style lang="scss">
#app {
  font-family: $body-font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: get-color(black);
}

.main-content {
    @include clearfix;
}
</style>
