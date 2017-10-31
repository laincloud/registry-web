<template>
  <div class="container">
    <md-toolbar>
      <h2 class="md-title" style="flex: 1;">基础镜像列表</h2>
    </md-toolbar>

    <main v-infinite-scroll="getRepos"
          infinite-scroll-disabled="isScrollDisabled"
          infinite-scroll-distance="10">
      <div>
        <md-card v-for="repo in repos" :key="repo" md-with-hover>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">
                {{ registryHost }}/{{ repo }}
              </div>
            </md-card-header-text>

            <md-card-actions>
              <router-link tag="md-button" class="md-raised md-primary"
                           :to="'/repos/' + repo.replace('/', '_')">
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
              let url = REGISTRY_SCHEME + '://' + REGISTRY_HOST + '/v2/_catalog?last=' + this.last;
              url += '&n=' + REGISTRY_N;
              console.info('url', url);
              axios.get(url)
                  .then(response => {
                      let repos = response.data[REPOS_KEY];
                      if (repos.length < 1) {
                          this.isAllLoaded = true;
                          this.isLoading = false;
                          return;
                      }

                      for (let i = 0; i < repos.length; i++) {
                          if (!repos[i].startsWith(LIBRARY_PREFIX)) {
                              this.isAllLoaded = true;
                              break;
                          }

                          this.repos.push(repos[i]);

                          if (i === (repos.length - 1)) {
                              this.last = repos[i];
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
