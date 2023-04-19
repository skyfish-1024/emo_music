<template>
  <div class="header">
    <div class="box">
      <div class="left">
        <div class="logo">
          <img class="roundIcon" src="@/assets/static/icon/logo.png" alt="" />
          网易云音乐
        </div>
        <div class="routerCtrl">
          <img
            class="roundIcon"
            src="@/assets/static/icon/left.png"
            alt=""
            @click="back"
          />
          <img
            class="roundIcon"
            src="@/assets/static/icon/right.png"
            alt=""
            @click="go"
          />
        </div>
        <el-input
          class="search"
          size="mini"
          placeholder="世界那么大还是遇见你"
          prefix-icon="el-icon-search"
          v-model="searchText"
        >
        </el-input>
        <img
          class="roundIcon"
          src="@/assets/static/icon/microphone.png"
          alt=""
        />
      </div>

      <div class="right">
        <div class="avatar">
          <img class="roundIcon" :src="profile.avatarUrl" alt="" />
        </div>
        <div class="user" v-if="isShowUser">
          <div class="login" v-if="!isLogin">
            <div class="cancel" @click="cancel">
              <img src="@/assets/static/icon/cancel.png" alt="" />
            </div>
            <div class="tip1">扫码登录</div>
            <img
              v-if="onConfirm"
              src="@/assets/static/img/onConfirm.png"
              alt=""
            />
            <img v-else :src="QRimg" alt="" />
            <div v-if="onConfirm" class="tip2">请在手机上确认登录</div>
            <div v-else class="tip2">使用网易云音乐APP登录</div>
          </div>
          <div class="userInfo" v-else>
            <div class="cancel" @click="cancel">
              <img src="@/assets/static/icon/cancel.png" alt="" />
            </div>
            <div class="row">
              <img src="@/assets/static/icon/user_setting.png" alt="" />
              <div>个人</div>
              <img src="@/assets/static/icon/right_black.png" alt="" />
            </div>
            <div class="row">
              <img src="@/assets/static/icon/user_setting.png" alt="" />
              <div>个人</div>
              <img src="@/assets/static/icon/right_black.png" alt="" />
            </div>
            <div class="row">
              <img src="@/assets/static/icon/user_setting.png" alt="" />
              <div>个人</div>
              <img src="@/assets/static/icon/right_black.png" alt="" />
            </div>
            <div class="row">
              <img src="@/assets/static/icon/user_setting.png" alt="" />
              <div>个人</div>
              <img src="@/assets/static/icon/right_black.png" alt="" />
            </div>
            <div class="row" @click="toEdit">
              <img src="@/assets/static/icon/user_setting.png" alt="" />
              <div>个人信息设置</div>
              <img src="@/assets/static/icon/right_black.png" alt="" />
            </div>
            <div class="row" @click="logout">
              <img src="@/assets/static/icon/logout.png" alt="" />
              <div>退出登录</div>
            </div>
          </div>
        </div>
        <div class="name" @click="login">{{ profile.nickname }}</div>
        <div class="vip">
          开通
          <img src="@/assets/static/icon/right_white.png" alt="" />
        </div>
        <img class="squareIcon" src="@/assets/static/icon/clothes.png" alt="" />
        <img class="squareIcon" src="@/assets/static/icon/setting.png" alt="" />
        <img class="squareIcon" src="@/assets/static/icon/email.png" alt="" />
        <img class="squareIcon" src="@/assets/static/icon/line.png" alt="" />
        <img class="squareIcon" src="@/assets/static/icon/mini.png" alt="" />
        <img
          class="squareIcon"
          src="@/assets/static/icon/most_mini.png"
          alt=""
        />
        <img class="squareIcon" src="@/assets/static/icon/max.png" alt="" />
        <img class="squareIcon" src="@/assets/static/icon/close.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uid: "",
      profile: {
        nickname: "登录",
        avatarUrl:
          "http://qiniu.zzyozzy.top/724797F646BB87F2868A3DF772E26957.jpg.jpg",
      },
      isShowUser: false,
      isLogin: false,
      onConfirm: false,
      searchText: "",
      placeholder: "世界那么大，还是遇见你",
      QRkey: "",
      QRimg: "",
      queryId: 0,
    };
  },
  async created() {
    await this.getUid();
    await this.getProfile();
  },
  methods: {
    toEdit() {
      this.isShowUser = false;
      this.$router.push("/edit");
    },
    back() {
      this.$router.back();
    },
    go() {
      this.$router.go();
    },
    async login() {
      this.isShowUser = !this.isShowUser;
      if (this.uid) {
        this.isLogin = true;
        return;
      }
      await this.getQRkey();
      await this.getQRimg();
      this.queryId = setTimeout(this.getQRcheck, 1000);
    },
    async logout() {
      localStorage.clear();
      this.isLogin = false;
      this.uid = "";
      this.login();
    },
    cancel() {
      this.isShowUser = false;
      this.onConfirm = false;
      clearTimeout(this.queryId);
    },
    //获取key
    async getQRkey() {
      const { data: res } = await this.$http.get(
        `/login/qr/key?timestamp=${Date.now()}`
      );
      if (res.code != 200) {
      }
      this.QRkey = res.data.unikey;
    },
    //获取二维码
    async getQRimg() {
      const { data: res } = await this.$http.get(
        `/login/qr/create?qrimg=qrimg&key=${this.QRkey}&timestamp=${Date.now()}`
      );
      if (res.code != 200) {
      }
      this.QRimg = res.data.qrimg;
    },
    //查询二维码状态
    async getQRcheck() {
      clearTimeout(this.queryId);
      this.$http
        .get(`/login/qr/check?key=${this.QRkey}&timestamp=${Date.now()}`)
        .then((res) => {
          if (res.data.code == 803) {
            console.log("803", res.data);
            localStorage.setItem("cookie", res.data.cookie);
            document.cookie = res.data.cookie;
            this.isShowUser = false;
            this.onConfirm = false;
            this.isLogin = true;
            this.getUid();
            this.getProfile();
            return;
          }
          if (res.data.code == 802) {
            this.onConfirm = true;
            this.queryId = setTimeout(this.getQRcheck, 1000);
            return;
          }
          if (res.data.code == 801) {
            this.queryId = setTimeout(this.getQRcheck, 1000);
            return;
          }
          if (res.data.code == 800) {
            this.getQRkey()
              .then(() => {
                this.getQRimg();
              })
              .then(() => {
                this.queryId = setTimeout(this.getQRcheck, 1000);
              });
          }
        });
    },
    //获取id
    async getUid() {
      if (!localStorage.getItem("cookie")) {
        return;
      }
      await this.$http
        .post(`/login/status?timestamp=${Date.now()}`, {
          cookie: localStorage.getItem("cookie"),
        })
        .then((res) => {
          this.uid = res.data.data.account.id;
          localStorage.setItem("uid", res.data.data.account.id);
        });
    },
    //获取账户信息
    async getProfile() {
      if (!localStorage.getItem("cookie")) {
        return;
      }
      await this.$http.get(`/user/detail?uid=${this.uid}`).then((res) => {
        this.profile = res.data.profile;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
img,
.name,
.vip {
  cursor: pointer;
}
.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #ec4141;
}
.box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.4rem;
  width: 100%;
  margin: 0 0.25rem;
  //   background: lightblue;
}
.left {
  display: flex;
  align-items: center;
  height: 0.4rem;
  //   background: lightblue;
}
.logo {
  width: 2.77rem;
  height: 100%;
  color: #ffffff;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.roundIcon {
  height: 0.4rem;
  width: 0.4rem;
  border-radius: 50%;
  margin: 0 0.1rem;
  overflow: hidden;
  background: #df4242;
}
.routerCtrl {
  display: flex;
  align-items: center;
  margin-left: 0.45rem;
}
.search {
  width: 2.4rem;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 0.2rem;
  overflow: hidden;
}
.el-input__inner {
  height: 100%;
  width: 100%;
}
.right {
  position: relative;
  display: flex;
  align-items: center;
  height: 0.4rem;
}
.avatar {
  display: flex;
  align-items: center;
}
.name {
  font-size: 0.2rem;
  color: #fbd9d9;
  max-width: 1rem;
  margin-right: 0.2rem;
  overflow: hidden;
}
.vip {
  height: 0.2rem;
  width: 0.68rem;
  box-sizing: border-box;
  padding: 0.04rem;
  background: #cccccc;
  font-size: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fcfcfc;
  border-radius: 0.1rem;
  margin-right: 0.1rem;
  img {
    width: 0.15rem;
    height: 0.15rem;
  }
}
.squareIcon {
  height: 0.2rem;
  width: 0.2rem;
  margin: 0 0.15rem;
}

.user {
  z-index: 200;
  position: absolute;
  width: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  top: 0.8rem;
  overflow: hidden;
  border: 1px solid f0f0f0;
  box-shadow: 0px 1px 2px #a09d9d;
  img {
    height: 2.6rem;
    width: 2.6rem;
  }
}
.cancel {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  right: 0.1rem;
  top: 0.1rem;
  img {
    height: 100%;
    width: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
}
.tip1 {
  font-size: 0.4rem;
  margin: 0.45rem 0;
  text-align: center;
}
.tip2 {
  font-size: 0.2rem;
  margin: 0.25rem 0;
  text-align: center;
}
.userInfo {
  width: 100%;
  height: 3.6rem;
  padding-top: 0.6rem;
  // background-color: yellow;
  overflow: hidden;
  .row {
    cursor: pointer;
    height: 0.6rem;
    padding: 0 0.25rem;
    // width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      height: 0.2rem;
      width: 0.2rem;
    }
    div {
      flex: 1;
      font-size: 0.2rem;
      color: #333333;
      margin-left: 0.1rem;
    }
  }
  .row:hover {
    background-color: #f2f2f3;
  }
}
</style>