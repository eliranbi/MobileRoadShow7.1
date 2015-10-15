/* Path for method: "<server address>/IBMTechExBackEnd/adapters/EmployeeServices/services/list" */
@GET
    @Produces("application/json")
    @Path("/list")
    public String employees() throws IOException{
        logger.info(">>EmployeeServicesResource -> in employees() ...");
        JSONObject rsp = new JSONObject();
        try {
            rsp.put("employees", getList());
        } catch (Exception e) {
            e.printStackTrace();
            rsp.put("employees", "null");
        }
        return rsp.toString();
    }