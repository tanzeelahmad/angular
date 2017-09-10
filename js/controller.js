   angular.module("controllers",[])
   .controller("mainCnt", function($scope,serverData) {
  
   	
   	 	angular.element('body').on('click','.menu-btn',function() {
		angular.element('.mob-menu-wrap').slideToggle();
	});
	angular.element('body').on('click','.uname',function(){
		angular.element(this).next().slideToggle();
	})
	angular.element('body').on('click','.submenu-btn',function(){
		angular.element(this).next().slideToggle();
	})
angular.element(window).resize(function(){
	var w = $(window).width();
	if(w>768 && $('.mob-menu-wrap').is(':hidden')){
		angular.element('.mob-menu-wrap').removeAttr('style');
	}
})
   	
   	
   	
   	
    /********* submit query form ***********/
   		$scope.submit = false;
   	$scope.user_query = {};
   
   $scope.submitQuery = function(status){
   //	alert(status);
   	$scope.submit = true;
   	if(!status){
   	$scope.submit = false;
   	$scope.user_query = {};	
   	}
  
   }
  /********* search data *********/
 //$scope.searchParam = "";
  /******** get the autosuggest data******/
   var url = {url:base_url+"json/autosuggest.json",method:"POST",type:"json",data:{}}
   serverData.getData(url).then(function(response){
  	//console.log(JSON.stringify(response));
   $scope.autosuggest = response.suggest.name;
   })
   
   /********** click on search icon *********/
   angular.element("body").on("click",".place-block.account form button",function(){
   
   	$scope.searchPlace();
   });
 $scope.searchPlace = function(){
 	//alert("fdgh");
 }
  
    }).
    directive("footer",function(){
    	return {
		restrict : 'E',
		transclude : false,
		templateUrl : 'templates/footer.html',
	};
    }).directive('ngEnter', function() {
	return function(scope, element, attrs,ctr) {
		
		element.bind('keydown keypress', function(event) {
			if (event.which === 13) {
				scope.$apply(function() {
					scope.$eval(attrs.ngEnter, {
						$event : event
					});
				});
				event.preventDefault();
			}
		});
	};
});
     