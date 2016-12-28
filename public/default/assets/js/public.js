var subWebsite = "wx/";

$('.spinner').spinner();

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
//--end article.js