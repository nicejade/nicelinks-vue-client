<template>
  <div class="nice-link">
    <h2 class="page-second-title">
      <strong>最新应用推荐</strong>
    </h2>
    <a :href="link" class="link-card" target="_blank" :aria-label="title" rel="noopener noreferrer">
      <img :src="imageSrc" alt="Link Image" class="link-image" />
      <h3 class="link-title">{{ title }}</h3>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "逍遥自在轩 | 个人主页",
      required: true
    },
    link: {
      type: String,
      default: "https://www.niceshare.site/",
      required: true
    },
    imageSrc: {
      type: String,
      default: "https://www.niceshare.site/mockup.png",
      required: true
    }
  }
}
</script>

<style scoped>
.nice-link {
  padding: 0 2rem;
  margin-bottom: 2rem;
}

.link-card {
  position: relative;
  display: block;
  background-color: #fff;
  border: 1px solid #ccc;
  text-decoration: none;
  color: inherit;
  border-radius: 20px;
  margin: 2rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.link-card:hover {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.link-image {
  width: 100%;
  height: auto;
  border-radius: 20px;
  margin-bottom: -2px;
  aspect-ratio: 1200 / 676;
}

.link-title {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  font-weight: bold;
  background-color: #454545;
  border-radius: 4px;
  color: #ffffff;
  padding: 4px;
  font-size: 14px;
}
</style>