<template>
  <div id="friendship-links">
    <a
      target="_blank"
      class="friendship-links"
      rel="noopener"
      @click="onFriendshipClick"
      href="/friendlink"
      >🤝友情链接
    </a>
  </div>
</template>

<script>
export default {
  name: 'FriendshipLinks',

  data() {
    return {}
  },

  methods: {
    onFriendshipClick() {
      this.$gtagTracking('friendship-links', 'aside', 'friendship-links')
    },
  },
}
</script>

<style scoped lang="scss">
@import './../../assets/scss/variables.scss';
.friendship-links {
  font-size: $font-large;
  color: $jade;
  font-weight: 500;
  letter-spacing: 1px;
  user-select: none;
  text-transform: uppercase;
  text-shadow: -15px 5px 20px $producthunt;
  transition: all 0.3s ease-out;
}
.friendship-links:hover {
  text-shadow: 0px 6px 20px $producthunt;
}
</style>
