<template>
  <div class="nice-comment">
    <h2 class="page-second-title">
      <strong>精彩绝伦的评论</strong>
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
        wordLimit: [10, 600],
        requiredMeta: ['nick', 'mail'],
      })
    })
  },
}
</script>

<style lang="scss">
.nice-comment {
  padding: 0 20px;
}

#waline {
  width: 100%;
  min-width: 30rem;
  padding: 15px 0;
  aspect-ratio: 3 / 2;

  .wl-panel {
    font-size: 1.4rem;
    .wl-header {
      label,
      input {
        font-size: 1.4rem;
      }
    }
    .wl-editor {
      font-size: 1.6rem;
    }
    .wl-actions {
      flex: 1;
    }
    .wl-preview {
      h4 {
        font-size: 1.6rem;
      }
    }
  }

  .wl-content {
    font-size: 1.4rem;
    h3 {
      font-size: 1.6rem;
      font-weight: 500;
    }
    p {
      margin-top: 1rem;
      font-size: 1.6rem;
    }
  }

  .wl-btn,
  .wl-text-number,
  .wl-nick,
  .wl-time {
    font-size: 1.2rem;
  }

  .wl-sort li {
    font-size: 1.4rem;
  }

  .wl-count,
  .wl-empty {
    font-size: 1.6rem;
  }

  .wl-action:nth-child(1),
  .wl-action:nth-child(3) {
    display: none;
  }

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
