$(document).ready(function () {
    $(".add-cust-btn").click(function () {
        var custName = $("#user-name").val();
        var mobilePhone = $("#user-phone").val();
        var age = $("#user-age").val();
        var schoolName = $('#user-school').val();
        var sex = $("input[name='sex-options']:checked").val();

        if (custName != null && mobilePhone != null && age != null && schoolName != null && sex != null) {
            //location.href = "https://mayu1991.github.io/czwm.github.io/main.html";

            var params = {
                "custName": custName,
                "mobilePhone": mobilePhone,
                "age": age,
                "schoolName": schoolName,
                "sex": sex
            };
            //转json
            params = JSON.stringify(params);
            //base64加密
            params = jQuery.base64.encode(params);
            $.ajax({
                url: Glass.host + "/cust/detail/save",
                data: params,
                type: "GET",
                dataType: "json",

                async: false,
                "success": function (resp) {

                    if (resp != null) {
                        // var responseObj = JSON.stringify(resp);
                        //登录成功，跳转到主页面
                        if (resp.success) {
                            location.href = "main.html?refresh=1";//刷新页面
                        } else {
                            alert(resp.message);
                        }
                    } else {
                        alert("新增失败，请联系系统管理员");
                    }

                }
            });
        }
    });

});

