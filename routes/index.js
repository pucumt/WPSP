var client = require('./Client/index.js'),
	exec = require('child_process').exec;//,
//server = require('./Server/index.js');

module.exports = function(app)
{
	exec('"D:\\Program Files (x86)\\mongodb-3.0.7\\bin\\mongod" --dbpath "D:\\Program Files (x86)\\mongodb-3.0.7\\data"', function(err, stdout, stderr)
	{
		if (err) throw err;
		console.log(stdout);
	});
	client(app);

	//server(app);

	app.use(function(req, res)
	{
		res.render("404");
	});

};