/* Path for method: "<server address>/IBMTechExBackEnd/adapters/EmployeeServices/services/details/{empId}" */
@GET
    @Produces("application/json")
    @Path("/details/{empId}")
    public String getAccount(@PathParam("empId") String id) throws IOException{
        logger.info(">>EmployeeServicesResource -> in details() ...:" + id);
        JSONObject rsp = new JSONObject();
        try {
            JSONArray details = getDetails();
            for(int i=0; i<details.size();i++){
                JSONObject obj = (JSONObject)details.get(i);
                logger.info(">> obj.get(_id).toString():" + obj.get("_id").toString());
                if(obj.get("_id").toString().equals(id)){
                    rsp.put("details", obj);
                    return rsp.toString();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return rsp.toString();
    }