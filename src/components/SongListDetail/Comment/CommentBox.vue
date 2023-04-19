<template>
  <div class="commentBox">
    <div class="left">
      <img :src="comment.user.avatarUrl" alt="" />
    </div>
    <div class="right">
      <div class="top">
        <span class="nickname">{{ comment.user.nickname }}:</span>
        <span class="content">{{ comment.content }}</span>
      </div>
      <div class="bottom">
        <div class="postTime">{{ postTime }}</div>
        <div class="options">
          <div class="item hide">举报</div>
          <div class="line hide"></div>
          <div class="item">
            <img src="@/assets/static/icon/like.png" alt="" />
            {{ comment.likedCount || "" }}
          </div>
          <div class="line"></div>
          <div class="item">
            <img src="@/assets/static/icon/share.png" alt="" />
          </div>
          <div class="line"></div>
          <div class="item">
            <img src="@/assets/static/icon/message.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    comment: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    postTime() {
      if (!this.comment.time) {
        return "";
      }
      let date = new Date(this.comment.time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let minute = date.getMinutes();
      let hour = date.getHours();
      let now = new Date();
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      let duration =
        ((now.valueOf() - this.comment.time) / 1000) * 24 * 60 * 60;
      if (duration < 2 && duration >= 1) {
        return this.comment.timeStr;
      }
      if (year == now.getFullYear()) {
        return `${month}月${day}日 ${hour}:${minute}`;
      }
      return `${year}年${month}月${day}日 ${hour}:${minute}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.commentBox {
  margin: 0 0.5rem;
  display: flex;
  align-items: center;
  font-size: 0.2rem;
  min-height: 1.1rem;
  border-bottom: 1px solid #f2f2f2;
}
.hide {
  display: none !important;
}
.commentBox:hover .hide {
  display: block !important;
}
.left {
  width: 0.55rem;
  height: 0.55rem;
  margin-right: 0.2rem;
  img {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
  }
}
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  .top {
    .nickname {
      color: #5a85b4;
    }
    .content {
      color: #3e3e3e;
    }
  }
  .bottom {
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .postTime {
      color: #999999;
    }
    .options {
      display: flex;
      align-items: center;
      .item {
        cursor: pointer;
        color: #999999;
        display: flex;
        align-items: center;
      }
      .line {
        height: 0.2rem;
        width: 0.01rem;
        background-color: #dadada;
        margin: 0 0.2rem;
      }
      img {
        width: 0.2rem;
        height: 0.2rem;
      }
    }
  }
}
</style>