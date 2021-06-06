<template>
  <div class="embed-upvote">
    <a
      href="https://nicelinks.site/redirect?url=https://creatorsdaily.com/f4d0e23e-4b50-41f4-b03e-9ac99be28944?utm_source=nicelinks.site&pid=vote"
      target="_blank"
      style="border: 1px solid #de7d77; border-radius: 12px;"
    >
      <img
        src="https://creatorsdaily.com/api/f4d0e23e-4b50-41f4-b03e-9ac99be28944/vote.svg?theme=light"
      />
    </a>
    <a
      href="https://nicelinks.site/redirect?url=https://www.producthunt.com/posts/nice-links?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-nice-links"
      target="_blank"
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=237464&theme=light"
        onerror="javascript:this.src='https://lovejade.oss-cn-shenzhen.aliyuncs.com/product-hunt.png';"
        alt="NICE LINKS - Is designed to gather around the world's excellent websites. | Product Hunt Embed"
        style="width: 250px; height: 54px;"
        width="250px"
        height="54px"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'EmbedUpvote',

  data() {
    return {}
  },

  components: {},

  created() {},

  methods: {},
}
</script>

<style lang="scss">
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/mixins.scss';

.embed-upvote {
  @include flex-box-center(row, space-between, center);
  width: 600px;
  margin: auto;
  margin-top: 2.5em;
}
</style>
