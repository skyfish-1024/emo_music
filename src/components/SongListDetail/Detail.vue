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
            `${new Date(playlist.updateTime || 0).getFullYear()}-${
              new Date(playlist.updateTime || 0).getMonth() + 1
            }-${new Date(playlist.updateTime || 0).getDate()}`
          }}创建
        </div>
      </div>
      <div class="options">
        <div class="item active" @click="playAll">
          <img src="@/assets/static/icon/play_white.png" alt="" />
          播放全部
        </div>
        <div class="item" @click="subscribe">
          <img src="@/assets/static/icon/file.png" alt="" />
          {{ this.playlist.subscribed ? "已" : "" }}收藏({{ subscribedCount }})
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
      <!-- <div class="desc">简介:{{ playlist.description }}</div> -->
      <div class="desc">
        <MuchText :text="'简介:' + (playlist.description || '')"></MuchText>
      </div>
    </div>
    <Popup v-if="onSubscribe">
      <div class="confirm" v-if="showConfirm">
        <div class="icon">
          <i class="el-icon-close" @click="cancel"></i>
        </div>
        <div class="msg">确定不再收藏该歌单？</div>
        <div class="btn" @click="confirm">确定</div>
      </div>
      <div class="popupContent" v-else>
        <Loading v-if="loading"></Loading>
        <div class="result" v-if="showResult">
          <div v-if="success">
            {{ actionType == 1 ? "取消收藏成功!" : "收藏成功!" }}
          </div>
          <div v-else>
            {{ actionType == 1 ? "歌单取消收藏失败" : "歌单收藏失败" }}
          </div>
        </div>
      </div>
    </Popup>
  </div>
</template>
<script>
import Popup from "@/components/common/Popup.vue";
import Loading from "@/components/common/Loading.vue";
import MuchText from "../common/MuchText.vue";
export default {
  components: { Popup, Loading, MuchText },
  props: {
    playlist: {
      type: Object,
      default() {
        return {
          description: "",
          creator: {
            avatarUrl:
              "https://scpic.chinaz.net/files/pic/pic9/201312/apic2754.jpg",
            nickname: "",
            id: 0,
            subscribed: false,
          },
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
      loading: false,
      showConfirm: false,
      showResult: false,
      success: true,
      onSubscribe: false,
      actionType: 1,
    };
  },
  created() {},

  methods: {
    //播放全部
    playAll() {
      this.$store.commit("setPlayListId", this.playlist.id);
      this.$store.commit("setPlayIndex", 0);
    },
    //收藏 1:收藏  2：取消收藏
    async subscribe() {
      let type = this.playlist.subscribed ? 2 : 1;
      this.actionType = this.playlist.subscribed ? 1 : 2;
      if (type == 1) {
        if (!localStorage.getItem("uid")) {
          this.$message({
            message: "请先登录",
            type: "error",
          });
          return;
        }
      }
      this.onSubscribe = true;
      if (type == 2) {
        this.showConfirm = true;
        return;
      }
      await this.makeSubscribe();
    },
    async makeSubscribe() {
      this.loading = true;
      let type = this.playlist.subscribed ? 2 : 1;
      await this.$http
        .get(`/playlist/subscribe?t=${type}&id=${this.playlist.id}`)
        .then((res) => {
          if (res.data.code == 200) {
            this.success = true;
            this.loading = false;
            this.showResult = true;
            setTimeout(() => {
              this.showResult = false;
              this.onSubscribe = false;
            }, 500);
            this.$store.commit("setSubscribeTime", Date.now().valueOf());
            this.$http
              .post(`/playlist/detail?id=${this.playlist.id}`)
              .then((res) => {
                this.$emit("update:playlist", res.data.playlist);
                // console.log(res.data);
              })
              .catch();
          }
        })
        .catch((err) => {
          this.success = false;
          this.loading = false;
          this.showResult = true;
          setTimeout(() => {
            this.showResult = false;
            this.onSubscribe = false;
          }, 500);
        });
    },
    cancel() {
      this.showConfirm = false;
      this.onSubscribe = false;
    },
    async confirm() {
      this.showConfirm = false;
      await this.makeSubscribe();
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  // height: 2.8rem;
  width: 100%;
  display: flex;
  // align-items: center;
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
    margin-left: 0.3rem;
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
      margin: 0.2rem 0;

      .avatar {
        display: flex;
        align-items: center;
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
      justify-content: space-between;
      height: 0.55rem;
      font-size: 0.22rem;
      width: 8rem;
      .item {
        // box-sizing: border-box;
        cursor: pointer;
        padding: 0 0.2rem;
        // margin-right: 0.2rem;
        line-height: 0.5rem;
        height: 0.5rem;
        border: 0.01rem solid #666666;
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
      max-width: 9rem;
      // height: 0.3rem;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
    }
  }
}
.popupContent {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50rem;
  padding: 0.1rem 0.3rem;
  background-color: rgb(133, 128, 128);
  .result {
    text-align: center;
    color: white;
  }
}
.confirm {
  height: 3rem;
  width: 7rem;
  background: white;
  // border: 0.01rem solid #666666;
  box-shadow: 0 0 0.1rem 0.01rem #e5e2e2;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0.2rem 0;
  border-radius: 0.1rem;
  .icon {
    width: 95%;
    text-align: right;
    color: #666666;
  }
  .msg {
    font-size: 0.28rem;
    color: #666666;
  }
  .btn {
    cursor: pointer;
    border: none;
    background-color: #ec4141;
    color: white;
    padding: 0.1rem 0.3rem;
    border-radius: 0.5rem;
  }
}
</style>