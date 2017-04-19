$(function(){
    var $searchBar = $('#search-bar');
    $searchBar.keydown(function(e) {
         if (e.keyCode == 13) {
             let keyword = $searchBar.val();
             if (!!keyword) search(keyword);
         }
    });

    function search(keyword) {
        window.location.href = 'search?keyword=' + keyword
    }
});

