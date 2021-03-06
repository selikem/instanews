import '../scss/style.scss';


$(function () {
  $('.loader-gif').hide();
  $('#sections').selectric();


  $('#sections').on('change', function() {
    $('.header').addClass('out-of-way');
    $('.loader-gif').show();
    $('.stories').empty();
    var storyString = '';
    var section = this.value;
    var url = 'https://api.nytimes.com/svc/topstories/v2/'+ section + '.json';
    url += '?' + $.param({
  'api-key': 'b7bb6cf507d04ce6b6eb3d9c6cb4c04c'
    });
    $.ajax({
      url: url,
      method: 'GET'
    }).done(function(data) {
      var filteredList = data.results.filter(function(item) {return item.multimedia.length >= 5}).slice(0,12);
      $.each(filteredList, function(index, value) {
        storyString += '<div class="story-cell"><a href="'+ value.url +'" target="_blank"><img src="'+value.multimedia[4].url+'" class="story-image"><div class="abstract-container"><p class="story-abstract">'+value.abstract+'</p></div></a></div>';
      })
      $('.stories').append(storyString)
    }).fail(function() {
      hideLoader();
      $('.stories').append('<p class="errormsg">Sorry, something went wrong.</p>');
    }).always(function () {
      $('.loader-gif').hide();
    });

  });

  

});