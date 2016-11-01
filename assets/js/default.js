'use strict';
$(document).ready(function(){

  // Responsive menu
  $(".button-collapse").sideNav();

  // Create new project card
      $('#projectBoard').append(
        '<div class="col s12 m4 l4">' +
          '<div class="card">' +
            '<div class="card-image waves-effect waves-block waves-light">' +
              '<img class="activator" src="assets/img/placeholder4.svg">' +
            '</div>' +
            '<div class="card-content">' +
              '<span class="card-title activator grey-text text-darken-4">' +
              'projectTitle'+
              '<i class="material-icons right">more_vert</i></span>' +
            '</div>' +
            '<div class="card-reveal">' +
              '<div class="card-title">' +
                '<span class="card-title grey-text text-darken-4">' +
                'projectTitle '+
                '<i class="material-icons right">close</i></span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );

}); // document.ready
