<template>
  <div class="triangle">
    <div class="triangle2" v-if="isOn"></div>
    <div class="triangle1" v-else></div>
  </div>
</template>

<script>
export default {
  props: {
    isOn: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
.triangle {
  margin-left: 0.05rem;
}
.triangle1 {
  height: 0;
  width: 0;
  border: 0.08rem solid;
  transform: translateY(0.05rem) translateX(0.05rem) rotateZ(90deg);
  border-color: transparent transparent transparent #cccccc;
}
.triangle2 {
  height: 0;
  width: 0;
  border: 0.08rem solid;
  transform: translateX(0.05rem) rotateZ(0deg);
  border-color: transparent transparent transparent #cccccc;
}
</style>