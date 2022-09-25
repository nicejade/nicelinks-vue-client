<template functional>
  <div id="jade-gg-position">
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
  </div>
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
