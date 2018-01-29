<template>
  <div class="wrapper">
    <div class="container">
      <a v-for="item in contactArray"
        :href="item.path + item.name"
        :title="item.title"
        target="_blank"
        :class="item.class"
        class="social-btn">
        <icon class="icons" :name="item.class"></icon>
      </a>
      <a ga-on="click"  ga-event-action="click" ga-event-category="contact-me"  ga-event-label="contact me button"
        href="javascript:;" class="button" @click="onContactMeClick">Contact Me</a>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg-goo">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
      	</filter>
      </defs>
    </svg>
  </div>
</template>

<script>
import $config from 'config'

export default {
  name: 'Contract',
  data () {
    return {
      contactArray: this.filterEntryInMobile($config.contact)
    }
  },

  methods: {
    onContactMeClick () {
      console.log(this.contactArray)
      this.contactArray.forEach((element, index, array) => {
        ((ele, idx) => {
          setTimeout(() => {
            this.$document.toggleClass(document.getElementsByClassName(ele.class)[0], 'clicked')
          }, idx * 128)
        })(element, index)
      })
    },

    // Filter the specified entry link on the phone(innerWidth <= 768)
    filterEntryInMobile (sourceData) {
      let isMobile = window.innerWidth <= 768
      return sourceData.filter((element) => {
        return isMobile ? !element['notInMobile'] : true
      })
    }
  }
}
</script>

<style lang="scss" media="screen" scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600');
  @import './../assets/scss/mixins.scss';
  #svg-goo{
    height: 0;
  }
  .button{
    position: absolute;
  }
  .container {
    @include flex-box-center;
    height: 21.99vh;
    filter:url('#goo');
  }
  .social-btn{
    opacity: 0;
    position: relative;;
    border-radius: 100%;
    text-align: center;
    vertical-align: middle;
    text-decoration: none;
  }
  .clicked {
    opacity: 1 !important;
    transition: 1s all ease;
    transform: translateY(56px);
  }
  @media only screen and (max-width: 412px) and (max-width: 768px){
    .social-btn{
      margin: 0 -.2em;
    }
  }
  @media only screen and (max-width: 412px) {
    .social-btn{
      margin: 0 -.5em;
    }
  }
</style>
