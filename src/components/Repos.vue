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
              dockerfileContexts: [],
              isLoading: false,
              registryHost: REGISTRY_HOST,
          }
      },
      created () {
          this.getDockerfileContexts();
      },
      methods: {
          getDockerfileContexts: function () {
              this.dockerfileContexts = [];
              this.isLoading = true;
              let url = GITHUB_API_URL + '/repos/' + GITHUB_USER + '/' + GITHUB_REPO + '/git/trees/' + GITHUB_BRANCH;
              let config = {
                  'headers': {
                      'Accept': 'application/vnd.github.v3+json'
                  }
              };
              console.info('url', url);
              axios.get(url, config).then(response => {
                  let repos = [];
                  response.data['tree'].forEach(item => {
                      if (item['type'] === 'tree') {
                          repos.push(item);
                      };
                  });
                  repos.forEach(repo => {
                      axios.get(repo['url'], config).then(response => {
                          let contexts = [];
                          response.data['tree'].forEach(item => {
                              if (item['type'] === 'tree') {
                                  contexts.push({
                                      'path': repo['path'] + '/' + item['path'],
                                      'url': item['url'],
                                  });
                              };
                          });
                          contexts.forEach(context => {
                              axios.get(context['url'], config).then(response => {
                                  response.data['tree'].forEach(item => {
                                    if (item['path'] === 'Dockerfile' && item['type'] === 'blob') {
                                        this.dockerfileContexts.push(context['path']);
                                    };
                                  });
                              });
                          });
                      });
                  });
              }).catch(e => {
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
    width: 70%;
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
