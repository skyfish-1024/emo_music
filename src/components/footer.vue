<template>
  <div class="footer">
    <div class="left">
      <div class="pic">
        <img :src="song.pic" alt="" />
      </div>
      <div class="box">
        <div class="nameBox">
          <div class="name">
            {{ song.name }}
          </div>
          <img
            v-if="song.isLiked"
            src="@/assets/static/icon/love_red.png"
            alt=""
          />
          <img
            v-else
            src="@/assets/static/icon/love_gray.png"
            alt=""
            @click="front"
          />
        </div>
        <div class="artist">
          {{ song.artist }}
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="controller">
        <img
          class="mini"
          src="@/assets/static/icon/play_left.png"
          alt=""
          @click="front"
        />
        <div class="play">
          <img
            v-if="paused"
            src="@/assets/static/icon/play_black.png"
            alt=""
            @click="play"
          />
          <img
            v-else
            src="@/assets/static/icon/paused.png"
            alt=""
            @click="play"
          />
        </div>

        <img
          class="mini"
          src="@/assets/static/icon/play_right.png"
          alt=""
          @click="next"
        />
      </div>
      <div class="process">
        <audio :src="songUrl" id="music" style="display: none"></audio>
        <div class="time">
          {{ current }}
        </div>
        <el-progress
          :percentage="percentage"
          color="red"
          :show-text="false"
        ></el-progress>
        <div class="time">
          {{ end }}
        </div>
      </div>
    </div>
    <div class="right">
      <img src="@/assets/static/img/play_right.png" alt="" />
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      playlist: [],
      song: {
        name: "",
        pic: "https://scpic.chinaz.net/files/pic/pic9/201312/apic2754.jpg",
        artist: "",
        isLiked: false,
      },
      songUrl: "",
      // currentIndex: 0,
      time: 0,
      currentTime: 0,
      paused: true,
      percentage: 0,
      timer: 0,
    };
  },
  computed: {
    playlistId() {
      return this.$store.getters.getPlaylistId;
    },
    currentIndex() {
      return this.$store.getters.getPlayIndex;
    },
    current() {
      let current = Math.ceil(this.currentTime);
      let minute = Math.floor(current / 60);
      let second = current % 60;
      if (second < 10) {
        second = "0" + second;
      }
      return minute + ":" + second;
    },
    end() {
      let end = Math.ceil(this.time / 1000);
      let minute = Math.floor(end / 60);
      let second = end % 60;
      if (second < 10) {
        second = "0" + second;
      }
      return minute + ":" + second;
    },
  },
  async created() {
    await this.getPlaylist();
    await this.getSongUrl();
    await this.getSong();
  },
  watch: {
    playlistId: {
      async handler(newVal, oldVal) {
        await this.getPlaylist();
        await this.getSongUrl();
        await this.getSong();
      },
    },
    currentIndex: {
      async handler(newVal, oldVal) {
        await this.playClick();
      },
    },
  },

  methods: {
    //获取播放列表
    async getPlaylist() {
      if (this.playlistId == 0) {
        return;
      }
      await this.$http
        .post(`/playlist/track/all?id=${this.playlistId}`)
        .then(async (res) => {
          this.playlist = res.data.songs;
          // this.currentIndex = 0;
          this.$store.commit("setPlayIndex", this.currentIndex);
          await this.getSongUrl();
        });
    },
    //获取播放地址
    async getSongUrl() {
      this.percentage = 0;
      this.currentTime = 0;
      let paused = this.paused;
      if (this.playlist.length == 0) {
        return;
      }

      await this.$http
        .post(`/song/url?id=${this.playlist[this.currentIndex].id}`)
        .then((res) => {
          this.songUrl = res.data.data[0].url;
          this.time = res.data.data[0].time;
        });
      if (!paused) {
        this.paused = !paused;
        this.play();
      }
    },
    //获取歌曲信息
    async getSong() {
      if (this.playlist.length == 0) {
        return;
      }

      await this.$http
        .post(`/song/detail?ids=${this.playlist[this.currentIndex].id}`)
        .then((res) => {
          this.song.pic = res.data.songs[0].al.picUrl;
          this.song.name = res.data.songs[0].name;
          this.song.artist = res.data.songs[0].al.name;
          // this.song.isLiked = res.data.songs[0].al.picUrl;
          this.$store.commit("setPlaySongId", res.data.songs[0].id);
        });
    },
    //播放/暂停
    play() {
      let music = document.querySelector("#music");
      music.pause();
      if (!this.songUrl) {
        return;
      }
      if (this.paused) {
        music
          .play()
          .then((res) => {
            this.getPercentage();
          })
          .catch((err) => err);
      } else {
        clearInterval(this.timer);
        music.pause();
      }
      this.paused = !this.paused;
    },
    //获取当前播放进度
    async getPercentage() {
      let music = document.querySelector("#music");
      this.currentTime = music.currentTime;
      let percentage = ((music.currentTime * 1000) / this.time) * 100;
      if (percentage >= 99.8) {
        this.percentage = 100;
        await this.next();
      }
      this.percentage = percentage;
      this.timer = setTimeout(this.getPercentage, 100);
    },
    //下一首
    async next() {
      clearTimeout(this.timer);
      if (this.currentIndex == this.playlist.length - 1) {
        // this.currentIndex = 0;
        this.$store.commit("setPlayIndex", 0);
      } else {
        // this.currentIndex = this.currentIndex + 1;
        this.$store.commit("setPlayIndex", this.currentIndex + 1);
      }
      await this.getSong();
      await this.getSongUrl();
    },
    //前一首
    async front() {
      clearTimeout(this.timer);
      if (this.currentIndex == 0) {
        // this.currentIndex = this.playlist.length - 1;
        this.$store.commit("setPlayIndex", this.playlist.length - 11);
      } else {
        // this.currentIndex = this.currentIndex - 1;
        this.$store.commit("setPlayIndex", this.currentIndex - 1);
      }
      await this.getSong();
      await this.getSongUrl();
    },
    //单点切换歌曲触发函数
    async playClick() {
      clearTimeout(this.timer);
      if (this.currentIndex >= this.playlist.length) {
        return;
      }
      await this.getSong();
      await this.getSongUrl();
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.footer {
  width: 100%;
  height: 100%;
  border-top: 1px #e0e0e0 solid;
  background-color: white;
  box-sizing: border-box;
  padding: 0 0.15rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .let,
  .right {
    min-width: 3rem;
    max-width: 3rem;
  }
  .left {
    display: flex;
    align-items: center;
    flex: 1;
    .pic {
      height: 0.75rem;
      width: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 100%;
        width: 100%;
        border-radius: 0.1rem;
      }
    }
    .box {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 0.1rem;
      color: #333346;
      .nameBox {
        font-size: 0.25rem;
        display: flex;
        align-items: center;
        .name {
          font-size: 0.25rem;
          max-width: 3rem;
          // width: 3rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        img {
          height: 0.25rem;
          width: 0.25rem;
          margin-left: 0.1rem;
        }
      }
      .artist {
        font-size: 0.25rem;
        max-width: 3rem;
        // width: 3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .middle {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: space-between;
    .controller {
      width: 3.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.1rem;
      .play {
        height: 0.5rem;
        width: 0.5rem;
        background-color: f5f5f5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        img {
          cursor: pointer;
          height: 0.5rem;
          width: 0.5rem;
        }
      }
      .mini {
        cursor: pointer;
        width: 0.25rem;
        height: 0.25rem;
      }
    }
    .process {
      display: flex;
      align-items: center;
      .time {
        width: 0.5rem;
        font-size: 0.15rem;
        color: #999999;
        margin: 0.1rem;
      }
    }
    .process::v-deep .el-progress-bar {
      width: 5.3rem;
    }
  }
  .right {
    flex: 1;
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    img {
      height: 0.4rem;
    }
  }
}
</style>