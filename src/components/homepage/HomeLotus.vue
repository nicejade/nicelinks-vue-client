<template>
  <section class="lotus fade-in animated" id="lotus">
    <article class="twelve columns lotus-animations">
      <div class="flower-container">
        <div class="flower">
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
        </div>
        <div class="unit-wrapper">
          <h1 class="headline large-font">{{ $t('niceLinksStr') }}</h1>
          <section class="hero-description">
            <strong class="desc-text function">开放型新一代导航平台，旨在云集全球优秀网站，探索互联网中更广阔的世界；</strong>
            <strong class="desc-text objective">在「<mark class="mark">倾城之链</mark>」，您可以轻松发现、学习、分享更多有用或有趣的事物。</strong>
            <router-link to="/explore/all" @click.native="onExploreAll" class="explore-all-link">
              {{ $t('exploreNice') }}
            </router-link>
          </section>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'HomeLotus',

  methods: {
    onExploreAll() {
      this.$gtagTracking('mian-explore-all', 'index')
    },
  },
}
</script>