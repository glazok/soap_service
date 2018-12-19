const mysql = require('mysql');

module.exports = {
	connection: null,
	 createConnection: function() {
		this.connection = mysql.createConnection({
		  host     : '127.0.0.1',
		  user     : 'kot',
		  password : 'kot',
		  database : 'news'
		});
		this.connection.connect();
	},
	 closeConnection: function() {
		this.connection.end();
	},
	 getAllNews: function(page, cBack, onErr) {
	 	page = parseInt(page);
	 	const pp = (page - 1) * 10;
		const sql = `SELECT * FROM news LIMIT ${pp}, ${pp+10}`;
		this.connection.query(sql, function (error, results, fields) {
	  		if (error) {onErr(error);}
	  		else {cBack(results.map(r => ({
	  			id: r.id,
	  			title: r.title,
	  			description: r.description,
	  			content: r.content,
	  			created_at: r.created_at.toString(),
	  		})));}
		});
	}
};