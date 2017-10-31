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
                  {{ registryHost }}/{{ repoName }}:{{ tag.id }}
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
              repoName: this.$route.params.repoName.replace('_', '/'),
              tags: [],
          }
      },
      created () {
          this.isLoading = true;
          let url = REGISTRY_SCHEME + '://' + REGISTRY_HOST + '/v2/' + this.repoName + '/tags/list';
          console.info('url', url);
          axios.get(url)
              .then(response => {
                  let tags = response.data['tags'];
                  for (let i = 0; i < tags.length; i++) {
                      url = DOCKERFILES_URL;
                      url += this.repoName.replace('library', '');
                      url += '/';
                      url += tags[i];
                      url += '/Dockerfile';
                      console.info('url', url);
                      axios.get(url)
                          .then(response => {
                              this.tags.push({
                                  'id': tags[i],
                                  'dockerfile': response.data
                              });
                              if (i === (tags.length - 1)) {
                                  this.isLoading = false;
                              }
                          })
                          .catch(e => {
                              this.isLoading = false;
                              console.error(e);
                          });
                  }
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
