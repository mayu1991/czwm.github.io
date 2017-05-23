$(document).ready(function () {
    //查询提交记录
    // var custId = Glass.getUrlParam("custId");

    var custId = Glass.getUrlParam("custId");
    var userId = Glass.getUrlParam("userId");
    getOptometryDetail(userId, custId);

    //保存
    $(".save-btn").click(function () {
        var leftCombinedOptometryVision = $("#leftCombinedVision").val();
        var rightCombinedOptometryVision = $("#rightCombinedVision").val();

        var leftNakedVision = $("#leftNakedVision").val();
        var rightNakedVision = $("#rightNakedVision").val();


        var receptionName = $("#receptionName").val();


        var id = $('#optometryId').val();

        id = id == "" || id == '' ? -1 : id;
        var params = {
            "id": id,
            "leftCombinedOptometryVision": leftCombinedOptometryVision,
            "rightCombinedOptometryVision": rightCombinedOptometryVision,
            "leftNakedVision": leftNakedVision,
            "custId": custId,
            "rightNakedVision": rightNakedVision,
            "receptionName": receptionName,
            "experienceType": 3//第三次检测
        };
        //转json
        params = JSON.stringify(params);
        //base64加密
        params = jQuery.base64.encode(params);

        $.ajax({
            url: Glass.host + "/cust/optometry/save",
            type: "GET",
            dataType: "json",
            data: params,
            async: false,
            "success": function (resp) {
                if (resp != null) {
                    if (resp.success && resp.data != null) {

                        //保存成功刷新页面
                        getOptometryDetail(userId, custId);
                    }
                }

            }
        })

    });

    //提交
    $(".submit-btn").click(function () {
        var leftCombinedOptometryVision = $("#leftCombinedVision").val();
        var rightCombinedOptometryVision = $("#rightCombinedVision").val();

        var leftNakedVision = $("#leftNakedVision").val();
        var rightNakedVision = $("#rightNakedVision").val();

        var receptionName = $("#receptionName").val();

        var id = $('#optometryId').val();
        id = id == "" || id == '' ? -1 : id;

        var params = {
            "id": id,
            "leftCombinedOptometryVision": leftCombinedOptometryVision,
            "rightCombinedOptometryVision": rightCombinedOptometryVision,
            "leftNakedVision": leftNakedVision,
            "custId": custId,
            "rightNakedVision": rightNakedVision,
            "receptionName": receptionName,
            "experienceType": 3,//第二次检测,
            "submitFlag": 1//表示已提交
        };
        //转json
        params = JSON.stringify(params);
        //base64加密
        params = jQuery.base64.encode(params);

        $.ajax({
            url: Glass.host + "/cust/optometry/save",
            type: "GET",
            dataType: "json",
            data: params,
            async: false,
            "success": function (resp) {
                if (resp != null) {
                    if (resp.success && resp.data != null) {

                        //保存成功刷新页面
                        getOptometryDetail(userId, custId);
                    }
                }

            }
        })

    });

});

/**
 * 查询客户检测结果
 */
function getOptometryDetail(userId, custId) {

    //给返回按钮设置初始值
    $(".back-btn").attr('href', 'main.html?custId=' + custId + '&userId=' + userId);

    var params = {"custId": custId, "experienceType": 3};
    //转json
    params = JSON.stringify(params);
    //base64加密
    params = jQuery.base64.encode(params);
    $.ajax({
        url: Glass.host + "/cust/optometry/query",
        type: "GET",
        dataType: "json",
        data: params,
        async: false,
        "success": function (resp) {
            if (resp != null) {
                if (resp.success && resp.data != null) {

                    //是否提交过
                    if (resp.data.submitFlag == 1) {
                        //已经提交过，隐藏保存和提交按钮
                        $('.save-btn').hide();
                        $('.submit-btn').hide();

                        var userDetail = Glass.getUserDetailById(userId);
                        //且具有boss和管理员权限
                        if (userDetail != null && userDetail.authorityType != null && userDetail.authorityType >= 2) {
                            // $('.save-btn').show();
                            $('.submit-btn').show();
                        }
                    }
                    $("#leftCombinedVision").val(resp.data.leftCombinedOptometryVision);
                    $("#rightCombinedVision").val(resp.data.rightCombinedOptometryVision);
                    $("#leftNakedVision").val(resp.data.leftNakedVision);
                    $("#rightNakedVision").val(resp.data.rightNakedVision);
                    $("#receptionName").val(resp.data.receptionName);
                    $('#appointmentTime').val(resp.data.appointmentTimeStr);
                    // $("#appointmentTime").val(resp.data.appointmentTimeStr);
                    $("#experienceTime").val(resp.data.experienceTimeStr);
                    $("#optometryId").val(resp.data.id);

                }
            }

        }
    });
}