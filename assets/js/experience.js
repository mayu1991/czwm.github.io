$(document).ready(function () {
    var custDetail = Glass.getCustDetail();

    var custId = Glass.getUrlParam("custId");
    var userId = Glass.getUrlParam("userId");

    getExperience(userId, custId);

    if (custDetail != null) {
        // custDetail = JSON.json(custDetail);
        var custTable = $('#cust-table');
        var schoolName = custDetail.schoolName;
        if (schoolName == null || schoolName == '' || schoolName == "\"\"") {
            schoolName = '--';
        }
        custTable.html('<thead>                                                ' +
            '                        <tr>                           ' +
            '                            <th class="table-title">   ' +
            '                                姓名                     ' +
            '                            </th>                      ' +
            '                            <th class="table-title">   ' +
            '                                性别                     ' +
            '                            </th>                      ' +
            '                            <th class="table-title">   ' +
            '                                年龄                     ' +
            '                            </th>                      ' +
            '                            <th class="table-title">   ' +
            '                                手机号码                   ' +
            '                            </th>                      ' +
            '                            <th class="table-title">   ' +
            '                                学校名称                    ' +
            '                            </th>                      ' +
            '                        </tr>                          ' +
            '                        </thead> <tbody>                      ');
        custTable.append('<tr><td>' + custDetail.custName + '</td><td>' + custDetail.sexDesc + '</td><td>' + custDetail.age + '</td><td>' + custDetail.mobilePhone + '</td><td>' + schoolName + '</td></tr></tbody>');

    }
    $('.submit-btn').click(function () {
        var leftPrimaryMirrorNumber = $("#leftPrimaryMirrorNumber").val();
        var rightPrimaryMirrorNumber = $("#rightPrimaryMirrorNumber").val();
        var leftNakedVision = $("#leftNakedVision").val();
        var rightNakedVision = $("#rightNakedVision").val();
        var leftMirrorCollectionVision = $("#leftMirrorCollectionVision").val();
        var rightMirrorCollectionVision = $("#rightMirrorCollectionVision").val();
        var refractiveProperties = $("input[name='refractiveProperties']:checked").val();
        var refractivePropertiesLevel = $("input[name='refractivePropertiesLevel']:checked").val();
        var appointmentTime = $('#appointmentTime').val();
        var optometryTime = $("#optometryTime").val();
        var receptionName = $("#receptionName").val();

        var id = $('#optometryId').val();
        id = id == "" || id == '' ? -1 : id;

        var optometry = {
            "id": id,
            "custId": custId,
            "leftPrimaryMirrorNumber": leftPrimaryMirrorNumber,
            "rightPrimaryMirrorNumber": rightPrimaryMirrorNumber,
            "leftNakedVision": leftNakedVision,
            "rightNakedVision": rightNakedVision,
            "leftMirrorCollectionVision": leftMirrorCollectionVision,
            "rightMirrorCollectionVision": rightMirrorCollectionVision,
            "refractiveProperties": refractiveProperties,
            "refractivePropertiesLevel": refractivePropertiesLevel,
            "appointmentTimeStr": appointmentTime,
            "optometryTimeStr": optometryTime,
            "receptionName": receptionName,
            "experienceType": 1,
            "submitFlag": 1
        };
        var firstExperience = {
            "custId": custId,
            "appointmentTimeStr": $('#appointmentTimeExp1').val(),
            "experienceTimeStr": $('#experienceTimeExp1').val(),
            "receptionName": $('#receptionNameExp1').val(),
            "experienceFrequency": 1
        };
        var secondExperience = {
            "custId": custId,
            "appointmentTimeStr": $('#appointmentTimeExp2').val(),
            "experienceTimeStr": $('#experienceTimeExp2').val(),
            "receptionName": $('#receptionNameExp2').val(),
            "experienceFrequency": 2
        };
        var thirdExperience = {
            "custId": custId,
            "appointmentTimeStr": $('#appointmentTimeExp3').val(),
            "experienceTimeStr": $('#experienceTimeExp3').val(),
            "receptionName": $('#receptionNameExp3').val(),
            "experienceFrequency": 3
        };
        var experiences = [];
        experiences.push(firstExperience);
        experiences.push(secondExperience);
        experiences.push(thirdExperience);

        var params = {
            "experiences": experiences,
            "optometry": optometry,
            "custId": custId
        };

        //转json
        params = JSON.stringify(params);
        //base64加密
        params = jQuery.base64.encode(params);

        $.ajax({
            url: Glass.host + "/cust/experience/save",
            type: "GET",
            dataType: "json",
            data: params,
            async: false,
            "success": function (resp) {
                if (resp != null) {
                    if (resp.success && resp.data != null) {

                        //保存成功刷新页面
                        getExperience(userId, custId);
                    }
                }

            }
        })

    });

    $('.save-btn').click(function () {
        var leftPrimaryMirrorNumber = $("#leftPrimaryMirrorNumber").val();
        var rightPrimaryMirrorNumber = $("#rightPrimaryMirrorNumber").val();
        var leftNakedVision = $("#leftNakedVision").val();
        var rightNakedVision = $("#rightNakedVision").val();
        var leftMirrorCollectionVision = $("#leftMirrorCollectionVision").val();
        var rightMirrorCollectionVision = $("#rightMirrorCollectionVision").val();
        var refractiveProperties = $("input[name='refractiveProperties']:checked").val();
        var refractivePropertiesLevel = $("input[name='refractivePropertiesLevel']:checked").val();
        var appointmentTime = $('#appointmentTime').val();
        var optometryTime = $("#optometryTime").val();
        var receptionName = $("#receptionName").val();

        var id = $('#optometryId').val();
        id = id == "" || id == '' ? -1 : id;

        var optometry = {
            "id": id,
            "custId": custId,
            "leftPrimaryMirrorNumber": leftPrimaryMirrorNumber,
            "rightPrimaryMirrorNumber": rightPrimaryMirrorNumber,
            "leftNakedVision": leftNakedVision,
            "rightNakedVision": rightNakedVision,
            "leftMirrorCollectionVision": leftMirrorCollectionVision,
            "rightMirrorCollectionVision": rightMirrorCollectionVision,
            "refractiveProperties": refractiveProperties,
            "refractivePropertiesLevel": refractivePropertiesLevel,
            "appointmentTimeStr": appointmentTime,
            "optometryTimeStr": optometryTime,
            "receptionName": receptionName,
            "experienceType": 1
        };
        var firstExperience = {
            "custId": custId,
            "appointmentTimeStr": $('#appointmentTimeExp1').val(),
            "experienceTimeStr": $('#experienceTimeExp1').val(),
            "receptionName": $('#receptionNameExp1').val(),
            "experienceFrequency": 1
        };
        var secondExperience = {
            "custId": custId,
            "appointmentTimeStr": $('#appointmentTimeExp2').val(),
            "experienceTimeStr": $('#experienceTimeExp2').val(),
            "receptionName": $('#receptionNameExp2').val(),
            "experienceFrequency": 2
        };
        var thirdExperience = {
            "custId": custId,
            "appointmentTimeStr": $('#appointmentTimeExp3').val(),
            "experienceTimeStr": $('#experienceTimeExp3').val(),
            "receptionName": $('#receptionNameExp3').val(),
            "experienceFrequency": 3
        };
        var experiences = [];
        experiences.push(firstExperience);
        experiences.push(secondExperience);
        experiences.push(thirdExperience);

        var params = {
            "experiences": experiences,
            "optometry": optometry,
            "custId": custId
        };

        //转json
        params = JSON.stringify(params);
        //base64加密
        params = jQuery.base64.encode(params);

        $.ajax({
            url: Glass.host + "/cust/experience/save",
            type: "GET",
            dataType: "json",
            data: params,
            async: false,
            "success": function (resp) {
                if (resp != null) {
                    if (resp.success && resp.data != null) {

                        //保存成功刷新页面
                        getExperience(userId, custId);
                    }
                }

            }
        })

    });
});

/**
 * 查询客户检测结果
 */
function getExperience(userId, custId) {

    //给返回按钮设置初始值
    $(".back-btn").attr('href', 'main.html?custId=' + custId + '&userId=' + userId);

    $.ajax({
        url: Glass.host + "/cust/experience/query/" + custId,
        type: "GET",
        dataType: "json",
        async: false,
        "success": function (resp) {
            if (resp != null) {
                if (resp.success && resp.data != null) {

                    if (resp.data.firstOptometryResult != null) {
                        //是否提交过
                        if (resp.data.firstOptometryResult.submitFlag == 1) {
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
                        //首次检测的数据
                        $("#leftNakedVision").val(resp.data.firstOptometryResult.leftNakedVision);
                        $("#rightNakedVision").val(resp.data.firstOptometryResult.rightNakedVision);
                        $("#leftPrimaryMirrorNumber").val(resp.data.firstOptometryResult.leftPrimaryMirrorNumber);
                        $("#rightPrimaryMirrorNumber").val(resp.data.firstOptometryResult.rightPrimaryMirrorNumber);
                        $("#leftMirrorCollectionVision").val(resp.data.firstOptometryResult.leftPrimaryMirrorNumber);
                        $("#rightMirrorCollectionVision").val(resp.data.firstOptometryResult.rightPrimaryMirrorNumber);

                        $("#receptionName").val(resp.data.firstOptometryResult.receptionName);
                        $('#appointmentTime').val(resp.data.firstOptometryResult.appointmentTimeStr);
                        $("#experienceTime").val(resp.data.firstOptometryResult.experienceTimeStr);
                        $("#optometryTime").val(resp.data.firstOptometryResult.optometryTimeStr);

                        $('#optometryId').val(resp.data.firstOptometryResult.id);
                        $('.refractiveProperties' + resp.data.firstOptometryResult.refractiveProperties).addClass("am-active");
                        $('.refractivePropertiesLevel' + resp.data.firstOptometryResult.refractivePropertiesLevel).addClass("am-active");

                    }

                    //三次体验数据
                    if (resp.data.firstExperienceResult != null) {
                        $("#appointmentTimeExp1").val(resp.data.firstExperienceResult.appointmentTimeStr);
                        $("#experienceTimeExp1").val(resp.data.firstExperienceResult.experienceTimeStr);
                        $("#receptionNameExp1").val(resp.data.firstExperienceResult.receptionName);
                    }
                    if (resp.data.secondExperienceResult != null) {
                        $("#appointmentTimeExp2").val(resp.data.secondExperienceResult.appointmentTimeStr);
                        $("#experienceTimeExp2").val(resp.data.secondExperienceResult.experienceTimeStr);
                        $("#receptionNameExp2").val(resp.data.secondExperienceResult.receptionName);
                    }
                    if (resp.data.thirdExperienceResult != null) {
                        $("#appointmentTimeExp3").val(resp.data.thirdExperienceResult.appointmentTimeStr);
                        $("#experienceTimeExp3").val(resp.data.thirdExperienceResult.experienceTimeStr);
                        $("#receptionNameExp3").val(resp.data.thirdExperienceResult.receptionName);
                    }
                }
            }

        }
    });
}

