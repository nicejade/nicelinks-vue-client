<template functional>
  <aside class="sidebar-aside" id="jade-gg-position">
    <h2 class="aside-widget-title" style="margin-top: 0;">广而告之</h2>
    <el-carousel
      trigger="click"
      class="jade-gg-body"
      indicator-position="outside"
      :interval="5000"
      height="255px"
    >
      <el-carousel-item v-for="item in props.advertsList || []" :key="item.item">
        <a class="link" :href="item.path" target="_blank" rel="noopener">
          <img class="img" :src="item.image" :alt="item.alt" />
        </a>
      </el-carousel-item>
    </el-carousel>
  </aside>
</template>

<style lang="scss" scoped>
#jade-gg-position {
  .jade-gg-body {
    width: 100%;
    overflow: hidden;

    .link {
      width: 100%;
      display: flex;
      justify-content: center;

      .img {
        display: block;
        width: 25rem;
        height: auto;
        aspect-ratio: 1 / 1;
      }
    }
  }
}
</style>
