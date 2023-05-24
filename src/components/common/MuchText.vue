<template>
  <div class="text">
    <div class="btn" @click="onClick" v-show="showMore">
      <img v-if="isOn" src="@/assets/static/icon/up.png" alt="" />
      <img v-else src="@/assets/static/icon/down.png" alt="" />
    </div>
    <div class="content" id="textContent" ref="textContent" :class="textStyle">
      {{ text }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: "简介:",
    },
  },

  data() {
    return {
      isOn: false,
      showMore: false,
      textStyle: "",
    };
  },

  watch: {
    text: {
      handler() {
        this.init();
      },
    },
  },
  methods: {
    init() {
      const muchText = document.getElementById("textContent");
      let clientWidth = document.documentElement.clientWidth;
      if (clientWidth > 375 && muchText.offsetHeight > 8) {
        this.showMore = true;
        this.textStyle = "hide";
      } else if (muchText.offsetHeight >= 5) {
        this.showMore = true;
        this.textStyle = "hide";
      }
    },
    onClick() {
      if (this.isOn) {
        this.textStyle = "hide";
      } else {
        this.textStyle = "show";
      }
      this.isOn = !this.isOn;
    },
  },
};
</script>

<style lang="scss" scoped>
// .text {
//   display: -webkit-box;
//   -webkit-line-clamp: 1;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
// }
.hide {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.show {
  display: -webkit-box;
  -webkit-line-clamp: 999;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.btn {
  width: 0.3rem;
  height: 0.3rem;
  cursor: pointer;
  img {
    height: 100%;
    width: 100%;
  }
  float: right;
  /*其他装饰样式*/
}
.content {
  width: 90%;
  line-height: 0.3rem;
}
</style>