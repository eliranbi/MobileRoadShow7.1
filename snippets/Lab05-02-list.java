    /* Path for method: "<server address>/IBMTechExBackEnd/adapters/EmployeeServices/services/list" */
    @GET
    @Produces("application/json")
    @Path("/list")
    public String employees() throws IOException{
        logger.info(">>EmployeeServicesResource -> in employees() ...");
        pojoEmployee rsp = new com.ibm.pojoEmployee();
        return rsp.getEmployees(); 
    }