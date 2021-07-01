$(function() {
    $("#btnRegister").click(function(){
        location.href="register.html"
    });


    $("#frmLogin").submit(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var username = $("#username").val();
        var password = $("#password").val();
            var datalist = "username=" + username + "&password=" + password;
            $.ajax({
                type: "post",
                url: "http://172.17.87.170:8080/UPSaver/Login",
                data: datalist,
                cache: false,
                success: function (mydata) {
                    var myData = JSON.parse(mydata);
                    if (myData.status === 1) {
                        //alert("User already Register");
                        sessionStorage.ttoken = username;
                        location.href="index.html#accounts";
                    }
                    else {
                        alert("Wrong Username or Password");
                        
                    }
                },
                error: function () {
                    console.log("ajax error!");
                    alert("Please contact admin!");
                }
            });
    });
});