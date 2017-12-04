var parge=getParge(),
	bed=parge.bed,//床型号
	date_in=parge.date_in,//入住日期
	date_out=parge.date_out,//离店日期
	home_name=parge.home_name,//房间型号
	home_num=parge.home_num,//房间号
	home_price=parge.home_price,//房间价格
	hotel_id=parge.hotel_id,//酒店ID
	hotel_name=parge.hotel_name,//酒店名称
	hotelStar=parge.hotelStar,//酒店星级
	type_id=parge.type_id,//酒店所在的地方ID
	hotel_addr=parge.hotel_addr,//酒店所在的地方
	userTel=parge.userTel,//用户电话
	userName=parge.userName,//用户姓名
	homeNum=parge.homeNum,//房间数量
	arr=["","","二星级酒店/经济型","三星级酒店","四星级酒店","五星级酒店"];

	function init(){
		showInfo();
		bindEvent();
	}

	//渲染信息
	function showInfo(){
		$("#surname").text(userName.charAt(0));
		$("#date_in").text(changeMonthDay(date_in));
		$("#hotel_name").text(hotel_name);
		$("#home_num").text(homeNum);
		$("#home_type").text(home_name);

		//渲染订单信息
		$("#userName").val(userName);
		$("#hotelName").val(hotel_name);
		$("#dateIn").val(changeMonthDay(date_in));
		$("#dateOut").val(changeMonthDay(date_out));
		$("#hotelAddr").val(hotel_addr);
		$("#hotelStar").val(arr[hotelStar]);
		$("#homeType").val(home_name);
		$("#homeSum").val(homeNum);
		$("#homeInfo").val(bed);
		$("#homeNum").val(home_num);
		$("#homePrice").val("￥"+home_price);
		$("#userTel").val(userTel);
	}

	//给页面中的按钮添加事件
	function bindEvent(){

		//返回首页按钮
		$("#backIndexBtn").on("click",function(){
			location.href="../index.html";
		})

		//查看订单页面
		$("#seeIndentBtn").on("click",function(){
			$(".indentInfo").css("-webkit-transform","translate3d(0,0,0)");
		})

		//关闭订单页面
		$("#close").on("click",function(){
			$(".indentInfo").css("-webkit-transform","translate3d(0,100%,0)");
		})
	}

	init();