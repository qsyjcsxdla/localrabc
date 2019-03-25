import fetch from '@/config/fetch'

/**
 *
 * 首页最近操作
 */
export const getLastDo = data => fetch('/lastdo',data);


/**
 *
 * 首页个人信息
 */


export const getPerInf = () => fetch('/person');


/**
 *机构信息
 */

 export const getOrangeInf = data => fetch('/total',data);

 /**

 删除机构信息
  */
export const getDeleteOrganInf = data => fetch('/delete', data);


/**
 *
 * 机构表单提交
 */

export const submitOrganFormInf = data => fetch('/add', data);

/**
 * 修改机构信息
 */

export const getChangeOrganInf = data => fetch('/totalform', data);

/**
 *
 * 角色管理
 */

export const getRoleInf = data => fetch('/total',data);

/**
 *
 * 删除角色信息
 */
export const getDeleteRoleInf = data => fetch('/delete', data);


/**
 *
 * 修改角色信息
 */


export const getChangeRoleInf = data => fetch('/totalform', data);



/**
 * 角色表单提交
 *
 */

export const submitRoleFormInf = data => fetch('/add', data);


/**
 *
 * 人员管理
 */

export const getUserInf = data => fetch('/total',data);

/**
 *
 * 删除人员信息
 */
export const getDeleteUserInf = data => fetch('/delete', data);


/**
 *
 * 修改人员信息
 */


export const getChangeUserInf = data => fetch('/totalform', data);



/**
 * 人员表单提交
 *
 */

export const submitUserFormInf = data => fetch('/add', data);

/**
 *
 * 审核岗管理
 */

export const getExamInf = data => fetch('/total',data);

/**
 *
 * 删除岗位信息
 */
export const getDeleteExamInf = data => fetch('/total',data);

/**
 *
 * 查看岗位信息
 */
export const getLookExamInf = data => fetch('/esam',data);

/**
 * 维护栏维护对应信息渲染
 *
*/

export const getSonExamInf = data => fetch('/total',data);

/**
 *
 * 修改人员信息
 */


export const getChangeExamInf = data => fetch('/totalform', data);



/**
 * 人员表单提交
 *
 */

export const submitExamFormInf = data => fetch('/add1', data,'POST');


/**
 *APP信息
 */

export const getAppInf = data => fetch('/total',data);

/**

删除app信息
 */
export const getDeleteAppInf = data => fetch('/delete', data);


/**
*
* app表单提交
*/

export const submitAppFormInf = data => fetch('/add', data);

/**
* 修改app信息
*/

export const getChangeAppInf = data => fetch('/totalform', data);

/**
 *数据字典信息
 */

export const getDicInf = data => fetch('/total',data);

/**

删除数据字典信息
 */
export const getDeleteDicInf = data => fetch('/delete', data);


/**
*
* 数据字典表单提交
*/

export const submitDicFormInf = data => fetch('/add', data);

/**
* 修改数据字典信息
*/

export const getChangeDicInf = data => fetch('/totalform', data);



/**
 *日志管理信息
 */

export const getJouInf = data => fetch('/total',data);



/**
 *应用构建信息
 */

export const getAppliInf = data => fetch('/total',data);

/**

删除应用构建信息
 */
export const getDeleteAppliInf = data => fetch('/delete', data);


/**
*
* 应用构建表单提交
*/

export const submitAppliFormInf = data => fetch('/add', data);


/**
* 修改应用构建信息
*/

export const getChangeAppliInf = data => fetch('/totalform', data);


/**
 *按钮构建信息
 */

export const getBtnInf = data => fetch('/total',data);

/**

删除按钮构建信息
 */
export const getDeleteBtnInf = data => fetch('/delete', data);


/**
*
* 按钮构建表单提交
*/

export const submitBtnFormInf = data => fetch('/add', data);


/**
* 修改按钮构建信息
*/

export const getChangeBtnInf = data => fetch('/totalform', data);


/**
* 获取图标信息
*/
export const getIconInf = data => fetch('/icon', data);



/**
 *菜单构建信息
 */

export const getMenuInf = data => fetch('/total',data);

/**

删除菜单构建信息
 */
export const getDeleteMenuInf = data => fetch('/delete', data);


/**
*
* 菜单构建表单提交
*/

export const submitMenuFormInf = data => fetch('/add', data);


/**
* 修改菜单构建信息
*/

export const getChangeMenuInf = data => fetch('/totalform', data);


export const getWeatherInf = data => fetch('https://www.apiopen.top/weatherApi', data);





/**
 * 登陆
 */
export const login = data => fetch('/admin/login', data, 'POST');

/**
 * 退出
 */

export const signout = () => fetch('/admin/signout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('/admin/info');

/**
 * api请求量
 */

export const apiCount = date => fetch('/statis/api/' + date + '/count');

/**
 * 所有api请求量
 */

export const apiAllCount = () => fetch('/statis/api/count');


/**
 * 所有api请求信息
 */

export const apiAllRecord = () => fetch('/statis/api/all');

/**
 * 用户注册量
 */

export const userCount = date => fetch('/statis/user/' + date + '/count');

/**
 * 某一天订单数量
 */

export const orderCount = date => fetch('/statis/order/' + date + '/count');


/**
 * 某一天管理员注册量
 */

export const adminDayCount = date => fetch('/statis/admin/' + date + '/count');

/**
 * 管理员列表
 */

export const adminList = data => fetch('/admin/all', data);

/**
 * 管理员数量
 */

export const adminCount = () => fetch('/admin/count');

/**
 * 获取定位城市
 */

export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});

/**
 * 添加商铺
 */

export const addShop = data => fetch('/shopping/addShop', data, 'POST');

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
	type   : 'search',
	city_id: cityid,
	keyword: value
});

/**
 * 获取当前店铺食品种类
 */

export const getCategory = restaurant_id => fetch('/shopping/getcategory/' + restaurant_id);

/**
 * 添加食品种类
 */

export const addCategory = data => fetch('/shopping/addcategory', data, 'POST');


/**
 * 添加食品
 */

export const addFood = data => fetch('/shopping/addfood', data, 'POST');


/**
 * category 种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category');

/**
 * 获取餐馆列表
 */

export const getResturants = data => fetch('/shopping/restaurants', data);

/**
 * 获取餐馆详细信息
 */

export const getResturantDetail = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id);

/**
 * 获取餐馆数量
 */

export const getResturantsCount = () => fetch('/shopping/restaurants/count');

/**
 * 更新餐馆信息
 */

export const updateResturant = data => fetch('/shopping/updateshop', data, 'POST');

/**
 * 删除餐馆
 */

export const deleteResturant = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id, {}, 'DELETE');

/**
 * 获取食品列表
 */

export const getFoods = data => fetch('/shopping/v2/foods', data);

/**
 * 获取食品数量
 */

export const getFoodsCount = data => fetch('/shopping/v2/foods/count', data);


/**
 * 获取menu列表
 */

export const getMenu = data => fetch('/shopping/v2/menu', data);

/**
 * 获取menu详情
 */

export const getMenuById = category_id => fetch('/shopping/v2/menu/' + category_id);

/**
 * 更新食品信息
 */

export const updateFood = data => fetch('/shopping/v2/updatefood', data, 'POST');

/**
 * 删除食品
 */

export const deleteFood = food_id => fetch('/shopping/v2/food/' + food_id, {}, 'DELETE');

/**
 * 获取用户列表
 */

export const getUserList = data => fetch('/v1/users/list', data);

/**
 * 获取用户数量
 */

export const getUserCount = data => fetch('/v1/users/count', data);

/**
 * 获取订单列表
 */

export const getOrderList = data => fetch('/bos/orders', data);

/**
 * 获取订单数量
 */

export const getOrderCount = data => fetch('/bos/orders/count', data);

/**
 * 获取用户信息
 */

export const getUserInfo = user_id => fetch('/v1/user/' + user_id);

/**
 * 获取地址信息
 */

export const getAddressById = address_id => fetch('/v1/addresse/' + address_id);

/**
 * 获取用户分布信息
 */

export const getUserCity = () => fetch('/v1/user/city/count');
