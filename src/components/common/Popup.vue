<template>
  <div class="Popup">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.Popup {
  position: absolute;
  z-index: 300;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   top: 5rem;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.3rem;
  top: 0;
  left: 0;
}
</style>