/* Javascript Document create by tw 2015-12-8*/
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