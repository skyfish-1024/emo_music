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
      @click.native="play(index)"
    ></TrackBox>
    <Loading v-if="isLoading"></Loading>
    <el-empty v-if="total == 0" :image-size="100"></el-empty>
  </div>
</template>
  
  <script>
import TrackBox from "./TrackBox.vue";
import Loading from "@/components/common/Loading.vue";
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
    //点击播放单曲
    play(index) {
      this.$store.commit("setPlayListId", this.id);
      this.$store.commit("setPlayIndex", index);
    },
    //获取音乐列表
    async getTracks() {
      if (this.id == 0) {
        if (!localStorage.getItem("uid")) {
          this.id = 0;
          return;
        }
        await this.$http
          .post(`/user/playlist?uid=${localStorage.getItem("uid")}`)
          .then((res) => {
            this.id = Number(res.data.playlist[0].id);
          });
      }
      await this.$http
        .post(
          `/playlist/track/all?id=${this.id}&limit=${this.pageSize}&offset=${this.pageNum}`
        )
        .then((res) => {
          this.tracks = res.data.songs;
          // console.log(res.data);
        });
    },
    //加载更多
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
          `/playlist/track/all?id=${this.id}&limit=${this.pageSize}&offset=${this.pageNum}`
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
  
  <style  lang="scss" scoped>
.songList {
  height: 4rem;
}
</style>