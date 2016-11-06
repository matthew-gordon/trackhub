'use strict';

// User init
{"users":[]}

// User object
{"name":"string","authToken":"string","projects":[]}

// Project object
{"name":"project1","desc":"textarea","tasks":[]}

// Task object
{"name":"string","desc":"textarea"}

// Sample data model

{
  "users" : [
    {"name" : "string","authToken" : "string","projects" : [
      {"name" : "project1", "desc" : "textarea", "tasks" : [
        {"name" : "task1", "desc" : "textarea"},
        {"name" : "task1", "desc" : "textarea"}
        ]}
      ]
    }
  ]
}

// data model
localStorage.setItem("th_data", JSON.stringify({}));

// get data
data = JSON.parse(localStorage.getItem('th_data'));

// create user
data.users.push({});

//re store data
localStorage.setItem("th_data", JSON.stringify(data));

//get data
data = JSON.parse(localStorage.getItem('th_data'));

//create project
data.users[0].projects = [];

// re store data
localStorage.setItem("th_data", JSON.stringify(data));
