<template functional>
  <div class="heart-wrap">
    <svg
      v-if="props.isDown"
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-heart-broken"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#ff2825"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
      <path d="M12 7l-2 4l4 3l-2 4v3" />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-heart-broken"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#9393aa"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
      <path d="M12 7l-2 4l4 3l-2 4v3" />
    </svg>
  </div>
</template>
