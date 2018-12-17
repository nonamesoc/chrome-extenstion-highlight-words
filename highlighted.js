chrome.storage.sync.get(['items'], function(result) {
    var countOfmatches = 0;
    items = result.items;
    for(var i=0; i<items.length; i++)
    {
        var searchString = items[i]['text'];
        var lSpaces = /^\s+/g;
        var rSpaces = /\s+$/g;
        searchString = searchString.replace(lSpaces, '');
        searchString = searchString.replace(rSpaces, '');

        var replaceStr = '<mark style="background-color: ';

            replaceStr += items[i]['color'];

        replaceStr += '; " >' + searchString + '</mark>';

        findAndReplace(searchString, replaceStr);
    }

    function findAndReplace(searchText, replacement, searchNode) {
        if (!searchText || typeof replacement === 'undefined')
        {
             return;
        }
        var regex = typeof searchText === 'string' ? new RegExp(searchText, 'gim') : searchText;
        var childNodes = (searchNode || document.body).childNodes;
        var cnLength = childNodes.length;
        excludes = 'html,head,style,title,link,script,object,iframe';
        
        while (cnLength--)
        {
            var currentNode = childNodes[cnLength];

            if (currentNode.nodeType === 1 && (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) 
            {
                arguments.callee(searchText, replacement, currentNode);
            }
            if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) 
            {
                continue;
            }       

            var parent = currentNode.parentNode;
            var html = currentNode.data.replace(regex, replacement);
            
            frag = (function()
            {
                wrap = document.createElement('div'),
                frag = document.createDocumentFragment();
                wrap.innerHTML = html;
                while (wrap.firstChild) 
                {
                    frag.appendChild(wrap.firstChild);
                }
                return frag;
            })();
            parent.insertBefore(frag, currentNode);
            parent.removeChild(currentNode);

            var arrayOfMatch = currentNode.data.match(regex);
            countOfmatches += arrayOfMatch.length;  

            var srtMaxLength = 500;
            if(html.length > srtMaxLength)
            {
                html = html.substr(0,srtMaxLength);
                html += ' [...]';
            }    
        }
    }
});