<template>
  <div class="wrapper" id="setting">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
        </div>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'setting',
  components: {
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    back () {
      this.$router.push('/')
    }
  },
  locales: {
    en: {
    },
    zh: {
    }
  }
}
</script>
