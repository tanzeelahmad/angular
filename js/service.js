angular.module("service", []).factory("mytest", function() {
	return {

	}
}).service("serverData", function($http, $q) {

	this.getData = function(serverdata) {

		var deferred = $q.defer();
		try {
			$http(serverdata).then(function successCallback(response) {

				deferred.resolve(response.data);
			}, function errorCallback(response) {

			});
			return deferred.promise;
		} catch(e) {
			alert(JSON.stringify(e));
		}

	}
}).service("sortData", function($http, $q) {

	this.sortResult = function(total_data,sqt_space,price) {
//alert(sqt_space)
//alert(price)
//alert(JSON.stringify(total_data))
		var deferred = $q.defer();
		var data = new Array();
		for(i = 0;i<total_data.length;i++){
			//console.log(total_data[i].space);
			//console.log(total_data[i].price);
			if(total_data[i].space <= sqt_space && total_data[i].price <= price){
				
				data.push(total_data[i]);
			}
		}
		deferred.resolve(data);
		return deferred.promise;
		
		

	}
})

