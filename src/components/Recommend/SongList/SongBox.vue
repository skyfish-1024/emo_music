<template>
  <div class="box" @click="toDetail">
    <div
      class="pic"
      :style="`backgroundImage: url(${song.coverImgUrl});`"
      v-lazy="'bg'"
    >
      <div class="playCount">
        <img src="@/assets/static/icon/play.png" alt="" />
        {{ Math.floor(Number(song.playCount) / 10000) }}万
      </div>
      <div class="play">
        <img src="@/assets/static/icon/play_red.png" alt="" />
      </div>
      <div class="creator">
        {{ song.creator.nickname }}
      </div>
    </div>
    <div class="name">
      {{ song.name }}
    </div>
  </div>
</template>
  <script>
export default {
  props: {
    song: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
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
.box {
  cursor: pointer;
  min-height: 3.6rem;
  width: 2.68rem;
}
.pic {
  min-width: 2.68rem;
  min-height: 2.68rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 0.1rem;
  position: relative;
  .playCount {
    height: 0.3rem;
    font-size: 0.16rem;
    color: white;
    display: flex;
    align-items: center;
    margin-right: 0.1rem;
    position: absolute;
    right: 0;
    img {
      width: 0.16rem;
      height: 0.16rem;
      margin-right: 0.05rem;
    }
  }
  .play {
    opacity: 0;
    position: absolute;
    bottom: 0;
    right: 0.1rem;
    transition: all 0.5s linear;
    img {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}
.pic:hover .play {
  opacity: 1;
}
.name {
  font-size: 0.2rem;
  color: #333333;
  line-height: 0.26rem;
  margin-top: 0.15rem;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.creator {
  position: absolute;
  color: white;
  font-size: 0.2rem;
  bottom: 0.1rem;
  left: 0.1rem;
}
</style>