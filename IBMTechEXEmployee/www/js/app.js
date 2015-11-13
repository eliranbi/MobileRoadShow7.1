// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var ibmApp = angular.module('ibmApp', ['ionic'])
    //Adding support for cordova.
ibmApp.run(function ($ionicPlatform) {
    console.log('>> ibmApp.run ...');
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        console.log('>> ibmApp.ready ...');
        if (window.cordova &&
            window.cordova.plugins &&
            window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

//application config
ibmApp.config(function ($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider - letting us specifsy the default route when loading the module    
    $urlRouterProvider.otherwise('/')
    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'partials/employee.html',
            controller: 'mainCtrl',
            resolve: {
                employees: function (EmployeeService) {
                    return EmployeeService.getEmployeeList();
                }
            }
        })
        .state('login', {
            url: '/',
            /* default url */
            templateUrl: 'pages/login.html',
            controller: 'loginCtrl'

        })
        .state('detail', {
            url: '/detail/:empId',
            templateUrl: 'partials/details.html',
            controller: 'employeeDetailCtrl',
            resolve: {
                employeeDetailList: function ($stateParams, EmployeeDetailsService) {
                    return EmployeeDetailsService.getEmployeeDetails($stateParams.empId);
                },
                empId: function ($stateParams) {
                    return $stateParams.empId;
                }
            }
        })
})

//application services for employee and employee details.
ibmApp.factory("EmployeeService", function ($http) {
    console.log(">> in EmployeeService ...");
    var employees = [];
    var resourceRequest = new WLResourceRequest(
        "http://127.0.0.1:3000/api/employees", WLResourceRequest.GET
    );
    return {
        getEmployeeList: function () {
            return resourceRequest.send().then(function (response) {
                employees = response.responseJSON;
                return employees;
            }, function (response) {
                console.log("error:" + response);
                return null;
            });
        },
        getEmployee: function (index) {
            return employees[index];
        },
        getEmployeeById: function (id) {
            var _emp;
            angular.forEach(employees, function (emp) {
                console.log(">> getEmployeeById :" + id + " ==  " + emp._id);
                if (emp._id == id) {
                    _emp = emp;
                }
            });
            return _emp;
        }
    };
})

ibmApp.factory("EmployeeDetailsService", function ($http) {
    console.log(">> in EmployeeDetailsService ...");
    return {
        getEmployeeDetails: function (empId) {
            //using path param.
            var resourceRequest = new WLResourceRequest(
                "http://127.0.0.1:3000/api/employees/" + empId, WLResourceRequest.GET
            );
            return resourceRequest.send().then(function (response) {
                return response.responseJSON;
            }, function (response) {
                console.log("error:" + response);
                return null;
            });
        }
    };
})

// Application controllers.

ibmApp.controller('appCtrl', function ($scope) {
    $scope.logout = function () {
        console.log(">> in appCtrl >> logout ... ");
        $scope.user = {
            username: "",
            password: ""
        };
        WL.Analytics.send();
    }
})


ibmApp.controller('mainCtrl', ['$scope', 'employees', function ($scope, employees) {
    console.log(">> in mainCtrl ... ");
    $scope.employees = employees;

    // Adding custom event
    var event = {viewLoad: 'employees view'};
    WL.Analytics.log(event, 'Employee list view - loaded');

    }])

ibmApp.controller('employeeDetailCtrl', function ($scope, EmployeeService,
    employeeDetailList, empId, $ionicHistory) {
    $scope.employee = {
        "first_name": "",
        "last_name": "",
        "_id": ""
    }
    $scope.employeeDetails = {}
    console.log(">> in - employeeDetailCtrl:" + employeeDetailList);
    //Employee service cached the list of employee
    $scope.employee = EmployeeService.getEmployeeById(empId);
    $scope.employeeDetails = employeeDetailList;
    $scope.employeeDetails.email = angular.lowercase($scope.employeeDetails.email);

    // Adding custom event
    var event = {viewLoad: 'detail view'};
    WL.Analytics.log(event, 'Detail view - loaded');

})

ibmApp.controller('loginCtrl', ['$scope', '$state', '$timeout',
                                    function ($scope, $state, $timeout) {
        console.log(">> loginCtrl - $state.current:" + $state.current);
        $scope.user = {
            username: "",
            password: ""
        }

        $scope.doLogin = function () {
            console.log(">> loginCtrl - doLogin() ... ");
            console.log(">> loginCtrl - $scope.user:" + $scope.user);
            $state.transitionTo("main");
        }

        $scope.moveLoginBox = function () {
            var loginBox = document.getElementById('login-box');
            move(loginBox).ease('in-out').y(-385).duration('0.5s').end();
            move('.signInMsg').rotate(360).end();
        };

        $timeout(function () {
            $scope.moveLoginBox();
        }, 200);

        // Adding custom event
        var event = {viewLoad: 'login view'};
        WL.Analytics.log(event, 'Login view - loaded');
    }])

//Adding MobileFirst
var Messages = {
    // Add here your messages for the default language.
    // Generate a similar file with a language suffix containing the translated messages.
    // key1 : message1,
};

var wlInitOptions = {
    // Options to initialize with the WL.Client object.
    // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
};

// Called automatically after MFP framework initialization by WL.Client.init(wlInitOptions).
function wlCommonInit() {
    // Common initialization code goes here
    console.log('MobileFirst Client SDK Initilized');
    angular.element(document).ready(function () {
        mfpMagicPreviewSetup();
        angular.bootstrap(document.body, ['ibmApp']);
    });
}

function mfpMagicPreviewSetup() {
    //nothing to see here :-), just some magic to make ionic work with mfp preview, similar to ionic serve --lab
    if (typeof WL !== 'undefined' && WL.StaticAppProps && WL.StaticAppProps.ENVIRONMENT === 'preview') {
        //running mfp preview (MBS or browser)
        if (WL.StaticAppProps.PREVIEW_ENVIRONMENT === 'android') {
            document.body.classList.add('platform-android');
            ionic.Platform.setPlatform("android");
        } else { //then ios
            document.body.classList.add('platform-ios');
            ionic.Platform.setPlatform("ios");
        }
    }
}

// Useful for ionic serve when MFP Client SDK is not present and wlCommonInit doesn't get called automatically
var serveTimeout = 1500;
window.setTimeout(function () {
    if (typeof WL === 'undefined') {
        console.log('MFP Client SDK timeout, running Web App');
        angular.bootstrap(document.body, ['guardianApp']);
    }
}, serveTimeout);
