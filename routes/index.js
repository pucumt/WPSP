var client = require('./Client/index.js'),
	exec = require('child_process').exec;//,
//server = require('./Server/index.js');

module.exports = function(app)
{
	// exec('"C:\\Program Files\\MongoDB\\Server\\3.4\\bin\\mongod" --dbpath "C:\\Program Files\\MongoDB\\Server\\data"', function(err, stdout, stderr)
	// {
	// 	if (err) throw err;
	// 	console.log(stdout);
	// });
	client(app);

	//server(app);

	app.use(function(req, res)
	{
		res.render("404");
	});

};