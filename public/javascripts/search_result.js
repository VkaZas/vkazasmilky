$(function(){
   $('.carousel').carousel();
});

var currentMovie;

function loadComment(movie, year) {
    currentMovie = {
        movie: movie,
        year: year
    };
    $('#comment-label').text('comment for ' + movie);
    request(_host_address + 'search/comments', {movie : movie, year: year}, function(data, status) {
        var $container = $('#comment-container');
        $container.empty();
        if (!data || !data.length) return;
        for (var i=0; i<data.length; i++) {
            var ele = '<li style="opacity: 0">' +
                        '<div class="card blue-grey darken-2">' +
                            '<div class="card-content white-text">' +
                                '<span class="card-title">' + data[i].email + '</span>' +
                                '<p>' + data[i].comments + '</p>' +
                            '</div>' +
                            '<div class="card-action">' +
                                '<a href="javascript:void(0)" class="btn-flat">View</a>' +
                                '<a href="javascript:void(0)" class="btn-flat btn-del-comment" onclick="delComment(' + data[i]["info_id"] + ')">Delete</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>';
            var $ele = $(ele);
            if (data[i].email != $.cookie('email'))
                $ele.find('.btn-del-comment').addClass('disabled');
            $container.append($ele);
        }
        Materialize.showStaggeredList($container);
    });
}

function delComment(id) {
    request(_host_address + 'search/delete_comment', {id: id}, function() {
        loadComment(currentMovie.movie, currentMovie.year);
    });
}

function postComment() {
    var comment = $('#textarea-comment').val();
    request(_host_address + 'search/add_comment', {movie: currentMovie.movie, comment: comment, year: currentMovie.year, email: $.cookie('email')}, function(data, status) {
        loadComment(currentMovie.movie, currentMovie.year);
    });
}