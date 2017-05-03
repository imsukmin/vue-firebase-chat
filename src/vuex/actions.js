import * as types from './mutation-types'

export const setMessages = ({ commit }, messages) => {
  commit(types.SET_MESSAGES, messages)
}

export const addMessage = ({ commit }, message) => {
  commit(types.ADD_MESSAGE, message)
}

export const clearMessage = ({ commit }) => {
  commit(types.CLEAR_MESSAGE)
}

export const setNotiMessage = ({ commit }, message) => {
  commit(types.SET_NOTIMESSAGE, message)
}

export const unsetNotiMessage = ({ commit }) => {
  commit(types.UNSET_NOTIMESSAGE)
}

export const clearNotiMessage = ({ commit }) => {
  commit(types.CLEAR_NOTIMESSAGE)
}
