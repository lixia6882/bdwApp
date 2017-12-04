var parge=getParge(),
	bed=parge.bed,//床型号
	date_in=parge.date_in,//入住日期
	date_out=parge.date_out,//离店日期
	home_name=parge.home_name,//房间型号
	home_num=parge.home_num,//房间号
	home_price=parge.home_price,//房间价格
	hotel_id=parge.hotel_id,//酒店ID
	hotel_name=parge.hotel_name,//酒店名称
	hotelStar=parge.hoterStar,//酒店星级
	type_id=parge.type_id,//酒店所在的地方ID
	hotel_addr=parge.hotel_addr;//酒店所在的地方

//初始化函数
function init(){
	var val=$("#homeNum").val();
	showIndentInfo();
	showUserInfo(val*1);
	bindEvent();
}


//渲染订单信息
function showIndentInfo(){
	$(".hotelName").text(hotel_name);
	$(".homeName").text(home_name);
	$(".homePrice").text("￥"+home_price);
	$("#date_in").val(date_in);
	$("#date_out").val(date_out);
	$(".in").html(changeMonthDay(date_in));
	$(".out").html(changeMonthDay(date_out));
}

//渲染入住人信息
function showUserInfo(num){
	var html="";
	for(var i=0;i<num;i++)
	{
		var _num=i==0?"":i;
		html+='<p class="userName">姓名'+_num
					+'<input type="text" placeHolder="每间只需填写一个姓名">'
					+'<span class="closeInputBtn">x</span>'
				+'</p>'
				+'<p class="userId">证件'+_num
					+'<input type="text" id="inputData'+num+'" placeHolder="入住人身份证号/护照号">'
					+'<span class="closeInputBtn">x</span>'
				+'</p>';
	}
	$(".user").html(html);
}

//给元素添加事件
function bindEvent(){
	$("#homeNumBack").on("click",function(){
		var val=$("#homeNum").val();
		if(val<=1)
		{
			comment.showMark();
			comment.showError("房间数最小为1","确定",function(){
				comment.hideMark();
				comment.hideError();				
			})
			return false;
		}
		val--;
		$("#homeNum").val(val);
		showUserInfo(val);
	})
	$("#homeNumAdd").on("click",function(){
		var val=$("#homeNum").val();
		if(val>=5)
		{
			comment.showMark();
			comment.showError("房间数最大为5","确定",function(){
				comment.hideMark();
				comment.hideError();				
			})
			return false;
		}
		val++;
		$("#homeNum").val(val);
		showUserInfo(val);
	})


	//给input添加Input事件
	$(".user,.linkman").on("input propertychange","input",function(){
		if($(this).val()!="")
		{
			$(this).parent().siblings().find(".close").css("display","none");
			$(this).next().css("display","block");
		}else{
			$(this).next().css("display","none");
		}
	})

	//给close按钮添加点击事件
	$(".main").on("click",".closeInputBtn",function(){
		$(this).prev("input").val("");
		$(this).css("display","none");
	})

	//给立即预定添加点击事件
	$("#scheduleBtn").on("click",function(){

		//先判断元素是否有空
		var num=$(".main input[type=text]").not("#homeNum").size();
		for(var i=0;i<num;i++)
		{
			var val=$(".main input[type=text]").not("#homeNum").eq(i).val();
			if(val==""){
				comment.showMark();
				comment.showError("请填写完整的信息","确定",function(){
					comment.hideMark();
					comment.hideError();
				})
				return false;
			}
		}

		//判断证件是否正确
		var _num=$(".userId").size();
		for(var i=0;i<_num;i++)
		{
			var val=$(".userId").eq(i).find("input").val(),e=i==0?"":i;
			if(!comment.judgeId(val)){
				comment.showMark();
				comment.showError("证件"+e+"有误,请重新输入","确定",function(){
					comment.hideMark();
					comment.hideError();
				})
				return false;
			}
		}

		//判断手机号是否正确
		var lineTel=$("#lineTel").val();
		if(!comment.judgeTel(lineTel))
		{
			comment.showMark();
			comment.showError("手机号有误","确定",function(){
				comment.hideMark();
				comment.hideError();
			})
			return false;
		}
		//登录
		var userInfo={
			"userTel":lineTel,//用户电话
			"userName":$("#lineName").val(),//用户姓名
			"homeNum":$("#homeNum").val(),//房间数量
			"bed":bed,//床型号
			"date_in":date_in,//入住日期
			"date_out":date_out,//离店日期
			"home_name":home_name,//房间型号
			"home_num":home_num,//房间号
			"home_price":home_price,//房间价格
			"hotel_id":hotel_id,//酒店ID
			"hotel_name":hotel_name,//酒店名称
			"hotelStar":hotelStar,//酒店星级
			"type_id":type_id,//酒店所在的地方ID
			"hotel_addr":hotel_addr//酒店所在的地方
		}
		comment.getDateSuccess("../data/order.php",userInfo,function(result){
			sessionStorage.setItem("userInfo",userInfo);
			if(result.errcode==0) location.href="../html/success.html?userTel="+lineTel+"&userName="+$("#lineName").val()+"&homeNum="+$("#homeNum").val()+"&bed="+bed+"&date_in="+date_in+"&date_out="+date_out+"&home_name="+home_name+"&home_num="+home_num+"&home_price="+home_price+"&hotel_id="+hotel_id+"&hotel_name="+hotel_name+"&hotelStar="+hotelStar+"&type_id="+type_id+"&hotel_addr="+hotel_addr;
		})
	})
}


init();