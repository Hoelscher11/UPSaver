$(function () {
    if (!sessionStorage.ttoken || sessionStorage.ttoken === null)
        location.href = "login.html";

    document.getElementById("idSpan").innerHTML = sessionStorage.ttoken;


    var link1 = crossroads.addRoute("/accounts", function () {
        $(".navbar-collapse li").removeClass("active");
        $(".navbar-collapse li a[href='#contacts']").parent().addClass("active");
        var username = sessionStorage.ttoken;
        var datalist = "username=" + username;
        $.ajax({
            type: "post",
            url: "http://172.17.87.170:8080/UPSaver/GetAllAccount",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);
                var lastIndex = myData.length - 1;
                var htmlText = "";
                if (myData[lastIndex].status === 1) {
                    for (var i = 0; i < lastIndex; i++) {
                        htmlText = htmlText + "<tr><td><a href='#viewAccountData/" + myData[i].accname + "'>" + myData[i].accname + "</a></td></tr>";
                    }

                    $("#tblAccounts tbody").html(htmlText);
                }
            },
            error: function () {
                console.log("ajax error!");
                alert("Please contact admin!");
            }
        });

        $("#divAccountData").hide();
        $("#divAddAccount").hide();
        $("#divEditAccount").hide();
        $("#divAllAccount").show();


    });

    var link2 = crossroads.addRoute("/logout", function () {
        sessionStorage.clear();
        location.href = "login.html";
    });

    var link3 = crossroads.addRoute("/viewAccountData/{accname}", function(accname){
        $(".navbar-collapse li").removeClass("active");
        $(".navbar-collapse li a[href='#contacts']").parent().addClass("active");
        var username = sessionStorage.ttoken;
        var datalist ="username=" + username + "&accname=" +accname;
        $.ajax({
            type: "post",
            url: "http://172.17.87.170:8080/UPSaver/GetAccountData",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);
                sessionStorage.accname = myData[0].accname;
                var lastIndex = myData.length - 1;
                var htmlText = "";
                if (myData[lastIndex].status === 1) {
                    for (var i = 0; i < lastIndex; i++) {
                        htmlText = htmlText + "<tr><td>" + myData[i].accname
                         + "</td><td>" + myData[i].accusername
                         + "</td><td>" + myData[i].accpassword
                         + "</td></tr>";
                    }

                    $("#tblAccountData tbody").html(htmlText);
                }
                $("#divAllAccount").hide();
                $("#divEditAccount").hide();
                $("#divAddAccount").hide();
                $("#divAccountData").show();
            },
            error: function () {
                console.log("ajax error!");
                alert("Please contact admin!");
            }
        });
    });

    var link4 = crossroads.addRoute("/btnAddAccount", function () {
        $("#divAllAccount").hide();
        $("#divAccountData").hide();
        $("#divAddAccount").show();
        $("#divEditAccount").hide();
    });

    $("#frmAddAccount").submit(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var username = sessionStorage.ttoken;
        var accname = $("#accountname").val();
        var accusername = $("#username").val();
        var accpassword = $("#password").val();

        var datalist = "username=" + username + " &accname=" + accname + "&accusername=" + accusername + "&accpassword=" + accpassword;
        $.ajax({
            type: "post",
            url: "http://192.168.137.1:8080/UPSaver/AddAccount",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);
                if (myData.status === 1) {
                    alert("Add Contact Success!");
                    $("#divAddAccount").hide();
                    $("#divAccountData").hide();
                    $("#divEditAccount").hide();
                    $("#divAllAccount").show();
                }
                else {
                    alert("Add Contact Failed");
                }
            },
            error: function () {
                console.log("ajax error!");
                alert("Please contact admin!");
            }
        });
    });


    var link5 = crossroads.addRoute("/editAccountFrm", function(){

        var accname = sessionStorage.accname;
        var username = sessionStorage.ttoken;
        var datalist = "username=" + username + "&accname=" +accname;
        $.ajax({
            type: "post",
            url: "http://172.17.87.170:8080/UPSaver/GetAccountData",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);

                 var lastIndex = myData.length - 1;
                if (myData[lastIndex].status === 1) {
                    for (var i = 0; i < lastIndex; i++) {
                        document.getElementById("accountname1").value = myData[i].accname;
                        document.getElementById("username1").value = myData[i].accusername;
                        document.getElementById("password1").value = myData[i].accpassword;
                    }

                $("#divAllAccount").hide();
                $("#divAddAccount").hide();
                $("#divAccountData").hide();
                $("#divEditAccount").show();
            }
            },
            error: function () {
                console.log("ajax error!");
                alert("Please contact admin!");
        }
    });
});

    $("#frmEditAccount").submit(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var accname = $("#accountname1").val();
        var accusername = $("#username1").val();
        var accpassword = $("#password1").val();
        var username = sessionStorage.ttoken;

        var datalist = "username=" + username + "&accname=" + accname + "&accusername=" + accusername + "&accpassword=" +accpassword;
        $.ajax({
            type: "post",
            url: "http://172.17.87.170:8080/UPSaver/UpdateAccount",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);
                if (myData.status === 1) {
                    alert("Update Contact Success!");
                    $("#divEditAccount").hide();
                    $("#divAccountData").show();
                }
                else {
                    alert("Update Contact Failed");
                }
            },
            error: function () {
                console.log("ajax error!");
                alert("Please contact admin!");
            }
        });
    });

    var link6 = crossroads.addRoute("/deleteAccount", function(){
       
       var username = sessionStorage.ttoken;
       var accname = sessionStorage.accname;
       datalist= "username=" + username + "&accname=" + accname;
       bootbox.confirm("Are you sure to delete this contact?",function(answer){
        if(answer){
            $.ajax({
                type: "post",
                url: "http://172.17.87.170:8080/UPSaver/DeleteAccount",
                data: datalist,
                cache: false,
                success: function (mydata) {
                    var myData = JSON.parse(mydata);
                    if (myData.status === 1) {
                        alert("Delete Contact Successfull!");
                            $("#divAccountData").hide();
                            $("#divAddAccount").hide();
                            $("#divEditAccount").hide();
                            $("#divAllAccount").show();
                    }
                    else {
                        alert("Delete Contact Failed");
                    }
                },
                error: function () {
                    console.log("ajax error!");
                    alert("Please contact admin!");
                }
            });
        }
        else{
            bootbox.alert("Delete canceled!");
                            $("#divAccountData").hide();
                            $("#divAddAccount").hide();
                            $("#divEditAccount").hide();
                            $("#divAllAccount").show();
        }
       });
    });


    function parseHash(newHash, oldHash) {
        crossroads.parse(newHash);
    }

    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();

});