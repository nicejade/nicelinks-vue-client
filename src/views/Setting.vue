<template>
  <div class="wrapper" id="setting">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list setting">
          </div>
          <aside-list></aside-list>
        </div>
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
  },
  locales: {
    en: {
    },
    zh: {
    }
  }
}
</script>
