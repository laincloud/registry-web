<template>
  <div>
    <md-card v-for="repo in repos" :key="repo" md-with-hover>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">
            <router-link :to="'/repos/' + repo.replace('/', '_')">registry.yxapp.xyz/{{ repo }}</router-link>
          </div>
        </md-card-header-text>
      </md-card-header>
    </md-card>
  </div>
</template>

<script>
export default {
    data () {
        return {
            repos: []
        }
    },
    created () {
        axios.get('http://registry.yxapp.xyz/v2/_catalog?last=libana')
            .then(response => {
                let repos = response.data['repositories'];
                for (let i = 0; i < repos.length; i++) {
                    if (repos[i].startsWith('library')) {
                        this.repos.push(repos[i]);
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
  .md-card {
    margin-top: 2em;
    margin-bottom: 2em;
  }
</style>
