<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-button>menu</md-button>
        </md-button>
        <span class="md-title">基础镜像列表</span>
      </md-app-toolbar>

      <md-app-content>
        <div>
          <md-card v-for="context in dockerfileContexts" :key="context" md-with-hover>
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">
                  {{ context }}
                </div>
              </md-card-header-text>

              <md-card-actions>
                <router-link tag="md-button" class="md-raised md-primary"
                            :to="'/contexts/' + context.replace('/', '_')">
                  详情
                </router-link>
              </md-card-actions>
            </md-card-header>
          </md-card>
        </div>
      </md-app-content>
    </md-app>
    <md-progress-bar md-mode="query" v-if="isLoading"></md-progress-bar>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
      data () {
          return {
              dockerfileContexts: [],
              isLoading: false,
              menuVisible: false,
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

  .md-progress-bar {
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
