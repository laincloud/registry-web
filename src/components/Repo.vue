<template>
  <div>
    <md-card>
      <md-card-area>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">
              registry.yxapp.xyz/{{ repoName }}
            </div>
          </md-card-header-text>
        </md-card-header>
      </md-card-area>

      <md-card-content>
        <md-tabs class="md-transparent">
          <md-tab id="tags" md-label="Tags">
            <ul>
              <li v-for="tag in tags" :key="tag">
                <span class="tag">{{ tag }}</span>
              </li>
            </ul>
          </md-tab>
          <md-tab id="dockerfile" md-label="Dockerfile">
            <div class="code-block">
              <pre><code>{{ dockerfile }}</code></pre>
            </div>
          </md-tab>
        </md-tabs>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
    data () {
        return {
            repoName: this.$route.params.repoName.replace('_', '/'),
            tags: [],
            dockerfile: '',
        }
    },
    created () {
        let url = 'http://registry.yxapp.xyz/v2/' + this.repoName + '/tags/list';
        axios.get(url)
            .then(response => {
                let tags = response.data['tags'];
                for (let i = 0; i < tags.length; i++) {
                    this.tags.push(tags[i]);
                }

                url = 'https://raw.githubusercontent.com/laincloud/dockerfiles/master/';
                url += this.repoName.replace('library/', '');
                url += '/';
                url += tags[0];
                url += '/Dockerfile';
                console.info(url);
                axios.get(url)
                    .then(response => {
                        this.dockerfile = response.data;
                    })
                    .catch(e => {
                        console.error(e);
                    });
            })
            .catch(e => {
                console.error(e);
            });
    }
};
</script>

<style lang="scss" scoped>
  .code-block {
    background-color: #f4f4f4;
    color: #455A64;
    padding-left: 1.5em;
    padding-right: 1.5em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;

    code {
        background: none;
        color: #000000;
    }
  }
</style>
