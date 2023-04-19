<template>
  <div
    v-infinite-scroll="loadMore"
    infinite-scroll-immediate="false"
    infinite-scroll-distance="50"
    :infinite-scroll-disabled="isDisabled"
  >
    <TrackBox></TrackBox>
    <TrackBox
      v-for="(item, index) in tracks"
      :key="index"
      :song="item"
      :index="index + 1"
      @click.native="play()"
    ></TrackBox>
    <Loading v-if="isLoading"></Loading>
  </div>
</template>
  
  <script>
import TrackBox from "./TrackBox.vue";
import Loading from "@/components/Loading.vue";
export default {
  components: { TrackBox, Loading },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isLoading: false,
      tracks: [],
      pageSize: 30,
      pageNum: 0,
      isDisabled: false,
    };
  },

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
        .post(
          `/playlist/track/all?id=${this.id}&limit=${this.pageSize}&offset=${this.pageNum}`,
          {
            cookie: localStorage.getItem("cookie"),
          }
        )
        .then((res) => {
          this.tracks = res.data.songs;
        });
    },
    async loadMore() {
      if (this.isLoading) {
        return;
      }
      if (this.tracks.length >= this.total) {
        this.isDisabled = true;
        return;
      }
      this.isLoading = true;
      this.pageNum++;
      await this.$http
        .post(
          `/playlist/track/all?id=${this.id}&limit=${this.pageSize}&offset=${this.pageNum}`,
          {
            cookie: localStorage.getItem("cookie"),
          }
        )
        .then((res) => {
          this.tracks = [...this.tracks, ...res.data.songs];
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
        });
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.songList {
  height: 4rem;
}
</style>