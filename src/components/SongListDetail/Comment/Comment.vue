<template>
  <div class="comment">
    <CommentBox
      v-for="item in comments"
      :key="item.commentId"
      :comment="item"
    ></CommentBox>
  </div>
</template>
<script>
import CommentBox from "./CommentBox.vue";
export default {
  components: { CommentBox },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      comments: [],
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    async getComments() {
      //   if (this.id == 0) {
      //     await this.$http
      //       .post(`/user/playlist?uid=${localStorage.getItem("uid")}`, {
      //         cookie: localStorage.getItem("cookie"),
      //       })
      //       .then((res) => {
      //         // console.log(res.data);
      //         // console.log(localStorage.getItem("uid"));
      //         // this.playlist = res.data.playlist[0];
      //         this.id = res.data.playlist[0].id;
      //       });
      //   }
      await this.$http
        .get(`/comment/playlist?id=${this.id}&limit=20&offset=1`, {
          cookie: localStorage.getItem("cookie"),
        })
        .then((res) => {
          this.comments = res.data.comments;
        });
    },
  },
};
</script>

<style>
.comment {
  overflow: auto;
}
</style>