!(function () {
  /**
   * 初始化HTML
   */
  $('.analysis-data-area').html('');
  $('.analysis-data-area').append(
    $('<h2>', { text: '每日使用趋势' }),
    $('<div>', { class: 'card' }).append(
      $('<div>', { class: 'echarts', id: 'date-chart', style: 'width: 100%; height: 400px;' })
    ),
    $('<h2>', { text: '顶尖用户' }),
    $('<div>', { class: 'card' }).append(
      $('<table>', { class: 'sortable', id: 'user-table', style: 'width: 100%;' }).append(
        $('<thead>').append(
          $('<tr>').append(
            $('<th>', { id: 'userName', text: '用户名' }),
            $('<th>', { id: 'useTimes', class: 'sorttable_numeric', text: '使用次数' })
          )
        ),
        $('<tbody>', {})
      )
    )
  );
  // 每日统计
  window.dateEcharts = echarts.init($('#date-chart')[0]);
  dateEcharts.setOption({
    title: {
      text: 'InPageEdit Analysis',
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
  dateEcharts.showLoading();

  /**
   * 处理数据
   */
  var sitename,
    siteurl;
  if (urlParam('siteurl')) {
    siteurl = decodeURI(urlParam('siteurl'));
    $.get('https://doc.wjghj.cn/inpageedit-v2/analysis/api/index.php?action=query&type=site&limit=max&from=0&url=' + siteurl).done(queryDone).fail(queryFail);
  } else if (urlParam('sitename')) {
    sitename = decodeURI(urlParam('sitename'));
    $.get('https://doc.wjghj.cn/inpageedit-v2/analysis/api/index.php?action=query&type=site&limit=max&from=0&sitename=' + sitename).done(queryDone).fail(queryFail);
  }
  function queryFail(data) {
    $('#page-content').prepend(`
      <div class="infobox error">
      <div class="title">错误</div>
      <p>获取数据时出现未知问题，请联系作者并稍后再试。</p>
      </div>
    `);
  }
  function queryDone(data) {
    /**
     * 开始处理数据
     */
    var query = data.query;
    if (query.length < 1) {
      $('#page-content').prepend(`
        <div class="infobox warning">
        <div class="title">注意</div>
        <p>未找到相关Wiki，请检查URL参数是否正确。您可以修改后重试或联系作者。</p>
        </div>
      `);
    } else {
      var site = query[0];
      var now = new Date(),
        today = now.format('yyyy-MM-dd');
      var sitename = site['sitename'],
        siteurl = site['url'],
        totaltimes = site['_total'],
        totalusers = 0;

      // 今日数据
      if (site['date'][today] !== undefined) {
        todaytimes = site['date'][today]['_total'];
      } else {
        todaytimes = 'N/A';
      }
      // 用户总数
      $.each(site['users'], function () {
        totalusers++;
      });

      /**
       * 数据处理完毕，开始构建 HTML
       */
      $('.bread-crumb .thispage').html('<strong>' + sitename + '</strong>');
      $('.bread-crumb .thispage').before(
        $('<li>', { class: 'path' }).append(
          $('<a>', { href: './', text: 'analysis' })
        )
      );
      $('.subtitle').text(sitename);
      $('.header-title > div:last').html('InPageEdit统计信息 | ' + sitename);
      $('#total-times').text(totaltimes);
      $('#total-times-label').text('累计使用次数');
      $('#more-details').html('<strong id="sitename">' + sitename + '</strong>共有<strong id="total-users">' + totalusers + '</strong>名用户使用<span class="IPE-logo font-ps"><span class="IPE-logo-1">In</span><span class="IPE-logo-2">Pag<span>e</span></span><span class="IPE-logo-3">Edit</span><span class="IPE-logo-4">v2</span></span>，今日已使用<strong id="today-times">' + todaytimes + '</strong>次');

      // 每日趋势图表
      var dateList = [],
        dateTimes = [];
      $.each(site['date'], function (k, v) {
        dateList.push(k);
        dateTimes.push(v['_total']);
      });
      var dateOption = {
        title: {
          text: sitename + '使用InPageEdit的趋势',
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

      // 顶尖用户
      $.each(site['users'], function (k, v) {
        $('#user-table > tbody').append(
          $('<tr>').append(
            $('<td>', { text: k }),
            $('<td>', { text: v['_total'] })
          )
        )
      });
      sorttable.makeSortable($('#user-table')[0]);
      sorttable.innerSortFunction.apply($('#user-table #useTimes')[0], []);
      sorttable.innerSortFunction.apply($('#user-table #useTimes')[0], []);
    }
  }
})();