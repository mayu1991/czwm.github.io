$(document).ready(function () {

    var userId = Glass.getUrlParam("userId");

    //给返回按钮设置初始值
    $(".back-btn").attr('href', 'main.html?userId=' + userId);

    $(".add-cust-btn").click(function () {
        var custName = $("#user-name").val();
        var mobilePhone = $("#user-phone").val();
        var age = $("#user-age").val();
        var schoolName = $('#user-school').val();
        var sex = $("input[name='sex-options']:checked").val();
        var dealTratorName = $("#user-tratorName").val();
        if (custName != null && mobilePhone != null && age != null && sex != null) {
            //location.href = "https://mayu1991.github.io/czwm.github.io/main.html";
            var params = {
                "custName": custName,
                "mobilePhone": mobilePhone,
                "age": age,
                "schoolName": schoolName,
                "sex": sex,
                "dealTratorName": dealTratorName
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
                            layer.open({
                                content: '提交成功'
                                , skin: 'footer'
                            });
                            location.href = "main.html?userId=" + userId;//刷新页面
                        } else {
                            layer.open({
                                content: resp.message
                                , btn: '我知道了'
                            });
                        }
                    } else {
                        layer.open({
                            content: "新增客户失败，请联系系统管理员"
                            , btn: '我知道了'
                        });
                    }

                }
            });
        }
    });

});

