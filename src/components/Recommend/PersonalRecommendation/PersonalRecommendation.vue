<template>
  <div class="pred">
    <Swiper :banners="banners"></Swiper>
    <div class="recommendSongs">
      <div class="title">
        <TitleBox title="推荐歌单"></TitleBox>
      </div>
      <div class="box" v-for="item in personalized" :key="item.id">
        <songBox :song="item"></songBox>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "./Swiper.vue";
import songBox from "./SongBox.vue";
import TitleBox from "./TitleBox.vue";

export default {
  components: { Swiper, songBox, TitleBox },
  data() {
    return {
      banners: [],
      personalized: [],
    };
  },
  async created() {
    await Promise.all([this.getBanners(), this.getPersonalized()]);
  },
  methods: {
    async getBanners() {
      await this.$http
        .get(`/banner`, {
          cookie: localStorage.getItem("cookie"),
        })
        .then((res) => {
          this.banners = res.data.banners;
        });
    },
    async getPersonalized() {
      await this.$http
        .get(`/personalized?limit=10`, {
          cookie: localStorage.getItem("cookie"),
        })
        .then((res) => {
          this.personalized = res.data.result;
        });
    },
  },
};
</script>

<style lang="scss">
.pred {
  margin: 0 0.5rem;
}
.box {
  width: 2.1rem;
  margin-top: 0.1rem;
}
.recommendSongs {
  display: flex;
  flex-grow: 4;
  flex-wrap: wrap;
  justify-content: space-between;
  .title {
    width: 100%;
  }
}
div::-webkit-scrollbar {
  display: none;
}
</style>