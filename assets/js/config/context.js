var Glass = Glass || {};
Glass.host = "http://106.14.180.141:20301/czwm-glass";
//Glass.host = "http://127.0.0.1:8080/czwm";
Glass.version = "&v=1.0";

function gTabsResp(responseObj) {
    return JSON.stringify(responseObj);
}

/**
 * 获取url中的参数
 */
Glass.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURIComponent(r[2]);
    return null; //返回参数值
};

Glass.getUrlParam1 = function (name) {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest[name];
}

/**
 * 查询出所有客户信息
 */
Glass.getCustDetail = function () {
    var custId = Glass.getUrlParam("custId");
    var custDetail = null;
    if (custId != null && custId != -1) {
        $.ajax({
            url: Glass.host + "/cust/detail/query/" + custId,
            type: "GET",
            dataType: "json",
            async: false,
            "success": function (resp) {
                if (resp != null) {
                    custDetail = resp.data;
                }

            }
        })
    }
    return custDetail;
};

/**
 * 查询用户信息
 * @param userId
 */
Glass.getUserDetailById = function (userId) {
    var userDetail = null;
    //已提交，查询用户权限
    $.ajax({
        url: Glass.host + "/user/detail/query/" + userId,
        type: "GET",
        dataType: "json",

        async: false,
        "success": function (resp) {
            if (resp != null && resp.data != null) {
                userDetail = resp.data;
            }

        }
    });
    return userDetail;
};

/**
 * 查询用户信息
 */
Glass.getUserDetail = function () {
    var userId = Glass.getUrlParam("userId");
    return Glass.getUserDetail(userId);
};