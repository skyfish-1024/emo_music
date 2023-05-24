<template>
  <div class="loadingBox">
    <div class="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loadingBox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading,
.loading > div {
  position: relative;
  box-sizing: border-box;
}

.loading {
  display: block;
  font-size: 0;
  color: #000;
}

.loading.la-dark {
  color: #333;
}

.loading > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.loading {
  width: 0.32rem;
  height: 0.32rem;
}

.loading > div {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.08rem;
  height: 0.08rem;
  margin-top: -0.04rem;
  margin-left: -0.04rem;
  border-radius: 100%;
  animation: ball-spin-clockwise 1s infinite ease-in-out;
}

.loading > div:nth-child(1) {
  top: 5%;
  left: 50%;
  animation-delay: -0.875s;
}

.loading > div:nth-child(2) {
  top: 18.1801948466%;
  left: 81.8198051534%;
  animation-delay: -0.75s;
}

.loading > div:nth-child(3) {
  top: 50%;
  left: 95%;
  animation-delay: -0.625s;
}

.loading > div:nth-child(4) {
  top: 81.8198051534%;
  left: 81.8198051534%;
  animation-delay: -0.5s;
}

.loading > div:nth-child(5) {
  top: 94.9999999966%;
  left: 50.0000000005%;
  animation-delay: -0.375s;
}

.loading > div:nth-child(6) {
  top: 81.8198046966%;
  left: 18.1801949248%;
  animation-delay: -0.25s;
}

.loading > div:nth-child(7) {
  top: 49.9999750815%;
  left: 5.0000051215%;
  animation-delay: -0.125s;
}

.loading > div:nth-child(8) {
  top: 18.179464974%;
  left: 18.1803700518%;
  animation-delay: 0s;
}

.loading.la-sm {
  width: 0.16rem;
  height: 0.16rem;
}

.loading.la-sm > div {
  width: 0.04rem;
  height: 0.04rem;
  margin-top: -0.02rem;
  margin-left: -0.02rem;
}

.loading.la-2x {
  width: 0.64rem;
  height: 0.64rem;
}

.loading.la-2x > div {
  width: 0.16rem;
  height: 0.16rem;
  margin-top: -0.08rem;
  margin-left: -0.08rem;
}

.loading.la-3x {
  width: 0.96rem;
  height: 0.96rem;
}

.loading.la-3x > div {
  width: 0.24rem;
  height: 0.24rem;
  margin-top: -0.12rem;
  margin-left: -0.12rem;
}

@keyframes ball-spin-clockwise {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  20% {
    opacity: 1;
  }

  80% {
    opacity: 0;
    transform: scale(0);
  }
}
</style>