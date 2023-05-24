<template>
  <div class="newSongBox" :class="index % 2 == 1 ? 'active' : ''">
    <div class="order">{{ order }}</div>
    <div
      class="pic"
      :style="`backgroundImage:url(${song.album.blurPicUrl});`"
      v-lazy="'bg'"
    >
      <img src="@/assets/static/icon/play_red.png" alt="" />
    </div>
    <div class="name">{{ song.name || "" }}</div>
    <div class="artists">{{ artists || "" }}</div>
    <div class="albumName">{{ song.album.name || "" }}</div>
    <div class="duration">{{ duration || "" }}</div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    song: {
      type: Object,
      default() {
        return {
          name: "",
          album: {
            blurPicUrl: "",
            name: "",
          },
          artists: [],
        };
      },
    },
  },
  computed: {
    order() {
      if (this.index < 10) {
        return "0" + this.index;
      }
      return this.index;
    },
    artists() {
      if (!this.song.artists) {
        return "";
      }
      let arr = this.song.artists.map((item) => item.name);
      return arr.join("/");
    },
    duration() {
      let duration = Math.ceil(this.song.duration / 1000);
      let minute = Math.ceil(duration / 60);
      let second = duration % 60;
      if (second < 10) {
        second = "0" + second;
      }
      return minute + ":" + second;
    },
  },
  methods: {
    toDetail() {
      this.$router.push({
        path: "songListDetail",
        query: {
          id: this.song.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.newSongBox {
  height: 1.2rem;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 0.24rem;
  padding: 0 0.5rem;
  color: #919191;
  cursor: pointer;
}
.newSongBox:hover {
  background: #f2f2f3;
}
.active {
  background-color: #fafafa;
}
.order {
  width: 0.5rem;
}
.pic {
  background-size: 100% 100%;
  width: 0.9rem;
  height: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.1rem;
  margin-right: 0.15rem;
  img {
    width: 0.4rem;
    height: 0.4rem;
  }
}
.name {
  width: 4.5rem;
}
.artists {
  width: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.albumName {
  width: 2.7rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>