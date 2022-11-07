<template>
  <div class="toggle-wrapper">
    <div class="gg-sun btn" @click="onThemeToggle" v-if="isDarkMode"></div>
    <div class="gg-moon btn" @click="onThemeToggle" v-else></div>
  </div>
</template>

<script>
const DARK = 'dark'
const THEME_MODE = 'theme-mode'

export default {
  data() {
    return {
      isDarkMode: false,
    }
  },

  watch: {
    isDarkMode(val) {
      document.body.setAttribute('theme', val ? DARK : 'light')
    },
  },

  mounted() {
    const mode = window.localStorage.getItem(THEME_MODE)
    this.isDarkMode = mode === DARK
  },

  methods: {
    onThemeToggle() {
      this.isDarkMode = !this.isDarkMode
      const mode = this.isDarkMode ? 'dark' : 'light'
      window.localStorage.setItem(THEME_MODE, mode)
      this.$gtagTracking('theme-mode', 'header', mode)
    },
  },
}
</script>

<style lang="scss">
@import './../assets/scss/mixins.scss';

.toggle-wrapper {
  width: 3rem;
  height: 100%;
  @include flex-box-center(row, center, center);
  float: left;
  .btn {
    cursor: pointer;
  }

  // moon
  .gg-moon,
  .gg-moon::after {
    display: block;
    box-sizing: border-box;
    border-radius: 50%;
  }

  .gg-moon {
    overflow: hidden;
    position: relative;
    transform: rotate(-135deg) scale(var(--ggs, 1));
    width: 20px;
    height: 20px;
    border: 2px solid #17223b;
    border-bottom-color: transparent;
  }

  .gg-moon::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 18px;
    border: 2px solid transparent;
    box-shadow: 0 0 0 2px;
    top: 8px;
    left: 2px;
  }

  // sun
  .gg-sun {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 1));
    width: 24px;
    height: 24px;
    background: linear-gradient(to bottom, currentColor 4px, transparent 0) no-repeat 5px -6px/2px 6px,
      linear-gradient(to bottom, currentColor 4px, transparent 0) no-repeat 5px 14px/2px 6px,
      linear-gradient(to bottom, currentColor 4px, transparent 0) no-repeat -8px 5px/6px 2px,
      linear-gradient(to bottom, currentColor 4px, transparent 0) no-repeat 14px 5px/6px 2px;
    border-radius: 100px;
    box-shadow: inset 0 0 0 2px;
    border: 6px solid transparent;
  }

  .gg-sun::after,
  .gg-sun::before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 24px;
    height: 2px;
    border-right: 4px solid;
    border-left: 4px solid;
    left: -6px;
    top: 5px;
  }

  .gg-sun::before {
    transform: rotate(-45deg);
  }

  .gg-sun::after {
    transform: rotate(45deg);
  }
}
</style>
