/*
 *    Licensed Materials - Property of IBM
 *    5725-I43 (C) Copyright IBM Corp. 2015. All Rights Reserved.
 *    US Government Users Restricted Rights - Use, duplication or
 *    disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

package com.ibm;

import java.util.List;
import java.util.logging.Logger;

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

//adding additional imports :
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import org.apache.commons.io.IOUtils;
import org.apache.wink.json4j.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;


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
	    public String employees() throws IOException, org.json.JSONException{									
			logger.info(">>EmployeeServicesResource -> in employees() ...");
			JSONObject rsp = new JSONObject();						
			try {			
				rsp.put("employees", getList());
			} catch (org.json.JSONException e) {			
				e.printStackTrace();
				rsp.put("employees", "null");
			}		
			return rsp.toString();	
	    }

    /* Path for method: "<server address>/IBMTechExBackEnd/adapters/EmployeeServices/services/details/{empId}" */
	@GET
    	@Produces("application/json")
    	@Path("/details/{empId}")
    	public String getAccount(@PathParam("empId") String id) throws IOException, org.json.JSONException{								
		logger.info(">>EmployeeServicesResource -> in details() ...:" + id);
		JSONObject rsp = new JSONObject();			
		try {			
			JSONArray details = getDetails();
			for(int i=0; i<details.length();i++){
				JSONObject obj = details.getJSONObject(i);	
				logger.info(">> obj.get(_id).toString():" + obj.get("_id").toString());
				if(obj.get("_id").toString().equals(id)){
					rsp.put("details", obj);
					return rsp.toString();
				}
			} 						
		} catch (org.json.JSONException e) {
			e.printStackTrace();
		}		
		return rsp.toString();
    }
    
    
    /* Creating the employee list */
    public JSONArray getList() throws org.json.JSONException, IOException{          	 	         
        JSONArray employees = new JSONArray(getEmployeeDataString());
    	return employees;
    }
    
    /* Creating the details list */
    public JSONArray getDetails() throws org.json.JSONException, IOException{            	  	         
    	JSONArray details = new JSONArray(getEmployeeDetailsDataString());
    	return details;
    }        
    
    /* Hard coded employee list */
    public String getEmployeeDataString(){    
    return "[{'_id' : '01800192','first_name' : 'Mike','last_name' : 'Chepesky','img' :'male1.png','job_title' : 'SalesAssociate'},{'_id' : '01800193','first_name' : 'Amy','last_name' : 'Jones','img' :'female1.png','job_title' : 'Sales Representative'},    {'_id' : '01800121','first_name' : 'Eugene','last_name' : 'Lee','img' :'male2.png' ,'job_title' : 'CFO'},{'_id' : '01800114','first_name' : 'Gary','last_name' : 'Donovan','img' :'male3.png' ,'job_title' : 'Marketing Manager'},    {'_id' : '01800145','first_name' : 'John','last_name' : 'Williams','img' :'male4.png' ,'job_title' : 'VP of Marketing'       },{'_id' : '01800231','first_name' : 'Kathleen','last_name' : 'Byrne','img' :'female2.png', 'job_title' : 'Sales' },{'_id' : '01800211','first_name' : 'Lisa','last_name' : 'Wong','img' :'female3.png' ,'job_title' : 'Marketing Manager'       },{'_id' : '01800133','first_name' : 'Paula','last_name' : 'Gates','img': 'female4.png' ,'job_title' : 'Software Architect' },{'_id' : '01800091','first_name' : 'Paul','last_name' : 'Jones','img' : 'male5.png' ,'job_title' : 'QA Manager'},{'_id' : '01800292','first_name' : 'Steven','last_name' : 'Wells','img' : 'unknown.png' ,'job_title' : 'Software Architect'}]";
    
    }
    
    /* Hard coded employee details list */
    public String getEmployeeDetailsDataString(){    
        return "[{'_id' : '01800192','address': '3721 S Ocean Dr, Hollywood, FL,33019','email':'Mike_Chepesky@ibm.com','mobile': '347-344-1101','fax': '347-344-1102'},{'_id' : '01800193','address': '305 E 86th St, New York, NY, 10028','email': 'Amy.Jones@us.ibm.com','mobile': '646-020-1121','fax': '637-033-2211'    },{'_id' : '01800121','address': '1211 3rd Ave, New York, NY, 10021','email': 'Eugene_Lee@ca.ibm.com','mobile': '433-111-2212','fax': '322-332-1121'    },{'_id' : '01800114','address': '251 174th St, Sunny Isles Beach, FL, 33016','email': 'Gary.Donovan@us.ibm.com','mobile': '929-222-2210','fax': '321-444-3120'    },{'_id' : '01800145','address': '100 Park Ave, New York, NY, 10022','email': 'John.Williams@ca.ibm.com','mobile': '917-019-1193','fax': '212-002-2211'    },{'_id' : '01800231','address': '200 E 65th St, New York, NY, 10021','email': 'Kathleen.Byrne@us.ibm.com','mobile': '646-003-1199','fax': '212-001-8989'    },{'_id' : '01800211','address': '12191 2nd Ave, New York, NY, 10022','email': 'Lise.Wong@ibm.com','mobile': '212-001-4431','fax': ''    },{'_id' : '01800133','address': '50 Astor Place, New York, NY, 10001','email': 'Paula_Gates@ibm.com','mobile': '212-992-8818','fax': ''    },{'_id' : '01800091','address': '3800 S Ocean Dr, Hollywood, FL, 33019','email': 'Paul_Jones@ibm.com','mobile': '954-990-1121','fax': ''       },{'_id' : '01800292','address': '121 5th Ave, New York, NY, 10010','email':'Steven.Wells@us.ibm.com','mobile': '347-002-9911','fax': ''}]";  
    }
    
    
}
