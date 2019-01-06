<template>
  <div class="sub-head">
    <ul class="sub-head-nav" ref="subHeadNav">
      <li :class="makeClassName(null)">
        <a href="/explore/all"
          class="gtag-track theme-link"
          data-action="explore-all"
          data-category="sub-head"
          data-label="explore-all">
          {{ $t('all') }}
        </a>
      </li>
      <li v-for="(item, index) in themeList" :key="index" :class="makeClassName(item)" >
        <router-link :to="getLinkPathByThemeVal(item.value)"
          class="gtag-track theme-link"
          :data-action="'explore-'+item.value"
          data-category="sub-head"
          :data-label="'explore-'+item.value">
          {{ item.key }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import partsMixin from 'mixins/partsMixin.js'

export default {
  name: 'SubHead',

  mixins: [partsMixin],

  data () {
    return {
    }
  },

  props: {
    themeList: {
      type: [Array],
      default: () => []
    }
  },

  watch: {
  },

  components: {
  },

  methods: {
    isCurrentThemeVal (value) {
      const cTheme = this.$route.params.theme || ''
      return cTheme.toUpperCase() === value.toUpperCase()
    },

    makeClassName (item) {
      if (!item) {
        const cTheme = this.$route.params.theme
        return !cTheme ? 'nav-item is-active' : 'nav-item'
      }
      const isTheTheme = this.isCurrentThemeVal(item.value)
      return isTheTheme ? 'nav-item is-active' : 'nav-item'
    },

    getLinkPathByThemeVal (value) {
      return value ? `/theme/${value.toLocaleLowerCase()}` : '/explore/all'
    }

    /* ------------变更 SubHead ”按钮“触发后展示方案(18-07-01)------------ */
    /*
    onThemeTagClick (value = '') {
      if (value === '') {
        return this.$router.push('/explore/all')
      }
      this.$switchRouteByTheme(value || '')

      // let activeItem = document.querySelector('.sub-head-nav .is-active')
      // this.$document.removeClass(activeItem, 'is-active')
      // let subHeadNav = this.$refs['subHeadNav']
      // let navItem = subHeadNav.querySelectorAll('.nav-item')
      // this.$document.addClass(navItem[index], 'is-active')

      // this.$emit('fetch-search', { theme: value })

      // const parameters = {behavior: 'smooth', block: 'start', inline: 'start'}
      // document.getElementById('nice-links').scrollIntoView(parameters)
    } */
  },

  locales: {
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.sub-head{
  width: 100%;
  max-width: 960px;
  overflow: auto;
  text-align: left;
  border-bottom: solid 1px #d1d5da;
  padding: .3rem;
  z-index: 100;
  background-color: $white;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  transition: all .2s;
  transform: translateZ(0);
  &::-webkit-scrollbar {
    background: transparent;
    height: 0px;
  }
  &:hover::-webkit-scrollbar {
    background: transparent;
    height: 0px;
  }
  .sub-head-nav{
    width: 100%;
    display: flex;
    margin: 0;
    .nav-item{
      margin: auto 0.88rem;
      .theme-link{
        display: inline-block;
        min-width: 3rem;
        padding: 1rem 0;
        color: $black-grey;
        font-size: 1.5rem;
        font-weight: 500;
      }
    }
    .is-active{
      .theme-link{
        color: $brand;
      }
    }
  }
}

@media screen and (max-width: $mobile-screen) {
  .sub-head{
    position: fixed;
    top: 110px;
    max-width: $mobile-screen;
    background-color: $white;
    z-index: 100;
  }
}
</style>
