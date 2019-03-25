
//配置代理的


module.exports = {
  proxy: {
        '/apis': {    //将www.exaple.com印射为/apis
            // target      : 'https://www.easy-mock.com/mock/5c7f29a049c6867c0752c380/power',   // 接口域名
            target      : 'https://www.apiopen.top',
            secure      : false,                       // 如果是https接口，需要配置这个参数
            changeOrigin: true,                        //是否跨域
            pathRewrite : {
                '^/apis': ''  //需要rewrite的,
            }
        }
  }
}
