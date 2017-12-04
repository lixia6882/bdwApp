;(function($){
	var comment=new Comment();
	function init(){
		bindEvent();
	}

	//给页面中的元素绑定事件
	function bindEvent(){
		$("#txt").on("input propertychange",function(){
			var val=$(this).val();
			val=val.replace(/[^\d]/g,"");
			$(this).val(val);
		})
		$(".main").on("input propertychange","input",function(){
			if($("#txt").val()!="" && $("#pwd").val()!="")
			{
				$("#loginBtn").prop("disabled",false);
			}else{
				$("#loginBtn").prop("disabled",true);
			}
		})
		$("#registerBtn").on("click",function(e){
			e.preventDefault();
			location.href="../html/register.html";
		})
		$("#loginBtn").on("click",function(e){
			e.preventDefault();
			var phone=$("#txt").val(),
				pwd=$("#pwd").val();
			if(!comment.judgeTel(phone)){
				comment.showMark();
				comment.showError("手机号不符合格式","确定",function(){
					comment.hideMark();
					comment.hideError();
					$("#txt").val("");
				});
				return false;
			}
			if(!comment.judgePwd(pwd)){
				comment.showMark();
				comment.showError("密码不符合格式","确定",function(){
					comment.hideMark();
					comment.hideError();
					$("#pwd").val("");
				});
				return false;
			}
			comment.getDateSuccess("../data/checkuser.php",{"phone":phone,"pwd":pwd
			},function(data){
				proving(data);
			})
			
		})
	}

	init();

	function proving(data){
		if(data.code==1){
			comment.showMark();
			comment.showError(data.msg,"确定",function(){
				comment.hideMark();
				comment.hideError();
				$("#txt").val("");
				location.href="../html/register.html";
			})
		}else if(data.code==2)
		{
			comment.showMark();
			comment.showError(data.msg,"确定",function(){
				comment.hideMark();
				comment.hideError();
				$("#pwd").val("");
			})
		}else{
			sessionStorage.setItem("login",1);
			location.href="../html/indent.html?"+sessionStorage.getItem("url");
		}
	}
})(Zepto)