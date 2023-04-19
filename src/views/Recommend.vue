<template>
  <div class="recommend">
    <div class="nav">
      <div
        class="box"
        :class="currentIndex == 1 ? 'active' : ''"
        @click="navOnClick(1)"
      >
        <div class="title">个性推荐</div>
        <div class="line"></div>
      </div>
      <div
        class="box"
        :class="currentIndex == 2 ? 'active' : ''"
        @click="navOnClick(2)"
      >
        <div class="title">歌单</div>
        <div class="line"></div>
      </div>
      <div
        class="box"
        :class="currentIndex == 3 ? 'active' : ''"
        @click="navOnClick(3)"
      >
        <div class="title">最新音乐</div>
        <div class="line"></div>
      </div>
    </div>
    <div v-if="currentIndex == 1" class="content">
      <PersonalRecommendation></PersonalRecommendation>
    </div>
    <div v-if="currentIndex == 2" class="content">
      <SongList></SongList>
    </div>
    <div v-if="currentIndex == 3" class="content">
      <NewSong></NewSong>
    </div>
  </div>
</template>

<script>
import PersonalRecommendation from "@/components/Recommend/PersonalRecommendation/PersonalRecommendation.vue";
import NewSong from "@/components/Recommend/NewSong/NewSong.vue";
import SongList from "@/components/Recommend/SongList/SongList.vue";
export default {
  components: { PersonalRecommendation, NewSong, SongList },
  data() {
    return {
      currentIndex: 1,
    };
  },
  methods: {
    navOnClick(index) {
      this.currentIndex = index;
    },
  },
};
</script>
<style lang="scss" scoped>
.recommend {
  background-color: white;
  height: 8.06rem;
  overflow: auto;
}
.nav {
  display: flex;
  padding: 0.2rem 0;
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  margin: 0 0.5rem;
  .box {
    cursor: pointer;
    margin-right: 0.3rem;
    font-size: 0.26rem;
    height: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    .title {
      height: 0.4rem;
      line-height: 0.4rem;
    }
    .line {
      height: 0.06rem;
      width: 80%;
      border-radius: 0.06rem;
      margin-top: 0.04rem;
    }
  }
  .active {
    font-weight: bold;
    font-size: 0.32rem;
    .line {
      background-color: #ec4141;
    }
  }
}
</style>