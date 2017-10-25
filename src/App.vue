<template>
  <div>
    <md-toolbar>
      <div class="md-toolbar-container">
        <h2 class="md-title" style="flex: 1;">Registry Web</h2>
        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>
      </div>
    </md-toolbar>
    <div class="main-content">
      <images></images>
    </div>
  </div>
</template>

<script>
import Images from './components/Images.vue';

export default {
    components: {
        Images
    }
}
</script>

<style scoped>
</style>
