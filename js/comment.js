foundLogin=false;
url='';
function getParge()
{
	var parge=location.search.substr(1);
	if(!parge)
	{
		return false;
	}
	var arr=parge.split("&"),parge={};
	$.each(arr,function(i,v){
		var data=v.split("=");
		parge[data[0]]=decodeURI(data[1]);
	})
	return parge;
}

//传入参数取具体的值
/*function showInfo(n)
{
	var parge=location.search.substr(1);
	if(!parge){
		return false;
	}
	console.log(parge);
	var reg=new RegExp("(^|&)"+n+"=([^&]+)"),
		info=parge.match(reg);
	return decodeURI(info[2]);
}

console.log(showInfo("city_id"));*/


//把日期改为几月几号这个形式
function changeMonthDay(str)
{
	var arr=str.split("-");
	return arr[1]+"月"+arr[2]+"日";
}

//默认日历
function getDefaultData(i)
{
	var time=new Date(),
		i=typeof(i)==="undefined"?0:i,
		times=time.getTime()+i*86400000,
		date=new Date();
		date.setTime(times);
	var year=date.getFullYear(),
		month=date.getMonth()+1,
		day=date.getDate();
	return year+"-"+zoonIn(month)+"-"+zoonIn(day);
}

function zoonIn(num)
{
	if(num<10)
	{
		return "0"+num;
	}else{
		return num;
	}

}

//日历函数
function displayCalendar(ele,minDate,maxDate,dataType){
	ele.calendar({
		minDate:minDate,
		maxDate:maxDate,
		swipeable:true,
        hide:function()
        {
        	judgeWhoBigWhoHigh(dataType)
        }
	}).calendar("show");

    $('.shadow').remove();
    $('.ui-slideup-wrap').addClass('calenderbox');
    var shadow=$('<span class="shadow"></span>');
    $('.calenderbox').append(shadow);
    $('.ui-slideup').addClass('calender');
}

function judgeWhoBigWhoHigh(dataType)
{
	var info=$(".out").val(),
    		arr=info.split("-"),
    		val=arr.join(""),
    		info1=$(".in").val(),
    		arr1=info1.split("-"),
    		val1=arr1.join("");
    	if(val<=val1)
    	{
    		var time=new Date(arr1[0],arr1[1]-1,arr1[2]*1+1),
    			year=time.getFullYear(),
    			month=time.getMonth()+1,
    			date=time.getDate();
    		$(".out").val(year+"-"+zoonIn(month)+"-"+zoonIn(date));
    	}
    	if(typeof(dataType)==="undefined") return false;
    	//****************************************
		$("#in").html(changeMonthDay($("#date_in").val()));
		$("#out").html(changeMonthDay($("#date_out").val()));
		Json.dateIn=$("#date_in").val();
		Json.dateOut=$("#date_out").val();
		if(dataType=="list")
		{
			loadNum=1;
			Json.pageNo=loadNum;
			getData(status)
		}else{

		}
}

$("#dateBtn").on("click",function(e){
	e.preventDefault();
	var time=new Date(),
		minDate=new Date(time.getFullYear(),time.getMonth(),time.getDate()),
		maxDate=new Date(time.getFullYear(),time.getMonth(),time.getDate()+90),
		dataType=$(this).data("type");
		displayCalendar($("#date_in"),minDate,maxDate,dataType)

})

var Comment=function(){
}

Comment.prototype={
	getDateSuccess:function(url,data,callBack,asy)
	{
		var asy=typeof(asy)==="undefined"?true:asy,_this=this;
		this.showMark();
		this.showLoading();
		$.ajax({
			url:url,
			data:data,
			async:asy,
			dataType:"json",
			success:function(data){
				$(".noData").remove();
				setTimeout(function(){
					_this.hideMark();
					_this.hideLoading();
					callBack && callBack(data);
				},1000)
			},
			error:function(){
				_this.hideLoading();
				_this.showError("加载数据失败,请尝试刷新加载","确定",function(){
					_this.hideMark();
					_this.hideError();
				});

			}
		})
	},
	//显示遮罩层
	showMark:function(){
		if($(".info_mark").size()==0)
		{
			var html=$("<div class='info_mark'></div>");
			$(".container").append(html);
		}
	},
	//删除遮罩层
	hideMark:function(){
		$(".info_mark").remove();
	},
	//显示加载图片
	showLoading:function(){
		if($("info_img").size()==0)
		{
			var html=$("<div class='info_img'><img src='../images/loading.gif'/></div>");
			$(".container").append(html);
		}
	},
	//删除加载图片
	hideLoading:function(){
		$(".info_img").remove();
	},
	//显示错误提示
	showError:function(msg,btn,callBack){
		if($(".info_error").size()==0)
		{
			console.log(msg);
			var html=$("<div class='info_error'><div class='letter'>"+msg+"</div><div class='info_btn'>"+btn+"</div></div>");
			$(".container").append(html);
			$(".info_btn").on("click",function(){
				callBack();
			})
		}
	},
	//删除错误提示
	hideError:function(){
		$(".info_error").remove();
	},
	//判断手机号是否符合格式
	judgeTel:function(tel){
		var reg=/^1[34578]\d{9}$/g;
		return reg.test(tel);
	},
	//判断密码是否符合格式
	judgePwd:function(pwd){
		var reg=/^[a-zA-Z]\w{4,19}$/g;
		return reg.test(pwd);
	},
	//判断证件号是否正确
	judgeId:function(id){
		var reg=/\d{18}/;
		return reg.test(id);
	}
				
}

var comment=new Comment();

function showLoad(count,pageNo,pageSize){
	if(pageNo*pageSize<count)
	{
		$(".loadBtn").show();
		loadNum++;
	}else{
		$(".loadBtn").remove();
		isc.refresh();
	}
}

