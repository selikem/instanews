$(function () {
  function hideLoader() {
    $('.loader-gif').hide();
  }
  hideLoader();
  $('#sections').selectric();


  $('#sections').on('change', function() {
    $('.header').addClass('out-of-way-header');
    $('footer').addClass('out-of-way-footer');
    $('.loader-gif').show();
    $('.stories').empty();
    var storyString = '';
    var runCount= 0;
    var section = this.value;
    var url = 'https://api.nytimes.com/svc/topstories/v2/'+ section + '.json';
    url += '?' + $.param({
  'api-key': 'b7bb6cf507d04ce6b6eb3d9c6cb4c04c'
    });
    $.ajax({
      url: url,
      method: 'GET'
    }).done(function(data) {
      console.log(data);
      hideLoader();
      $.each(data.results, function(index, value) {
        if (value.multimedia.length >= 5 && runCount < 12 && value.multimedia[4].width >= 2048) {
        storyString += '<div class="story-cell"><a href="'+ value.url +'" target="_blank"><img src="'+value.multimedia[4].url+'" class="story-image"><div class="abstract-container"><p class="story-abstract">'+value.abstract+'</p></div></a></div>';
        runCount++ ; 
        }

      })
      $('.stories').append(storyString)
    }).fail(function() {
      hideLoader();
      $('.stories').append('<p class="errormsg">Sorry, something went wrong.</p>');
    });

  });

  

});