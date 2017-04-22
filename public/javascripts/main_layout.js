$(function(){
    if (!!$.cookie('email')) {
        $('#nav-message').html('Welcome! <span id="nav-id">' + $.cookie("nickname") + '</span>');
    } else {
        window.location.href = 'login';
    }

    $('#myacc-email').text($.cookie('email'));

    loadUsrComment($.cookie('email'));


    function loadUsrComment(email) {
        $('#myacc-comments').empty();
        request(_host_address + 'search/get_user_comments', {
            email: $.cookie('email')
        }, function(data) {
            $('#myacc-contribute').text('Contribution: ' + data.length);
            for (var i=0; i<data.length; i++) {
                addMyaccComment(data[i]['name'], data[i]['comments'], data[i]['info_id']);
            }
        });
    }

    function addMyaccComment(movie, comment, id) {
        var $container = $('#myacc-comments');
        var $chip = $(
            '<div class="chip">' +
                movie + ' : ' + comment +
                '<i class="close material-icons" onclick="delComment(' + id + ')">close</i>' +
            '</div>');
        $container.append($chip);
    }

    function delComment(id) {
        request(_host_address + 'search/delete_comment', {id: id}, function() {
            loadUsrComment($.cookie('email'));
        });
    }
});

function logout() {
    $.cookie('email', null);
    $.cookie('nickname', null);
    window.location.href = 'login';
}