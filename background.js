fetch(chrome.extension.getURL('/words.json'))
      .then((resp) => resp.json())
      .then(function (jsonData) {
                      var items = [];
                      $.each(jsonData, function(key, val){
                        items.push(val);
                      });
                      chrome.storage.sync.set({'items': items});
});