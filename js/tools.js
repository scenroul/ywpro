/* Javascript Document create by tw 2015-12-8*/
/*以下接口域配置*/
function getHost()
{
	return "http://sa.cmcc.com/";
}
/**
 * 以下本地缓存
 */
function getLocalCache(key) 
{
    var result;
    var storage = window.localStorage;
    if (storage) 
	{
        result = storage.getItem(key);
    }
    return result;
}

function setLocalCache(key, value) 
{
    var storage = window.localStorage;
    if (storage) 
	{
        storage.removeItem(key);
        storage.setItem(key, value);
    }
}
function removeLocalCache(key) 
{
    var storage = window.localStorage;
    if (storage) 
	{
        storage.removeItem(key);
    }
}
function clearLocalCache()
{
	var storage = window.localStorage;
    if (storage) 
	{
        storage.clear();
    }
}
/*邮箱地址校验*/
function CheckMail(mail) 
{
 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 if (filter.test(mail)) return true;
 else return false;
}
/*电话号码校验*/
function validatemobile(mobile) 
{
	var isMobile = /^1(3[0-9]|5[0-35-9]|8[025-9])\d{8}$/;
	var isChinaMobile = /^1(34[0-8]|(3[5-9]|5[017-9]|8[278])\d)\d{7}$/;
	var isChinaUnicom = /^1(3[0-2]|5[256]|8[56])\d{8}$/;
	var isChinaTelecom = /^1((33|53|8[09])[0-9]|349)\d{7}$/;

	if (!isMobile.test(mobile) && !isChinaMobile.test(mobile) && !isChinaUnicom.test(mobile) && !isChinaTelecom.test(mobile)) 
	{
		return false;
	} 
	else 
	{
		return true;
	}
}
/*是否未定义或为空*/
function isEmpty(para)
{
	if(para==undefined||para==null||para=='null'||para=='undefined'||para=='')return true;
	return false;
}
