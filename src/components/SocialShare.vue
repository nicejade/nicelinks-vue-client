<template>
  <social-sharing
      :url="shareUrl"
      :title="shareContent"
      :description="shareContent"
      :quote="shareContent"
      :hashtags="hashtags"
      twitter-user="website"
      inline-template>
    <div class="social-share">
      <network network="weibo">
        <icon class="icons" name="weibo"></icon>
      </network>
      <network network="email">
        <icon class="icons" name="email"></icon>
      </network>
      <network network="facebook">
        <icon class="icons" name="facebook"></icon>
      </network>
      <network network="twitter">
        <icon class="icons" name="twitter"></icon>
      </network>
      <network network="pinterest">
        <icon class="icons" name="pinterest"></icon>
      </network>
    </div>
  </social-sharing>
</template>

<script>
export default {
  name: 'SocialShare',

  data () {
    return {
    }
  },

  props: {
    shareUrl: {
      type: String,
      default: 'https://nicelinks.site'
    },
    shareContent: {
      type: String,
      default: '倾城之链'
    },
    hashtags: {
      type: String,
      default: ''
    }
  },

  watch: {
  },

  components: {
  },

  created () {
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style type="text/css" lang="scss">
.social-share{
  padding-top: 1.2rem;
}
</style>

