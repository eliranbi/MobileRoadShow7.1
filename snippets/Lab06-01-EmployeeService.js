ibmApp.factory("EmployeeService", function($http){
        console.log( ">> in EmployeeService ...");
        var employees = [];
        var resourceRequest = new WLResourceRequest(
            "/adapters/EmployeeServices/services/list", WLResourceRequest.GET
        );
        return {
            getEmployeeList: function(){
                return resourceRequest.send().then(function(response){
                    employees = response.responseJSON.employees;
                    return employees;
                }, function(response){
                    console.log("error:" + response);
                    return null;
                });
            },
            getEmployee: function(index){
                return employees[index];
            },
            getEmployeeById: function(id){
                var _emp;
                angular.forEach(employees, function(emp) {
                    console.log(">> getEmployeeById :" + id + " ==  " + emp._id );
                    if(emp._id == id){ _emp = emp; }
                });
                return _emp;
            }
        };
    })
