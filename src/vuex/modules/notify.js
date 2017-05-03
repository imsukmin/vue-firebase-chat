import * as types from '../mutation-types'

const state = {
  // notifiedMessage: '',
  // type: ''
  messageQueue: []
}

/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const mutations = {
  [types.SET_NOTIMESSAGE] (state, dataFromApp) {
    // console.log('SET_NOTIMESSAGE', dataFromApp)
    state.messageQueue.push(dataFromApp)
  },
  [types.UNSET_NOTIMESSAGE] (state) {
    // console.log('SET_NOTIMESSAGE', dataFromApp)
    state.messageQueue.shift()
  },
  [types.CLEAR_NOTIMESSAGE] (state) {
    // console.log('CLEAR_NOTIMESSAGE')
    state.messageQueue = []
  }
}

export default {
  state,
  mutations
}
