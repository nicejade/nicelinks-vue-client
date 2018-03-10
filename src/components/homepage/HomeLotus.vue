<template>
  <section class="lotus fade-in animated">
    <article class="twelve columns cssanimations">
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
            <p v-html="$t('niceLinksDesc')"></p>
            <router-link to="/explore/all" class="gtag-track"
              data-action="mian-explore-all" data-category="index" data-label="explore-all">
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

  data () {
    return {
    }
  },

  components: {
  },

  created () {
  },

  methods: {
  },

  locales: {
    en: {
      niceLinksDesc: `NICE LINKS, as an open platform, is designed to gather around the world's excellent websites to explore the wider world of the Internet;<br>Here, you can easily find, learn, and share more useful or interesting things.`
    },
    zh: {
      niceLinksDesc: '倾城之链，作为一个开放平台，旨在云集全球优秀网站，探索互联网中更广阔的世界；<br>在这里，你可以轻松发现、学习、分享更多有用或有趣的事物。'
    }
  }
}
</script>

<style lang="scss">
@import "./../../assets/scss/variables.scss";
@import './../../assets/scss/mixins.scss';

@media (min-width: 550px) {
  .twelve.columns {
    width: 100%;
    margin-left: 0
  }
}

.flower-container{
  position: relative;
  .unit-wrapper{
    position: absolute;
    width: 66%;
    top: 0;
    bottom: 25%;
    left: 0;
    right: 0;
    margin: auto;
    opacity: 0;
    animation-delay: 2.75s;
    animation: show-text 1s 2.5s forwards cubic-bezier(0.1, 0.95, 0.59, 1.22);
    .headline{
      position: absolute;
      top: calc(50% - 2em);
      left: -10em;
      right: -10em;
      text-align: center;
      font-weight: 400;
      text-shadow: 0 0 2em $white;
    }
    .hero-description {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      font-size: 18px;
      line-height: 2.2rem;
      text-align: center;
      text-shadow: 0 0 2em $white;
      a {
        box-sizing: border-box;
        border: 1px solid $brand;
        padding: 0.25em 1em;
        color: $brand;
        font-weight: bold;
        line-height: 3em;
        border-radius: 2em;
        transition: all 0.15s ease;
        box-sizing: border-box;
      }
    }
  }
}


@media (max-width: $mobile-screen) {
  .hero-description {
    br{
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .flower-container{
    .flower {
      font-size: 1.8rem !important;
    }
    .unit-wrapper{
      width: 100%;
      .hero-description {
        font-size: 2.2rem;
        padding: 0px 20px;
        line-height: 2.2rem;
      }
    }
  }
}

@media (max-width: 560px) {
  .flower-container{
    .unit-wrapper .hero-description {
      font-size: 2.1rem;
      padding: 0px 10px;
    }
  }
}

@media (max-width: 414px) {
  .flower-container{
    .flower {
      font-size: 1.6rem !important;
    }
    .unit-wrapper .hero-description {
      font-size: 1.8rem;
      padding: 0px 10px;
    }
  }
}

@media (max-width: 375px) {
  .flower-container .flower {
    font-size: 1.3rem !important;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fade-in {
  animation-name: fade-in;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
  visibility: visible;
  animation-name: fade-in;
}

.animated.infinite {
  animation-iteration-count: infinite;
}
.animated.hinge {
  animation-duration: 6s;
}
</style>
