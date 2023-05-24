<template>
  <div class="collector">
    <div class="collectors">
      <div class="item" v-for="item in collectors" :key="item.userId">
        <div class="avatar">
          <img :src="item.avatarUrl" alt="" />
        </div>
        <div class="right">
          <div class="nickName">
            {{ item.nickname }}
          </div>
          <div class="signature">
            {{ item.signature }}
          </div>
        </div>
      </div>
    </div>
    <el-empty v-if="total == 0" :image-size="100"></el-empty>

    <Pagination
      :total="total"
      :page-size="pageSize"
      @currentChange="pageChange"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/common/Pagination.vue";
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  components: { Pagination },
  data() {
    return {
      collectors: [],
      total: 0,
      pageSize: 30,
      pageNum: 0,
    };
  },
  created() {
    this.getCollectors();
  },
  methods: {
    async getCollectors() {
      await this.$http
        .get(
          `/playlist/subscribers?id=${this.id}&limit=${this.pageSize}&offset=${this.pageNum}`
        )
        .then((res) => {
          this.total = res.data.total;
          this.collectors = res.data.subscribers;
        });
    },
    pageChange(e) {
      this.pageNum = e - 1;
      this.getCollectors();
    },
  },
};
</script>

<style lang="scss" scoped>
.collectors {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  .item {
    cursor: pointer;
    width: 50%;
    overflow: hidden;
    display: flex;
    margin-top: 0.3rem;
    .avatar {
      margin-left: 0.4rem;
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 0.1rem;
      flex: 1;
      .nickName {
        font-size: 0.24rem;
        margin: 0.15rem 0;
      }
      .signature {
        font-size: 0.14rem;
        margin: 0.12rem 0;
      }
    }
  }
}
</style>