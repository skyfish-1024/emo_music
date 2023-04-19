<template>
  <div class="comment">
    <CommentBox
      v-for="item in comments"
      :key="item.commentId"
      :comment="item"
    ></CommentBox>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="pageChange"
    >
    </el-pagination>
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
      total: 0,
      pageSize: 30,
      pageNum: 0,
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    async getComments() {
      await this.$http
        .get(
          `/comment/playlist?id=${this.id}&limit=${this.pageSize}&offset=${this.pageNum}`,
          {
            cookie: localStorage.getItem("cookie"),
          }
        )
        .then((res) => {
          console.log(res.data);
          this.total = res.data.total;
          this.comments = res.data.comments;
        });
    },
    pageChange(e) {
      console.log(e);
      this.pageNum = e - 1;
      this.getComments();
    },
  },
};
</script>

<style lang="scss">
.comment {
  overflow: auto;
}
.el-pagination {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 0.3rem;
  .active {
    background-color: #ec4141 !important;
  }
}
</style>