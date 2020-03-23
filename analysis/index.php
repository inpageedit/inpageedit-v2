<!DOCTYPE html>
<html lang="zh">
<head>
<!-- Global head -->
<?php require_once("/data/wwwroot/doc/settings.php"); ?>
<?php $pageName='InPageEdit Analysis';require(globalinvoke."/head.php"); ?>
<!-- End Global head -->
<script src="https://cdn.bootcss.com/echarts/4.4.0-rc.1/echarts.min.js"></script>
</head>
<body>
<!-- Nav header & Side nav -->
<?php
if ($_GET['iframe'] !== '1') {
  require(globalinvoke."/nav.php");
  require(globalinvoke."/sidenav.php");
}
?>
<!-- End Nav -->
<!-- Content here -->
<main>
  <div class="container row section">

    <h1>InPageEdit统计信息</h1>
    <p>这里展示的是插件InPageEdit的使用信息，所有数据均为真实数据，所有数据<b>实时更新</b>。因为不同类别的信息开始收集的时间不一样，因此某些操作在不同数据表上的数据总和加起来可能会不一样。</p>

    <div class="allTabs">
      <div class="row">
        <ul class="tabs tabs-fixed-width">
          <li class="tab col"><a href="#date">每日统计</a></li>
          <li class="tab col"><a href="#site">站点统计</a></li>
          <li class="tab col"><a href="#function">功能统计</a></li>
        </ul>
      </div>

    <div id="date">
      <p>每日InPageEdit使用量趋势，保存编辑、快速重定向、移动页面等有效操作会被计入使用次数。</p>
      <!-- ECharts -->
      <div id="dateEcharts" style="width: 100%;height:400px;"></div>
    </div>

    <div id="site">
      <p>使用InPageEdit快速编辑功能的用户的wiki，以及各个wiki进行保存编辑操作的次数。</p>
      <!-- ECharts -->
      <div id="siteEcharts" style="width: 100%;height:400px;"></div>
      <p>特别说明：程序区分各个wiki的键为wgSiteName，若有同名wiki，那么该wiki的数据可能不准确(若多个同名wiki均有用户使用本插件，这些wiki的数据会被计入同一张数据表)</p>
      <!-- Table -->
      <div id="siteTable">
        <table class="responsive-table highlight">
          <tr>
            <th colspan="3" id="total"></th>
          </tr>
          <tr>
            <th>ID</th>
            <th>wiki名称</th>
            <th>编辑提交次数</th>
          </tr>
        </table>
      </div>
    </div>

    <div id="function">
      <p>IPE各个功能的使用统计。</p>
      <!-- ECharts -->
      <div id="functionEcharts" style="width: 100%;height:400px;"></div>
      <!-- 编辑保存率 -->
      <p></p>
      <div id="savePersents">
        <b style="float: left;">快速编辑提交率</b>
        <span id="howMuch"></span>
        <div id="savePersentsProgress" class="progress"><div id="savePersentsBar" class="determinate"></div></div>
      </div>
      <p></p>
      <!-- Table -->
      <div id="functionTable">
        <table class="responsive-table highlight">
          <tr>
            <th colspan="3" id="total"></th>
          </tr>
          <tr>
            <th>ID</th>
            <th>功能</th>
            <th>使用次数</th>
          </tr>
        </table>
      </div>
    </div>

    <h2>通告</h2>
    <ul>
      <li class="notify-box info"><b>2020年3月6日 02:08</b> 由于网站ssl证书于2020年3月3日过期，当天小鱼君未及时更换新的证书，导致https网络协议失效，2020年3月3日-3月5日的统计数据低于实际数据。</li>
    </ul>

    </div>

  </div>
</main>
<!-- End Content -->
<!-- Footer -->
<?php
if ($_GET['iframe'] !== '1') {
  require(globalinvoke."/footer.php");
} else {
  echo '<script src="script.js"></script>';
}
?>
<!-- End Footer -->
</body>
</html>
