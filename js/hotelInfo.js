
	var str="",parse=getParge(),
		dateIn=parse.date_in;
		dateOut=parse.date_out,
		hotelId=parse.hotel_id,
		city_id=parse.city_id,
		arr=["","","二星级酒店/经济型","三星级酒店","四星级酒店","五星级酒店"],
		hotelName=parse.hotel_name;
		$("#date_in").val(dateIn);
		$("#date_out").val(dateOut);
		$(".in").html(changeMonthDay(dateIn));
		$(".out").html(changeMonthDay(dateOut));

	function init(){
		getAjax();
		bindEvent();
	}

	function getAjax(){
		comment.getDateSuccess("../data/hotelDetail.json",{},function(data){
			showInfo(data.result);
		})
	}

	//显示酒店信息和房间信息
	function showInfo(data){
		//渲染酒店信息
		$(".hotelTitle").text(hotelName);
		$("#img").find("img").attr("src","../"+data.images.split(";")[0]);
		$("#stars").val(arr[data.star]);
		$("#tel").val(data.tel.replace(/,/g,"　"));
		$("#addr").val(data.addr);
		$(".introduce").html(data.desc);
		$(".sheshi").html(data.facilities);

		//渲染房间信息
		showHomeInfo(data);
	}

	//为元素绑定事件
	function bindEvent(){

		//实现酒店信息切换
		$(".btns").on("click","a",function(){
			$(this).addClass("bg").siblings().removeClass("bg");
			var _index=$(this).index();
			$(".hotelMain div").eq(_index).addClass("showTag").siblings().removeClass("showTag");
		})

		//详情展示
		$(".showAddBtn").on("click",function(){
			if($(this).html()=="展开全文"){
				$(this).prev().css("height","auto");
				$(this).text("收起");
			}else{
				$(this).prev().css("height","36px");
				$(this).text("展开全文");
			}
		})
		
		//预定按钮添加点击事件
		$(".h_info").on("click","a",function(){
			comment.showMark();
			comment.showLoading();
		//	var loginInfo=
			url="date_in="+$("#date_in").val()+"&date_out="+$("#date_out").val()+"&city_id="+city_id+"&hotel_id="+hotelId+"&hotel_name="+hotelName+"&hoterStar=5&type_id="+$(this).parent().data("id")+"&home_name="+$(this).parent().data("name")+"&home_num="+$(this).parent().data("homenum")+"&bed="+$(this).parent().data("bed")+"&home_price="+$(this).parent().data("price")+"&hotel_addr="+$("#addr").val();
			sessionStorage.setItem("url",url);
			if(!$(this).hasClass("full")){
				if(!sessionStorage.getItem("login")){
					setTimeout(function(){
						comment.hideMark();
						comment.hideLoading();
						location.href="../html/login.html";
					},1000)	
				}else{
					setTimeout(function(){
						comment.hideMark();
						comment.hideLoading();
						location.href="../html/indent.html?"+url;
					},1000)	
				}
				
			}
		})
	}
							

	function showHomeInfo(data){
		var html="";
		$.each(data.room_types,function(k,ele){
			$.each(ele.goods,function(i,val){
				html+='<section>'
						+'<section class="content">'
							+'<h3>'+ele.name+'</h3>'
							+'<p><span>'+ele.bed_type+'</span><span>无早</span></p>'
						+'</section>'
						+'<section class="price">'+val.price[0]/100+'</section>'
						+'<section class="homeStatus" data-id="'+ele.type_id+'" data-name="'+ele.name+'" data-homenum="'+val.room_id+'" data-bed="'+ele.bed_type+'" data-price="'+Math.min(val.price[0],val.price[1])/100+'">';
						if(val.room_state==0)
						{
							html+='<a href="#" class="full">满房</a></section>'
						}else{
							html+='<a href="#">预定</a></section>'
						}
				html+='</section>'
			})
		})
		$(".h_info").html(html);
	}

	init();
