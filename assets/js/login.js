$(document).ready(function () {

    getAllStore();

    $(".login-btn").click(function () {
        var username = $("#user-name").val();
        var password = $("#user-password").val();
        var storeId = $("#user-storeId").val();
        if (username == null || username == "") {
            layer.open({
                content: "用户名不能为空"
                , btn: '我知道了'
            });
            return;
        }
        if (password == null || password == "") {
            layer.open({
                content: "密码不能为空"
                , btn: '我知道了'
            });
            return;
        }
        if (storeId == null || storeId < 0) {
            layer.open({
                content: "门市必须选择"
                , btn: '我知道了'
            });
            return;
        }
        // if (username != null && username != "" && password != null && storeId != null) {
        //location.href = "https://mayu1991.github.io/czwm.github.io/main.html";

        var params = {"username": username, "password": password, "storeId": storeId};
        //转json
        params = JSON.stringify(params);
        //base64加密
        params = jQuery.base64.encode(params);
        $.ajax({
            url: Glass.host + "/user/login",
            data: params,
            type: "GET",
            dataType: "json",

            async: false,
            "success": function (resp) {

                if (resp != null) {
                    // var responseObj = JSON.stringify(resp);
                    //登录成功，跳转到主页面
                    if (resp.success) {
                        var userId = resp.data == null ? 0 : resp.data.id;
                        location.href = "main.html?userId=" + userId;
                    } else {
                        // layer.alert("登录成功");
                        layer.open({
                            content: resp.message
                            , btn: '我知道了'
                        });
                    }
                } else {
                    // layer.alert("登录失败，请联系系统管理员");
                    layer.open({
                        content: '登录失败，请联系系统管理员吧'
                        , btn: '我知道了'
                    });
                }

            }
        });
        // } else {
        //     // layer.alert("请输入用户名|账号|门店");
        //     // alert("请输入用户名|账号|门店");
        //     //信息框
        //     layer.open({
        //         content: '用户名或密码没有输入'
        //         , btn: '我知道了'
        //     });
        // }
    });

});

/**
 * 查询出所有门市
 */
function getAllStore() {
    $.ajax({
        url: Glass.host + "/store/all/get",
        type: "GET",
        dataType: "json",

        async: false,
        "success": function (resp) {

            if (resp != null) {
                // var responseObj = JSON.stringify(resp);
                //登录成功，跳转到主页面
                if (resp.success) {
                    var store = $('#user-storeId');
                    store.html('<option value="0" selected>默认门市</option>');
                    $.each(resp.data, function (i, item) {
                        store.append('<option value="' + item.id + '">' + item.storeName + '</option>');
                    });
                } else {
                    alert("登录失败，请联系管理员");
                }
            }

        }
    });
}


