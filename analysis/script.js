/**
 * JavaScript file for Wjghj Documentations Center
 * Please indicate the source(URL) when copying codes to another place
 **/
$(function () {
  /** ECharts设定 **/
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
    legend: {
      orient: 'vertical',
      left: 10,
      top: 48,
      data: ['快速编辑', '快速差异', '其他', '保存编辑', '未保存编辑', '快速差异RC', '快速差异Edit', '快速差异History', '快速重定向', '快速删除', '快速重命名', '插件设置', '工具盒', '卸载插件']
    },
    series: [{
      name: '使用次数',
      type: 'pie',
      selectedMode: 'single',
      radius: ['0', '30%'],
      label: {
        position: 'inner'
      },
      labelLine: {
        show: false
      },
      data: [] // 内圈
    }, {
      name: '使用次数',
      type: 'pie',
      radius: ['40%', '55%'],
      label: {
        formatter: '{b}\n{a}: {c} ({d}%)',
        backgroundColor: '#eee',
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 4
      },
      data: [] // 外圈
    }]
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
  $('.tabs').click(function () {
    resizeAll();
    showProgress();
  });
  $(window).resize(resizeAll);

  /** 实时刷新数据 **/
  setInterval(function () {
    dateEcharts.hideLoading();
    siteEcharts.hideLoading();
    functionEcharts.hideLoading();
    // 每日数据
    if ($('#date').hasClass('active')) {
      $.ajax({
        url: 'https://doc.wjghj.cn/InPageEditAnalysis/date/',
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
        }
      });
    }
    // 站点统计
    if ($('#site').hasClass('active')) {
      $.ajax({
        url: 'https://doc.wjghj.cn/InPageEditAnalysis/site/',
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
        }
      });
    }
    // 功能统计
    if ($('#function').hasClass('active')) {
      $.ajax({
        url: 'https://doc.wjghj.cn/InPageEditAnalysis/function/',
        success: function (data) {

          // 显示表格
          $('#functionTable #total').html('InPageEdit功能使用统计');
          $('#functionTable table .ajax-data').remove();
          for (i = 0; i < data.functionlist.length; i++) {
            $('#functionTable table').append('<tr class="ajax-data"><td>' + data.functionlist[i].id + '</td><td>' + data.functionlist[i].function + '</td><td>' + data.functionlist[i].times + '</td></tr>')
          }

          // 显示保存率
          var savePersents = Number(Number(Number(data.functionlist[7].times) / Number(data.functionlist[0].times)) * 100);
          $('#savePersents #savePersentsBar').css('width', savePersents + '%');
          $('#savePersents #howMuch').html(savePersents + '%');

          // 准备echarts
          var allFunctionTimes = 0;
          for (i = 0; i < data.functionlist.length; i++) {
            allFunctionTimes = Number(Number(allFunctionTimes) + Number(data.functionlist[i].times));
          }
          allFunctionTimes = Number(Number(allFunctionTimes) - Number(data.functionlist[7].times));
          var diffFunctionTimes = Number(Number(data.functionlist[8].times) + Number(data.functionlist[9].times) + Number(data.functionlist[10].times));
          var functionOption = {
            title: {
              subtext: "数据更新于: " + new Date().toString()
            },
            series: [{
              data: [
                { value: data.functionlist[0].times, name: '快速编辑' },
                { value: diffFunctionTimes, name: '快速差异' },
                { value: allFunctionTimes - Number(data.functionlist[0].times) - diffFunctionTimes, name: '其他' }
              ]
            }, {
              data: [
                { value: data.functionlist[7].times, name: '保存编辑' },
                { value: Number(data.functionlist[0].times) - Number(data.functionlist[7].times), name: '未保存编辑' },
                { value: data.functionlist[8].times, name: '快速差异RC' },
                { value: data.functionlist[9].times, name: '快速差异Edit' },
                { value: data.functionlist[10].times, name: '快速差异History' },
                { value: data.functionlist[1].times, name: '快速重定向' },
                { value: data.functionlist[2].times, name: '快速删除' },
                { value: data.functionlist[3].times, name: '快速重命名' },
                { value: data.functionlist[4].times, name: '插件设置' },
                { value: data.functionlist[6].times, name: '工具盒' },
                { value: data.functionlist[11].times, name: '卸载插件' }
              ]
            }]
          }
          functionEcharts.setOption(functionOption);
        }
      });
    }
  },
    3000);
});
