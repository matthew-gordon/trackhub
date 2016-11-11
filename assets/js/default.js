'use strict';

$(document).ready(function(){
var projBoard = $('#projectBoard');
var createProj = $('#createProject');
var projectTitle = $('#project_title');
var deleteProj = $('#deleteProject');
var titleField = projectTitle;
var projectDesc = $('#textarea1');
var project, contents_url, data, gitResponse, _sha;

  if(localStorage.length === 0) {
     data = localStorage.setItem("th_data", JSON.stringify({users : []}));
  } else {
    popProj();
  }

  // Responsive menu
  $(".button-collapse").sideNav();

  // Select box
  $('select').material_select();

  // Modal trigger
  $('.modal-trigger').leanModal();

  // Git Hub login
  $('#authenticate').click(function(){
    getAuth();
  });

  $('#ghsubmitbtn').click(function(){
    createWorkspace();
  });


  // Create new project card
  createProj.click(function(){
    var projectTitle = titleField.val();
    var projectDescription = projectDesc.val();

      // Create Project in storage
      createProject();

      // Close project info
      $('#modalProject').closeModal();

      // Close project menu
      $('.fixed-action-btn').closeFAB();

      // Clear project form fields
      titleField.val('');
      projectDesc.val('');

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
      gitResponse = response;
      // Create user on auth
      data = JSON.parse(localStorage.getItem('th_data'));
      data.users.push({"name":username,"authToken":token,"projects": []});
      localStorage.setItem("th_data", JSON.stringify(data));
      location.href = "project.html";
    });
  }

  // Create workspace
  function createWorkspace() {
      data = JSON.parse(localStorage.getItem('th_data'));
      project = projectDesc.val();
      $.ajax({
        url: 'https://api.github.com/user/repos',
        type: 'POST',
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "token " + data.users[0].authToken);
        },
        data: '{"name":"th_projects","description":"Datamodel for trackHub","homepage":"https://trackerApp.com","auto_init":true}'
      }).done(function(response) {
        contents_url = response.contents_url;
        var filecontent = JSON.stringify({"name":data.users[0].name,"projects":[]});
        var basecontent = btoa(filecontent);
        var apiurl = contents_url.replace('{+path}','th_data.json');
        var filedata = '{"message":"Initialized trackHub projects","content":"'+basecontent+'"}';

        $.ajax({
            url: apiurl,
            type: 'PUT',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "token " + data.users[0].authToken);
            },
            data: filedata
        }).done(function(response) {
          localStorage.setItem('th_data', JSON.stringify(data));
          console.log(response);
          $('#projectBoard>div').addClass('addProject');
          Materialize.toast('Workspace created! Add a new project.', 4000);
        });
      });
  }

  // Create project
  function createProject(){

    // Add data to local storage
    data = JSON.parse(localStorage.getItem("th_data"));
    data.users[0].projects.push({"name":projectTitle.val(),"desc":projectDesc.val(),"tasks":[]});
    localStorage.setItem("th_data", JSON.stringify(data));

    // Add data to github
    $.ajax({
      url : 'https://api.github.com/repos/redemption23/th_projects/contents/th_data.json',
      type : 'GET',
      beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "token " + data.users[0].authToken);
      }
    }).done(function(response) {
      data = JSON.parse(localStorage.getItem("th_data"));
      _sha = response.sha;
      var filecontent = JSON.stringify({
        "name":"name",
        "projects": [{
          "name":data.users[0].projects.name,
          "desc":data.users[0].projects.desc,
          "tasks":[]
      }]
    });
      var basecontent = btoa(filecontent);
      var filedata = '{"message":"Added new project","content":"'+basecontent+'","sha":"'+_sha+'"}';

        $.ajax({
          url : 'https://api.github.com/repos/redemption23/th_projects/contents/th_data.json',
          type: 'PUT',
          beforeSend: function(xhr) {
              xhr.setRequestHeader("Authorization", "token " + data.users[0].authToken);
          },
          data : filedata
        }).done(function(response){
          _sha = response.sha;
          console.log(response);
        });
      });

    $('#projectBoard>div').removeClass('addProject');
    $('#w').empty();
    Materialize.toast('New project added.', 4000);
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

    $.ajax({
      url: 'https://api.github.com/repos/' + data.users[0].name + '/' + deleteProject,
      type: 'DELETE',
      beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "token " + data.users[0].authToken);
        }
      }).done(function() {

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
      if(data.users[0].projects.length > 0) {
        $('#w').remove();
        for ( var i = 0; i < data.users[0].projects.length; i++ ) {
          projBoard.append(
            '<div class="col s12 m4 l4">' +
            '<div class="card">' +
            '<div class="card-image waves-effect waves-block waves-light">' +
            '<img class="activator" src="assets/img/github-mark.png">' +
            '</div><!-- card-image -->' +
            '<div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' +
            data.users[0].projects[i].name +
            '<i class="material-icons right">more_vert</i></span>' +
            '</div><!-- card-content -->' +
            '<div class="card-reveal">' +
            '<div class="card-title">' +
            '<span class="card-title grey-text text-darken-4">' +
            data.users[0].projects[i].name +
            '<i class="material-icons right">close</i></span>' +
            '</div>' +
            '<div class="card-content">' +
            '<p>' + data.users[0].projects[i].desc + '</p>' +
            '</div><!-- card-content -->' +
            '<div class="card-action">' +
            '<p class="center">' +
            '<a class="btn modal-trigger teal lighten-1" href="#projectTasks">MANAGE PROJECT</a>' +
            '</p>' +
            '</div>' +
            '</div><!-- card -->' +
            '</div><!-- col -->'
          );
          // Populate Delete list
          $('#projectDeleteList>select').append('<option value="' + i + '">' + data.users[0].projects[i].name + '</option>');
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
