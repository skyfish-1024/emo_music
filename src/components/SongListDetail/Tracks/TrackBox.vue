<template>
  <div class="trackBox" :class="index % 2 == 1 ? 'active' : ''">
    <div class="order">
      <img
        v-if="song.id == id"
        src="@/assets/static/icon/laba.png"
        style="height: 100%; width: 100%"
        alt=""
      />
      <div v-else>{{ order }}</div>
    </div>
    <div class="options">
      <div v-if="index == 0">操作</div>
      <div v-else>
        <img src="@/assets/static/icon/love_gray.png" alt="" />
        <img src="@/assets/static/icon/download2.png" alt="" />
      </div>
    </div>
    <div class="name">{{ song.name }}</div>
    <div class="artists">{{ song.ar[0].name }}</div>
    <div class="albumName">{{ song.al.name }}</div>
    <div class="duration">{{ duration }}</div>
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
          name: "标题",
          al: {
            name: "专辑",
          },
          ar: [{ name: "歌手" }],
          dt: "",
        };
      },
    },
  },
  computed: {
    order() {
      if (this.index == 0) {
        return "";
      }
      if (this.index < 10) {
        return "0" + this.index;
      }
      return this.index;
    },
    duration() {
      if (!this.song.dt) {
        return "时间";
      }
      let duration = Math.ceil(this.song.dt / 1000);
      let minute = Math.floor(duration / 60);
      let second = duration % 60;
      if (second < 10) {
        second = "0" + second;
      }
      return minute + ":" + second;
    },
    id() {
      return this.$store.getters.getPlaySongId || 0;
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.trackBox {
  height: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 0.24rem;
  padding: 0 0.5rem;
  color: #919191;
  cursor: pointer;
}
.trackBox:hover {
  background: #f2f2f3;
}
.active {
  background-color: #fafafa;
}
.order {
  text-align: center;
  width: 0.4rem;
  img {
    height: 100%;
    width: 100%;
  }
}
.options {
  width: 0.85rem;
  div {
    display: flex;
    align-items: center;
  }
  img {
    width: 0.24rem;
    height: 0.24rem;
    margin: 0 0.05rem;
  }
}
.name {
  width: 4.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.artists {
  width: 2rem;
  margin-right: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.albumName {
  width: 2.85rem;
  margin-right: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>