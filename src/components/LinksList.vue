<template>
<div class="links-list">
  <div class="moudle" v-for="(item, index) in pdata">
    <div class="content">
      <div class="meta">
        <span class="item classify" @click="onClassifyClick(item.classify)">{{ classifyList[item.classify]['key'] }}</span>
        <span class="item"> user </span>
        <span class="item">{{ item.created | dateOffset }}</span>
        <span class="tag" v-for="item in queryTagsArr(item.classify, item.tags)" :key="item.value" @click="onTagClick(item.value)">
          {{ item.key }}
        </span>
      </div>
      <h3 class="title">
        <a  class="title-link" :href="item.url_path" target="_blank">{{ item.title }}</a>
      </h3>
      <div class="action-list">
        <div class="action-item" @click="onLikeClick(item)">
          <icon class="icons heart" name="heart"></icon>
          <span class="item-num">{{ item.like }}</span>
        </div>
        <div class="action-item" @click="onDislikeClick(item)">
          <icon class="icons heart" name="dislike"></icon>
          <span class="item-num">{{ item.dislike }}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { $config } from 'config'
import { $apis } from 'helper'

export default {
  name: 'LinksList',
  data () {
    return {
      classifyList: $config.classify,
      tagsList: $config.tags
    }
  },

  props: {
    pdata: {
      type: [Array, Object],
      default: []
    }
  },

  components: {
  },

  methods: {
    dispatchAction (row, action) {
      let params = {
        'fingerprint': this.fingerprint,
        '_id': row._id,
        'action': action
      }
      $apis.dispatchAction(params).then(result => {
        row[action] = result.count
      }).catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
      })
    },

    queryTagsArr (classify, tags) {
      let checkTagsArr = this.tagsList[classify]
      let tagsArr = tags.split(';')
      let resultArr = []
      checkTagsArr.map(obj => {
        tagsArr.map(item => {
          if (item === obj.value) {
            resultArr.push({
              'key': obj.key,
              'value': obj.value
            })
          }
        })
      })
      return resultArr
    },

    onClassifyClick (classify) {
      this.$bus.emit('fetch-search', {
        'classify': classify
      })
    },

    onTagClick (tag) {
    },

    onLikeClick (row) {
      this.dispatchAction(row, 'like')
    },

    onDislikeClick (row) {
      this.dispatchAction(row, 'dislike')
    }
  }
}
</script>

<style media="screen" lang="scss">
@import "./../assets/scss/variables.scss";
@import './../assets/scss/mixins.scss';

.links-list{
  .moudle{
    margin: 10px;
    padding: 1.5rem 2rem;
    text-align: left;
    border-bottom: 1px solid $item-border-color;
    .content{
      margin: 5px;
      .title{
        margin: .4em 0;
        .title-link{
          font-size: 1.6rem;
          font-weight: 600;
          line-height: 1.2;
          text-decoration: none;
          color: $link-title;
          &:hover{
            color: $link-title-hover;
          }
        }
      }
      .meta{
        font-size: 1rem;
        color: $meta-item-color;
        .item{
          cursor: pointer;
          &:after{
            content: "\B7";
            margin: 0 .4em;
          }
        }
        .tag{
          cursor: pointer;
        }
        .tag + .tag{
          &:before{
            margin: 0 .1em;
            content: "/";
          }
        }
        .classify{
          color: $meta-classify-color;
        }
      }
      .action-list{
        display: inline-flex;
        .action-item{
          @include flex-box-center();
          cursor: pointer;
          padding: .2rem .8rem;
          height: 100%;
          text-align: center;
          min-width: 3.6rem;
          border: 1px solid $item-border-color;
          .icons{
            width: 1.6rem;
            height: 1.6rem;
          }
          .item-num{
            margin-left: .2em;
            font-weight: 700;
          }
        }
        .action-item + .action-item{
          border-left: none;
        }
      }
    }
  }
}
</style>
