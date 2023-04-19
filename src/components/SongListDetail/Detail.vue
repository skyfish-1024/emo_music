<template>
  <div class="detail">
    <div class="left">
      <img :src="playlist.coverImgUrl" alt="" />
    </div>
    <div class="right">
      <div class="name">
        {{ playlist.name }}
      </div>
      <div class="creator">
        <div class="avatar">
          <img :src="playlist.creator.avatarUrl" alt="" />
        </div>
        <div class="artist">
          {{ playlist.creator.nickname }}
        </div>
        <div class="update">
          {{
            `${new Date(playlist.updateTime).getFullYear()}-${
              new Date(playlist.updateTime).getMonth() + 1
            }-${new Date(playlist.updateTime).getDate()}`
          }}创建
        </div>
      </div>
      <div class="options">
        <div class="item active">
          <img src="@/assets/static/icon/play_white.png" alt="" />
          播放全部
        </div>
        <div class="item">
          <img src="@/assets/static/icon/file.png" alt="" />收藏({{
            subscribedCount
          }})
        </div>
        <div class="item">
          <img src="@/assets/static/icon/share.png" alt="" />分享({{
            shareCount
          }})
        </div>

        <div class="item">
          <img src="@/assets/static/icon/download.png" alt="" />下载全部
        </div>
      </div>
      <div class="tags">
        标签：<span>{{ playlist.tags.join("/") }}</span>
      </div>
      <div class="count">
        <div class="countItem">歌曲：{{ playlist.trackCount }}</div>
        <div class="countItem">播放：{{ playCount }}</div>
      </div>
      <div class="desc">简介:{{ playlist.description }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    playlist: {
      type: Object,
      default() {
        return {
          creator: { avatarUrl: "", nickname: "" },
        };
      },
    },
  },
  computed: {
    subscribedCount() {
      if (this.playlist.subscribedCount > 10000) {
        return Math.floor(this.playlist.subscribedCount / 10000) + "万";
      }
      return this.playlist.subscribedCount;
    },
    shareCount() {
      if (this.playlist.shareCount > 10000) {
        return Math.floor(this.playlist.shareCount / 10000) + "万";
      }
      return this.playlist.shareCount;
    },
    playCount() {
      if (this.playlist.playCount > 10000) {
        return Math.floor(this.playlist.playCount / 10000) + "万";
      }
      return this.playlist.playCount;
    },
  },
  data() {
    return {
      //   playlist: {},
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.detail {
  height: 2.8rem;
  display: flex;
  align-items: center;
  font-size: 0.2rem;
  .left {
    height: 2.8rem;
    width: 2.8rem;
    border-radius: 0.1rem;
    overflow: hidden;
    img {
      height: 2.8rem;
      width: 2.8rem;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    margin-left: 0.1rem;
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
    color: #666666;
    .name {
      height: 0.35rem;
      font-size: 0.35rem;
      font-weight: bold;
      color: #333333;
      margin-bottom: 0.15rem;
    }
    .creator {
      height: 0.4rem;
      display: flex;
      align-items: center;
      font-size: 0.2rem;
      margin: 0.15rem 0;

      .avatar {
        img {
          height: 0.4rem;
          width: 0.4rem;
          border-radius: 50%;
        }
      }
      .artist {
        margin: 0 0.1rem;
        color: #507daf;
      }
    }
    .options {
      display: flex;
      align-items: center;
      height: 0.55rem;
      font-size: 0.22rem;
      .item {
        // box-sizing: border-box;
        padding: 0 0.2rem;
        margin-right: 0.2rem;
        line-height: 0.5rem;
        height: 0.5rem;
        border: 1px solid #666666;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        img {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.1rem;
        }
      }
      .active {
        border: none;
        background-color: #ec4141;
        color: white;
      }
    }
    .tags {
      margin: 0.1rem 0;
    }
    .tags span {
      color: #507daf;
    }
    .count {
      display: flex;
      align-items: center;
      margin-bottom: 0.1rem;
      .countItem {
        margin-right: 0.2rem;
      }
    }
    .desc {
      width: 3rem;
      height: 0.3rem;
      overflow: hidden;
    }
  }
}
</style>