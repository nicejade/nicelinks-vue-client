<template>
  <div class="wrapper homepage">
    <div class="panel-default" v-loading="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }">{{ $t('firstPage') }}</el-breadcrumb-item>
                  <el-breadcrumb-item :to="'/member/' + currentUser">主页</el-breadcrumb-item>
                  <el-breadcrumb-item>详情</el-breadcrumb-item>
                </el-breadcrumb>
              </div>

              <div class="user-profile-nav">
                <router-link v-if="isShowBaseInfo" key="base'" class="nav-item" @click.native="onMemberClick('base')"
                  :to="'/member/' + currentUser">
                  {{ $t('baseInfo') }}
                </router-link>
                <router-link key="posts" class="nav-item" @click.native="onMemberClick('posts')"
                  :to="'/member/' + currentUser + '/posts'">
                  {{ isUserSelf ? $t('myPublish') : $t('hisPublish') }}
                </router-link>
                <router-link key="likes" @click.native="onMemberClick('likes')" class="nav-item"
                  :to="'/member/' + currentUser + '/likes'">
                  {{ isUserSelf ? $t('myLikes') : $t('hisLikes') }}
                </router-link>
                <router-link key="dislikes" @click.native="onMemberClick('dislikes')" class="nav-item"
                  :to="'/member/' + currentUser + '/dislikes'">
                  {{ isUserSelf ? $t('myDislikes') : $t('hisDislikes') }}
                </router-link>
              </div>

              <el-card class="box-card base-info" v-if="isShowBaseInfo">
                <div slot="header" class="clearfix">
                  <img class="avatar" :src="userAvatar" :alt="$t('niceLinksStr')" />
                  <div class="info">
                    <p class="username">{{ mUserInfo.username }}</p>
                    <p class="nickname" v-if="mUserInfo.profile.nickname">
                      {{ mUserInfo.profile.nickname }}
                    </p>
                    <span class="gray" v-html="nicerNumText"></span>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label">{{ $t('personalWebsite') }}:</label>
                  <p class="text-padding gray" v-if="!mUserInfo.profile.website">
                    {{ $t('noFill') }}
                  </p>
                  <a v-else :href="mUserInfo.profile.website" target="_blank" rel="noopener">
                    {{ mUserInfo.profile.website }}
                  </a>
                </div>
                <div class="form-group">
                  <label class="control-label">{{ $t('profile') }}:</label>
                  <preview-md :value="mUserInfo.profile.description || $t('noFill')"> </preview-md>
                </div>
              </el-card>
              <links-list v-else :pdata="myLinksList" :is-abstract="true" :is-loading="isLoading">
              </links-list>
            </el-card>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PreviewMd from 'components/markdown/PreviewMd.vue'

export default {
  name: 'HomePage',

  components: {
    PreviewMd,
  },

  data() {
    return {
      isLoading: false,
      isShowBaseInfo: false,
      currentUser: null,
      currentTab: null,
      myLinksList: [],
      mUserInfo: {
        profile: {},
      },
      nicerNumText: '',
      tabApiObj: {
        posts: 'getMyPublish',
        likes: 'getMyLikes',
        dislikes: 'getMyDislikes',
      },
      tabDataObj: {
        posts: null,
        likes: null,
        dislikes: null,
      },
    }
  },

  computed: {
    isUserSelf() {
      return this.userInfo && this.userInfo.username === this.$route.params.id
    },
    userAvatar() {
      if (this.mUserInfo) {
        let defaultAvatar = 'https://image.lovejade.cn/default-avatar.jpeg'
        let userAvatar = this.mUserInfo.profile && this.mUserInfo.profile.avatar
        return userAvatar ? `/api/avatar/${userAvatar}` : defaultAvatar
      }
    },
  },

  created() {
    this.currentUser = this.$route.params.id
    this.currentTab = this.$route.params.tab
    this.isShowBaseInfo = !this.currentTab
    if (this.isShowBaseInfo) {
      this.getUserInfoByUsername()
    } else {
      this.requestApiUpdateList(this.currentTab)
    }
  },

  mounted() {
    this.$setPageTitle(this.$t('homepage'))
  },

  methods: {
    getUserInfoByUsername() {
      this.isLoading = true
      let params = { username: this.$route.params.id }
      this.$apis
        .getUserInfo(params)
        .then((result) => {
          this.mUserInfo = result
          this.updateDetailInfo()
        })
        .catch((error) => {
          this.$message.error(`${error}`)
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    updateDetailInfo() {
      let cTemp = this.$t('nicerNumText').replace('@X', this.mUserInfo.number || 1)
      let joinTime = this.mUserInfo.activeTime || this.mUserInfo.createdAt
      joinTime = new Date(joinTime).Format('yyyy-MM-dd hh:mm:ss')
      this.nicerNumText = cTemp.replace('@TIME', joinTime)
    },

    requestApiUpdateList(index) {
      if (this.tabDataObj[index]) {
        this.myLinksList = Object.freeze(this.tabDataObj[index])
        return
      }

      let currentApi = this.tabApiObj[index]
      let params = {
        username: this.$route.params.id,
        userId: (this.userInfo && this.userInfo._id) || '',
      }

      this.isLoading = true
      this.$apis[currentApi](params)
        .then((result) => {
          this.myLinksList = this.tabDataObj[index] = Object.freeze(result)
          this.isLoading = false
        })
        .catch((error) => {
          this.$message.error(`${error}`)
          this.isLoading = true
        })
    },

    onMemberClick(action) {
      this.$gtagTracking(action, 'member')
    },
  }
}
</script>

<style lang="scss">
@import './../assets/scss/variables.scss';
@import './../assets/scss/mixins.scss';

#app .homepage {
  .main-container {
    .el-card__header {
      padding: 15px;
    }

    .el-tabs {
      padding: 0 15px;
    }

    .el-card__body {
      padding: 0;

      .links-list {
        padding: 0;

        .el-card {
          padding: 15px 0;
        }

        .el-card__body {
          padding: 0 20px;
        }
      }
    }

    .el-tabs__header {
      margin: 0;
    }

    .box-card {
      .form-group {
        @include flex-box-center(row, start, center);

        .control-label {
          text-align: center;
          min-width: 90px;
          padding: 0 15px 0 0;
        }
      }
    }

    .user-profile-nav {
      @include flex-box-center(row, center, center);
      width: 100%;
      height: 6rem;
      border-bottom: 1px solid #ebeef5;

      .nav-item {
        margin: 0 1rem;
        font-size: $font-small;
        color: $link-title;
      }

      .active {
        color: $brand;
        font-weight: 600;
      }
    }

    .base-info {
      padding: 2rem;

      .el-card__header {
        padding: 0px;
      }

      .clearfix {
        @include flex-box-center(row, start, center);
      }

      .avatar {
        float: left;
        border-radius: 50%;
        height: 6rem;
        width: 6rem;
        box-shadow: 0 0 0 2px #fff;
        position: relative;
        margin: 0;
      }

      .info {
        @include flex-box-center(column, space-around, flex-start);
        width: calc(100% - 7rem);
        height: 10rem;
        float: left;
        margin-left: 1rem;
        margin-bottom: 1rem;
        font-size: $font-small;

        .username {
          font-weight: 500;
        }
      }

      .text-padding {
        padding: 10px 0;
      }
    }
  }
}

@media (max-width: 768px) {
  #app .wrapper.homepage {
    .main-container {
      .el-card__body {
        padding: 0;
      }

      .base-info {
        font-size: $font-small;
        padding: 1rem;
      }

      .user-profile-nav {
        .nav-item {
          margin: 0 0.5rem;
        }
      }
    }
  }
}
</style>
