$(function(){
    var dataObj = {};
    $('#btn-register').click(function() {
        dataObj = {
            nickname : $('#register-nickname').val(),
            email : $('#register-email').val(),
            password : $('#register-password').val(),
            passwordC : $('#register-pw-confirm').val()
        };
        if (validate(dataObj)) register(dataObj);
    });

    function register(obj) {
        request(_host_address + 'register', obj, function (data, status) {
            console.log(data);
            if (data['result'] == '1') {
                $.cookie('email', obj.email);
                $.cookie('nickname', obj.nickname);
                Materialize.toast('Register success! Jumping to home page...', 3000, '', function() {
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



