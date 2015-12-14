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
	  url: getHost()+"user/logout",
	  data:{},
	  success: function(data){
	  if(data)
	  {
		var obj=eval('(' + data + ')');
		if(obj.code==0)
		{
			setLocalCache("token",'null');
			setLocalCache("userid",'null');
			window.location.href="login.html";
		}
		else
		{
			showMsg("�˳�ʧ��");
		}
	  }
	 },
	 error: function()
	 {
		showMsg("�ύ����ʧ��");
		}
	});
}
function gChanged()
{
	var curGrp=$("#my_groups").val();
	setLocalCache("group",curGrp);
	//���»�ȡ�Ƿ����ԱȨ��...
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
			alert("��ȡ��ʧ��");
		}
	  }
	 },
	 error: function()
	 {
		//alert("�ύ������ʧ��");
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
	//���󴴽�����
	$.ajax({type:'POST',
	  url: getHost()+"group/create?token="+getLocalCache("token"),
	  data:{"groupname":gName},
	  success: function(data){
	  if(data)
	  {
		var obj=eval('(' + data + ')');
		if(obj.code==0)
		{
			//�������ɹ�
			loadGroups();
		}
		else
		{
			alert("���ʧ��");
		}
	  }
	 },
	 error: function()
	 {
		//alert("�ύ�������ʧ��");
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
		showMsg("�û�������Ϊ��");
		return false;
	}
	else if(isEmpty(group))
	{
		showMsg("��ǰû��ָ���飬���ܷ�������");
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
			showMsg("�����ѷ���");
			return true;
		}
		else
		{
			showMsg("��������ʧ��");
			return false;
		}
	  }
	 },
	 error: function()
	 {
		showMsg("�ύ����ʧ��");
		return false;
		}
	});
}
function openYqPan()
{
	htmlElementWinUp($("#grpYq"),300,160,null,[canvClose,yqFun,canvClose]);
}
