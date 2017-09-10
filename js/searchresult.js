   app.controller("searchresultCnt",function($scope,serverData,$timeout,sortData){
 
   //	angular.element("#content-1").mCustomScrollbar();
	angular.element('.space-btn li').click(function(){
		angular.element(this).siblings().removeClass('active');
		angular.element(this).addClass('active');
	})

/********* initialize value to the slider*****/	
/******** for space********/
$scope.sqt_range_min = 0;
$scope.sqt_range_max = 6000;
$scope.sqt_range_cur = 1200;

/********* for price*******/
$scope.price_range_min = 0;
$scope.price_range_max = 100000;
$scope.price_range_cur = 50000;
	
	 /*********** get search data*********/ 
  
  
   var url = {url:base_url+"json/search_result.json",method:"POST",type:"json",data:{}}
 //$scope.popularplace = [4,8,3,4,9,9,4,3];
 
  serverData.getData(url).then(function(response){
                   $scope.popularplace = response;
                  // $timeout(function(){
                   	angular.element("#content-1").mCustomScrollbar();
                   //},100);
                   })	
  
  /************** get the availabe data of space*************/
  $scope.total_space = "";
  $scope.sort_space = "";
   var url = {url:base_url+"json/searchspace.json",method:"POST",type:"json",data:{}}
 
 
  serverData.getData(url).then(function(response){
                  // $scope.sort_space = response.space;
                   $scope.total_space = response;
                   })	
	
	/********* for range slider*******/
	var timeout = "";
	$timeout(function(){
	angular.element('.nstSlider').nstSlider({
		"left_grip_selector" : ".leftGrip",
		"right_grip_selector" : ".rightGrip",
		"value_bar_selector" : ".bar",
		"value_changed_callback" : function(cause, leftValue, rightValue) {
			
			angular.element(this).parent().find('.leftLabel').text(leftValue);
			angular.element(this).parent().find('.rightLabel').text(rightValue);
			
			/********** sortdata********/
			$timeout.cancel(timeout);
			timeout = $timeout(function(){
			sortData.sortResult($scope.total_space.space,angular.element(".sqft.rightLabel").text(),angular.element(".price.rightLabel").text()).then(function(response){
			$scope.sort_space = response;
			//console.log(JSON.stringify($scope.sort_space));
			if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
					$scope.$apply();
				}
			});
			},400);
		}
		//},100)
	});
	},1000);
	
	/***** custom selectbox*******/
	angular.element('.select').selectbox();
	
	angular.element('.adv-src-pnl').click(function(){
		angular.element('.normal-search').hide();
		angular.element('.advance-search').show();
		
		angular.element(this).hide();
	})
	angular.element('.hide-adv-srch').click(function(){
		angular.element('.advance-search').hide();
		angular.element('.normal-search').show();
		angular.element('.adv-src-pnl').show();
	})
	
	/********** click on drop down for filtering********/
	angular.element('.sort-options').click(function(event){
		event.stopPropagation();
		angular.element('.sort-list').show();
	})
	
	angular.element('.sort-list a').click(function(event){
		event.stopPropagation();
		//alert($(this).text());
		angular.element('.sort-options .sort').text($(this).text());
		angular.element('.sort-list').hide();
	})
	
	angular.element("body").on("click",function(){
		angular.element('.sort-list').hide();
	})
   
   //loadMap.setMap();
 //  angular.element(window).load(function(){
   	
  // })
   
   $scope.setMap = function(){
   	//alert("fd")
   	var markers = [ {
                          "title": 'Malls',
                          "lat": '12.961107',
                          "lng": '77.514209',
                          "description": 'Malls',
                          "imgsrc":'img/mall-map.png'
                     },
                     {
                          "title": 'High Streets',
                          "lat": '12.926308',
                          "lng": '77.542361',
                          "description": 'High Streets',
                          "imgsrc":'img/highstreet-map.png'
                     },
                     {
                          "title": 'Office',
                          "lat": '12.960438',
                          "lng": '77.703036',
                          "description": 'office',
                          "imgsrc":'img/office-map.png'
                     },
                     {
                          "title": 'Shared space',
                          "lat": '13.030689',
                          "lng": '77.527942',
                          "description": 'Shared space',
                          "imgsrc":'img/sharedspace-map.png'
                     }]
   	
   	var mapOptions = {
            //center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
            center: new google.maps.LatLng(12.974034, 77.591103),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var infoWindow = new google.maps.InfoWindow();
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var i = 0;
        var interval = setInterval(function () {
            var data = markers[i]
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.title,
                animation: google.maps.Animation.DROP,
                icon:data.imgsrc
            });
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infoWindow.setContent(data.description);
                    infoWindow.open(map, marker);
                });
            })(marker, data);
            i++;
            if (i == markers.length) {
                clearInterval(interval);
            }
        }, 200);
   }
 $timeout(function(){
 $scope.setMap();	
 },1000)
 
   });
  