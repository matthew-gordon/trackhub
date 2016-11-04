'use strict';

$(document).ready(function(){
var projBoard = $('#projectBoard');
var createProj = $('#createProject');
var deleteProj = $('#deleteProject');
var titleField = $('#project_title');
var deleteTitle = $('#delete_title');
var descriptionField = $('#textarea1');
var taskList = $('#taskList>ul');
var addTask = $('#addTask');
var repo, project, contents_url, data;

  if(localStorage.length === 0) {
     data = localStorage.setItem("th_data", JSON.stringify({users : []}));
  } else {
    popProj();
  }

  // Responsive menu
  $(".button-collapse").sideNav();

  // Modal trigger
  $('.modal-trigger').leanModal();

  // Git Hub login
  $('#authenticate').click(function(){
    getAuth();
  });

  // Create new project card
  createProj.click(function(){
    var projectTitle = titleField.val();
    var projectDescription = descriptionField.val();

      //Add project to Github
      createProject();

      //Close project info
      $('#modalProject').closeModal();

      // Close project menu
      $('.fixed-action-btn').closeFAB();

      // Clear project form fields
      titleField.val('');
      descriptionField.val('');

      // Add project card to board
      projBoard.append(
        '<div class="col s12 m4 l4">' +
        '<div class="card z-depth-2">' +
        '<div class="card-image waves-effect waves-block waves-light">' +
        '<img class="activator" src="assets/img/github-mark.png">' +
        '</div><!-- card-image -->' +
        '<div class="card-content">' +
        '<span class="card-title activator grey-text text-darken-4">' +
        projectTitle +
        '<i class="material-icons right">more_vert</i></span>' +
        '</div><!-- card-content -->' +
        '<div class="card-reveal">' +
        '<div class="card-title">' +
        '<span class="card-title grey-text text-darken-4">' +
        projectTitle +
        '<i class="material-icons right">close</i></span>' +
        '</div>' +
        '<div class="card-content">' +
        '<p>' + projectDescription + '</p>' +
        '</div><!-- card-content -->' +
        '<div class="card-action">' +
        '<p class="center">' +
        '<a class="btn modal-trigger teal lighten-1" href="#projectTasks">MANAGE PROJECT</a>' +
        '</p>' +
        '</div>' +
        '</div><!-- card -->' +
        '</div><!-- col -->'
      );
      $('.modal-trigger').leanModal();
  });

  // Add tasks to task list
  addTask.click(function(){
    var taskName = $('#taskName');
    var taskDesc = $('#taskDesc');
    var filename = taskName.val();
    var filemessage = "Added a new task, looks you're ... COMMITED ... to it..";
    var filecontent = taskDesc.val();
    var basecontent = btoa(filecontent);
    var apiurl = data.users[0].projects.project.url.replace('{+path}',filename + '.md');
    var filedata = '{"message":"'+filemessage+'","content":"'+basecontent+'"}';

    $.ajax({
        url: apiurl,
        type: 'PUT',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "token " + data.users[0].authToken);
        },
        data: filedata
    }).done(function(response) {
        console.log(response);
        taskList.append(
          '<li class="collection-item">' +
          '<div>' +
            taskName.val() +
          '</div>' +
          '</li>'
        );
        $('#taskInfo').closeModal();
        taskName.val('');
    });
  });

  // Github Authorization
  function getAuth() {
    var username = $("#username").val();
    var password = $("#password").val();
    var auth = username + ':' + password;
    $.ajax({
      url: 'https://api.github.com/authorizations',
      type: 'POST',
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(auth));
      },
      data: '{"scopes":["repo", "delete_repo"],"note":"create/delete repo with ajax"}'
    }).done(function(response) {
      var token = response.token;

      // Create user on auth
      data = JSON.parse(localStorage.getItem('th_data'));
      data.users.push({
        name : username,
        authToken : token,
        projects : {}
      });
      localStorage.setItem("th_data", JSON.stringify(data));
      location.href = "project.html";
    });
  }

  // Create project on Github
  function createProject() {
      data = JSON.parse(localStorage.getItem('th_data'));
      repo = titleField.val();
      project = descriptionField.val();
      repo = repo.replace(/\s+/g, '-');
      $.ajax({
        url: 'https://api.github.com/user/repos',
        type: 'POST',
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "token " + data.users[0].authToken);
        },
        data: '{"name": ' + JSON.stringify(repo) + ',"description":' + JSON.stringify(project) + ',"homepage": "https://trackerApp.com","auto_init":true}'
      }).done(function(response) {
        contents_url = response.contents_url;
        console.log(contents_url);
        // Create project
        data = JSON.parse(localStorage.getItem('th_data'));
        data.users[0].projects[repo] = {
            name : repo,
            desc : project,
            url : contents_url
        };
        localStorage.setItem("th_data", JSON.stringify(data));
      });
  }

  // Delete project on Github
  deleteProj.click(function(){
    deleteProject();

    //Close project info
    $('#modalDelete').closeModal();

    // Close project menu
    $('.fixed-action-btn').closeFAB();

  });

  // Delete project
  function deleteProject() {
    data = JSON.parse(localStorage.getItem('th_data'));
    var deleteProject = deleteTitle.val().replace(/\s+/g, '-');
    $.ajax({
      url: 'https://api.github.com/repos/' + data.users[0].name + '/' + deleteProject,
      type: 'DELETE',
      beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "token " + data.users[0].authToken);
        }
      }).done(function() {
      delete data.users[0].projects[deleteProject];
      localStorage.setItem("th_data", JSON.stringify(data));
      projBoard.empty();
      popProj();
      console.log('repo was deleted!');
    });
  }

  // Populate project
  function popProj() {
    data = JSON.parse(localStorage.getItem('th_data'));

    // Check for users
    if(data.users.length > 0) {
     // check for projects
      if(Object.keys(data.users[0].projects).length > 0) {
        for ( var proj in data.users[0].projects ) {
          projBoard.append(
            '<div class="col s12 m4 l4">' +
            '<div class="card">' +
            '<div class="card-image waves-effect waves-block waves-light">' +
            '<img class="activator" src="assets/img/github-mark.png">' +
            '</div><!-- card-image -->' +
            '<div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' +
            data.users[0].projects[proj].name +
            '<i class="material-icons right">more_vert</i></span>' +
            '</div><!-- card-content -->' +
            '<div class="card-reveal">' +
            '<div class="card-title">' +
            '<span class="card-title grey-text text-darken-4">' +
            data.users[0].projects[proj].name +
            '<i class="material-icons right">close</i></span>' +
            '</div>' +
            '<div class="card-content">' +
            '<p>' + data.users[0].projects[proj].desc + '</p>' +
            '</div><!-- card-content -->' +
            '<div class="card-action">' +
            '<p class="center">' +
            '<a class="btn modal-trigger teal lighten-1" href="#projectTasks">MANAGE PROJECT</a>' +
            '</p>' +
            '</div>' +
            '</div><!-- card -->' +
            '</div><!-- col -->'
          );
        }
      } else {
        console.log('there are no projects for this user');
        console.log(data);
      }
    } else {
      console.log('there are no users');
    }
  }

  $('#logOut').click(function(){
    localStorage.clear();
    location.href = "login.html";
  });
}); // document.ready
