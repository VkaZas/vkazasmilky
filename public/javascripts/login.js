$(function(){
    var dataObj = {};
    $('#btn-login').click(function() {
        dataObj = {
            email : $('#login-email').val(),
            password : $('#login-password').val(),
        };
        if (validate(dataObj)) login(dataObj);
    });

    function login(obj) {
        request(_host_address + 'login', obj, function (data, status) {
            console.log(data);
            if (data['result'] == '1') {
                $.cookie('email', obj.email);
                $.cookie('nickname', data['nickname']);
                Materialize.toast('Login success! Jumping to home page...', 3000, '', function() {
                    window.location.href = 'home';
                });
            } else {
                Materialize.toast(data['info'], 3000);
            }
        })
    }

    function validate(obj) {
        if (!!obj.nickname && !!obj.email) return true;
        //todo : implement validation
        return true;
    }
});



