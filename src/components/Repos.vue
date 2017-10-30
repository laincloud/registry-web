<template>
  <div>
    <md-toolbar>
      <h2 class="md-title" style="flex: 1;">基础镜像列表</h2>
    </md-toolbar>

    <main v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isScrollDisabled"
          infinite-scroll-distance="10">
      <div>
        <md-card v-for="repo in repos" :key="repo" md-with-hover>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">
                registry.yxapp.xyz/{{ repo }}
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
  </div>
</template>

<script>
export default {
    data () {
        return {
            repos: [],
            last: REGISTRY_ORIGINAL_LAST,
            isAllLoaded: false,
            isScrollDisabled: false
        }
    },
    created () {
        this.isScrollDisabled = true;
        this.getRepos();
    },
    methods: {
        loadMore: function () {
            this.isScrollDisabled = true;
            this.getRepos();
        },
        getRepos: function () {
            console.info("last", this.last, "isAllLoaded", this.isAllLoaded, "isScrollDisabled", this.isScrollDisabled);
            let url = REGISTRY_URL + '/_catalog?last=' + this.last;
            url += '&n=' + REGISTRY_N;
            axios.get(url)
                .then(response => {
                    let repos = response.data[REPOS_KEY];
                    if (repos.length < 1) {
                        this.isAllLoaded = true;
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
  main {
    width: 80%;
    margin-top: 8em;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 8em;
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
