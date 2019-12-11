// // import connect from '@vkontakte/vkui-connect';
// import connect from '@vkontakte/vkui-connect-mock';
// var x;
// connect.subscribe((e) => {
//     switch (e.detail.type) {
//         case 'VKWebAppGetUserInfoResult':
//             x = e.detail.data.id;
//             console.log(e.detail.data);                    
//             break;
//         default:
//             console.log(e.detail.type);
//     }
    
//     console.log(x);
// });
// connect.send('VKWebAppGetUserInfo', {});
// function onButtonTakeClick(e) {
//     console.log(e);
//     console.log(x);
// }