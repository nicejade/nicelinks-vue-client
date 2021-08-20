<template>
  <a
    target="_blank"
    class="feedback-link"
    rel="noopener"
    href="https://support.qq.com/products/340357"
    >反馈
  </a>
</template>

<style scoped lang="scss">
@import './../assets/scss/variables.scss';
.feedback-link {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index: 999;
  text-align: center;
  font-weight: 900;
  font-size: inherit;
  font-family: inherit;
  color: $black;
  background-color: $white;
  word-break: keep-all;
  padding: 0.5em 1em;
  outline: none;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
    animation: jelly 0.5s;
  }
}
@keyframes jelly {
  0%,
  100% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
}
</style>
