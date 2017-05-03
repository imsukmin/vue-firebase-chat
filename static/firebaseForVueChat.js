'use strict'

/* global firebase vueChat chatApp */

// Initializes vueChat.
function VueChat () {
  this.initFirebase()
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
VueChat.prototype.initFirebase = function () {
  // console.log('initFirebase')
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth()
  this.database = firebase.database()
  // 217s Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this))
}

// Loads chat messages history and listens for upcoming ones.
VueChat.prototype.loadMessages = function () {
  // console.log('loadMessages')
  // Reference to the /messages/ database path.
  this.messagesRef = this.database.ref('messages')
  // Make sure we remove all previous listeners.
  this.messagesRef.off()

  // Loads the last 12 messages and listen for new ones.
  var setMessage = function (data) {
    var val = data.val()
    vueChat.displayMessage(null, val)
  }
  this.messagesRef.limitToLast(12).on('child_added', setMessage)
  this.messagesRef.limitToLast(12).on('child_changed', setMessage)
}

// Saves a new message on the Firebase DB.
VueChat.prototype.saveMessage = function (e) {
  // console.log('saveMessage', vueChat.messageInput.value && vueChat.checkSignedInWithMessage())
  e.preventDefault()
  // Check that the user entered a message and is signed in.
  if (vueChat.messageInput.value && vueChat.checkSignedInWithMessage()) {
    var currentUser = vueChat.auth.currentUser
    // console.log('currentUser', currentUser)
    var userImage = currentUser.photoURL || '/static/profile_placeholder.png'
    var username = vueChat.userName.value
    let messageProtocol = {
      name: username,
      message: vueChat.messageInput.value,
      photoUrl: userImage
    }
    // console.log(messageProtocol)
    // Add a new message entry to the Firebase Database.
    vueChat.messagesRef.push(messageProtocol).then(function () {
      // Clear message text field and SEND button state.
      this.messageInput.value = ''
    }.bind(vueChat)).catch(function (error) { // eslint-disable-line
      console.error('Error writing new message to Firebase Database', error)
    })
  } else {
    // vueChat.displayMessage('Plz sign-in if you want to chat')
    vueChat.notify('Plz sign-in if you want to chat')
  }
}

// Signs-in with firebase.
VueChat.prototype.signInGoogle = function () {
  // console.log('signInGoogle')
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider()
  vueChat.auth.signInWithPopup(provider)
}

VueChat.prototype.signInGuest = function () {
  // console.log('signInGuest')
  if (vueChat.userName.value === '') {
    // vueChat.displayMessage('input username for chatting')
    vueChat.notify('input username for chatting')
    vueChat.userName.focus()
    return
  }
  var provider = new firebase.auth().signInAnonymously() // eslint-disable-line
}

// Signs-out of with firebase.
VueChat.prototype.signOut = function () {
  // console.log('signOut')
  vueChat.auth.signOut()
}

VueChat.prototype.getUIelements = function () {
  // console.log('getUIelements')
  this.userName = document.getElementById('chatHeaderGuestLoginUsername')
  this.userPic = document.getElementById('chatHeaderUserPic')
  this.signinGoogleButton = document.getElementById('chatHeaderGoogleLoginButton')
  this.signinGuestButton = document.getElementById('chatHeaderGuestLoginButton')
  this.signOutButton = document.getElementById('chatHeaderLogoutButton')
  this.messageInput = document.getElementById('chatInput')
  this.chatMessageContainer = document.getElementById('chatMessageContainer')
  // console.log(this.userName, this.userPic, this.signinGoogleButton, this.signinGuestButton, this.signOutButton, this.messageInput, this.chatMessageContainer)
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
VueChat.prototype.onAuthStateChanged = function (user) {
  // console.log('onAuthStateChanged', user)
  if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    if (vueChat.userName.value === '' && user.isAnonymous) {
      vueChat.signOut()
      // vueChat.displayMessage('Signout if you login by GUEST')
      vueChat.notify('Signout if you login by GUEST')
    }
    var profilePicUrl = user.photoURL
    var userName = user.displayName
    // Set the user's profile pic and name.
    if (!user.isAnonymous) {
      vueChat.userPic.childNodes[0].src = profilePicUrl
      vueChat.userName.value = userName
    } else {
      vueChat.userPic.childNodes[0].src = '/static/profile_placeholder.png'
    }

    // Show user's profile and sign-out button.
    vueChat.userName.setAttribute('disabled', 'disabled')
    vueChat.userPic.style.display = 'inline-block'
    vueChat.signOutButton.style.display = 'inline-block'

    // Hide sign-in button.
    vueChat.signinGoogleButton.style.display = 'none'
    vueChat.signinGuestButton.style.display = 'none'

    // We load currently existing chant messages.
    this.loadMessages()
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    if (vueChat.userName) {
      chatApp.$store.dispatch('clearMessage')
      vueChat.userName.value = ''
      vueChat.userName.removeAttribute('disabled')
      vueChat.userPic.style.display = 'none'
      vueChat.signOutButton.style.display = 'none'

      // Show sign-in button.
      vueChat.signinGoogleButton.style.display = 'inline-block'
      vueChat.signinGuestButton.style.display = 'inline-block'
    }
  }
}

// Returns true if user is signed-in. Otherwise false and displays a message.
VueChat.prototype.checkSignedInWithMessage = function () {
  // console.log('checkSignedInWithMessage')
  /* TODO(DEVELOPER): Check if user is signed-in Firebase. */
  if (this.auth.currentUser) {
    return true
  }

  // Display a message to the user using a Toast.
  // vueChat.displayMessage('Plz sign-in if you want to chat')
  vueChat.notify('Plz sign-in if you want to chat')
  return false
}

// A loading image URL.
VueChat.prototype.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif'

// Displays a Message in the UI.
VueChat.prototype.displayMessage = function (message, data) {
  var messageProtocol
  if (message === null) {
    messageProtocol = {
      'name': data.name,
      'photoUrl': data.photoUrl,
      'message': data.message
    }
  } else {
    messageProtocol = {
      'name': 'SYSTEM',
      'photoUrl': '/static/dfox.jpg',
      'message': message
    }
  }
  chatApp.$store.dispatch('addMessage', messageProtocol)
  if (!this.chatMessageContainer || !this.messageInput) {
    this.getUIelements()
  }
  this.chatMessageContainer.scrollTop = this.chatMessageContainer.scrollHeight
  this.messageInput.focus()
}

VueChat.prototype.notify = function (message, style) {
  // console.log('notify', message, style)
  let messageQueue = chatApp.$store.getters.notify.messageQueue
  if (message === undefined || typeof message !== 'string') {
    return
  }
  if (style === undefined || style === null) {
    style = ''
  }
  var messageProtocol = {
    'message': message,
    'style': style
  }
  if (messageQueue.length === 0 || messageQueue[messageQueue.length - 1].message !== message) {
    chatApp.$store.dispatch('setNotiMessage', messageProtocol)
  }
}

window.vueChat = new VueChat() // eslint-disable-line
window.onload = function () {
  vueChat.getUIelements()
}

