<template>
  <div class="nice-comment">
    <h2 class="page-second-title">
      <strong>{{ $t('niceComment') }}</strong>
    </h2>
    <div id="waline"></div>
  </div>
</template>

<script>
require('@waline/client/dist/waline')
import '@waline/client/dist/waline.css'

export default {
  name: 'Waline',

  mounted() {
    // Add Waline Comment Functions @2022.01.24
    this.$nextTick(() => {
      Waline.init({
        el: '#waline',
        serverURL: 'https://comment.nicelinks.site/',
        copyright: false,
        wordLimit: [10, 500],
        requiredMeta: ['nick', 'mail'],
      })
    })
  },
}
</script>

<style lang="scss" scoped>
.nice-comment {
  padding: 0 20px;
}

#waline {
  width: 100%;
  min-width: 30rem;
  padding: 15px 0;
  aspect-ratio: 2 / 1;

  .vbtn {
    display: none;
  }

  .primary {
    display: block;
  }

  .vcards {
    ul {
      padding-left: 1rem;

      li {
        list-style: circle;
      }
    }
  }

  .v {
    padding: 0 20px;
  }

  .v[data-class='v'] {
    blockquote {
      border-left-width: 4px;

      p {
        color: #9393aa;
      }
    }

    .vcomment {
      display: block;
    }

    .vpanel {
      margin: 0.5em auto;
    }
  }
}
</style>