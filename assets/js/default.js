'use strict';
$(document).ready(function(){
var projBoard = $('#projectBoard');
var createProj = $('#createProj');
var titleField = $('#project_title');
var descriptionField = $('#textarea1');
var taskList = $('#toDo');
var addTask= $('#addTask');
var removeTask = $('#removeTask');


  // Responsive menu
  $(".button-collapse").sideNav();

  // Modal trigger
  $('.modal-trigger').leanModal();

  // Create new project card
  createProj.click(function(){
    var projectTitle = titleField.val();
    var projectDescription = descriptionField.val();

    //Close project info
    $('#modal1').closeModal();

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

}); // document.ready
