$(function () {
    $("#btnLogin").click(function () {
        location.href = "login.html"
    });

    $("#frmRegister").submit(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var name = $("#name").val();
        var username = $("#username").val();
        var email = $("#email").val();
        var password = $("#password").val();

        var datalist = "name=" + name + "&username=" + username + "&email=" + email + "&password=" + password;
        $.ajax({
            type: "post",
            url: "http://172.17.87.170:8080/UPSaver/Register",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);
                if (myData.status === 1) {
                    alert("User already Register");
                }
                else {
                    alert("User Successfully Registered");
                    location.href("login.html");
                }
            },
            error: function () {
                console.log("ajax error!");
                alert("Please contact admin!");
            }
            });
    });
});