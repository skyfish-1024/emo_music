<template>
  <div class="cd">
    <div class="box">
      <div class="pic" :style="`backgroundImage:url(${CD.blurPicUrl});`">
        <img src="@/assets/static/icon/play_red.png" alt="" v-lazy="'img'" />
      </div>
    </div>

    <div class="name">
      {{ CD.name }}
    </div>
    <div class="artist">
      {{ CD.artist.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    CD: {
      type: Object,
      default() {
        return {
          blurPicUrl: "",
          name: "",
          artist: {
            name: "",
          },
        };
      },
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.cd {
  height: 3.2rem;
  margin-bottom: 0.2rem;
  width: 2.37rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  //   height: 2.08rem;
}
.box {
  background-image: url("@/assets/static/img/CDbg.png");
  background-size: 100% 100%;
  width: 2.37rem;
  height: 2.08rem;
  border-radius: 0.1rem;
  //   overflow: hidden;
  .pic {
    width: 2.08rem;
    height: 2.08rem;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.1rem;
    // overflow: hidden;

    img {
      transition: all linear 0.5s;
      opacity: 0;
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
.pic:hover img {
  opacity: 1;
}
.name {
  font-size: 0.26rem;
  color: #6c6c6c;
  margin-top: 0.15rem;
  line-height: 0.25rem;
  max-height: 0.5rem;
  text-overflow: ellipsis;
  width: 2.08rem;
  overflow: hidden;
}
.artist {
  font-size: 0.24rem;
  color: #999999;
  margin-top: 0.15rem;
  width: 2.08rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 0.25rem;
}
</style>