<template>
  <div class="sub-head">
    <ul class="sub-head-nav" ref="subHeadNav">
      <li class="nav-item is-active">
        <el-button type="text" @click="onThemeTagClick('', 0)">
          {{ $t('all') }}
        </el-button>
      </li>
      <li class="nav-item" v-for="(item, index) in themeList" :key="index">
        <el-button type="text" @click="onThemeTagClick(item.value, index + 1)">
          {{ item.key }}
        </el-button>
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

  components: {
  },

  methods: {
    onThemeTagClick (value = '', index) {
      let activeItem = document.querySelector('.sub-head-nav .is-active')
      this.$document.removeClass(activeItem, 'is-active')

      let subHeadNav = this.$refs['subHeadNav']
      let navItem = subHeadNav.querySelectorAll('.nav-item')
      this.$document.addClass(navItem[index], 'is-active')

      this.$emit('fetch-search', { theme: value })

      const parameters = {behavior: 'smooth', block: 'start', inline: 'start'}
      document.getElementById('nice-links').scrollIntoView(parameters)
    }
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
      .el-button{
        color: $black-grey;
        font-size: 1.5rem;
        font-weight: 500;
      }
    }
    .is-active{
      .el-button{
        color: $brand;
      }
    }
  }
}

@media screen and (max-width: $mobile-screen) {
  .sub-head{
    position: fixed;
    max-width: $mobile-screen;
    background-color: $white;
    z-index: 100;
  }
}
</style>
