<template>
  <div class="container">
    <md-toolbar>
      <h2 class="md-title" style="flex: 1;">基础镜像列表</h2>
    </md-toolbar>

    <main>
      <div>
        <md-card v-for="repo in repos" :key="repo" md-with-hover>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">
                {{ registryHost }}/library/{{ repo }}
              </div>
            </md-card-header-text>

            <md-card-actions>
              <router-link tag="md-button" class="md-raised md-primary"
                           :to="'/repos/' + repo">
                详情
              </router-link>
            </md-card-actions>
          </md-card-header>
        </md-card>
      </div>
    </main>

    <md-progress md-indeterminate v-if="isLoading"></md-progress>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
      data () {
          return {
              isAllLoaded: false,
              isLoading: false,
              isScrollDisabled: false,
              last: LIBRARY_PREFIX,
              registryHost: REGISTRY_HOST,
              repos: []
          }
      },
      created () {
          this.getRepos();
      },
      methods: {
          getRepos: function () {
              this.isLoading = true;
              this.isScrollDisabled = true;
              let url = GITHUB_API_URL;
              console.info('url', url);
              axios.get(url)
                  .then(response => {
                      let tree = response.data['tree'];
                      if (tree.length < 1) {
                          this.isAllLoaded = true;
                          this.isLoading = false;
                          return;
                      }

                      for (let i = 0; i < tree.length; i++) {
                          if (tree[i].path.indexOf('Dockerfile') !== -1 ) {
                              let repo = tree[i].path.substring(0,tree[i].path.indexOf('/'));
                              if (this.repos.indexOf(repo) === -1) {
                                  this.repos.push(repo);
                              }
                          }
                      }
                      this.isLoading = false;
                      this.isScrollDisabled = this.isAllLoaded;
                  })
                  .catch(e => {
                      this.isLoading = false;
                      console.error(e);
                  });
          }
      }
  };
</script>

<style scoped>
  .container {
    min-height: 100%;
  }

  .md-progress {
      position: absolute;
      bottom: 0;
  }

  main {
    width: 80%;
    margin-top: 8em;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 4em;
  }

  .md-card {
    margin-top: 4em;
    margin-bottom: 4em;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 10px;
  }

  .md-card .md-card-header:first-child > .md-card-header-text > .md-title:first-child {
      margin-top: 0px;
  }
</style>
