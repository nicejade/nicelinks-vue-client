<template>
  <div class="wrapper">
    <div class="container">
      <a href="javascript:;" class="button" @click="onContactMeClick">Contact Me</a>
      <a v-for="item in contactArray"
        :href="item.path + item.name"
        :title="item.title"
        target="_blank"
        :class="item.class"
        class="social-btn">
        <icon class="icons" :name="item.class">item.class</icon>
      </a>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
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
import contactConfig from 'config/contactConfig'
import { $document } from 'helper'

export default {
  name: 'contract',
  data () {
    return {
      contactArray: contactConfig
    }
  },

  methods: {
    onContactMeClick () {
      this.contactArray.forEach((element, index, array) => {
        ((ele, idx) => {
          setTimeout(() => {
            $document.toggleClass(document.getElementsByClassName(ele.class)[0], 'clicked')
          }, idx * 256)
        })(element, index)
      })
    }
  }
}
</script>

<style lang="scss" media="screen">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600');
  @import './../assets/scss/mixins.scss';
  .container {
    display:flex;
    justify-content: center;
    align-items: center;
    height: 18vh;
    filter:url('#goo');
  }
  .button{
    // @include absolute-center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 40px;
    background: linear-gradient(45deg, #B388EB, #8093F1);
    border-radius: 20px;
    color: #FFF;
    font-size: 20px;
    letter-spacing: 1px;
    font-weight: 200;
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
    transition: .6s all ease;
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
