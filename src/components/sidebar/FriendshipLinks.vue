<template>
  <div id="friendship-links">
    <li class="aside-list-li" v-for="(item, index) in friendshipList">
      <a class="aside-list-a gtag-track" target="_black"
        :href="$util.assembleExternalLink(item.path)"
        :data-action="'friendship-'+item.label"
        data-category="aside"
        :data-label="'friendship-'+item.label">
        {{ item.name }}
      </a>
    </li>
  </div>
</template>

<script>
import $config from 'config'

export default {
  name: 'FriendshipLinks',

  data () {
    return {
      friendshipList: $config.friends
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
