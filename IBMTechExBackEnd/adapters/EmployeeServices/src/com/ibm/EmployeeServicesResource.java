/*
 *    Licensed Materials - Property of IBM
 *    5725-I43 (C) Copyright IBM Corp. 2015. All Rights Reserved.
 *    US Government Users Restricted Rights - Use, duplication or
 *    disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

package com.ibm;

import java.util.List;
import java.util.logging.Logger;
import java.io.IOException;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import com.ibm.json.java.JSONObject;
import com.worklight.adapters.rest.api.MFPServerOperationException;
import com.worklight.adapters.rest.api.WLServerAPI;
import com.worklight.adapters.rest.api.WLServerAPIProvider;

//additional imports :
import com.ibm.json.java.JSONArray;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import org.apache.commons.io.IOUtils;

@Path("/services")
public class EmployeeServicesResource {
	/*
	 * For more info on JAX-RS see https://jsr311.java.net/nonav/releases/1.1/index.html
	 */
		
	//Define logger (Standard java.util.Logger)
	static Logger logger = Logger.getLogger(EmployeeServicesResource.class.getName());

    //Define the server api to be able to perform server operations
    WLServerAPI api = WLServerAPIProvider.getWLServerAPI();

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
    
        /* Creating the employee list */
public JSONArray getList() throws IOException{
    JSONArray employees = new JSONArray();
    employees = JSONArray.parse(getEmployeeDataString());
    logger.info("getList returning " + employees.serialize());
    return employees;
}

/* Creating the details list */
public JSONArray getDetails() throws IOException{
    JSONArray details = new JSONArray();
    details = JSONArray.parse(getEmployeeDetailsDataString());
    return details;
}

    /* Hard coded employee list */
public String getEmployeeDataString(){
return "[{'_id' : '01800192','first_name' : 'Mike','last_name' : 'Chepesky','img' :'male1.png','job_title' : 'SalesAssociate'},{'_id' : '01800193','first_name' : 'Amy','last_name' : 'Jones','img' :'female1.png','job_title' : 'Sales Representative'},    {'_id' : '01800121','first_name' : 'Eugene','last_name' : 'Lee','img' :'male2.png' ,'job_title' : 'CFO'}]";

}

    /* Hard coded employee details list */
public String getEmployeeDetailsDataString(){
    return "[{'_id' : '01800192','address': '3721 S Ocean Dr, Hollywood, FL,33019','email':'Mike_Chepesky@ibm.com','mobile': '347-344-1101','fax': '347-344-1102'},{'_id' : '01800193','address': '305 E 86th St, New York, NY, 10028','email': 'Amy.Jones@us.ibm.com','mobile': '646-020-1121','fax': '637-033-2211'    },{'_id' : '01800121','address': '1211 3rd Ave, New York, NY, 10021','email': 'Eugene_Lee@ca.ibm.com','mobile': '433-111-2212','fax': '322-332-1121'    }]";
     }

 
}
