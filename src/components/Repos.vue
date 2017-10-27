<template>
  <div>
    <md-toolbar>
      <h2 class="md-title" style="flex: 1;">基础镜像列表</h2>
    </md-toolbar>

    <main>
      <div>
        <md-card v-for="repo in repos" :key="repo" md-with-hover>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">
                registry.yxapp.xyz/{{ repo }}
              </div>
            </md-card-header-text>

            <md-actions>
              <router-link tag="md-button" class="md-raised md-primary"
                          :to="'/repos/' + repo.replace('/', '_')">详情</router-link>
            </md-actions>
          </md-card-header>
        </md-card>
      </div>
    </main>
  </div>
</template>

<script>
export default {
    data () {
        return {
            repos: [],
            last: '',
        }
    },
    created () {
        axios.get('http://registry.yxapp.xyz/v2/_catalog?last=libana&n=2')
            .then(response => {
                let repos = response.data['repositories'];
                for (let i = 0; i < repos.length; i++) {
                    if (repos[i].startsWith('library')) {
                        this.repos.push(repos[i]);
                    }
                }

                if (repos.length > 0) {
                    let lastRepo = repos[repos.length - 1];
                    if (lastRepo.startsWith('library')) {
                        this.last = lastRepo;
                    }
                }
            })
            .catch(e => {
                console.error(e);
            });
    }
};
</script>

<style scoped>
  main {
    width: 80%;
    margin-top: 10em;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 8em;
  }

  .md-card {
    margin-top: 2em;
    margin-bottom: 2em;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 10px;
  }

  .md-card .md-card-header:first-child > .md-card-header-text > .md-title:first-child {
      margin-top: 0px;
  }
</style>
