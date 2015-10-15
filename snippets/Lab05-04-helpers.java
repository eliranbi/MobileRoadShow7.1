
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
