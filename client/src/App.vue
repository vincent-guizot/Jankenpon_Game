<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
body{
  background: url('https://png.pngtree.com/thumb_back/fw800/background/20190819/pngtree-pink-sakura-flower--cherry-petal-pattern-wallpaper-background-image_300417.jpg');
  background-size: cover;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
