$(function(){
    if (!!$.cookie('email')) {
        $('#nav-message').html('Welcome! <span id="nav-id">' + $.cookie("nickname") + '</span>');
    } else {
        window.location.href = 'login';
    }
});