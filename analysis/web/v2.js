/**
 * JavaScript file for Wjghj Documentations Center
 * Please indicate the source(URL) when copying codes to another place
 **/
$(function () {
  /** ECharts初始化 **/
  window.dateEcharts = echarts.init(document.getElementById('dateEcharts'));
  dateEcharts.setOption({
    title: {
      text: 'InPageEdit使用趋势',
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
          readOnly: false
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

  // 站点统计
  window.siteEcharts = echarts.init(document.getElementById('siteEcharts'));
  siteEcharts.setOption({
    title: {
      text: "InPageEdit站点统计",
      subtext: '数据读取中……'
    },
    tooltip: {},
    toolbox: {
      feature: {
        dataView: {},
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

  // 功能统计
  window.functionEcharts = echarts.init(document.getElementById('functionEcharts'));
  functionEcharts.setOption({
    title: {
      text: 'InPageEdit功能使用统计',
      subtext: '数据读取中……'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{a}: {c} ({d}%)'
    },
    toolbox: {
      feature: {
        dataView: {},
        restore: {},
        saveAsImage: {}
      }
    },
    series: {
      type: 'sunburst',
      radius: [0, '80%'],
      label: {
        rotate: 'radial'
      }
    }
  });

  /** 重新渲染ECharts尺寸 **/
  function resizeAll() {
    dateEcharts.resize();
    siteEcharts.resize();
    functionEcharts.resize();
  }
  function showProgress() {
    dateEcharts.showLoading();
    siteEcharts.showLoading();
    functionEcharts.showLoading();
  }
  showProgress();
  $('#tabber-1').click(function () {
    resizeAll();
  });
  $(window).resize(resizeAll);

  /** 刷新数据 **/
  function updateDate() {
    $.ajax({
      url: 'https://doc.wjghj.cn/InPageEditAnalysis/date/index.php',
      success: function (data) {
        // 准备echarts
        var dateList = [],
          dateTimes = [];
        for (i = 0; i < data.datelist.length; i++) {
          dateList.push(data.datelist[i]['date']);
          dateTimes.push(data.datelist[i].times);
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
        $('#todayTimes').text(dateTimes[Number(data.datelist.length - 1)]);
      }
    });
  }
  function updateSite() {
    $.ajax({
      url: 'https://doc.wjghj.cn/InPageEditAnalysis/site/index.php',
      success: function (data) {
        // 显示表格
        $('#siteTable #total').html('使用InPageEdit插件的wiki站点总数：<u>' + data.sitelist.length + '</u>');
        $('#siteTable table .ajax-data').remove();
        for (i = 0; i < data.sitelist.length; i++) {
          $('#siteTable table').append('<tr class="ajax-data"><td>' + data.sitelist[i].id + '</td><td>' + data.sitelist[i].sitename + '</td><td>' + data.sitelist[i].times + '</td></tr>')
        }

        // 准备echarts
        var siteNames = [],
          siteTimes = [];
        for (i = 0; i < data.sitelist.length; i++) {
          siteNames.push(data.sitelist[i].sitename);
          siteTimes.push(data.sitelist[i].times);
        }
        var siteOption = {
          title: {
            subtext: "数据更新于: " + new Date().toString() + "\n若有同名wiki则数据可能不准确"
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
        $('#allSiteTimes').text(data.sitelist.length);
      }
    });
  }
  function updateFunctions() {
    $.ajax({
      url: 'https://doc.wjghj.cn/InPageEditAnalysis/function/index.php',
      success: function (data) {
        var data = data;
        var list = data.functionlist;

        // 显示表格
        $('#functionTable #total').html('InPageEdit功能使用统计');
        $('#functionTable table .ajax-data').remove();
        for (i = 0; i < list.length; i++) {
          $('#functionTable table').append('<tr class="ajax-data"><td>' + list[i].id + '</td><td>' + list[i].function + '</td><td>' + list[i].times + '</td></tr>')
        }

        // 显示保存率
        var savePersents = Number(Number(Number(list[7].times) / Number(list[0].times)) * 100);
        $('#savePersents #savePersentsBar').css('width', savePersents + '%');
        $('#savePersents #howMuch').html(savePersents + '%');

        // 准备echarts
        function numTimes(a) {
          return Number(list[a].times);
        }
        var allFunctionTimes = 0;
        for (i = 0; i < list.length; i++) {
          allFunctionTimes = Number(Number(allFunctionTimes) + Number(list[i].times));
        }
        allFunctionTimes = Number(Number(allFunctionTimes) - Number(list[7].times));
        var diffFunctionTimes = Number(Number(list[9].times) + Number(list[10].times) + Number(list[11].times));
        var finaldata = [
          {
            name: '快速编辑',
            value: numTimes(0),
            children: [{
              name: '保存编辑',
              value: numTimes(7)
            }, {
              name: '未保存编辑',
              value: numTimes(0) - numTimes(7)
            }]
          }, {
            name: '快速差异',
            value: diffFunctionTimes,
            children: [{
              name: '快速差异RC',
              value: numTimes(9)
            }, {
              name: '快速差异Edit',
              value: numTimes(10)
            }, {
              name: '快速差异History',
              value: numTimes(11)
            }]
          }, {
            name: '其他',
            value: allFunctionTimes - Number(list[0].times) - diffFunctionTimes,
            children: [{
              value: numTimes(1), name: '快速重定向'
            }, {
              value: numTimes(2), name: '快速删除'
            }, {
              value: numTimes(3), name: '快速重命名'
            }, {
              value: numTimes(4), name: '插件设置'
            }, {
              value: numTimes(6), name: '工具盒'
            }, {
              value: numTimes(12), name: '卸载插件'
            }]
          }
        ];
        var functionOption = {
          title: {
            subtext: "数据更新于: " + new Date().toString()
          },
          series: {
            data: finaldata
          }
        }
        functionEcharts.setOption(functionOption);
        functionEcharts.hideLoading();
        $('#allFunctionTimes').text(allFunctionTimes);
      }
    });
  }
  /** 刷新频率控制 **/
  updateDate();
  updateSite();
  updateFunctions();
  /*
  setInterval(function () {
    // 每日数据
    if ($('#date').hasClass('active') || true) {
      updateDate();
    }
    // 站点统计
    if ($('#site').hasClass('active') || true) {
      updateSite();
    }
    // 功能统计
    if ($('#function').hasClass('active') || true) {
      updateFunctions();
    }
  },
    10 * 1000);
    */
});