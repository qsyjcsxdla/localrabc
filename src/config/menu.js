module.exports = [
  {name:'系统管理', id:'manage', icon:'el-icon-menu', sub:[
      {name:'机构管理', path:'/organ',icon:'el-icon-ump-institute'},
      {name:'角色管理', path:'/role',icon:'el-icon-ump-jiaoseguanli'},
      {name:'人员管理', path:'/user',icon:'el-icon-ump-renyuanguanli'},
      {name:'审核岗维护', path:'/maintain',icon:'el-icon-ump-shenhe-copy'},
      {name:'APP授权', path:'/authorization',icon:'el-icon-ump-shouquan'},
      {name:'数据字典', path:'/dictionary',icon:'el-icon-ump-zidian'},
      {name:'日志管理', path:'/journal',icon:'el-icon-ump-rizhi'}
  ]},
  {name:'系统构建', id:'build', icon:'el-icon-menu', sub:[
      {name:'应用构建', path:'/application',icon:'el-icon-ump-yingyong'},
      {name:'按钮构建', path:'/button',icon:'el-icon-ump-anniu'},
      {name:'菜单构建', path:'/menu',icon:'el-icon-ump-caidan'},
  ]}
]
