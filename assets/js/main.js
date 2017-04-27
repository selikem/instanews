$(function () {
  function hideLoader() {
    $('.loader-gif').hide();
  }
  hideLoader();


  $('#sections').on('change', function() {
    $('.loader-gif').show();
    $('.stories').empty();
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
        if (value.multimedia.length !== 0) {
        $('.stories').append('<div class="story-cell"><img src="'+value.multimedia[3].url+'" class="story-image"><div class="abstract-container"><a href="'+ value.url +'" target="_blank"><p class="story-abstract">'+value.abstract+'</p></a></div></div>');
        }

      })
    }).fail(function() {
      $('.stories').append('<p>Sorry, something went wrong.</p>');
    });

  });

  

});