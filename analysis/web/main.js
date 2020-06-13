/**
 * 数据可视化 echarts 初始化
 */
$(function () {
  // 每日统计
  window.dateEcharts = echarts.init($('#date-chart')[0]);
  dateEcharts.setOption({
    title: {
      text: 'InPageEdit每日使用趋势',
      subtext: '数据读取中……'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    dataZoom: [
      {
        show: true,
        realtime: true
      },
      {
        type: 'inside',
        realtime: true
      }
    ],
    legend: {
      data: ['使用次数']
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: {
          readOnly: true
        },
        magicType: {
          type: ['line', 'bar']
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['加载中']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 次'
      },
      axisPointer: {
        snap: true
      },
    },
    series: [{
      name: '使用次数',
      type: 'line',
      data: [0],
      markPoint: {
        data: [{
          type: 'max',
          name: '最大值'
        },
        {
          type: 'min',
          name: '最小值'
        }]
      },
      markLine: {
        data: [{
          type: 'average',
          name: '平均值'
        }]
      }
    }]
  });
  // 总次数统计
  window.dateTotalEcharts = echarts.init($('#date-total-chart')[0]);
  dateTotalEcharts.setOption({
    title: {
      text: 'InPageEdit累计使用趋势',
      subtext: '数据读取中……'
    },
    tooltip: {
      trigger: 'axis',
      // axisPointer: {
      //   type: 'cross'
      // }
    },
    dataZoom: [
      {
        show: true,
        realtime: true
      },
      {
        type: 'inside',
        realtime: true
      }
    ],
    legend: {
      data: ['使用次数']
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: {
          readOnly: true
        },
        magicType: {
          type: ['line', 'bar']
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      data: ['加载中']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 次'
      },
      axisPointer: {
        snap: true
      },
    },
    series: [{
      name: '使用次数',
      type: 'line',
      data: [0]
    }]
  });
  // 站点统计
  window.siteEcharts = echarts.init($('#site-chart')[0]);
  siteEcharts.setOption({
    title: {
      text: "InPageEdit站点统计",
      subtext: '数据读取中……'
    },
    tooltip: {},
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: {
          readOnly: true
        },
        restore: {},
        saveAsImage: {}
      }
    },
    legend: {
      data: ["使用次数"]
    },
    xAxis: {
      data: ['加载中']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 次'
      }
    },
    series: [{
      name: "使用次数",
      type: "bar",
      data: [0],
      markPoint: {
        data: [{
          type: 'max',
          name: '最大值'
        },
        {
          type: 'min',
          name: '最小值'
        }]
      },
      markLine: {
        data: [{
          type: 'average',
          name: '平均值'
        }]
      }
    }]
  });
  dateEcharts.showLoading();
  dateTotalEcharts.showLoading();
  siteEcharts.showLoading();
  // functionEcharts.showLoading();

  // Resize charts
  function resizeCharts() {
    dateEcharts.resize();
    dateTotalEcharts.resize();
    siteEcharts.resize();
    // functionEcharts.showLoading();
  }
  $('.tabbernav').click(resizeCharts);
  $(window).resize(resizeCharts);
});

/**
 * 异步 Ajax 获取数据
 */
$(function () {
  // Date.prototype.format = function (fmt) {
  //   var o = {
  //     'M+': this.getMonth() + 1,                 //月份
  //     'd+': this.getDate(),                      //日
  //     'h+': this.getHours(),                     //小时
  //     'm+': this.getMinutes(),                   //分
  //     's+': this.getSeconds(),                   //秒
  //     'q+': Math.floor((this.getMonth() + 3) / 3), //季度
  //     'S': this.getMilliseconds()               //毫秒
  //   };
  //   if (/(y+)/.test(fmt)) {
  //     fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  //   }
  //   for (var k in o)
  //     if (new RegExp('(' + k + ')').test(fmt)) {
  //       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  //     }
  //   return fmt;
  // }

  // Wikis
  $.ajax({
    url: 'https://doc.wjghj.cn/inpageedit-v2/analysis/api/index.php?action=query&type=site&limit=max&from=0'
  }).then(function (data) {
    var query = data.query;
    $('#total-sites').text(query.length);

    /** 顶部 Banner 数据显示 **/
    // Total times
    var totalTimes = 0;
    $.each(query, function (k, v) {
      totalTimes += v['_total'];
    });
    $('#total-times').text(totalTimes);

    // Total users
    var totalUsers = 0;
    $.each(query, function (k, v) {
      var users = v['users'];
      var userLength = 0;
      for (let i in users) {
        userLength++;
      }
      totalUsers += userLength;
    });
    $('#total-users').text(totalUsers);

    // Per sites
    var siteNames = [],
      siteTimes = [];

    for (let i = 0; i < query.length; i++) {
      siteNames.push(query[i]['sitename']);
      siteTimes.push(query[i]['_total']);

      var usersTotal = 0;
      $.each(query[i]['users'], function () {
        usersTotal++;
      });
      $('#site-table').append(
        $('<tr>').append(
          $('<td>').append(
            $('<a>', { target: '_blank', href: query[i]['url'], text: query[i]['sitename'] }),
            ' (',
            $('<a>', { href: './?siteurl=' + query[i]['url'], text: '查看详情' }),
            ')'
          ),
          $('<td>', { text: query[i]['_total'] }),
          $('<td>', { text: usersTotal })
        )
      )
    }
    // 直接以使用次数降序排序表格
    sorttable.innerSortFunction.apply($('#site-table #totaluse')[0], []);
    sorttable.innerSortFunction.apply($('#site-table #totaluse')[0], []);

    // 设定图表
    var siteOption = {
      title: {
        subtext: "数据更新于: " + new Date().toString()
      },
      xAxis: {
        data: siteNames
      },
      series: [{
        data: siteTimes
      }]
    }
    siteEcharts.setOption(siteOption);
    siteEcharts.hideLoading();
  });

  // Date
  $.get('https://doc.wjghj.cn/inpageedit-v2/analysis/api/index.php?action=query&type=date&limit=max&from=0').done(function (data) {
    var now = new Date(),
      today = now.format('yyyy-MM-dd'),
      todayTimes = 0;
    $.each(data.query, function (k, v) {
      if (v['date'] === today) {
        todayTimes = v['times'];
      }
    });
    $('#today-times').text(todayTimes);

    /** 每日趋势 **/
    var dateList = [],
      dateTimes = [],
      dateTotalTimes = [];
    for (let i = 0; i < data.query.length; i++) {
      dateList.push(data.query[i]['date']);
      dateTimes.push(data.query[i]['times']);

      var total = Number(data.query[i]['times']);
      if (i > 0) {
        total += Number(dateTotalTimes[(i - 1)]);
      }
      dateTotalTimes.push(total);
    }
    var dateOption = {
      title: {
        subtext: "数据更新于: " + new Date().toString()
      },
      xAxis: {
        data: dateList
      },
      series: [{
        data: dateTimes
      }]
    }
    dateEcharts.setOption(dateOption);
    dateEcharts.hideLoading();

    /** 累计使用趋势 **/
    var dateTotalOption = {
      title: {
        subtext: "数据更新于: " + new Date().toString()
      },
      xAxis: {
        data: dateList
      },
      series: [{
        data: dateTotalTimes
      }]
    }
    dateTotalEcharts.setOption(dateTotalOption);
    dateTotalEcharts.hideLoading();
  });
});