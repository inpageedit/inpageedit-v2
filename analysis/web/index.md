---
title: InPageEdit统计信息
description: InPageEdit Analysis 3.0
type: page
style:
  - "/inpageedit-v2/style.css"
script:
  - "https://cdn.bootcdn.net/ajax/libs/echarts/4.8.0/echarts.min.js"
  - "/=statics/sorttable.js"
---

<div class="card banner-card">
<div class="big"><strong id="total-times">-</strong>次</div>
<div id="total-times-label">::IPE::累计使用次数</div>
<hr>
<div id="more-details">来自<strong id="total-sites">-</strong>个站点的<strong id="total-users">-</strong>名用户选择使用::IPE::，今日已被使用<strong id="today-times">-</strong>次</div>
</div>

<section class="analysis-data-area">

## 使用趋势

<div id="tabber-1" class="tabber">

<div class="tabbertab" title="累计使用趋势">

<div class="card">
<div class="echarts" id="date-total-chart" style="width: 100%; height: 400px;"></div>
</div>

</div>

<div class="tabbertab" title="每日使用趋势">

<div class="card">
<div class="echarts" id="date-chart" style="width: 100%; height: 400px;"></div>
</div>

</div>

</div>

## 站点统计

<div class="card">

<div id="site-chart" style="width: 100%; height: 400px;"></div>

<table class="sortable widetable" id="site-table" style="width: 100%;">
<tr>
<th id="sitename">站点名称</th>
<th id="totaluse" class="sorttable_numeric">使用次数</th>
<th id="usercount" class="sorttable_numeric">使用人数</th>
</tr>
</table>

</div>

</section>

<div class="card">

<center>
<div><strong style="font-size: 20px;">InPageEdit Analysis</strong></div>
<div>统计系统由 PHP + MongoDB 驱动，数据可视化由 ECharts 驱动。</div>
<hr style="margin: 16px 0">
<div><em>所有数据均为真实数据</em></div>
</center>

</div>

<script>
$(function(){
  if (urlParam('sitename') || urlParam('siteurl')) {
    $.getScript('sitedata.js');
  } else {
    $.getScript('main.js');
  }
});
</script>
