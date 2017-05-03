<template>
  <div id="chatFooter">
    <input type="text" id="chatInput" placeholder="input message" :value="inputValue" @keypress.enter="saveMessage" />
    <button id="chatSendMessageButton" @click="saveMessage">Send</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'inputValue': '',
      'saveMessage': function () {}
    }
  },
  mounted: function () {
    this.saveMessage = window.vueChat.saveMessage
  }
}
</script>

<style lang="scss">
#chatFooter {
  position: fixed;
  bottom: 0;
  background-color: #35495E;
  height: 50px;
  width: 100%;
  #chatInput {
    display: inline-block;
    margin: 10px 0;
    width: 90%;
  }
  #chatSendMessageButton {
    display: inline-block;
    width: 8%;
    border: 0;
    background-color: #FFFFFF;
  }
}
</style>
