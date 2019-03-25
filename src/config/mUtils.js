/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr];
    }else{
        target = document.defaultView.getComputedStyle(element,null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode == 'float'? parseFloat(target): parseInt(target);
}

/**
 *
 * 高德地图天气与定位
 */
export function AP(ak = '51c8217b4e2f13b370310d9e982fff5c') {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
      resolve(AMap)
    }
    if (typeof AMap === 'undefined') {
      var script         = document.createElement("script")
          script.type    = "text/javascript"
          script.src     = "https://webapi.amap.com/maps?v=1.4.13&key="+ak+"&plugin=AMap.CitySearch"
          script.onerror = reject
      document.head.appendChild(script)
    } else {
      resolve(AMap)
    }
  })
}


