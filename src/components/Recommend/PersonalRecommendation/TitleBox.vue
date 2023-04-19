<template>
  <div class="box">
    {{ title }} <img src="@/assets/static/icon/right_black.png" alt="" />
  </div>
</template>
  <script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {};
  },
};
</script>
  <style lang="scss" scoped>
.box {
  font-size: 0.3rem;
  font-weight: bold;
  height: 0.4rem;
  display: flex;
  align-items: center;
  cursor: pointer; //鼠标变小手
  img {
    width: 0.3rem;
    height: 0.3rem;
  }
}
</style>