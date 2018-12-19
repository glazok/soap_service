const data_provider = require('./data_provider');

data_provider.createConnection();
data_provider.getAllNews(
	function (results) {
		console.log(results);
	} ,
	 function () {
		console.error('mysql error');
	}
);
data_provider.closeConnection();