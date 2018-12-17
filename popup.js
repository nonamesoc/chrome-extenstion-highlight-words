$.getJSON('words.json', function(data){
  var items = [];
 
  $.each(data, function(key, val){
    var words =[];
    $.each(val, function(key2, val2){
        words.push('<span id="' + key2 + '">' + val2 + '</span>');
    });
    words = words.join(' ');
    items.push('<li id="' + key + '">' + words + '</li>');
  });
 
  $('<ul/>', {
    'class': 'my-new-list',
    html: items.join('')
  }).appendTo('body');
});
