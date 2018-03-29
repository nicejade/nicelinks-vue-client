<template>
  <div id="friendship-links">
    <li class="aside-list-li" v-for="(item, index) in friendshipList">
      <a class="aside-list-a gtag-track" :href="item.path" target="_black"
        :data-action="'friendship-'+item.label" data-category="aside" :data-label="'friendship-'+item.label">
        {{ item.name }}
      </a>
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
          label: 'jeffjade',
          path: 'https://jeffjade.com'
        },
        {
          name: '天意人间舫',
          label: 'nicejade',
          path: 'https://blog.lovejade.cn'
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
