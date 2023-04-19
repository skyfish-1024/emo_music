<template>
  <div class="newSong">
    <div class="category">
      <div class="box">
        <div
          :class="currentCategory == 1 ? 'active' : ''"
          @click="categoryChange(1)"
        >
          新歌速递
        </div>
        <div
          :class="currentCategory == 2 ? 'active' : ''"
          @click="categoryChange(2)"
        >
          新碟上架
        </div>
      </div>
    </div>
    <div class="area">
      <div class="left">
        <div
          v-for="(item, index) in area"
          :key="item.id"
          :class="currentArea == index ? 'active' : ''"
          @click="areaChange(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="right">
        <div v-if="currentCategory == 2" class="box">
          <div :class="CDtype == 1 ? 'active' : ''" @click="changeCDtype(1)">
            推荐
          </div>
          <div class="line"></div>
          <div :class="CDtype == 2 ? 'active' : ''" @click="changeCDtype(2)">
            全部
          </div>
        </div>
      </div>
    </div>

    <div class="songs" v-if="currentCategory == 1">
      <Loading v-if="isLoading"></Loading>
      <div v-else>
        <NewSongBox
          v-for="(item, index) in newSongs"
          :key="item.id"
          :song="item"
          :index="index + 1"
        ></NewSongBox>
      </div>
    </div>

    <div class="CDs" v-if="currentCategory == 2">
      <div class="left">
        <div v-if="CDtype == 1">本周新碟</div>
        <div
          v-if="CDtype == 2"
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <div class="month">{{ month }}</div>
          <div class="year">{{ year }}</div>
        </div>
      </div>
      <div class="right">
        <Loading v-if="isLoading"></Loading>
        <div v-else>
          <div v-for="item in CDs" :key="item.id" class="box">
            <CD :CD="item"></CD>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewSongBox from "./NewSongBox.vue";
import Loading from "@/components/Loading.vue";
import CD from "./CD.vue";
export default {
  components: { NewSongBox, CD, Loading },
  data() {
    return {
      isLoading: false,
      options: { target: "songs" },
      currentCategory: 1,
      currentArea: 0,
      newSongs: [],
      CDs: [],
      CDtype: 1,
      area: [
        {
          id: 0,
          type: "ALL",
          name: "全部",
        },
        {
          id: 7,
          type: "ZH",
          name: "华语",
        },
        {
          id: 96,
          type: "EA",
          name: "欧美",
        },
        {
          id: 8,
          type: "KR",
          name: "韩国",
        },
        {
          id: 16,
          type: "ALL",
          name: "JP",
        },
      ],
    };
  },
  created() {
    this.getNewSong();
  },
  computed: {
    month() {
      let month = new Date().getMonth() + 1;
      if (month < 10) {
        return "0" + month;
      }
      return month;
    },
    year() {
      let year = new Date().getFullYear();

      return year;
    },
  },
  methods: {
    //分类选择
    categoryChange(index) {
      this.currentCategory = index;
      this.currentArea = 0;
      this.CDtype = 1;
      if (index == 1) {
        this.getNewSong();
      } else {
        this.getCDs();
      }
    },
    //地区选择
    async areaChange(index) {
      this.currentArea = index;
      if (this.currentCategory == 1) {
        await this.getNewSong();
      } else {
        await this.getCDs();
      }
    },
    //专辑类型选择
    changeCDtype(index) {
      this.CDtype = index;
      this.getCDs();
    },
    //获取歌曲列表
    async getNewSong() {
      this.isLoading = true;
      await this.$http
        .get(`/top/song?type=${this.area[this.currentArea].id}`, {
          cookie: localStorage.getItem("cookie"),
        })
        .then((res) => {
          this.newSongs = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    //获取专辑列表
    async getCDs() {
      this.isLoading = true;
      await this.$http
        .get(
          `/top/album?offset=1&limit=30&area=${
            this.area[this.currentArea].type
          }&year=${Number(this.year)}&month=${Number(this.month)}`,
          {
            cookie: localStorage.getItem("cookie"),
          }
        )
        .then((res) => {
          // console.log(res.data);
          this.CDs = res.data.monthData.splice(0, 32);
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.songs,
.CDs {
  width: 100%;
}
.category {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    display: flex;
    align-items: center;
    width: 3.46rem;
    height: 0.46rem;
    border: 1px solid #bbbbbb;
    border-radius: 0.23rem;
    div {
      width: 50%;
      height: 100%;
      font-size: 0.2rem;
      color: #6c6c6c;
      border-radius: 0.23rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      cursor: pointer;
    }
    .active {
      color: white;
      background-color: #bbbbbb;
    }
  }
}
.area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.3rem 0;
  .left {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;

    div {
      cursor: pointer;
      margin-right: 0.35rem;
      font-size: 0.22rem;
      color: #a4a4a4;
    }
    .active {
      color: #333333;
      font-weight: bold;
    }
  }
  .box {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
    div {
      cursor: pointer;
      width: 0.7rem;
      text-align: center;
      border-radius: 0.2rem;
      font-size: 0.22rem;
      color: #a4a4a4;
    }
    .line {
      margin: 0 0.1rem;
      height: 0.2rem;
      width: 0.01rem;
      background-color: #6c6c6c;
    }
    .active {
      background-color: #fef5f5;
      color: #ee5656;
    }
  }
}
.CDs {
  width: 100%;
  display: flex;
  .left {
    min-width: 0.8rem;
    width: 0.8rem;
    margin-left: 0.5rem;
    font-size: 0.3rem;
    color: #767676;
    div {
      position: sticky;
      top: 1rem;
    }
  }
  .right {
    width: 100%;
    margin-left: 0.15rem;
    margin-right: 0.5rem;
    .box {
      width: 25%;
      float: left;
      display: flex;
      justify-content: center;
    }
  }
}
</style>