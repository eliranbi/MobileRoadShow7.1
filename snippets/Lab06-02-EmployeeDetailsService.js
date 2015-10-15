ibmApp.factory("EmployeeDetailsService", function($http){
        console.log( ">> in EmployeeDetailsService ...");
        return {
            getEmployeeDetails: function(empId){
                //using path param.
                var resourceRequest = new WLResourceRequest(
                    "/adapters/EmployeeServices/services/details/" + empId, WLResourceRequest.GET
                );
                return resourceRequest.send().then(function(response){
                    return response.responseJSON.details;
                }, function(response){
                    console.log("error:" + response);
                    return null;
                });
            }};
     })
