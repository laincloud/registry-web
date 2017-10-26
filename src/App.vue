<template>
  <div>
    <md-toolbar>
      <div class="md-toolbar-container">
        <h2 class="md-title" style="flex: 1;">
          <router-link to="/">Registry Web</router-link>
        </h2>
      </div>
    </md-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
  main {
    width: 80%;
    margin-top: 10em;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 8em;
  }
</style>
