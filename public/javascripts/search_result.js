var currentMovie = null;
var socket = io(_host_address);

$(function(){
    $('.carousel').carousel();
    $('#chat-msg-input').keydown(function(e) {
        if (e.which == 13 && !!currentMovie) {
            e.preventDefault();
            sendMsg();
        }
    });

    socket.on('msg-recv', function(data) {
        if (data.movie == currentMovie.movie && data.year == currentMovie.year) {
            addMsg(data.nickname, data.msg);
        }
    });

    socket.on('sync-room-back', function(data) {
        if (!!data) {
            for (var i=0; i<data.length; i++) {
                addMsg(data[i]['nickname'], data[i]['content']);
            }
        }
    });
});

function addMsg(nickname, msg) {
    var $plane = $('#chat-plane');
    var $msgChip =
        $('<div><div class="chip">' +
            '<span class="chat-speaker">' + nickname + ' : </span>' +
            '<span class="chat-content"> ' + msg + '</span>' +
            '</div></div>');
    $plane.append($msgChip);
    $('#chat-msg-box').scrollTop($plane.get(0).scrollHeight);
}

function loadChatroom() {
    $('#chat-msg-btn').removeClass('disabled');
    $('#chat-title').text(currentMovie.movie + ' Room');
    $('#chat-plane').empty();

    socket.emit('sync-room', {movie: currentMovie.movie, year: currentMovie.year});
}

function sendMsg() {
    var $chatInput = $('#chat-msg-input');
    socket.emit('msg-send', {
        msg: $chatInput.val(),
        movie: currentMovie.movie,
        year: currentMovie.year,
        email: $.cookie('email'),
        nickname: $.cookie('nickname')
    });
    $chatInput.val('');
}

function loadComment(movie, year) {
    currentMovie = {
        movie: movie,
        year: year
    };

    loadChatroom();

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