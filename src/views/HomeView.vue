<template>
  <div class="home">
    <div class="header">
      <MyHeader></MyHeader>
    </div>
    <div class="section">
      <div class="aside">
        <MyAside></MyAside>
      </div>
      <div class="main">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
    <div class="footer">
      <MyFooter></MyFooter>
    </div>
  </div>
</template>
<script>
import MyHeader from "@/components/header.vue";
import MyFooter from "@/components/footer.vue";
import MyAside from "@/components/aside.vue";
export default {
  components: { MyHeader, MyFooter, MyAside },
};
</script>

<style lang="scss">
.home {
  min-width: 15.34rem;
  min-height: 10.04rem;
  width: 15.34rem;
  height: 10.04rem;
  position: relative;
  display: flex;
  flex-direction: column;
  // top: 50px;
  margin: 0 auto;
  background: lightgreen;
  resize: horizontal;
  font-size: 24px;
}
.header {
  width: 100%;
  height: 0.92rem;
}
.section {
  flex: 1;
  display: flex;
  .aside {
    width: 3.02rem;
  }
  .main {
    flex: 1;
    overflow: hidden;
    box-sizing: border-box;
    // margin: 0 0.5rem;
  }
}
.footer {
  width: 100%;
  height: 1.12rem;
}
</style>
