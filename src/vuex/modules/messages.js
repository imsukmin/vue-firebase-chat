import * as types from '../mutation-types'

const state = {
  messages: []
}

/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const mutations = {
  [types.SET_MESSAGES] (state, dataFromServer) {
    // console.log('SET_MESSAGES', dataFromServer)
    state.messages = dataFromServer
  },
  [types.ADD_MESSAGE] (state, dataFromApp) {
    // console.log('ADD_MESSAGE', dataFromApp)
    state.messages.push(dataFromApp)
  },
  [types.CLEAR_MESSAGE] (state) {
    // console.log('CLEAR_MESSAGE')
    state.messages = []
  }
}

export default {
  state,
  mutations
}
