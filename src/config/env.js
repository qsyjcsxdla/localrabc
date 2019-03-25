// var config = {
//   //本项目请求地址
//   baseUrl: 'http://localhost:8989',
//   //网关服务地址
//   gatewayUrl: 'https://easy-mock.com/mock/5c7f29a049c6867c0752c380/power'

// }
// export default config;

/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl    : 域名地址
 * routerMode : 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = '';

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://127.0.0.1:7300/mock/5c9350d351dd29304022b06c/power';
}else{
	baseUrl = 'http://127.0.0.1:7300/mock/5c9350d351dd29304022b06c/power';

}

export {
	baseUrl
}
