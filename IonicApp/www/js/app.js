// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

    var ibmApp = angular.module('ibmApp', ['ionic'])
    //appliction config
    ibmApp.config(function($stateProvider, $urlRouterProvider) {
      // $urlRouterProvider - letting us specifsy the default route when loading the module    
      $urlRouterProvider.otherwise('/')
      $stateProvider                    
          .state('main', {
            url: '/main',
            templateUrl: 'partials/employee.html',
            controller: 'mainCtrl'            
            })          
          .state('login', {
            url: '/', /* default url */
            templateUrl: 'pages/login.html',
            controller: 'loginCtrl'
            
            })                      
          .state('detail', {            
            url: '/:empId',            
            templateUrl: 'partials/details.html',                   
            controller: 'employeeDetailCtrl',
            resolve:{  
                employee:  function($stateParams, EmployeeDetailsService){                        
                            return {
                                _id: $stateParams.empId,
                                employeeDetailsService : EmployeeDetailsService
                            };                        
                    }
            }})                    
    })
    
    //appliction services for employee and employee details.
    ibmApp.factory("EmployeeService", function($http){
        console.log( ">> in EmployeeService ...");  
        var employees = [];
        return {                        
            getEmployeeList: function(){
                return $http.get('data/employee.json').then(function(response){
                    employees = response.data;
                    return employees;
                });
            },
            
            getEmployee: function(index){
                return employees[index];
            },
            
            getEmployeeById: function(id){
                var _emp;
                console.log(">> getEmployeeById :" + id);
                angular.forEach(employees, function(emp) {
                    console.log(">> getEmployeeById :" + id + " ==  " + emp._id );
                    if(emp._id == id){                        
                        _emp = emp;
                    }   
                });
                return _emp;
                
            }
        };    
    })
    
    ibmApp.factory("EmployeeDetailsService", function($http){
        console.log( ">> in EmployeeDetailsService ...");        
        return {            
            getEmployeeDetails: function(empId){
                return $http.get('data/details.json');
            }};    
    })
    
    
    // Application controllers.
    
    ibmApp.controller('appCtrl', function($scope){    
        $scope.logout = function(){
            console.log(">> in appCtrl >> logout ... ");
            $scope.user = {
                username: "",
                password: ""
            };            
        }        
    })
    
    
    ibmApp.controller('mainCtrl', [ '$scope', 'EmployeeService', function($scope, EmployeeService) {
        console.log(">> in mainCtrl ... ");                
        $scope.$on('$ionicView.beforeEnter', function(){
            console.log(">> mainCtrl beforeEnter");            
        });        
        EmployeeService.getEmployeeList().then(function(rsp){
            console.log(">> EmployeeService.getEmployeeList() -> then :" + rsp);            
                $scope.employees = rsp;
        });        
    }])
    
        
    ibmApp.controller('employeeDetailCtrl', function($scope, EmployeeService,  EmployeeDetailsService, employee , $ionicHistory) {
        $scope.employee = {
            "first_name" : "", 
            "last_name" : "",
            "_id" : ""
        }
        $scope.employeeDetails = {}
        console.log(">> in - employeeDetailCtrl:" + employee);
        $scope.employee = employee;
        $scope.employee = EmployeeService.getEmployeeById(employee._id);
        EmployeeDetailsService.getEmployeeDetails(employee._id).then(
            function(rsp){
                console.log(">> in - employeeDetailCtrl -> rsp:" + rsp);                         
                angular.forEach(rsp.data, function(emp) {                    
                    if(emp._id == employee._id){                        
                        $scope.employeeDetails = emp;
                        $scope.employeeDetails.email =  angular.lowercase($scope.employeeDetails.email);
                    }   
                });
                
            }
        );
    })
    
        
    ibmApp.controller('loginCtrl', [ '$scope', '$state', '$timeout', 
                                    function($scope, $state, $timeout) {        
        console.log(">> loginCtrl - $state.current:" + $state.current);
        $scope.user = {
            username: "",
            password: ""
        }       
                         
        $scope.doLogin = function(){
            console.log(">> loginCtrl - doLogin() ... ");
            console.log(">> loginCtrl - $scope.user:" + $scope.user);
            $state.transitionTo("main");                            
        }
                        
        $scope.moveLoginBox = function() {
            var loginBox = document.getElementById('login-box');
            move(loginBox).ease('in-out').y(-385).duration('0.5s').end();
            move('.signInMsg').rotate(360).end();
        };
        
        $timeout(function(){
            $scope.moveLoginBox();
        }, 200);
    }])
    
    