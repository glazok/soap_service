const data_provider = require('./data_provider');
data_provider.createConnection();
module.exports = {
      BMI_Service : {
        BMI_Port :{
            getNews:function(args, cBack){
               data_provider.getAllNews(args.page.$value, 
				function (results) {
					cBack({
						bmi: results
					});
				} ,
				 function () {
					console.error('mysql error');
				}
			);
            }
        }
   }
  };



// data_provider.closeConnection();