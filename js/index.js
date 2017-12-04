;(function($){
	init();


	function init()
	{
		//选择城市页面
		$("#btn").on("click",function(){
			var val=$("#txt").val();
			$(this).attr("href","html/city.html?city_name="+val);
		})
		//搜索酒店页面
		$("#pageBtn").on("click",function(){
			var time_in=$(".in").val(),
				time_out=$(".out").val(),
				_name=$("#name").val()?$("#name").val():"";
				if(getParge()!="")
				{
					$(this).attr("href","html/tavern.html?time_in="+time_in+"&time_out="+time_out+"&city_name="+getParge().city_name+"&city_id="+getParge().city_id+"&name="+_name);
				}else{
					$(this).attr("href","html/tavern.html?time_in="+time_in+"&time_out="+time_out+"&name="+_name+"&city_id=28&city_name=北京");
				}
			
		})
		showData();
		showdefaultData();
	}

	function showData()
	{
		var parse=getParge();
		if(parse!=""){
			$("#txt").val(parse.city_name);
		} 
	}

	function showdefaultData()
	{
		$(".in").val(getDefaultData());
		$(".out").val(getDefaultData(1));
		var time=new Date(),
			minDate=new Date(time.getFullYear(),time.getMonth(),time.getDate());

		$(".in").focus(function(){
			var maxDate=new Date(time.getFullYear(),time.getMonth(),time.getDate()+90);
			displayCalendar($(this),minDate,maxDate);
		})
		
		$(".out").focus(function(){
			var maxDate=new Date(time.getFullYear(),time.getMonth(),time.getDate()+91);
			displayCalendar($(this),minDate,maxDate);
		})
	}
})(Zepto)