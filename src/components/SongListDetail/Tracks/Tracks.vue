<template>
  <div>
    <TrackBox></TrackBox>
    <TrackBox
      v-for="(item, index) in tracks"
      :key="item.id"
      :song="item"
      :index="index + 1"
      @click.native="play()"
    ></TrackBox>
  </div>
</template>
  
  <script>
import TrackBox from "./TrackBox.vue";
export default {
  components: { TrackBox },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tracks: [],
    };
  },
  // computed: {
  //   tracks() {
  //     this.$http
  //       .post(`/playlist/track/all?id=${this.id}&limit=10&offset=1`, {
  //         cookie: localStorage.getItem("cookie"),
  //       })
  //       .then((res) => {
  //         console.log("zzzz", res.data);
  //         return res.data.songs;
  //       });
  //   },
  // },
  async created() {
    await this.getTracks();
  },
  methods: {
    play() {
      this.$store.commit("setPlaylistId", this.id);
    },
    async getTracks() {
      if (this.id == 0) {
        await this.$http
          .post(`/user/playlist?uid=${localStorage.getItem("uid")}`, {
            cookie: localStorage.getItem("cookie"),
          })
          .then((res) => {
            // console.log(res.data);
            // console.log(localStorage.getItem("uid"));
            // this.playlist = res.data.playlist[0];
            this.id = res.data.playlist[0].id;
          });
      }
      await this.$http
        .post(`/playlist/track/all?id=${this.id}&limit=10&offset=1`, {
          cookie: localStorage.getItem("cookie"),
        })
        .then((res) => {
          this.tracks = res.data.songs;
        });
    },
  },
};
</script>
  
  <style lang="scss" scoped>
</style>