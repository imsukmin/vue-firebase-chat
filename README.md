Example site : [vuechattingapp.firebaseapp.com](http://vuechattingapp.firebaseapp.com)

# vue-firebase-chat

> chat app used vue.js and firebase

vue.js와 firebase를 이용하여 만들어진 채팅 앱입니다.

firebase와 관련된 코드는 /static/firebaseForVueChat.js 입니다.

## Setting for dev

시작전에 `npm run dev`의 정상 작동을 위해 `터미널` 혹은 `cmd(=powershell)`을 사용하여

`프로젝트 루트 폴더`에서 `cp index.sample.html index.html`을 한번 실행해 주신후에 사용해주세요.

firebase를 사용하기 위해서는 firebase init을 위한 config 정보가 필요합니다. 

config를 불러오는 방법은 [여기](https://firebase.google.com/docs/web/setup)서 자세한 정보를 확인 할수 있으며

위의 정보를 index.sample.html 중 아래의 부분과 일치하는 부분에 끼워 넣으면 됩니다.


``` html 

  ...
  <script src="https://www.gstatic.com/firebasejs/3.9.0/firebase.js"></script>
  <script>
    // Initialize Firebase
    // TODO: Replace with your project's customized code snippet
    // ref: https://firebase.google.com/docs/web/setup
    var config = {
      apiKey: "<API_KEY>",
      authDomain: "<PROJECT_ID>.firebaseapp.com",
      databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
      storageBucket: "<BUCKET>.appspot.com",
      messagingSenderId: "<SENDER_ID>",
    };
    firebase.initializeApp(config);
  </script>
  <script src="/static/firebaseForVueChat.js"></script>
  ...

```

## firebaseForVueChat.js

이 파일을 vue와 결합(혹은 분리)하기 위해 많은 고민을 했습니다. 

firebase에서는 vue에서 사용되는 form data를 가져오기 위해 firebase 객체에 html element를 붙이는 방법을 사용하고 있습니다.(google firebase codelab을 참조했습니다.)

vue역시 signin, siginout, loadMessage등등 firebase를 가져오는 함수를 button이나 form element에 event bind을 해줘야 합니다.

둘의 로딩 순서에 따라 다른 에러가 발생하는 문제가 생기게 되는데 이 문제를 다음과 같은 로딩 순서로 해결하였습니다.

1. firebaseForVueChat.js loading
2. render vue components
3. bind form elements to firebase Object

3번에 해당하는 함수명이 `firebaseForVueChat.js`의 `getUIelements`입니다.

## firebase deploy를 위한 Guide

firebase에서는 작업해야 하는부분은 다음과 같습니다.

1. `npm run build`를 하여 vue와 관련된 css,js,image파일을 만들고 그 파일들을 firebase의 deploy를 하는 폴더에 각각 넣어준다.
2. firebase의 index.html에 옮겼던 css, js만 각각의 소스 로딩을 위한 HTML code를 작성한다.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
