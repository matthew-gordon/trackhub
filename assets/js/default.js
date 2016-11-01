'use strict';
$(document).ready(function(){
var createProj = $('#createProj');
console.log(createProj);

  // Responsive menu
  $(".button-collapse").sideNav();

  // Modal trigger
  $('.modal-trigger').leanModal();

  // Create new project card
  createProj.click(function(){
    $('#projectBoard').append(
      '<div class="col s12 m4 l4">' +
      '<div class="card">' +
      '<div class="card-image waves-effect waves-block waves-light">' +
      '<img class="activator" src="assets/img/placeholder4.svg">' +
      '</div><!-- card-image -->' +
      '<div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' +
      'projectTitle'+
      '<i class="material-icons right">more_vert</i></span>' +
      '</div><!-- card-content -->' +
      '<div class="card-reveal">' +
      '<div class="card-title">' +
      '<span class="card-title grey-text text-darken-4">' +
      'projectTitle '+
      '<i class="material-icons right">close</i></span>' +
      '</div><!-- card-title -->' +
      '</div><!-- card-reveal -->' +
      '</div><!-- card -->' +
      '</div><!-- col -->'
    );
  });

}); // document.ready
