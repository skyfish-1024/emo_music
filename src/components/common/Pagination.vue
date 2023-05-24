<template>
  <div class="pagination">
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
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    pageChange(e) {
      this.$emit("currentChange", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  width: 100%;
}
.pagination::v-deep .el-pagination {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 0.3rem;
  padding: 0 0.5rem;
  font-size: 0.16rem !important;
  // width: 5.4rem;
  overflow: hidden;
  .active {
    background-color: #ec4141 !important;
  }
  .el-pager {
    display: flex;
  }
  .el-pager li,
  .el-pager li::before,
  .btn-prev,
  .btn-next {
    display: block;
    width: 0.4rem;
    height: 0.4rem;
    min-width: 0.4rem;
    min-height: 0.4rem;
    min-width: 0;
    font-size: 0.16rem;
    line-height: 0.4rem;
    padding: 0;
    margin: 0.03rem;
    i::before {
      font-size: 0.16rem;
    }
  }
}
</style>