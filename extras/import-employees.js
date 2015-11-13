/*
within your project directory run
sudo npm install async
sudo npm install request
sudo npm install fs

*/

// Include the async package ... Make sure you add "async" to your package.json
var async = require("async");
var request = require('request');
var fs = require('fs');

var items = [];
var employeeArray = [
    {
        "_id": "01800192",
        "first_name": "Mike",
        "last_name": "Chepesky",
        "img": "../employee-photos/01800192.png",
        "job_title": "Sales Associate",
        "address": "3721 S Ocean Dr, Hollywood, FL, 33019",
        "email": "Mike_Chepesky@ibm.com",
        "mobile": "347-344-1101",
        "fax": "347-344-1102"
    },
    {
        "_id": "01800193",
        "first_name": "Amy",
        "last_name": "Jones",
        "img": "../employee-photos/01800193.png",
        "job_title": "Sales Representative",
        "address": "305 E 86th St, New York, NY, 10028",
        "email": "Amy.Jones@us.ibm.com",
        "mobile": "646-020-1121",
        "fax": "637-033-2211"

    },
    {
        "_id": "01800121",
        "first_name": "Eugene",
        "last_name": "Lee",
        "img": "../employee-photos/01800121.png",
        "job_title": "CFO",
        "address": "1211 3rd Ave, New York, NY, 10021",
        "email": "Eugene_Lee@ca.ibm.com",
        "mobile": "433-111-2212",
        "fax": "322-332-1121"
    },
    {
        "_id": "01800114",
        "first_name": "Gary",
        "last_name": "Donovan",
        "img": "../employee-photos/01800114.png",
        "job_title": "Marketing Manager",
        "address": "251 174th St, Sunny Isles Beach, FL, 33016",
        "email": "Gary.Donovan@us.ibm.com",
        "mobile": "929-222-2210",
        "fax": "321-444-3120"
    },
    {
        "_id": "01800145",
        "first_name": "John",
        "last_name": "Williams",
        "img": "../employee-photos/01800145.png",
        "job_title": "VP of Marketing",
        "address": "100 Park Ave, New York, NY, 10022",
        "email": "John.Williams@ca.ibm.com",
        "mobile": "917-019-1193",
        "fax": "212-002-2211"
    },
    {
        "_id": "01800231",
        "first_name": "Kathleen",
        "last_name": "Byrne",
        "img": "../employee-photos/01800231.png",
        "job_title": "Sales",
        "address": "100 Park Ave, New York, NY, 10022",
        "email": "John.Williams@ca.ibm.com",
        "mobile": "917-019-1193",
        "fax": "212-002-2211"
    },
    {
        "_id": "01800211",
        "first_name": "Lisa",
        "last_name": "Wong",
        "img": "../employee-photos/01800211.png",
        "job_title": "Marketing Manager",
        "address": "12191 2nd Ave, New York, NY, 10022",
        "email": "Lisa.Wong@ibm.com",
        "mobile": "212-001-4431",
        "fax": ""
    },
    {
        "_id": "01800133",
        "first_name": "Paula",
        "last_name": "Gates",
        "img": "../employee-photos/01800133.png",
        "job_title": "Software Architect",
        "address": "50 Astor Place, New York, NY, 10001",
        "email": "Paula_Gates@ibm.com",
        "mobile": "212-992-8818",
        "fax": ""
    },
    {
        "_id": "01800091",
        "first_name": "Paul",
        "last_name": "Jones",
        "img": "../employee-photos/01800091.png",
        "job_title": "QA Manager",
        "address": "3800 S Ocean Dr, Hollywood, FL, 33019",
        "email": "Paul_Jones@ibm.com",
        "mobile": "954-990-1121",
        "fax": ""
    },
    {
        "_id": "01800292",
        "first_name": "Steven",
        "last_name": "Wells",
        "img": "../employee-photos/01800292.png",
        "job_title": "Software Architect",
        "address": "121 5th Ave, New York, NY, 10010",
        "email": "Steven.Wells@us.ibm.com",
        "mobile": "347-002-9911",
        "fax": ""
    }
];


//Get current employees ...
console.log(">> Getting employee list ...");
request('http://localhost:3000/api/employees', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(body);
        items = JSON.parse(body);
        console.log(">> Going to delete [" + items.length + "] Employees");
        deleteAllEmployee(items);
    }
})


//Delete all employees 
function deleteAllEmployee(items) {
    console.log(">> in deleteAllEmployee ...");
    // 1st para in async.each() is the array of items
    async.each(items,
        // 2nd param is the function that each item is passed to
        function (item, callback) {
            // Call an asynchronous function, often a save() to DB        
            console.log(">> Deleting employee [" + item._id + "]");
            request({
                uri: 'http://localhost:3000/api/employees/' + item._id,
                method: "DELETE"
            }, function (error, response, body) {
                // Async call is done, alert via callback        
                callback('Success ...');
                if (!error && response.statusCode == 200) {
                    //console.log(body); 
                } else {
                    console.error(error);
                }
            });
        },
        // 3rd param is the function to call when everything's done
        function (err) {
            // All tasks are done now
            console.log(">> Deleting is done ...");
            //doSomethingOnceAllAreDone();
            //readEmployeeJsonFile();
            uploadAllEmployees(employeeArray);
        }
    );
}

//Open employee.json file
function readEmployeeJsonFile() {
    console.log(">> in readEmployeeJsonFile() ... : " + __dirname);
    // Read the file and send to the callback
    fs.readFile(__dirname + '/data/employee-cache.json', 'utf8', handleFile)

    function handleFile(err, data) { // --> callback function
        if (err) {
            console.error(">> Error: " + err);
            return;
        }
        employeeArray = JSON.parse(data)
        uploadAllEmployees(employeeArray)
    }
}


function uploadAllEmployees(employeeArray) {
    console.log(">> in uploadAllEmployees() Total: " + employeeArray.length)
    async.each(employeeArray,
        function (employee, callback) {
            postEmployees(employee);
            callback();
        },
        function (err) {
            console.log(">> Finish upload all employee ...");
        }
    );
}

//Post each employee using the REST API
function postEmployees(employee) {
    request({
        url: "http://localhost:3000/api/employees",
        method: "POST",
        json: true, // <--Very important!!!
        body: employee
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(">> success upload employee id :" + body._id);
        } else {
            console.error(error);
        }
    });
}
