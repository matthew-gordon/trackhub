'use strict';
// Data model
{
  users : [
    name: "",
    authToken : ""
    projects : {
      {
        name : "",
        desc : "",
        tasks : [
          name : "",
          desc : ""
        ]
      },
    }
  ]
};

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
