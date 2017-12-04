;(function($){
	var Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];
	var isc=new iScroll("main");
	init();

	function init()
	{
		//获取ajax数据,渲染热门城市
		getData();

		//渲染城市和索引
		showCity();
	}

	function getData(){
		$.ajax({
			url:"../data/hotCity.json",
			dataType:"json",
			type:"post",
			success:function(data){
				showHotCity(data);
			},
			error:function(){
				console.log("链接数据库失败!!!");
			}
		})
	}

	function showHotCity(data)
	{
		var str="<ul>";
		$.each(data,function(key,val){
			str+="<li><a href='../index.html?city_name="+val+"&city_id="+key+"'>"+val+"</a></li>";
		})
		str+="</ul>";
		$("#hot").html(str);
		isc.refresh();
	}

	function showCity()
	{
		var str="<ul>",html="";
		for(var i=0,len=Alphabet.length;i<len;i++)
		{
			var s=Alphabet[i];
			str+="<li><a href=''>"+s+"</a></li>";

			html+="<div><h2>"+s+"</h2><ul>";
			$.each(CITIES,function(key,val){
				if(s==val[1].charAt(0))
				{
					html+="<li><a href='../index.html?city_name="+val[0]+"&city_id="+key+"'>"+val[0]+"</a></li>";
				}
			})
			html+="</ul></div>";
		}
		str+="</ul>";
		$("#more").html(str);
		$("#content").html(html);
		isc.refresh();
		addBtn();
	}

	function addBtn()
	{
		var parse=getParge();
		if(parse!=""){
			console.log(parse);
			$("#text").html(parse.city_name);
			$("#back").attr("href","../index.html?city_name="+parse.city_name)
		}
		$("#more").on("click","a",function(e){
			e.preventDefault();
			var val=$(this).html();
			$("#content h2").each(function(){
				var v=$(this).html();
				if(v==val)
				{
					console.log(v);
					var top=$(this).position().top;
					$("#main>section").css("-webkit-transform","translate3d(0,-"+top+"px,0)")
				}
			})
		})
	}

})(Zepto)