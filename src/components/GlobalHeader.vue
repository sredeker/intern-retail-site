<template>
  <header>
    <div class="logo">
      <img src="../assets/logo.png">
    </div>
    <nav>
        {load categories here}
    </nav>
  </header>
</template>

<script>
export default {
  name: 'GlobalHeader'
}
</script>

<style lang="scss" scoped>
header {
 @include clearfix;
}

.logo {
  float: left;
}
</style>
