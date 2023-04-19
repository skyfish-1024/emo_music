<template>
  <div class="aside">
    <div class="box" :class="current == 1 ? 'active' : ''" @click="toRecommend">
      发现音乐
    </div>
    <div
      class="box"
      :class="current == 2 ? 'active' : ''"
      @click="toSongListDetail(likedSongsId, 2)"
    >
      我喜欢的音乐
    </div>
    <div class="collection">
      <div class="collectSongs" @click="isShowList">
        收藏的歌单<Triangle :isOn="!isOn"></Triangle>
      </div>
      <div class="list" v-if="isOn">
        <div
          class="item"
          :class="current == index + 3 ? 'active' : ''"
          v-for="(item, index) in playlist"
          :key="item.id"
          @click="toSongListDetail(item.id, index + 3)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
    <script>
import Triangle from "./Triangle.vue";
export default {
  components: { Triangle },
  data() {
    return {
      isOn: false,
      current: 1,
      likedSongsId: 0,
      playlist: [],
    };
  },
  created() {
    this.getPlaylist();
  },
  methods: {
    isShowList() {
      this.isOn = !this.isOn;
    },
    //发现音乐
    toRecommend() {
      this.current = 1;
      this.$router.push("recommend");
    },
    //跳转歌单详情
    async toSongListDetail(id, index) {
      this.current = index;
      this.$router.push({
        path: "songListDetail",
        query: {
          id: id,
        },
      });
    },
    //获取用户歌单
    async getPlaylist() {
      this.current = 2;
      await this.$http
        .post(`/user/playlist?uid=${localStorage.getItem("uid")}`, {
          cookie: localStorage.getItem("cookie"),
        })
        .then((res) => {
          this.likedSongsId = res.data.playlist[0].id;
          this.playlist = res.data.playlist.splice(1);
        });
    },
  },
};
</script>
    
    <style lang="scss" scoped>
.aside {
  width: 100%;
  height: 100%;
  border-right: 1px #e0e0e0 solid;
  background: white;
  box-sizing: border-box;
  padding: 0.18rem;
  .box {
    cursor: pointer;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    padding-left: 0.1rem;
    font-size: 0.24rem;
    color: #474747;
    height: 0.55rem;
    width: 100%;
    line-height: 0.55rem;
  }
  .active {
    background-color: #f6f6f7;
    font-weight: bold;
  }
}
.collection {
  font-size: 0.24rem;
  .collectSongs {
    color: #cccccc;
    padding-left: 0.1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .list {
    .item {
      cursor: pointer;
      padding: 0.1rem 0;
      padding-left: 0.1rem;
      color: #313131;
      font-weight: 100;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .active {
      background-color: #f6f6f7;
    }
  }
}
</style>