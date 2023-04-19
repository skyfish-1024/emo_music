<template>
  <div class="edit">
    <div class="title">编辑个人信息</div>
    <div class="box">
      <div class="left">
        <div class="row">
          <div class="label">昵称:</div>
          <el-form :rules="rules" :model="userInfo">
            <el-form-item prop="nickname">
              <el-input v-model="userInfo.nickname"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="row">
          <div class="label">介绍:</div>
          <el-form :rules="rules" :model="userInfo">
            <el-form-item prop="signature">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="userInfo.signature"
                maxlength="300"
                show-word-limit
              >
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="row">
          <div class="label">性别:</div>
          <div>
            <el-radio v-model="userInfo.gender" :label="1">男</el-radio>
            <el-radio v-model="userInfo.gender" :label="2">女</el-radio>
          </div>
        </div>
        <div class="row">
          <div class="label">生日:</div>
          <div class="date">
            <div>
              <el-select v-model="year" placeholder="请选择年">
                <el-option
                  v-for="item in years"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>

            <div>
              <el-select v-model="month" placeholder="请选择月">
                <el-option
                  v-for="item in months"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <el-select v-model="day" placeholder="请选择日">
                <el-option
                  v-for="item in days"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="label">地区:</div>
          <div class="area">
            <div>
              <el-select v-model="userInfo.province" placeholder="请选择城市">
                <el-option
                  v-for="item in areaList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <el-select v-model="userInfo.city" placeholder="请选择地区">
                <el-option
                  v-for="item in areaList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div></div>
          </div>
        </div>
        <div class="row">
          <div class="editBtn">
            <div
              class="btn red"
              @click="updateUserInfo"
              :class="isChanged ? '' : 'forbid'"
            >
              保存
            </div>
            <div class="btn white">取消</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="avatar">
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
        </div>
        <el-upload
          :action="uploadUrl"
          :headers="{ 'Content-Type': 'multipart/form-data' }"
          :limit="1"
          auto-upload
          :http-request="uploadAvatar"
        >
          <div class="btn white">修改头像</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkNickname = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入昵称"));
      }
      var pattern = /^[A-Za-z0-9_-]+$/;

      if (value.length < 4 || value.length > 30 || !pattern.test(value)) {
        return callback(
          new Error("昵称为4-30个字，且不包含除-和_以外的特殊字符")
        );
      }
      await this.$http.get(`/nickname/check?nickname=${value}`).then((res) => {
        if (res.data.nickname == this.originUserInfo.nickname) {
          return callback();
        }
        if (res.data.duplicated) return callback(new Error("该昵称已经被占用"));
      });
      callback();
    };
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      uploadUrl: `http://localhost:4000/avatar/upload?uid=${localStorage.getItem(
        "uid"
      )}`,
      cookie: localStorage.getItem("cookie"),
      avatarUrl: "",
      userInfo: {
        nickname: "",
        gender: 0,
        signature: "",
        birthday: 0,
        province: "",
        city: 100,
        province: 0,
      },
      originUserInfo: {},
      areaList: [],
      fileList: [],
      rules: {
        nickname: [{ validator: checkNickname, trigger: "blur" }],
        signature: [
          {
            min: 0,
            max: 300,
            message: "长度在 3 到 300 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    years() {
      let now = new Date().getFullYear();
      let years = [];
      for (let i = 1920; i >= 1920 && i <= now; i++) {
        years.push({
          value: i,
          label: i + "年",
        });
      }
      return years;
    },
    months() {
      let months = [];
      for (let i = 1; i <= 12; i++) {
        months.push({
          value: i,
          label: i + "月",
        });
      }
      return months;
    },
    days() {
      let date = new Date();
      date.setFullYear(this.year);
      date.setMonth(this.month);
      date.setDate(0);
      let day = date.getDate();
      if (this.day > day) {
        this.day = day;
      }
      let days = [];
      for (let i = 1; i <= day; i++) {
        days.push({
          value: i,
          label: i + "日",
        });
      }
      return days;
    },
    isChanged() {
      if (
        JSON.stringify(this.userInfo) == JSON.stringify(this.originUserInfo)
      ) {
        return false;
      }
      return true;
    },
  },
  async created() {
    // await this.getAreaList();
    await this.getUserInfo();
  },
  methods: {
    // handleAvatarSuccess(response, file, fileList) {
    //   console.log(response);
    //   console.log(file);
    // },
    uploadAvatar(v) {
      console.log(v);
      let data = new FormData();
      data.append("imgFile", v.file);
      console.log(data.get("imgFile"));
      let imgFile = {
        name: v.file.name,
        data: v.file,
      };
      this.$http
        .post(v.action, {
          headers: { "Content-Type": "multipart/form-data" },
          imgSize: 1080, //图片尺寸,需要正方形图片
          cookie: localStorage.getItem("cookie"),
          data,
        })
        .then((res) => {
          console.log(res.data);
          // this.avatarUrl = res.data.data.url;
        });
    },
    birthday() {
      let birthday = new Date(this.year, this.month, this.day);
      console.log(birthday.valueOf());
      return birthday.valueOf();
    },
    async checkNickname() {
      await this.$http
        .get(`/nickname/check?nickname=?timestamp=${Date.now()}`)
        .then((res) => {
          console.log(res.data);
        });
    },
    async updateUserInfo() {
      if (!this.isChanged) {
        return;
      }
      this.userInfo.birthday = this.birthday();
      await this.$http
        .post(
          `/user/update?uid=${localStorage.getItem(
            "uid"
          )}?timestamp=${Date.now()}`,
          {
            cookie: localStorage.getItem("cookie"),
            headers: { "content-type": "application/x-www-form-urlencoded" },
            ...this.userInfo,
          }
        )
        .then((res) => {
          console.log(res.data);
        });
    },
    async getUserInfo() {
      await this.$http
        .get(
          `/user/detail?uid=${localStorage.getItem(
            "uid"
          )}?timestamp=${Date.now()}`,
          {
            cookie: localStorage.getItem("cookie"),
          }
        )
        .then((res) => {
          console.log(res.data.profile, Date.now());
          let profile = res.data.profile;
          this.avatarUrl = profile.avatarUrl;
          this.userInfo.nickname = profile.nickname;
          this.userInfo.gender = profile.gender;
          this.userInfo.birthday = profile.birthday;
          this.userInfo.city = profile.city;
          this.userInfo.province = profile.province;
          this.userInfo.signature = profile.signature;
          this.originUserInfo = JSON.parse(JSON.stringify(this.userInfo));
          // console.log(new Date(-profile.birthday));
        });
    },
    async getAreaList() {
      await this.$http
        .get(`/countries/code/list`, {
          cookie: localStorage.getItem("cookie"),
        })
        .then((res) => {
          console.log(res.data);
          //   console.log(localStorage.getItem("uid"));
          // this.playlist = res.data.playlist[0];
          //   this.id = res.data.playlist[0].id;
        })
        .catch((err) => err);
    },
  },
};
</script>
<style lang="scss" >
.edit {
  background-color: white;
  height: 100%;
  padding: 0 0.5rem;
  .title {
    padding: 0.5rem 0;
    font-size: 0.32rem;
    font-weight: bold;
  }
  .box {
    display: flex;
    .left {
      width: 7rem;
      overflow: hidden;
      .row {
        font-size: 0.2rem;
        width: 7rem;
        min-height: 0.45rem;
        line-height: 0.45rem;
        color: #333333;
        display: flex;
        align-items: center;
        margin: 0.15rem 0;
        .label {
          min-width: 0.7rem;
          height: 0.45rem;
          line-height: 0.45rem;
        }
        .date,
        .area {
          display: flex;
          flex: 1;
          justify-content: space-between;
          div {
            width: 2rem;
          }
        }
      }
    }

    .right {
      flex: 1;
      // overflow: hide;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .avatar {
        img {
          width: 2.3rem;
          height: 2.3rem;
        }
      }
    }
  }
  .btn {
    cursor: pointer;
    height: 0.45rem;
    font-size: 0.2rem;
    box-sizing: border-box;
    padding: 0 0.3rem;
    line-height: 0.43rem;
    border: 1px solid #dedede;
    border-radius: 0.3rem;
    width: fit-content;
    color: #333333;
    margin: 0 0.15rem;
  }
  .white {
  }
  .white:hover {
    background-color: #f2f2f2;
  }
  .red {
    background: #ec4141;
    color: white;
  }
  .red:hover {
    background: #d83535;
  }
  .forbid {
    opacity: 0.5;
  }
  .forbid:hover {
    background: #ec4141;
    cursor: default;
  }
  .editBtn {
    width: 4.25rem;
    margin-top: 0.4rem;
    display: flex;
    justify-content: center;
  }
}

.el-textarea {
  height: 1.13rem;
  textarea {
    height: 1.13rem !important;
  }
}
.el-select {
  width: 2rem !important;
  height: 0.4rem;
  input {
    width: 2rem;
    height: 0.4rem;
    font-size: 0.2rem;
  }
  .el-input__icon {
    line-height: 0.4rem;
  }
}
.el-form,
.el-form-item {
  height: 100%;
  width: 100%;
  // margin: 0;
}
</style>