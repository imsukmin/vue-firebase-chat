<template>
  <div id="chatHeader">
    <div id="chatHeaderTitle">Vue Chatting</div>
    <div id="chatHeaderUserPic">
      <img src="/static/profile_placeholder.png" alt="default profile image">
    </div>
    <div id="chatHeaderButtonContainer">
      <div id="chatHeaderGoogleLoginButton" class="button green" @click="signinGoogle">GOOGLE</div>
      <div id="chatHeaderGuestLoginButton" class="button grey" @click="signinGuest">GUEST</div>
      <div id="chatHeaderLogoutButton" class="button red" @click="signOut">LOGOUT</div>
      <input type="text" id="chatHeaderGuestLoginUsername" placeholder="Input Guest Name" :value="inputValue">
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      'inputValue': '',
      'signinGoogle': function () {},
      'signinGuest': function () {},
      'signOut': function () {}
    }
  },
  mounted: function () {
    // signinGoogle
    this.signinGoogle = window.vueChat.signInGoogle
    this.signinGuest = window.vueChat.signInGuest
    this.signOut = window.vueChat.signOut
  }
}
</script>

<style lang="scss">
#chatHeader {
  position: fixed;
  top: 0;
  background-color: #41B883;
  width: 100%;
  height: 100px;
  z-index: 100;
  #chatHeaderTitle {
    display: inline-block;  
    color: #FFFFFF;
    font-size: 45px;
    font-weight: 700;
    margin: 20px;
  }
  #chatHeaderUserPic {
    display: inline-block;
    position: absolute;
    top: 20px;
    right: 190px;
    margin: 10px 0 0 0;
    display: none;
    img {
      width: 50px;
      height: 50px;
      border: 1px solid #41B883;
      border-radius: 25px;
    }
  }
  #chatHeaderButtonContainer {
    display: inline-block;
    position: absolute;
    right: 0;
    margin: 5px;
    span {
      display: inline-block;
    }
    .button {
      display: inline-block;
      border-radius: 4px;
      color: #fff;
      padding: 5px 10px;
      text-decoration: none;
      cursor: pointer;
      &.green {
        border: 1px solid #3b8070;
        background-color: #3b8070;
        opacity: 0.7;
      }
      &.green:hover {
        opacity: 1;
      }
      &.grey {
        border: 1px solid #35495e;
        margin-left: 5px;
        background-color: #35495e;
        opacity: 0.7;
      }
      &.grey:hover {
        opacity: 1;
      }
      &.red {
        border: 1px solid #D5616A;
        padding: 5px 50px;
        background-color: #D5616A;
        opacity: 0.7;
        display: none;
      }
      &.red:hover {
        opacity: 1;
      }
    }
    input#chatHeaderGuestLoginUsername {
      display: block;
      position: absolute;
      right: 0;
      margin: 5px 0;
      width: 152px;
      height: 25px;
    }
  }
}
</style>
