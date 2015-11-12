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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import com.worklight.adapters.rest.api.MFPServerOperationException;
import com.worklight.adapters.rest.api.WLServerAPI;
import com.worklight.adapters.rest.api.WLServerAPIProvider;

// import our java backend class
      import com.ibm.pojoEmployee;

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
        pojoEmployee rsp = new com.ibm.pojoEmployee();
        return rsp.getEmployees(); 
    }
    
    /* Path for method: "<server address>/IBMTechExBackEnd/adapters/EmployeeServices/services/details/{empId}" */
    @GET
    @Produces("application/json")
    @Path("/details/{empId}")
    public String getDetails(@PathParam("empId") String id) throws IOException{
      logger.info(">>EmployeeServicesResource -> in details() ...:" + id);
      pojoEmployee rsp = new com.ibm.pojoEmployee();
      return rsp.getEmployeeDetails(id);   
    }
    
}
