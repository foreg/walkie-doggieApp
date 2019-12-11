import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
//import connect from '@vkontakte/vkui-connect-mock';
import App from './App';
import registerServiceWorker from './sw';
// import { response as res } from '@vkontakte/vkui-connect-mock';
// res.VKWebAppGetUserInfo.data = {
//     "type": "VKWebAppGetUserInfoResult",
//     "data": {
//         "signed_user_id": "hlnJ8vnD2Q2fcjkHBZz8ERN7bYwFq4SO-tBEyU2uL4w",
//         "id": 203272533,
//         "first_name": "Дмитрий",
//         "last_name": "Строков",
//         "sex": 2,
//         "city": {
//             "id": 147,
//             "title": "Тюмень"
//         },
//         "country": {
//             "id": 1,
//             "title": "Россия"
//         },
//         "photo_100": "https://pp.userapi.com/c836739/v836739610/6563f/bz86ampXSJs.jpg?ava=1",
//         "photo_200": "https://pp.userapi.com/c836739/v836739610/6563d/fUe-kRuKBp0.jpg?ava=1",
//         "timezone": 5
//     }
// }
// Init VK App
connect.send('VKWebAppInit', {});

// Service Worker For Cache
registerServiceWorker();

ReactDOM.render(<App />, document.getElementById('root'));
