/* Path for method: "<server address>/IBMTechExBackEnd/adapters/EmployeeServices/services/details/{empId}" */
    @GET
    @Produces("application/json")
    @Path("/details/{empId}")
    public String getDetails(@PathParam("empId") String id) throws IOException{
      logger.info(">>EmployeeServicesResource -> in details() ...:" + id);
      pojoEmployee rsp = new com.ibm.pojoEmployee();
      return rsp.getEmployeeDetails(id);   
    }
    