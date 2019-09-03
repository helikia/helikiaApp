<template>
  <div id="app">
    <v-app id="inspire">
        <router-view></router-view>
    </v-app>
  </div>
</template>
<script>

export default {
  name: 'app',
};
</script>

<style lang="scss">
* {
  text-transform: none !important;
}
</style>
