'use strict';
$(document).ready(function(){
var projBoard = $('#projectBoard');
var createProj = $('#createProject');
var titleField = $('#project_title');
var descriptionField = $('#textarea1');
var toDoList = $('#toDo>ul');
var doingList = $('#doing>ul');
var doneList = $('#done>ul');
var addTask= $('#addTask');
var removeTask = $('#removeTask');
var user = JSON.parse(localStorage.getItem('user'));
var contents_url;


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
        '<div class="card">' +
        '<div class="card-image waves-effect waves-block waves-light">' +
        '<img class="activator" src="assets/img/placeholder4.svg">' +
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
        '<a class="btn modal-trigger teal lighten-1" href="project.html">MANAGE PROJECT</a>' +
        '</p>' +
        '</div>' +
        '</div><!-- card -->' +
        '</div><!-- col -->'
      );

  });

  // Add tasks to task list
  addTask.click(function(e){
    var id = e.target;
    console.log(id);
    // if() {
      toDoList.append(
        '<li class="collection-item avatar">' +
        '<i class="material-icons circle green">list</i>' +
        '<span class="title">Title</span>' +
        '<p>First Line <br>' +
        '   Second Line' +
        '</p>' +
        '<a href="#!" class="secondary-content">' +
        '<i class="material-icons">grade</i></a>' +
        '</li>'
      );
    // }
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
      localStorage.setItem('user', JSON.stringify({
        name : username,
        authToken : token
      }));
      console.log(token);
      location.href = "index.html";
    });
  }


  function createProject() {
      var repo = titleField.val();
      $.ajax({
        url: 'https://api.github.com/user/repos',
        type: 'POST',
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "token " + user.authToken);
        },
        data: '{"name": ' + JSON.stringify(repo) + ',"description":"repo create from ajax test","homepage": "https://trackerApp.com","auto_init":true}'
      }).done(function(response) {
        console.log(response);
        contents_url = response.contents_url;
        console.log(contents_url);
      });
  }

}); // document.ready
