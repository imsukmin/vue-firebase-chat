<template>
  <div id="chatNotifierContainer">
    <div id="chatNotifierMessage" :class="notiMessage[0] !== undefined ? notiMessage[0].style : ''">
      <span>{{ notiMessage[0] !== undefined ? notiMessage[0].message : '' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'notiMessage': this.$store.getters.notify.messageQueue
    }
  },
  beforeUpdate: function () {
    // console.log('beforeUpdate')
    var self = this
    if (this.notiMessage.length === 0) {
      this.$el.classList.remove('on')
    } else if (this.notiMessage.length > 0) {
      setTimeout(function (e) {
        // console.log('noti start!', self)
        self.$el.classList.add('on')
      }, 100)
      setTimeout(function (e) {
        // console.log('noti end!', self)
        self.$store.dispatch('unsetNotiMessage') // eslint-disable-line
        self.$el.classList.remove('on')
      }, 5000 * (this.notiMessage.length))
    }
  }
}
</script>

<style lang="scss">
#chatNotifierContainer {
  position: fixed;
  top: 0px;
  background-color: rgba(0,0,0,0.4);
  height: 0;
  z-index: 80;
  width: calc(100% - 20px);
  border-radius: 10px;
  margin: 10px;
  transition: height 0.5s, top 0.3s;
  -webkit-transition: height 0.5s, top 0.3s;
  transition-timing-function: ease-in-out;
  -webkit-transition-timing-function: ease-in-out;
  &.on {
    height: 50px;
    top: 100px;
  }
  #chatNotifierMessage {
    color: #FFFFFF;
    line-height: 50px;
    text-align: right;
    padding: 0 20px;
    span {
      background: #E5CB19;
    }
  }
}
</style>
