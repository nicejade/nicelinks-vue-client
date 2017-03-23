<template>
<header class="header">
  <nav class="nav">
    <div class="col-sm-10 col-md-8 col-lg-7">
      <div class="header-logo">
        <h1><a  class="header-logo-a" href="/">Nice Links</a></h1>
      </div>
    </div>
  </nav>
</header>
</template>

<script>
export default {
  name: 'HeaderNav',
  data () {
    return {
      linksArray: []
    }
  }
}
</script>

<style media="screen" lang="scss">
@import "./../assets/scss/variables.scss";
@import "./../assets/scss/mixins.scss";

.header{
  @include height-center($header-height);
  .header-logo{
    .header-logo-a{
      @include height-center($header-height);
      color: #333;
    }
  }
}
</style>
