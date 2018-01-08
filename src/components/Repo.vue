<template>
  <div class="container">
    <md-toolbar>
      <h2 class="md-title" style="flex: 1;">基础镜像 - {{ repoName }}</h2>

      <router-link tag="md-button" to="/" class="md-icon-button">
        <md-icon>home</md-icon>
      </router-link>
    </md-toolbar>

    <main>
      <div>
        <md-card v-for="tag in tags" :key="tag.id">
          <md-card-area>
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">
                  {{ registryHost }}/library/{{ repoName }}:{{ tag.id }}
                </div>
              </md-card-header-text>
            </md-card-header>
          </md-card-area>

          <md-card-content>
            <md-tabs class="md-transparent">
              <md-tab id="dockerfile" md-label="Dockerfile">
                <div class="code-block">
                  <pre><code class="hljs dockerfile">{{ tag.dockerfile }}</code></pre>
                </div>
              </md-tab>
            </md-tabs>
          </md-card-content>
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
              isLoading: false,
              registryHost: REGISTRY_HOST,
              repoName: this.$route.params.repoName,
              tags: [],
          }
      },
      created () {
          this.isLoading = true;
          let url = GITHUB_API_URL;
          console.info('url', url);
          axios.get(url)
              .then(response => {
                  let tree = response.data['tree'];
                  if (tree.length < 1) {
                      this.isLoading = false;
                      return;
                  }

                  for (let i = 0; i < tree.length; i++) {
                      if (tree[i].path.indexOf('Dockerfile') !== -1 && tree[i].path.indexOf(this.repoName+'/') !== -1 ) {
                          url = DOCKERFILES_URL+tree[i].path;
                          console.info('url', url);
                          axios.get(url)
                              .then(response => {
                                  console.info('path',tree[i].path);
                                  console.info('tag',tree[i].path.substring(this.repoName.length+1,tree[i].path.length-11));
                                  this.tags.push({
                                      'id': tree[i].path.substring(this.repoName.length+1,tree[i].path.length-11),
                                      'dockerfile': response.data
                                  });
                                  if (i === (tree.length - 1)) {
                                      this.isLoading = false;
                                  }
                              })
                              .catch(e => {
                                  this.isLoading = false;
                                  console.error(e);
                              });
                      }
                  }
                  this.isLoading = false;
              })
              .catch(e => {
                  this.isLoading = false;
                  console.error(e);
              });
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

  .code-block {
    background-color: #f4f4f4;
    padding-left: 1.5em;
    padding-right: 1.5em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }
</style>
