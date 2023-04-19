<template>
  <div class="songList">
    <div class="highQuality">
      <img :src="song.coverImgUrl" alt="" />
      <div class="right">
        <div class="tag">精品歌单</div>
        <div class="name">{{ song.name }}</div>
      </div>
    </div>
    <div class="cat">
      <div class="left" @click="showAllCat">{{ currentTagName }} ></div>
      <div class="right">
        <div
          class="item"
          :class="currentTagName == item.name ? 'active' : ''"
          v-for="item in hotTags"
          :key="item.id"
          @click="tagChange(item.name)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="allCat" style="width: 11rem" v-if="isShowAllCat">
      <div class="row">
        <div class="left">
          <div class="all">全部歌单</div>
        </div>
      </div>
      <div class="row" v-for="(item, index1) in categories" :key="index1">
        <div class="left">
          <div class="item">{{ item }}</div>
        </div>
        <div class="right">
          <div
            class="box"
            v-for="(tag, index2) in catList"
            :key="index2"
            v-show="tag.category == index1"
          >
            <div
              class="item"
              :class="currentTagName == tag.name ? 'active' : ''"
              @click="tagChange(tag.name)"
            >
              {{ tag.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="isLoading"></Loading>
    <div class="songs" v-else>
      <div class="song" v-for="item in playlist" :key="item.id">
        <SongBox :song="item"></SongBox>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="pageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import SongBox from "./SongBox";
import Loading from "@/components/Loading.vue";
export default {
  components: { SongBox, Loading },
  data() {
    return {
      isLoading: false,
      isShowAllCat: false,
      song: { coverImgUrl: "", name: "" },
      categories: [],
      catList: [],
      hotTags: [],
      playlist: [],
      currentTagName: "华语",
      total: 0,
      pageSize: 40,
      pageNum: 0,
    };
  },
  created() {
    this.getPlaylist();
    this.getHotTags();
    this.getCatList();
  },
  computed: {},
  methods: {
    showAllCat() {
      this.isShowAllCat = !this.isShowAllCat;
    },
    tagChange(name) {
      // this.currentTagId = id;
      this.currentTagName = name;
      this.getPlaylist();
    },
    async getHotTags() {
      await this.$http.get(`/playlist/hot`).then((res) => {
        this.hotTags = res.data.tags;
        this.currentTagId = res.data.tags[0].id;
        this.currentTagName = res.data.tags[0].name;
      });
    },
    async getCatList() {
      await this.$http
        .get(`/playlist/catlist`, {
          cookie: localStorage.getItem("cookie"),
        })
        .then((res) => {
          this.categories = res.data.categories;
          this.catList = res.data.sub;
        });
    },
    async getPlaylist() {
      this.isShowAllCat = false;
      this.isLoading = true;
      this.getHighQuality();
      await this.$http
        .get(
          `/top/playlist?offset=${this.pageNum}&cat=${this.currentTagName}&limit=${this.pageSize}`,
          {
            cookie: localStorage.getItem("cookie"),
          }
        )
        .then((res) => {
          this.playlist = res.data.playlists;
          this.isLoading = false;
          this.total = res.data.total;
        })
        .catch((err) => {
          this.isLoading = false;
        });
    },
    async getHighQuality() {
      await this.$http
        .get(`/top/playlist/highquality?cat=${this.currentTagName}&limit=2`, {
          cookie: localStorage.getItem("cookie"),
        })
        .then((res) => {
          this.song = res.data.playlists[0];
        })
        .catch((err) => {});
    },
    pageChange(e) {
      console.log(e);
      this.pageNum = e - 1;
      this.getPlaylist();
    },
  },
};
</script>
<style lang="scss">
.songList {
  padding: 0 0.5rem;
  position: relative;
}
.highQuality {
  width: 100%;
  height: 2.58rem;
  box-sizing: border-box;
  padding: 0.23rem;
  background: linear-gradient(to right, #8f9ea5, #b9c3cd 70%);
  border-radius: 0.2rem;
  font-size: 0.28rem;
  display: flex;
  .right {
    display: flex;
    // justify-content: center;
    flex-direction: column;
    margin-left: 0.1rem;
    font-weight: bold;
    .tag {
      color: #cca369;
      font-size: 0.2rem;
      height: 0.45rem;
      line-height: 0.41rem;
      box-sizing: border-box;
      padding: 0 0.2rem;
      width: fit-content;
      border-radius: 0.4rem;
      border: 2px solid #cca369;
      margin: 0.3rem 0;
    }
    .name {
      color: white;
      font-size: 0.3rem;
    }
  }
}
.highQuality > img {
  height: 2.12rem;
  width: 2.12rem;
}

.cat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.2rem 0;
  .left {
    cursor: pointer;
    height: 0.45rem;
    width: 1.5rem;
    font-size: 0.2rem;
    color: #666666;
    border: 1px solid #d9d9d9;
    border-radius: 0.4rem;
    text-align: center;
    line-height: 0.45rem;
  }
  .right {
    display: flex;
    align-items: center;
    .item {
      cursor: pointer;
      font-size: 0.2rem;
      color: #666666;
      box-sizing: border-box;
      height: 0.3rem;
      line-height: 0.3rem;
      padding: 0 0.1rem;
      border-radius: 0.15rem;
      width: fit-content;
    }
    .active {
      background-color: #fef5f5;
      color: #f06b6b;
    }
  }
}
.allCat {
  z-index: 2;
  background: white;
  position: absolute;
  width: 100%;
  border: 2px solid #f2f2f2;
  .row {
    min-height: 0.8rem;
    display: flex;
    font-size: 0.22rem;
    line-height: 0.8rem;
    width: 100%;
    .all {
      width: 100%;
      font-size: 0.22rem;
      line-height: 0.8rem;
      border-bottom: 1px solid #f2f2f2;
    }
    .left {
      width: 2rem;
      text-align: center;
    }
    .right {
      // width: 100%;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      // overflow: hidden;
      .box {
        width: 16.6%;
        height: 0.8rem;
        display: flex;
        align-items: center;
        margin: 0;
      }
      .item {
        height: 0.55rem;
        overflow: hidden;
        cursor: pointer;
        font-size: 0.2rem;
        color: #666666;
        box-sizing: border-box;
        height: 0.3rem;
        line-height: 0.3rem;
        padding: 0 0.1rem;
        border-radius: 0.15rem;
        width: fit-content;
      }
      .active {
        background-color: #fef5f5;
        color: #f06b6b;
      }
    }
  }
}
.songs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .song {
    width: 25%;
    height: 3.6rem;
    margin-bottom: 0.1rem;
    display: flex;
    justify-content: center;
  }
}
.el-pagination {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 0.3rem;
  .active {
    background-color: #ec4141 !important;
  }
}
</style>