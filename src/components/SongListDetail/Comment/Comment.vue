<template>
  <div class="comment">
    <CommentBox
      v-for="item in comments"
      :key="item.commentId"
      :comment="item"
    ></CommentBox>
    <el-empty v-if="total == 0" :image-size="100"></el-empty>
    <Pagination
      :total="total"
      :page-size="pageSize"
      @currentChange="pageChange"
    ></Pagination>
  </div>
</template>
<script>
import CommentBox from "./CommentBox.vue";
import Pagination from "@/components/common/Pagination.vue";
export default {
  components: { CommentBox, Pagination },
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
          `/comment/playlist?id=${this.id}&limit=${this.pageSize}&offset=${this.pageNum}`
        )
        .then((res) => {
          this.total = res.data.total;
          this.comments = res.data.comments;
        });
    },
    pageChange(e) {
      this.pageNum = e - 1;
      this.getComments();
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  overflow: auto;
}
</style>