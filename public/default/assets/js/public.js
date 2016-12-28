var subWebsite = "/wx";

$('.spinner').spinner();

$('.good-alink').on("click", function(e){
	location.href = subWebsite+"/article/"+$(e.currentTarget).attr("data-id");
});
//--article.js
$('#btnOrder').on("click", function(e){
	var goodsCount = $('#goodsCount').val();
	if(parseInt(goodsCount)<1)
	{//....
		return;
	}
	$('#myModal').modal('hide');
	$('#divOrder').show();
	$('#divDetail').hide();
});
$('#btnHome').on("click", function(e){
	location.href = subWebsite;
});

$("#btnHome").mouseover(function(){
  $("#btnHome").css("cursor","hand");
});

$("#btnHome").mouseout(function(){
  $("#btnHome").css("cursor","pointer");
});

//--end article.js