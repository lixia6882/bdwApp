var str="",parse=getParge(),
	dataIn=parse.time_in;
	dataOut=parse.time_out,
	cityId=parse.city_id,
	cityName=parse.city_name,
	name=parse.name;
	$("#back").attr("href","../index.html");
	if(parse!="")
	{
		$("#date_in").val(dataIn);
		$("#date_out").val(dataOut);
		$("#in").html(changeMonthDay(dataIn));
		$("#out").html(changeMonthDay(dataOut));
	}
	$("#back").attr("href","../index.html?city_name="+cityName+"&city_id="+cityId);

isc=new iScroll("info");
loadNum=1;
Json={
	cityId:cityId,
	dateIn:dataIn,
	dateOut:dataOut,
	pageNo:loadNum,
	pageSize:3
}
dataInfo={
	"1":["不限","人气最高","价格从高到低","价格从低到高"],
	"2":["不限","0-100","101-200","201-300","301-400","401-500","500以上"],
	"3":["不限","桔子","如家","万豪","布丁","速8","7天","汉庭"],
	"4":["不限","二星一下/经济型","三星","四星","五星","五星以上"]
}
if(name) Json.name=name;
init();

function init(){
	getData(status);
	showReverse();
	showScroll();
}

function getData(status){
	comment.getDateSuccess("../data/hotel2.php",Json,function(resulf){
		if(resulf.count<=0)
		{
			$("#i_main").html("<div class='noData'>没有酒店记录,请选择其他时间或条件</div>");
			isc.refresh();
		}
		typeof(status)==="undefined"?showData(resulf):showData(resulf,status);
		showLoad(resulf.count,Json.pageNo,Json.pageSize)
	})
}

function showReverse()
{
	$(".main").on("swipeUp",function(){
		$(".footer").css("height","36px");
		isc.refresh();
	})
	$(".main").on("swipeDown",function(){
		$(".footer").css("height","0");
		isc.refresh();
	})
			$.each(dataInfo,function(i,ele){
		var str="<ul>";
			$.each(ele,function(idx,e){
				str+='<li><input type="radio" name="info'+i*1+'"><label for=""></label><span>'+e+'</span></li>';	
			})
			str+="</ul>";
			$(".w_info"+i*1).html(str);
			$(".w_info"+i*1+" ul li").eq(0).find("input").prop("checked",true);
	})
	$(".w_info1").show().siblings().hide();
	$(".footer").on("click","a",function(e){
		e.preventDefault();
		var _index=$(this).index(),str="";
		$(this).addClass("bg").siblings().removeClass("bg");
		$(".wrsk").css("height","100%");
		$(".w_info").css("height","200px");
		$(".w_info"+(_index*1+1)).show().siblings().hide();
	})

	$(".wrsk").on("click","input",function(){
		if($(this).parents("ul").parents().is(".w_info4"))
		{
			var val=$(this).next().next().html(),
				html=0;
			switch(val)
			{
				case "三星":html=3;break;
				case "四星":html=4;break;
				case "五星":html=5;break;
				case "不限":html=-1;break;
				default:html=2
			}
			Json.stars=html;
		}else if($(this).parents("ul").parents().is(".w_info3"))
		{
			var val=$(this).next().next().html();
			Json.brand=val;
			if(val=="不限")
			{
				Json.brand=-1;
			}
		}else if($(this).parents("ul").parents().is(".w_info2"))
		{
			var val=$(this).next().next().html(),
				arr=val.split("-");
				Json.minPrice=arr[0]*100;
				Json.maxPrice=arr[1]*100;
			if(val=="不限")
			{
				Json.minPrice=-100;
				Json.maxPrice=-100;
			}
		}else
		{
			var val=$(this).next().next().html(),
				html="";
				switch(val)
				{
					case "人气最高":html=-1;break;
					case "价格从低到高":html="priceMin";break;
					case "价格从高到低":html="priceMax";break;
					case "不限":html=-1;break;
				}
				Json.sortType=html;
		}
		loadNum=1;
		Json.pageNo=loadNum;
		getData();	
		$(".wrsk").css("height","0%");
		$(".w_info").css("height","0px");	
		

	})

	$(".info").on("click",".loadBtn",function(){
		Json.pageNo=loadNum;
		getData(status);
	})
}
function showScroll(){
	var bigH=null,h=null,startY=0,offsetY=0; 
		infoSum=0;
	$(".info").on("touchstart",function(e){
		e.preventDefault();
		startY=e.touches[0].clientY;
		startScroll=$(".info").offset().top;
		h=$("#i_main").height();
		bigH=$(".info").height();
	}).on("touchmove",function(e){
		e.preventDefault();
		offsetY=e.touches[0].clientY-startY;
	}).on("touchend",function(){
		if(offsetY<-50 && bigH+infoSum+Math.abs(offsetY)>h)
		{
			if($(".loadBtn").size()>0)
			{
				Json.pageNo=loadNum;
				getData(status);
			}
		}else{
			infoSum-=offsetY;
			if(infoSum<0)
			{
				infoSum=0;
			}
		}
	})
}

//渲染数据
function showData(data,status){
	$(".loadBtn").remove();
	var str="",
		status=typeof(status)==="undefined"?true:false;
	$.each(data.result.hotel_list,function(key,val){
		var html="";
		switch(val.stars)
		{
			case 3:html="三星";break;
			case 4:html="四星";break;
			case 5:html="五星";break;
			default:html="二星以下/经济型"
		}
		str+='<a href="../html/hotelInfo.html?hotel_id='+val.hotel_id+'&date_in='+$("#date_in").val()+'&date_out='+$("#date_out").val()+'&hotel_name='+val.name+'&city_id='+getParge().city_id+'">'
				+'<dl>'
					+'<dt><img src="'+val.image+'"></dt>'
					+'<dd>'
						+'<h2>'+val.name+'</h2>'
						+'<p>4.7分<span>礼</span></p>'
						+'<p><span>'+html+'</span></p>'
						+'<p>'+val.addr+'</p>'
					+'</dd>'
					+'<dd>'
						+'<p><span>￥'+(val.low_price/100)+'</span>起</p>'
						+'<p>0.8km</p>'
					+'</dd>'
				+'</dl>'
			+'</a>';
	})
	if(status)
	{
		$("#i_main").html(str);
	}else{
		$("#i_main").append(str);
	}
	$("#i_main").append($("<div class='loadBtn'>点击加载更多</div>"));
	infoSum=0;
	isc.refresh();
}