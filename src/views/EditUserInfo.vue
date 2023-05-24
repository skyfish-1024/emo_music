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
            <div class="btn white" @click="cancel">取消</div>
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
          :show-file-list="false"
        >
          <div class="btn white">修改头像</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>
<script>
import { Loading } from "element-ui";
export default {
  data() {
    var checkNickname = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入昵称"));
      }
      if (value == JSON.parse(this.originUserInfo).nickname) {
        return callback();
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
      uploadUrl: `http://localhost:4000/avatar/upload?imgX=0&imgY=0`,
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
      originUserInfo: "",
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
    //判断用户信息是否发生改变
    isChanged() {
      return !(JSON.stringify(this.userInfo) == this.originUserInfo);
    },
  },
  watch: {
    year() {
      this.userInfo.birthday = new Date(
        this.year,
        this.month - 1,
        this.day
      ).valueOf();
    },
    month() {
      this.userInfo.birthday = new Date(
        this.year,
        this.month - 1,
        this.day
      ).valueOf();
    },
    day() {
      this.userInfo.birthday = new Date(
        this.year,
        this.month - 1,
        this.day
      ).valueOf();
    },
  },
  async created() {
    // await this.getAreaList();
    await this.getUserInfo();
  },
  methods: {
    //获取图片大小
    async getImgSize(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (theFile) {
          let image = new Image();
          image.src = theFile.target.result;
          image.onload = function () {
            resolve({
              width: this.width,
              height: this.height,
            });
          };
        };
      });
    },
    //更新头像
    async uploadAvatar(f) {
      let load = Loading.service({ text: "头像更新中", target: ".edit" });
      let file = f.file;
      delete file.uid;
      const imgSize = await this.getImgSize(file);
      let param = new FormData();
      param.append("imgFile", file);
      await this.$http
        .post(`/avatar/upload?imgX=0&imgY=0&imgSize=${imgSize.width}`, param, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          // console.log(res.data);
          load.close();
          if (res.data.code == 200) {
            this.$store.commit("setInfoChangeTime", Date.now().valueOf());
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.avatarUrl = res.data.data.url;
          } else {
            this.$message({
              message: "修改失败",
              type: "error",
            });
          }
        })
        .catch((err) => {
          load.close();
          this.$message({
            message: "修改失败",
            type: "error",
          });
        });
    },

    //更新用户信息
    async updateUserInfo() {
      if (!this.isChanged) {
        return;
      }
      let load = Loading.service({ text: "信息更新中", target: ".edit" });
      await this.$http
        .get(`/user/update?uid=${localStorage.getItem("uid")}`, {
          params: this.userInfo,
        })
        .then((res) => {
          // console.log(res.data);
          load.close();
          if (res.data.code == 200) {
            this.$store.commit("setInfoChangeTime", Date.now().valueOf());
            this.$message({
              message: "修改成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "修改失败",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel() {
      this.userInfo = JSON.parse(this.originUserInfo);
    },
    //获取用户信息
    async getUserInfo() {
      await this.$http
        .get(`/user/detail?uid=${localStorage.getItem("uid")}`)
        .then((res) => {
          let profile = res.data.profile;
          this.avatarUrl = profile.avatarUrl;
          // this.userInfo.nickname = profile.nickname;
          // this.userInfo.gender = profile.gender;
          // this.userInfo.birthday = profile.birthday;
          // this.userInfo.city = profile.city;
          // this.userInfo.province = profile.province;
          // this.userInfo.signature = profile.signature;
          this.userInfo = profile;
          if (profile.birthday > 0) {
            let birthday = new Date(profile.birthday);
            this.year = birthday.getFullYear();
            this.month = birthday.getMonth() + 1;
            this.day = birthday.getDate();
          }
          this.originUserInfo = JSON.stringify(this.userInfo);
        });
    },
    //获取城市列表
    async getAreaList() {
      await this.$http
        .get(`/countries/code/list`)
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
    width: 100%;
    .left {
      min-width: 7rem;
      overflow: hidden;
      .row {
        font-size: 0.2rem;
        width: 7rem;
        min-height: 0.45rem;
        line-height: 0.45rem;
        color: #333333;
        display: flex;
        // align-items: center;
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
  min-height: 1.13rem;
  textarea {
    min-height: 1.13rem !important;
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
.el-select-dropdown__item,
.el-select-dropdown__empty {
  font-size: 0.2rem;
  text-align: center;
}
.el-form,
.el-form-item {
  height: 100%;
  width: 100%;
  // margin: 0;
}
</style>