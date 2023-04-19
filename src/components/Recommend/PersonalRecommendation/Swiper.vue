<template>
  <div class="swiper">
    <el-carousel :interval="4000" type="card" :autoplay="true" height="3.6rem">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div class="bannerBox">
          <img :src="item.imageUrl" alt="" object-fit="cover" />
          <div class="type">
            {{ item.typeTitle }}
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
  <script>
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>
  
  <style lang="scss">
.el-carousel__item {
  display: flex;
  justify-content: center;
  overflow: visible;
}

.el-carousel__item .bannerBox,
img {
  width: 8.16rem;
  height: 3rem;
  border-radius: 0.1rem;
}
.el-carousel__indicators--outside button {
  background-color: #cc4a4a;
}
.el-carousel__indicators--outside {
  margin: 0;
  padding: 0;
  bottom: 0;
  position: absolute;
  transform: translateX(-50%);
}
.el-carousel__indicator--horizontal {
  padding-top: 0;
  padding-bottom: 0;
}
.el-carousel__button {
  width: 0.1rem !important;
  height: 0.1rem !important;
  border-radius: 50%;
}
.bannerBox {
  position: relative;
  .type {
    width: 1rem;
    height: 0.36rem;
    text-align: center;
    font-size: 0.2rem;
    color: white;
    line-height: 0.36rem;
    background-color: #cc4a4a;
    border-radius: 0.1rem 0 0.1rem 0;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>