var bigRisg="";
function init(){
	bindEvend();
}

//判断当时的提交按钮的状态
function inputStatus(){
	var tel=$("#tel").val(),
		pwd=$("#pwd").val(),
		a=$("#a").val(),
		status=$("#radioBtn").prop("checked");
	if(tel!="" && pwd!="" && a!="" && status){
		$("#submit").prop("disabled",false);
	}else{
		$("#submit").prop("disabled",true);
	}
}

//给元素添加事件
function bindEvend(){
	var timer=null,status=false;

	//判断手机号
	$("#tel").on("input propertychange",function(){
		var val=$(this).val();
		val=val.replace(/[^\d]/g,"");
		$(this).val(val);
	})

	//判断密码框是显示还是隐藏
	$("#checkBtn").on("click",function(){
		if($(this).is(":checked"))
		{
			$(this).prev().attr("type","text");
		}else{
			$(this).prev().attr("type","password");
		}
	})

	//验证码
	$("#provingBtn").on("click",function(){
		if(status) return false;
		var tel=$("#tel").val(),
			num=10;
		if(!comment.judgeTel(tel)){
			comment.showMark();
			comment.showError("手机号码格式有误","确定",function(){
				comment.hideMark();
				comment.hideError();
				$("#tel").val("");
			});
			return false;
		}
		comment.getDateSuccess("../data/register.php",{},function(data){
			var errcode=data.result.errcode,risg=data.result.risg;
				
			if(errcode==2){
				comment.showMark();
				comment.showError(risg,"确定",function(){
					comment.hideMark();
					comment.hideError();
				})
				return false;
			}else if(errcode==1)
			{
				comment.showMark();
				comment.showError(risg,"确定",function(){
					comment.hideMark();
					comment.hideError();
					location.href="../html/login.html";
				})
				return false;
			}else{
				bigRisg=risg;
			}
			timer=setInterval(function(){
				num--;
				if(num<0)
				{
					clearInterval(timer);
					status=false;
					$("#provingBtn").text("获取验证码");
				}else{
					status=true;
					$("#provingBtn").text(num+"秒后重发");
				}
			},1000)
		})
		
	})

	//判断提交按钮是可用还算是不可用
	$("#radioBtn").on("change",function(){
		inputStatus();
	})
	$(".main input").on("input propertychange",function(){
		inputStatus();
	})

	//给提交按钮添加点击事件
	$("#submit").on("click",function(e){
		e.preventDefault();
		if(!$(this).prop("disabled")){
			var tel=$("#tel").val(),
				pwd=$("#pwd").val(),
				re=$("#re").val();
			comment.showMark();
			comment.showLoading();

			if(!comment.judgeTel(tel))
			{
				setTimeout(function(){
					comment.showError("手机号码格式错误","确定",function(){
						comment.hideMark();
						comment.hideLoading();
						comment.hideError();
						$("#tel").val("");
						return false;
					})
				},1000)
			}
			if(!comment.judgePwd(pwd))
			{
				setTimeout(function(){
					comment.showError("密码格式有误","确定",function(){
						comment.hideMark();
						comment.hideLoading();
						comment.hideError();
						$("#pwd").val("");
						return false;
					})
				},1000)
			}
			if(bigRisg!=re)
			{
				setTimeout(function(){
					comment.showError("验证码有误","确定",function(){
						comment.hideMark();
						comment.hideLoading();
						comment.hideError();
						$("#re").val("");
						return false;
					})
				},1000)
			}
			comment.getDateSuccess("../data/registersubmit.php",{},function(data){
				var errcode=data.result.errcode;
				if(errcode==1)
				{
					comment.showMark();
					comment.showError("手机号已经被注册过了","确定",function(){
						comment.hideMark();
						comment.hideLoading();
						comment.hideError();
						$("#tel").val("");
						return false;
					})
				}else if(errcode==2)
				{
					comment.showMark();
					comment.showError("注册失败！！！","确定",function(){
						comment.hideMark();
						comment.hideLoading();
						comment.hideError();
						return false;
					})
				}else{
					comment.showMark();
					comment.showError("注册成功","确定",function(){
						comment.hideMark();
						comment.hideLoading();
						comment.hideError();
						location.href="../html/login.html";
					})
				}
			})
		}
	})
}

init()

