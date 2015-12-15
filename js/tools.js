/* Javascript Document create by tw 2015-12-8*/
/*以下接口域配置*/
function getHost()
{
	return "http://sa.cmcc.com/";
}
/*
*获取url中参数
*/
function getRequest(key) 
{
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest[key];

}
/*
*url跳转
*/
function goUrl(_url)
{
	window.location.href=_url;
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
/**
 * 数据
 */
function EncodeForCN(str)
{
	return window.encodeURI(str);
}
/**
 * 解码中文
 */
function DecodeForCN(str)
{
	return window.decodeURI(str);
}
/**
 * 以下尺寸相关
 */
function PageWidth()
{
	return parseInt($("body").css("width").replace("px",""));
}
function PageHeight()
{
	var bodyHeight=parseInt($("body").css("height").replace("px",""));
	if(window.innerHeight==undefined)return bodyHeight;
	if(bodyHeight>window.innerHeight)
		return bodyHeight;
	else
		return window.innerHeight;
}
function windowHeight()
{
	if(window.innerHeight!= undefined)
	{  
        return window.innerHeight;  
    }  
    else
	{  
        var B= document.body, D= document.documentElement;  
        return Math.min(D.clientHeight, B.clientHeight);  
    }  
}
function getHeight(h)
{
	return Math.round(h*PageWidth()/1080);
}
function getScrollTop()
{
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	return scrollTop;
}
/**
 * 以下关于弹出层
 */
 function showBlack()
{
	if($("#blackCanva").length==0)
	{
		$("body").append("<div id='blackCanva'></div>");
		$("#blackCanva").css({width:PageWidth()+"px",height:PageHeight()+60+"px"});
	}
	else;
		$("#blackCanva").show();
	
}
function hideBlack()
{
	if($("#blackCanva").length!=0)
		$("#blackCanva").hide();
}
function showConfirm(text,onOk)
{
	showBlack();
	if($("#dialog").length==0)
	{
		$("body").append("<div id='dialog'><div style='line-height:30px;margin-bottom:10px;text-align:center;' id='dialogtext'></div><div style='padding-left:30px;'><a class='tw_btn_light' id='btn_ok'>确定</a><a class='tw_btn_white' id='btn_no'>取消</a></div></div>");
	}
	else
	{
		$("#dialog").show();
		$("#btn_ok").unbind();
		$("#btn_no").unbind();
	}
	$("#btn_ok").bind("click",function(){
			hideBlack();
			$("#dialog").hide();
			onOk();
		});
	$("#btn_no").bind("click",function(){
			hideBlack();
			$("#dialog").hide();
		});	
	$("#dialogtext").text(text);
	var dialogHeight=parseInt($("#dialog").css("height").replace("px",""));
	var leftSpace=(PageWidth()-300)/2;
	var topSpace=(windowHeight()-dialogHeight)/2+getScrollTop();
	$("#dialog").css({width:"300px",top:topSpace+"px",left:leftSpace+"px"});
}
function showMsg(text)
{
	if($("#msgbox").length==0)
	{
		$("body").append("<div id='msgbox' style='position: fixed;'><div id='curmsg'>"+text+"</div></div>");
		
	}
	else
	{
		$("#curmsg").text(text);
		$("#msgbox").show();
	}
	$("#msgbox").css({width:PageWidth()+"px",top:"0px"});
	$("#msgbox").animate({opacity: '1'}, 350, "swing", function () {
		setTimeout("msgOut()", 2000);
		});
}
function showSucc(text)
{
	if($("#succbox").length==0)
	{
		$("body").append("<div id='succbox'><div id='curmsg_suc'>"+text+"</div></div>");
		$("#succbox").css({width:PageWidth()+"px",top:"0px"});
	}
	else
	{
		$("#curmsg_suc").text(text);
		$("#succbox").show();
	}
	$("#succbox").animate({opacity: '.8'}, 350, "swing", function () {
		setTimeout("succOut()", 2000);
		});
}
function msgOut()
{
	$("#msgbox").animate({opacity: '0.3'}, 350, "swing", function () {
		$("#msgbox").hide();
        });
}
function succOut()
{
	$("#succbox").animate({opacity: '0.3'}, 350, "swing", function () {
		$("#succbox").hide();
        });
}
function htmlWinUp(html,w,h,reFuns)
{
	showBlack();
	if($("#htmlBox").length==0)
	{
		$("body").append("<div id='htmlBox'></div>");
	}
	else
		$("#htmlBox").show();
		
	$("#htmlBox").html(html);
		$(".closeBtn").each(function(index){
			$("#close_"+index).unbind();
			$("#close_"+index).bind("click",function(){
				reFuns[index](index);
				hideBlack();
				$("#htmlBox").hide();
			});
		});
	var leftSpace=(PageWidth()-w)/2;
	var topSpace=(windowHeight()-h)/2;
	$("#htmlBox").css({width:w+"px",height:h+"px",top:topSpace+"px",left:leftSpace+"px"});
}
function htmlElementWinUp($element,w,h,initFun,reFuns)
{
	if($element.length==0)return;
	$element.show();
	showBlack();
	if($("#htmlBox").length==0)
	{
		$("body").append("<div id='htmlBox'></div>");
	}
	else
		$("#htmlBox").show();
	var leftSpace=(PageWidth()-w)/2;
	var topSpace=(windowHeight()-h)/2+getScrollTop();
	$("#htmlBox").css({width:w+"px",height:h+"px",top:topSpace+"px",left:leftSpace+"px"});
	
	$("#htmlBox").append($element.remove());
	if(initFun!=null&&initFun!=undefined)initFun();
	//绑定
	$element.find(".tw_close_btn").each(function(index)
	{
		$element.find(".close_"+index).unbind();
		$element.find(".close_"+index).bind("click",function(){
			if(reFuns[index](index))
			{
				hideBlack();
				$("body").append($element.remove());
				$("#htmlBox").hide();
				$element.hide();
			}
		});
	});
}
function showElementAtMouse($element,initFun,reFuns,_x,_y)
{
	if($element.length==0)return;
	$element.show();
	$("body").append($element.remove());
	$element.css({top:_y+"px",left:_x+"px"});
	if(initFun!=null&&initFun!=undefined)initFun();
	//绑定
	$element.find(".tw_close_btn").each(function(index)
	{
		$element.find(".close_"+index).unbind();
		$element.find(".close_"+index).bind("click",function(){
			if(reFuns[index](index))
			{
				$("body").append($element.remove());
				$element.hide();
			}
		});
	});
}
/*加载中...*/
function loadingText()
{
	return "<div style='width:200px;height:200px;line-height:200px;color:#ccc;margin:auto;text-align:center;'>数据加载中...</div>";
}
function checkAll()
{
	
}