<template>
  <div id="friendship-links">
    <li class="aside-list-li" v-for="(item, index) in friendshipList">
      <a class="aside-list-a" :href="item.path" target="_black">{{ item.name }}</a>
    </li>
  </div>
</template>

<script>
export default {
  name: 'FriendshipLinks',
  data () {
    return {
      friendshipList: [
        {
          name: '晚晴幽草轩',
          path: 'http://jeffjade.com'
        },
        {
          name: '天意人间舫',
          path: 'http://nicejade.github.io/'
        }
      ]
    }
  },

  components: {
  },

  mounted () {
  },

  methods: {
  }
}
</script>
