<template>
  <section class="lotus fade-in animated" id="lotus">
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
            <router-link
              to="/explore/all"
              class="gtag-track"
              data-action="mian-explore-all"
              data-category="index"
              data-label="explore-all"
            >
              {{ $t('exploreNice') }}
            </router-link>
            <EmbedUpvote v-if="!isMobile"></EmbedUpvote>
          </section>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import EmbedUpvote from 'components/homepage/EmbedUpvote'

export default {
  name: 'HomeLotus',

  data() {
    return {
      isMobile: window.innerWidth <= 960,
    }
  },

  components: {
    EmbedUpvote,
  },

  created() {},

  methods: {},

  locales: {
    en: {
      niceLinksDesc: `NICE LINKS, as an open platform, is designed to gather around the world's excellent websites to explore the wider world of the Internet;<br>Here, you can easily find, learn, and share more useful or interesting things.`,
    },
    zh: {
      niceLinksDesc:
        '倾城之链，作为一个开放平台，旨在云集全球优秀网站，探索互联网中更广阔的世界；<br>在这里，你可以轻松发现、学习、分享更多有用或有趣的事物。',
    },
  },
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/mixins.scss';

@media (min-width: 550px) {
  .twelve.columns {
    width: 100%;
    margin-left: 0;
  }
}

.flower-container {
  position: relative;
  .unit-wrapper {
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
    .headline {
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
        display: inline-block;
        box-sizing: border-box;
        border: 2px solid $producthunt;
        padding: 0.25em 3em;
        margin-top: 2em;
        color: $producthunt;
        font-weight: bold;
        line-height: 2em;
        border-radius: 2em;
        transition: all 0.2s ease;
        box-sizing: border-box;
        &:hover {
          color: $white;
          background-color: $producthunt;
        }
      }
    }
  }
}

.flower-container {
  padding-bottom: 8em;
  margin: 0em 0 -6em;
  overflow: hidden;
}

.flower-container .flower {
  position: relative;
  display: block;
  height: 14em;
  width: 14em;
  margin: 5em auto 4.25em;
  font-size: 22px;
  transition: all 0.2s ease-out;
}

.flower-container .part {
  position: absolute;
  top: 50%;
  left: 50%;
}

.flower-container .part:nth-child(1) {
  height: 10em;
  width: 10em;
  margin: -10em 0 0;
  border-radius: 100% 0;
  background: rgba(199, 212, 227, 0.5);
  opacity: 0.6;
  transform-origin: 0 100% 0;
  background-color: rgba(199, 212, 227, 0.5) !important;
  opacity: 1;
  transform: rotate(0deg);
  box-shadow: 0 2.75em 4.5em rgba(0, 0, 0, 0.2);
}

.flower-container .part:nth-child(2) {
  height: 10em;
  width: 10em;
  margin: -10em 0 0;
  border-radius: 100% 0;
  background: rgba(199, 212, 227, 0.5);
  opacity: 0.6;
  transform-origin: 0 100% 0;
  background-color: rgba(199, 212, 227, 0.5) !important;
  opacity: 1;
  transform: rotate(90deg);
  box-shadow: 2.75em 0 4.5em rgba(0, 0, 0, 0.2);
}

.flower-container .part:nth-child(3) {
  height: 10em;
  width: 10em;
  margin: -10em 0 0;
  border-radius: 100% 0;
  background: rgba(199, 212, 227, 0.5);
  opacity: 0.6;
  transform-origin: 0 100% 0;
  background-color: rgba(199, 212, 227, 0.5) !important;
  opacity: 1;
  transform: rotate(180deg);
  box-shadow: 0 -2.75em 4.5em rgba(0, 0, 0, 0.2);
}

.flower-container .part:nth-child(4) {
  height: 10em;
  width: 10em;
  margin: -10em 0 0;
  border-radius: 100% 0;
  background: rgba(199, 212, 227, 0.5);
  opacity: 0.6;
  transform-origin: 0 100% 0;
  background-color: rgba(199, 212, 227, 0.5) !important;
  opacity: 1;
  transform: rotate(270deg);
  box-shadow: -2.75em 0 4.5em rgba(0, 0, 0, 0.2);
}

.flower-container .part:nth-child(5) {
  background: rgba(121, 103, 158, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  height: 6em;
  width: 6em;
  opacity: 0.7;
  border-radius: 100% 0;
  margin-top: -6em;
  margin-left: 0em;
  transform-origin: 0 100% 0;
  background-color: rgba(121, 103, 158, 0.5) !important;
  transform: rotate(0deg);
}

.flower-container .part:nth-child(6) {
  background: rgba(121, 103, 158, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  height: 6em;
  width: 6em;
  opacity: 0.7;
  border-radius: 100% 0;
  margin-top: -6em;
  margin-left: 0em;
  transform-origin: 0 100% 0;
  background-color: rgba(121, 103, 158, 0.5) !important;
  transform: rotate(45deg);
}

.flower-container .part:nth-child(7) {
  background: rgba(121, 103, 158, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  height: 6em;
  width: 6em;
  opacity: 0.7;
  border-radius: 100% 0;
  margin-top: -6em;
  margin-left: 0em;
  transform-origin: 0 100% 0;
  background-color: rgba(121, 103, 158, 0.5) !important;
  transform: rotate(90deg);
}

.flower-container .part:nth-child(8) {
  background: rgba(121, 103, 158, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  height: 6em;
  width: 6em;
  opacity: 0.7;
  border-radius: 100% 0;
  margin-top: -6em;
  margin-left: 0em;
  transform-origin: 0 100% 0;
  background-color: rgba(121, 103, 158, 0.5) !important;
  transform: rotate(135deg);
}

.flower-container .part:nth-child(9) {
  background: rgba(121, 103, 158, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  height: 6em;
  width: 6em;
  opacity: 0.7;
  border-radius: 100% 0;
  margin-top: -6em;
  margin-left: 0em;
  transform-origin: 0 100% 0;
  background-color: rgba(121, 103, 158, 0.5) !important;
  transform: rotate(180deg);
}

.flower-container .part:nth-child(10) {
  background: rgba(121, 103, 158, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  height: 6em;
  width: 6em;
  opacity: 0.7;
  border-radius: 100% 0;
  margin-top: -6em;
  margin-left: 0em;
  transform-origin: 0 100% 0;
  background-color: rgba(121, 103, 158, 0.5) !important;
  transform: rotate(225deg);
}

.flower-container .part:nth-child(11) {
  background: rgba(121, 103, 158, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  height: 6em;
  width: 6em;
  opacity: 0.7;
  border-radius: 100% 0;
  margin-top: -6em;
  margin-left: 0em;
  transform-origin: 0 100% 0;
  background-color: rgba(121, 103, 158, 0.5) !important;
  transform: rotate(270deg);
}

.flower-container .part:nth-child(12) {
  background: rgba(121, 103, 158, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  height: 6em;
  width: 6em;
  opacity: 0.7;
  border-radius: 100% 0;
  margin-top: -6em;
  margin-left: 0em;
  transform-origin: 0 100% 0;
  background-color: rgba(121, 103, 158, 0.5) !important;
  transform: rotate(315deg);
}

.cssanimations .flower-container .part {
  opacity: 0;
  animation: linear forwards 2s;
}

.cssanimations .part:nth-child(1) {
  animation-name: show-large-leaf;
  animation-delay: 0.5s;
}

.cssanimations .part:nth-child(2) {
  animation-name: show-large-leaf;
  animation-delay: 1s;
}

.cssanimations .part:nth-child(3) {
  animation-name: show-large-leaf;
  animation-delay: 1.5s;
}

.cssanimations .part:nth-child(4) {
  animation-name: show-large-leaf;
  animation-delay: 2s;
}

.cssanimations .part:nth-child(5) {
  animation-name: show-small-leaf;
  animation-delay: 0.25s;
}

.cssanimations .part:nth-child(6) {
  animation-name: show-small-leaf;
  animation-delay: 0.5s;
}

.cssanimations .part:nth-child(7) {
  animation-name: show-small-leaf;
  animation-delay: 0.75s;
}

.cssanimations .part:nth-child(8) {
  animation-name: show-small-leaf;
  animation-delay: 1s;
}

.cssanimations .part:nth-child(9) {
  animation-name: show-small-leaf;
  animation-delay: 1.25s;
}

.cssanimations .part:nth-child(10) {
  animation-name: show-small-leaf;
  animation-delay: 1.5s;
}

.cssanimations .part:nth-child(11) {
  animation-name: show-small-leaf;
  animation-delay: 1.75s;
}

.cssanimations .part:nth-child(12) {
  animation-name: show-small-leaf;
  animation-delay: 2s;
}

@keyframes show-large-leaf {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes show-small-leaf {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.7;
  }
}

@keyframes show-text {
  0% {
    opacity: 0;
    transform: translateY(1em);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: $mobile-screen) {
  .hero-description {
    br {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .flower-container {
    .flower {
      font-size: 1.8rem !important;
    }
    .unit-wrapper {
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
  .flower-container {
    .unit-wrapper .hero-description {
      font-size: 2.1rem;
      padding: 0px 10px;
    }
  }
}

@media (max-width: 414px) {
  .flower-container {
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
