<template>
  <div class="footer">
    <div class="left">
      <div class="pic">
        <img :src="song.pic" alt="" />
      </div>
      <div class="box">
        <div>
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
        pic: "",
        artist: "",
        isLiked: false,
      },
      songUrl: "",
      currentIndex: 0,
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
  },

  methods: {
    async getPlaylist() {
      if (this.playlistId == 0) {
        return;
      }
      await this.$http
        .post(`/playlist/track/all?id=${this.playlistId}&limit=10&offset=1`, {
          cookie: localStorage.getItem("cookie"),
        })
        .then((res) => {
          this.playlist = res.data.songs;
          this.currentIndex = 0;
          this.getSongUrl();
        });
    },
    async getSongUrl() {
      if (this.playlist.length == 0) {
        return;
      }
      await this.$http
        .post(`/song/url?id=${this.playlist[this.currentIndex].id}`, {
          cookie: localStorage.getItem("cookie"),
        })
        .then((res) => {
          this.songUrl = res.data.data[0].url;
          this.time = res.data.data[0].time;
        });
      if (!this.paused) {
        this.play();
      }
    },
    async getSong() {
      if (this.playlist.length == 0) {
        return;
      }
      await this.$http
        .post(`/song/detail?ids=${this.playlist[this.currentIndex].id}`, {
          cookie: localStorage.getItem("cookie"),
        })
        .then((res) => {
          this.song.pic = res.data.songs[0].al.picUrl;
          this.song.name = res.data.songs[0].name;
          this.song.artist = res.data.songs[0].al.name;
          // this.song.isLiked = res.data.songs[0].al.picUrl;
        });
    },
    play() {
      let music = document.querySelector("#music");
      this.paused = !music.paused;
      if (music.paused) {
        music.play();
        this.timer = setInterval(this.getPercentage, 100);
      } else {
        clearInterval(this.timer);
        music.pause();
      }
    },
    getPercentage() {
      let music = document.querySelector("#music");
      this.currentTime = music.currentTime;
      this.percentage = ((music.currentTime * 1000) / this.time) * 100;
      if (this.percentage >= 99) {
        this.next();
      }
    },
    async next() {
      if (this.currentIndex == this.playlist.length) {
        this.currentIndex = 0;
      } else {
        this.currentIndex = this.currentIndex + 1;
      }
      await this.getSong();
      await this.getSongUrl();
    },
    async front() {
      if (this.currentIndex == 0) {
        this.currentIndex = this.playlist.length - 1;
      } else {
        this.currentIndex = this.currentIndex - 1;
      }
      await this.getSong();
      await this.getSongUrl();
    },
  },
};
</script>
  
  <style lang="scss" >
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
    .pic {
      height: 0.75rem;
      width: 0.75rem;
      img {
        height: 100%;
        width: 100%;
        border-radius: 0.1rem;
      }
    }
    .box {
      display: flex;
      flex-direction: column;
      margin-left: 0.1rem;
      color: #333346;
      div {
        font-size: 0.25rem;
        display: flex;
        align-items: center;
        .name {
          max-width: 2rem;
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
        max-width: 2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .middle {
    flex: 1;
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
      .el-progress-bar {
        width: 5.3rem;
      }
    }
  }
  .right {
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