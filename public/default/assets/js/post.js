var uploader = Qiniu.uploader({
	runtimes: 'html5,flash,html4',    //上传模式,依次退化
	browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
	uptoken_url: '/uptoken',
	//Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
	// uptoken : '<Your upload token>',
	//若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
	// unique_names: true,
	// 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
	// save_key: true,
	// 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
	domain: 'http://7xqhki.com1.z0.glb.clouddn.com/',
	//bucket 域名，下载资源时用到，**必需**
	container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
	max_file_size: '1mb',           //最大文件体积限制
	flash_swf_url: '/default/assets/js/Moxie.swf',  //引入flash,相对路径
	max_retries: 3,                   //上传失败最大重试次数
	dragdrop: true,                   //开启可拖曳上传
	drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
	chunk_size: '1mb',                //分块上传时，每片的体积
	auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
	init: {
		'FilesAdded': function(up, files)
		{
			plupload.each(files, function(file)
			{
				// 文件添加进队列后,处理相关的事情
			});
		},
		'BeforeUpload': function(up, file)
		{
			$('#myModal').modal({
				keyboard: false
			});
			// 每个文件上传前,处理相关的事情
		},
		'UploadProgress': function(up, file)
		{
			// 每个文件上传时,处理相关的事情
		},
		'FileUploaded': function(up, file, info)
		{
			var domain = up.getOption('domain');
			var res = $.parseJSON(info);
			//Qiniu.imageView2({
			//	mode: 3,  // 缩略模式，共6种[0-5]
			//	w: 200,   // 具体含义由缩略模式决定
			//	//h: 100,   // 具体含义由缩略模式决定
			//	q: 80//,   // 新图的图像质量，取值范围：1-100
			//	//format: 'png'  // 新图的输出格式，取值范围：jpg，gif，png，webp等
			//}, res.key);
			$("#img").val(domain + res.key);
			$("#imglink").attr("src", domain + res.key);
			$('#myModal').modal('hide');
			// 每个文件上传成功后,处理相关的事情
			// 其中 info 是文件上传成功后，服务端返回的json，形式如
			// {
			//    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
			//    "key": "gogopher.jpg"
			//  }
			// 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
			// var domain = up.getOption('domain');
			// var res = parseJSON(info);
			// var sourceLink = domain + res.key; 获取上传成功后的文件的Url
		},
		'Error': function(up, err, errTip)
		{
			$("#alert").text(err.message);
			//上传出错时,处理相关的事情
		},
		'UploadComplete': function()
		{
			//队列文件处理完毕后,处理相关的事情
		}
		//},
		//'Key': function(up, file)
		//{
		//	// 若想在前端对每个文件的key进行个性化处理，可以配置该函数
		//	// 该配置必须要在 unique_names: false , save_key: false 时才生效
		//	var key = "";
		//	// do something with key here
		//	return key
		//}
	}
});
// domain 为七牛空间（bucket)对应的域名，选择某个空间后，可通过"空间设置->基本设置->域名设置"查看获取
// uploader 为一个plupload对象，继承了所有plupload的方法，参考http://plupload.com/docs

$(document).ready(function()
{
	$('#signinForm').formValidation({
		// I am validating Bootstrap form
		framework: 'bootstrap',

		// Feedback icons
		icon: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},

		// List of fields and their validation rules
		fields: {
			username: {
				validators: {
					notEmpty: {
						message: 'The username is required and cannot be empty'
					},
					stringLength: {
						min: 6,
						max: 30,
						message: 'The username must be more than 6 and less than 30 characters long'
					},
					regexp: {
						regexp: /^[a-zA-Z0-9_]+$/,
						message: 'The username can only consist of alphabetical, number and underscore'
					}
				}
			},
			password: {
				validators: {
					notEmpty: {
						message: 'The password is required and cannot be empty'
					}
				}
			}
		}
	});
});