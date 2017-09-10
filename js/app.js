 var app = angular.module("Shopzz", ['ngRoute',"controllers","service","autocomplete"]);

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'templates/home.html',
                    controller: 'homeCnt'
                }).
                when('/myaccount', {
                    templateUrl: 'templates/myaccount.html',
                    controller: 'myaccountCnt'
                }).
                when('/searchresult', {
                    templateUrl: 'templates/search-result.html',
                    controller: 'searchresultCnt'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);
        


