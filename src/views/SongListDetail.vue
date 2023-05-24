<template>
  <div class="songListDetail">
    <div class="top">
      <Detail :playlist.sync="playlist"></Detail>
    </div>

    <div class="nav">
      <div
        class="box"
        :class="currentIndex == 1 ? 'active' : ''"
        @click="navOnClick(1)"
      >
        <div class="title">歌曲列表</div>
        <div class="line"></div>
      </div>
      <div
        class="box"
        :class="currentIndex == 2 ? 'active' : ''"
        @click="navOnClick(2)"
      >
        <div class="title">评论({{ playlist.commentCount }})</div>
        <div class="line"></div>
      </div>
      <div
        class="box"
        :class="currentIndex == 3 ? 'active' : ''"
        @click="navOnClick(3)"
      >
        <div class="title">收藏者</div>
        <div class="line"></div>
      </div>
    </div>
    <div v-if="currentIndex == 1" class="content">
      <Tracks :id="this.id" :total="playlist.trackCount"></Tracks>
    </div>
    <div v-if="currentIndex == 2" class="content">
      <Comment :id="this.id"></Comment>
    </div>
    <div v-if="currentIndex == 3" class="content">
      <Collector :id="this.id"></Collector>
    </div>
  </div>
</template>
  
  <script>
import Detail from "@/components/SongListDetail/Detail.vue";
import Tracks from "@/components/SongListDetail/Tracks/Tracks.vue";
import Comment from "@/components/SongListDetail/Comment/Comment.vue";
import Collector from "@/components/SongListDetail/Collector/Collector.vue";
export default {
  components: { Detail, Tracks, Comment, Collector },
  data() {
    return {
      currentIndex: 1,
      playlist: {
        creator: { avatarUrl: "", nickname: "" },
        tags: [],
      },
      id: 0,
    };
  },

  async created() {
    await this.getId();
    await this.getPlayList();
  },
  methods: {
    navOnClick(index) {
      this.currentIndex = index;
    },

    //获取歌单id
    async getId() {
      if (this.$route.query.id == "0") {
        if (!localStorage.getItem("uid")) {
          this.$message({
            message: "请先登录",
            type: "error",
          });
          this.currentIndex = 1;
          this.$router.push("/recommend");
          return;
        }
        await this.$http
          .post(`/user/playlist?uid=${localStorage.getItem("uid")}`)
          .then((res) => {
            this.id = Number(res.data.playlist[0].id);
          })
          .catch();
        return;
      }
      this.id = Number(this.$route.query.id);
    },
    //获取音乐列表
    async getPlayList() {
      if (this.id == 0) {
        return;
      }
      await this.$http
        .post(`/playlist/detail?id=${this.id}`)
        .then((res) => {
          this.playlist = res.data.playlist;
        })
        .catch();
    },
  },
};
</script>
  <style lang="scss" scoped>
.songListDetail {
  background-color: white;
  height: 8.06rem;
  overflow: auto;
}
.top {
  margin: 0.4rem 0.5rem;
}
.nav {
  display: flex;
  padding: 0.2rem 0;
  background-color: white;
  margin: 0 0.5rem;
  .box {
    cursor: pointer;
    margin-right: 0.3rem;
    font-size: 0.26rem;
    height: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    .title {
      height: 0.4rem;
      line-height: 0.4rem;
    }
    .line {
      height: 0.06rem;
      width: 80%;
      border-radius: 0.06rem;
      margin-top: 0.04rem;
    }
  }
  .active {
    font-weight: bold;
    font-size: 0.32rem;
    .line {
      background-color: #ec4141;
    }
  }
}
.content {
  width: 100%;
  overflow: hidden;
}
.songListDetail::-webkit-scrollbar {
  // display: none;
  width: 0.1rem;
  border-radius: 0.5rem;
}

.songListDetail::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  background-color: #adadaba4;
}
.songListDetail::-webkit-scrollbar-track {
  border-radius: 0.5rem;
  background-color: #fff;
}
.songListDetail::-webkit-scrollbar-button {
  display: none;
}
</style>