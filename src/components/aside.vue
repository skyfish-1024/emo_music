<template>
  <div class="aside">
    <div class="box" :class="current == 1 ? 'active' : ''" @click="toRecommend">
      发现音乐
    </div>
    <div
      class="box"
      :class="current == 2 ? 'active' : ''"
      @click="toMyLikedSongs"
    >
      我喜欢的音乐
    </div>
  </div>
</template>
    <script>
export default {
  data() {
    return {
      current: 1,
      path: [
        {
          name: "发现音乐",
          path: "/home/recommend",
        },
        {
          name: "我喜欢的音乐",
          path: "/home/toMyLikedSongs",
        },
      ],
    };
  },
  methods: {
    toRecommend() {
      this.current = 1;
      this.$router.push("recommend");
    },
    async toMyLikedSongs() {
      this.current = 2;
      await this.$http
        .post(`/user/playlist?uid=${localStorage.getItem("uid")}`, {
          cookie: localStorage.getItem("cookie"),
        })
        .then((res) => {
          // console.log(res.data);
          // console.log(localStorage.getItem("uid"));
          // this.playlist = res.data.playlist[0];
          // this.id = res.data.playlist[0].id;
          this.$router.push({
            path: "myLikedSongs",
            query: {
              id: res.data.playlist[0].id,
            },
          });
        });

      // this.$router.push("myLikedSongs");
    },
  },
};
</script>
    
    <style lang="scss" scoped>
.aside {
  width: 100%;
  height: 100%;
  border-right: 1px #e0e0e0 solid;
  background: white;
  box-sizing: border-box;
  padding: 0.18rem;
  .box {
    cursor: pointer;
    margin: 0;
    box-sizing: border-box;
    padding-left: 0.1rem;
    font-size: 0.24rem;
    color: #474747;
    height: 0.55rem;
    width: 100%;
    line-height: 0.55rem;
  }
  .active {
    background-color: #f6f6f7;
    font-weight: bold;
  }
}
</style>