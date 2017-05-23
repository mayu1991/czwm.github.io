$(document).ready(function () {
    getAllCust();

    $(".to-add-cust-btn").click(function () {
        location.href = "cust-add.html";
    });
})

/**
 * 查询出所有客户信息
 */
function getAllCust() {
    var userId = Glass.getUrlParam("userId");

    $.ajax({
        url: Glass.host + "/cust/all/get",
        type: "GET",
        dataType: "json",

        async: false,
        "success": function (resp) {

            if (resp != null) {
                // var responseObj = JSON.stringify(resp);
                //登录成功，跳转到主页面
                if (resp.success) {
                    var custTable = $('#cust-table');
                    custTable.html('<thead>       ' +
                        '<tr>          ' +
                        '    <th class="table-title">客户姓名</th>     ' +
                        '    <th class="table-set">操作</th>         ' +
                        '</tr>         ' +
                        '</thead>      ');
                    custTable.append("<tbody>");
                    $.each(resp.data, function (i, item) {
                        var custId = item.id;
                        //表示已经成交的客人
                        if (item.dealFlag == 1) {
                            var tbody = '<tr>' +
                                '    <td><a href="experience.html?custId=' + custId + '&userId=' + userId + '"><span class="am-icon-user" style="color:green"></span> <strong style="color:green">' + item.custName + '</strong></a></td>             ' +
                                '    <td>           ' +
                                '        <div class="am-btn-toolbar">           ' +
                                '            <div class="am-btn-group am-btn-group-xs">      ' +
                                ' <a href="experience.html?custId=' + custId + '&userId=' + userId + '"><span' +
                                '         class="am-icon-check" style="color:green"></span> <span  style="color:green" ' +
                                ' >体验</span></a>  ' +
                                ' <a href="optmetry.html?custId=' + custId + '&userId=' + userId + '"><span style="color:green" ' +
                                '         class="am-icon-check"></span> <span  style="color:green" ' +
                                ' >检测</span></a>  ' +
                                ' <a href="re-optmetry.html?custId=' + custId + '&userId=' + userId + '"><span  style="color:green"          ' +
                                '         class="am-icon-check"></span> <span style="color:green"  ' +
                                ' >复检</span></a>  ' +
                                '    ' +
                                ' <a href="deal.html?custId=' + custId + '&userId=' + userId + '"><span  style="color:green"    ' +
                                '         class="am-icon-check"></span> <span  style="color:green" ' +
                                ' >成交</span></a>  ' +
                                '            </div> ' +
                                '        </div>     ' +
                                '    </td>          ' +
                                '</tr>              ';
                            custTable.append(tbody);
                        } else if (item.dealFlag == 0) {
                            var tbody = '<tr>' +
                                '    <td>' +
                                '' +
                                '<a href="experience.html?custId=' + custId + '&userId=' + userId + '">' +
                                '<span class="am-icon-user" ></span> <' +
                                'strong>' + item.custName + '</strong>' +
                                '</a>' +
                                '</td>             ' +
                                '    <td>           ' +
                                '        <div class="am-btn-toolbar">           ' +
                                '            <div class="am-btn-group am-btn-group-xs">      ' +
                                ' <a href="experience.html?custId=' + custId + '&userId=' + userId + '"><span' +
                                '         class="am-icon-arrow-circle-right"></span> <span   ' +
                                ' >体验</span></a>  ' +
                                ' <a href="optmetry.html?custId=' + custId + '&userId=' + userId + '"><span  ' +
                                '         class="am-icon-arrow-circle-right"></span> <span   ' +
                                ' >检测</span></a>  ' +
                                ' <a href="re-optmetry.html?custId=' + custId + '&userId=' + userId + '"><span            ' +
                                '         class="am-icon-arrow-circle-right"></span> <span   ' +
                                ' >复检</span></a>  ' +
                                '    ' +
                                ' <a href="deal.html?custId=' + custId + '&userId=' + userId + '"><span      ' +
                                '         class="am-icon-arrow-circle-right"></span> <span   ' +
                                ' >成交</span></a>  ' +
                                '            </div> ' +
                                '        </div>     ' +
                                '    </td>          ' +
                                '</tr>              ';
                            custTable.append(tbody);
                        }

                    });
                    custTable.append("</tbody>")
                } else {
                    alert(resp.message);
                }
            }

        }
    });
}