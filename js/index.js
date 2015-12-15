/* Javascript Document create by tw 2015-12-14*/
/*----public para and functons----*/
var userid;
jQuery(function()
{
	userid=getLocalCache("userid");
	$("#user_userid").text(userid);
	loadGroups();
});
function logOut()
{
	$.ajax({type:'GET',
	  url: getHost()+"user/logout?token="+getLocalCache("token"),
	  data:{},
	  success: function(data){
	  if(data)
	  {
		var obj=eval('(' + data + ')');
		if(obj.code==0)
		{
			setLocalCache("token",'');
			setLocalCache("userid",'');
			setLocalCache("group",'');
			window.location.href="login.html";
		}
		else
		{
			showMsg("退出失败");
		}
	  }
	 },
	 error: function()
	 {
		showMsg("提交请求失败");
		}
	});
}
function gChanged()
{
	var curGrp=$("#my_groups").val();
	setLocalCache("group",curGrp);
	//以下获取是否管理员权限...
}
function loadGroups()
{
	$.ajax({type:'GET',
	  url: getHost()+"group/list?token="+getLocalCache("token"),
	  data:{},
	  success: function(data){
	  if(data)
	  {
		var obj=eval('(' + data + ')');
		if(obj.code==0)
		{
			var dobj=eval('(' + obj.data + ')');
			var groups=dobj.groupname.split(";");
			var options="",curGrp=getLocalCache("group"),hav=0;
			for(var i=0;i<groups.length;i++)
			{
				if(groups[i]==curGrp)hav=1;
				options+="<option value='"+groups[i]+"'>"+groups[i]+"</option>";
			}
			$("#my_groups").html(options);
			if(hav==1)
			{
				$("#my_groups").find("option[value='"+curGrp+"']").attr("selected",true);
			}
				
			else gChanged();
		}
		else
		{
			alert("获取组失败");
		}
	  }
	 },
	 error: function()
	 {
		//alert("提交组请求失败");
		}
	});
}
function openAddPan()
{
	$(".add_canv").toggle();
}
function openYqPan()
{
	window.parent.openYqPan();
}
function confirmAdd()
{
	var gName=$("#newName").val();
	$(".add_canv").hide();
	if(gName=="")return;
	//请求创建新组
	$.ajax({type:'POST',
	  url: getHost()+"group/create?token="+getLocalCache("token"),
	  data:{"groupname":gName},
	  success: function(data){
	  if(data)
	  {
		var obj=eval('(' + data + ')');
		if(obj.code==0)
		{
			//添加新组成功
			loadGroups();
		}
		else
		{
			alert("添加失败");
		}
	  }
	 },
	 error: function()
	 {
		//alert("提交添加请求失败");
		}
	});
}
var canvClose=function(idx)
{
	return true;
}
var yqFun=function(idx)
{
	var userid=$("#userid").val();
	var group=getLocalCache("group");
	if(userid=="")
	{
		showMsg("用户名不能为空");
		return false;
	}
	else if(isEmpty(group))
	{
		showMsg("当前没有指定组，不能发起邀请");
		return false;
	}
	$.ajax({type:'POST',
	  url: getHost()+"group/attach?token="+getLocalCache("token"),
	  data:{"groupname":group,"username":userid},
	  success: function(data){
	  if(data)
	  {
		var obj=eval('(' + data + ')');
		if(obj.code==0)
		{
			showMsg("邀请已发出");
			return true;
		}
		else
		{
			showMsg("发出邀请失败");
			return false;
		}
	  }
	 },
	 error: function()
	 {
		showMsg("提交邀请失败");
		return false;
		}
	});
}
function openYqPan()
{
	htmlElementWinUp($("#grpYq"),300,160,null,[canvClose,yqFun,canvClose]);
}
