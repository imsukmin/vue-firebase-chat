<template>
  <div id="chatAppContainer">
    <chatHeader />
    <chatNotifier />
    <chatMessageContainer />
    <chatFooter />
  </div>
</template>

<script>
import chatMessageContainer from './chatMessageContainer'
import chatHeader from './chatHeader'
import chatFooter from './chatFooter'
import chatNotifier from './chatNotifier'

export default {
  name: 'vueChatApp',
  data () {
    return {}
  },
  components: {
    'chatHeader': chatHeader,
    'chatMessageContainer': chatMessageContainer,
    'chatFooter': chatFooter,
    'chatNotifier': chatNotifier
  }
}
</script>
