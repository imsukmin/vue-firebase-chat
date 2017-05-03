<template>
  <div id="chatMessageContainer">
    <div class="chatMessage" v-for="(message, index) in messages">
      <div class="chatMessageUserPic">
        <img :src="message.photoUrl" alt="UserPic">
      </div>
      <div class="chatMessageContext">
        <div class="chatMessageUsername">{{ message.name }}</div>
        <div class="chatMessageText">{{ message.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    'messages': function () {
      // console.log('computed update!')
      return this.$store.getters.messages
    }
  }
}
</script>

<style lang="scss">
#chatMessageContainer {
   margin: 100px 0 50px;
  .chatMessage {
    margin: 2px 0 0 0;
    .chatMessageUserPic {
      display: inline-block;
      img {
        width: 40px;
        height: 40px;
        border: 1px solid rgba(255,255,255,0);
        border-radius: 25px;
      }
    }
    .chatMessageContext {
      display: inline-block;
      line-height: 20px;
      vertical-align: top;
      .chatMessageUsername {
        color: #F00;
        font-size: 14px;
      }
      .chatMessageText {
        display: inline-block;
      }
    }

  }
}
</style>
