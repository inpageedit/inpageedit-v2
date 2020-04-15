<html>

<head>
  <title>InPageEdit-v2 | MediaWiki Gadget</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=yes">
</head>

<body class="github-page">
  <main>
    <h1>InPageEdit-v2</h1>
    <table class="infobox">
      <tbody>
        <tr>
          <td colspan="2" style="background-color:#bfe6ef; color:#252525; font-size:100%; padding:1em;"><b
              style="font-size:large">InPageEdit-v2</b>
          </td>
        </tr>
        <tr>
          <td colspan="2"><img alt="Ipe-toolbox.gif"
              src="https://img.moegirl.org/common/thumb/e/ec/Ipe-toolbox.gif/250px-Ipe-toolbox.gif"
              srcset="https://img.moegirl.org/common/e/ec/Ipe-toolbox.gif 1.5x" data-file-width="256"
              data-file-height="256" class="multimediaViewerScrollSet" width="250" height="250"><br>
          </td>
        </tr>
        <tr>
          <td colspan="2" bgcolor="#bfe6ef"><b>信息</b>
          </td>
        </tr>
        <tr>
          <td bgcolor="#e6f5f9">类型</td>
          <td>Javascript
          </td>
        </tr>
        <tr>
          <td bgcolor="#e6f5f9">版本状态</td>
          <td>稳定版(持续开发中)
          </td>
        </tr>
        <tr>
          <td bgcolor="#e6f5f9">描述</td>
          <td>一个JavaScript插件，使您在不打开新标签页的情况下完成常规维护
          </td>
        </tr>
        <tr>
          <td bgcolor="#e6f5f9">作者</td>
          <td><a href="/User:%E6%9C%BA%E6%99%BA%E7%9A%84%E5%B0%8F%E9%B1%BC%E5%90%9B" title="User:机智的小鱼君">User:机智的小鱼君</a>
          </td>
        </tr>
        <tr>
          <td bgcolor="#e6f5f9">支持语言</td>
          <td>
            <div class="poem">
              <p>English (en)<br>
                العربية (ar)<br>
                Français (fr)<br>
                Nederlands (nl)<br>
                Polski (pl)<br>
                ‪中文(简体)‬ (zh-hans)<br>
                ‪中文(繁體)‬ (zh-hant)<br>
                <a target="_blank" rel="nofollow noreferrer noopener" class="external text"
                  href="https://github.com/Dragon-Fish/InPageEdit-v2/blob/master/i18n/i18n.json">翻译</a>
              </p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <p>
      <strong>InPageEdit-v2</strong>是由机智的小鱼君使用JavaScript编写的MediaWiki插件。具有较好的移动设备支持以及<del>毫无卵用</del>的五彩斑斓设计。主要功能旨在使许多MediaWiki的功能在不打开新标签页的情况下完成(包括但不限于编辑)，极大加快维护wiki的速度。另外插件采用模块化设计，提供许多SDK可以自由调用，详见
      <a href="https://github.com/Dragon-Fish/InPageEdit-v2/wiki">Wiki</a></p>
    <h2 id="特色功能">特色功能</h2>
    <h3 id="inpageedit工具盒">InPageEdit工具盒</h3>
    <ul>
      <li>在成功加载InPageEdit-v2后，屏幕的右下角应当出现如图所示的InPageEdit工具盒</li>
      <li>插件的所有功能均可以在工具盒中找到</li>
    </ul>
    <h3 id="快速编辑">快速编辑</h3>
    <h4 id="编辑">编辑</h4>
    <img
      src="https://vignette.wikia.nocookie.net/dev/images/7/76/InPageEdit_qedit.png/revision/latest/scale-to-width-down/185?cb=20200328174708">
    <img
      src="https://vignette.wikia.nocookie.net/dev/images/0/0a/InPageEdit_qedit_preview.png/revision/latest/scale-to-width-down/185?cb=20200328174710">

    <ul>
      <li>点击工具箱中天蓝色的“<span class="material-icons">edit</span> 铅笔图标”，在不打开新标签页的情况下编辑页面</li>
      <li>编辑器提供预览功能</li>
      <li>也可以编辑页面的历史版本以便快速修复</li>
      <li>
        '''注意，您不应将本插件作为MediaWiki原生编辑页面的完全替代品，本插件与原生编辑页面相比少了很多实用的工具（模版使用分析、高级编辑工具条等等），而且稳定性一定低于原生编辑页面'''，本插件更适合进行修复页面内简单问题的小编辑
      </li>
    </ul>
    <h4 id="快速编辑段落">快速编辑段落</h4>
    <ul>
      <li>在段落编辑按钮后生成一个快速编辑按钮，让你快速编辑这个段落</li>
    </ul>
    <h4 id="快速编辑其他页面">快速编辑其他页面</h4>
    <img
      src="https://vignette.wikia.nocookie.net/dev/images/7/74/InPageEdit_qedit_navbar.png/revision/latest/scale-to-width-down/180?cb=20200328174709">

    <ul>
      <li>插件自动识别文章内的编辑链接，例如Navbox内的“查编论”快捷方式以及模版内的编辑链接，在其后生成一个快速编辑按钮，让你不需要打开新页面也能修改非当前页面的页面</li>
    </ul>
    <h3 id="快速重定向">快速重定向</h3>
    <img
      src="https://vignette.wikia.nocookie.net/dev/images/b/b0/IPE_redirect.png/revision/latest/scale-to-width-down/180?cb=20200329143818">

    <ul>
      <li>点击工具箱中黄橙色的“<span class="material-icons">flight_land</span> 飞机降落图标”，可以快速将某个页面重定向到本页面</li>
      <li>点击工具箱中玫瑰色的“<span class="material-icons">flight_takeoff</span> 飞机起飞图标”，可以快速将本页面重定向到某个页面</li>
    </ul>
    <h3 id="快速重命名">快速重命名</h3>
    <img
      src="https://vignette.wikia.nocookie.net/dev/images/6/63/IPE_rename.png/revision/latest/scale-to-width-down/180?cb=20200328174713">

    <ul>
      <li>点击工具盒中紫色的“输入光标”按钮，可以快速重命名本页面（移动页面）</li>
    </ul>
    <h3 id="快速删除页面">快速删除页面</h3>
    <ul>
      <li>让用有权限的用户快速删除页面，节省维护时间</li>
      <li>点击IPE工具盒中红色的“<span class="material-icons">delete</span>垃圾桶”图标使用该功能</li>
    </ul>
    <h3 id="快速预览差异">快速预览差异</h3>
    <img
      src="https://vignette.wikia.nocookie.net/dev/images/1/1a/IPE_diff.png/revision/latest/scale-to-width-down/180?cb=20200328174712">

    <ul>
      <li>在访问最近更改或者差异页面时，点击差异链接可以在不打开新页面的情况下快速阅览差异</li>
    </ul>
    <h2 id="如何安装">如何安装</h2>
    <h3 id="个人js">个人JS</h3>
    <p>在[[Special:Mypage/common.js|您的个人js页]]添加以下代码：</p>
    <pre><code class="language-javascript">mw.loader.load('https://cdn.jsdelivr.net/gh/dragon-fish/inpageedit-v2@master/script.min.js');</code></pre>
    <p><b>注意</b>：在保存之后，您可能需要清除浏览器缓存才能看到所作出的变更的影响。</p>
    <ul>
      <li>Firefox或Safari：按住Shift的同时单击刷新，或按Ctrl-F5或Ctrl-R（Mac为⌘-R）</li>
      <li>Google Chrome：按Ctrl-Shift-R（Mac为⌘-Shift-R）</li>
      <li>Internet Explorer：按住Ctrl的同时单击刷新，或按Ctrl-F5</li>
      <li>Opera：前往菜单 → 设置（Mac为Opera → Preferences），然后隐私和安全 → 清除浏览数据 → 缓存的图片和文件。</li>
    </ul>
    <h3 id="自定义功能">自定义功能</h3>
    <p>InPageEdit采用模块化设计，你可以自由调用IPE提供的几乎所有功能</p>
    <blockquote>详见：<a href="https://github.com/Dragon-Fish/InPageEdit-v2/wiki/SDK" target="_blank">Wiki → SDK</a>
    </blockquote>
    <h2 id="卸载插件">卸载插件</h2>
    <h3 id="删除个人js">删除个人js</h3>
    <p>删除您的[[Special:Mypage/common.js|个人js页]]中的以下代码：</p>
    <pre><code class="language-javascript">mw.loader.load('https://cdn.jsdelivr.net/gh/dragon-fish/inpageedit-v2@master/script.min.js');</code></pre>
    <p><b>注意</b>：在保存之后，您可能需要清除浏览器缓存才能看到所作出的变更的影响。</p>
    <ul>
      <li>Firefox或Safari：按住Shift的同时单击刷新，或按Ctrl-F5或Ctrl-R（Mac为⌘-R）</li>
      <li>Google Chrome：按Ctrl-Shift-R（Mac为⌘-Shift-R）</li>
      <li>Internet Explorer：按住Ctrl的同时单击刷新，或按Ctrl-F5</li>
      <li>Opera：前往菜单 → 设置（Mac为Opera → Preferences），然后隐私和安全 → 清除浏览数据 → 缓存的图片和文件。</li>
    </ul>
    <h3 id="手动清理残余项">手动清理残余项</h3>
    <p>本插件安装时会保存localStorage，它们并不会影响到您的浏览器性能，但如果您有“洁癖”，可以打开您的浏览器控制台(F12) → 存储(Shift+F9)</p>
    <ul>
      <li>找到键<code>InPageEditPreference</code>以及<code>InPageEditVersion</code>→右键→删除本项目</li>
      <li>找到键<code>i18n-cache-InPageEdit-v2-*</code>(有多个)→右键→删除本项目</li>
    </ul>
    <h2 id="技术细节">技术细节</h2>
    <h3 id="使用的技术">使用的技术</h3>
    <ul>
      <li>使用jQuery</li>
      <li>使用mediawiki.api</li>
      <li>使用localStorage</li>
      <li>模态框使用ssi-modal插件</li>
      <li>使用超级无敌螺旋炫酷吊炸天AJAX异步加载法</li>
      <li>数据统计用户图形页面的数据表使用ECharts绘制</li>
      <li>数据统计使用 PHP7.3 + MariaDB10 实现</li>
      <li>数据库引擎为Inno DB<h3 id="样式设计">样式设计</h3>
      </li>
      <li>外观样式参考''OOUI''，通过CSS进行的还原<h3 id="支持平台">支持平台</h3>
      </li>
      <li><strong>不支持IE浏览器</strong><sub><s>IE给👴爪巴</s></sub></li>
      <li><strong>不支持旧Fandom平台，因为它们使用的是版本较低的jQuery1.8.1👎👎👎，仅支持新版UCP社区(Unified Community Platform)。</strong></li>
      <li>MediaWiki &gt; 1.19.0</li>
      <li>jQuery &gt; 2.2.0</li>
    </ul>
    <h3 id="更新日志">更新日志</h3>
    <blockquote>
      <p>详见 <a href="https://github.com/Dragon-Fish/InPageEdit-v2/docs/Update%20logs.md">Update logs</a></p>
    </blockquote>
    <h3 id="源代码">源代码</h3>
    <p><a href="https://github.com/Dragon-Fish/InPageEdit-v2">https://github.com/Dragon-Fish/InPageEdit-v2</a></p>
    <h2 id="你知道吗">你知道吗</h2>
    <ul>
      <li>本插件最初是受到萌娘百科用户<a href="https://zh.moegirl.org/User:%E5%A6%B9%E7%A9%BA%E9%85%B1">妹空酱</a>所编写的小编辑插件<a
          href="https://zh.moegirl.org/User:%E5%A6%B9%E7%A9%BA%E9%85%B1/Wikiplus">WikiPlus</a>的启发<ul>
          <li>由于WikiPlus对于移动设备糟糕的兼容性（在较小的手机上编辑框飞出屏幕）以及<s>难看的绿色配色</s>，加之其不支持Fandom/Wikia平台，机智的小鱼君决定自行编写一款小编辑插件</li>
          <li>本插件的最初目的是填补WikiPlus不兼容Fandom平台的遗憾</li>
          <li>遗憾而戏剧性的一幕是，本插件也不兼容Fandom😂</li>
        </ul>
      </li>
      <li>虽然插件名字叫“页面内编辑(In page edit)”，但事实上IPE提供了比W+更多的编辑以外的额外功能，例如快速比较差异、快速重命名页面等等</li>
      <li>期初本插件的设计参考的是Fandom Design System，但后来改用类OOUI的设计风格，即便如此，本插件并未直接调用OOUI-JS，而是作者通过css进行的还原，源代码可以在上面的列表找到</li>
      <li>插件从2020年1月5日开始收集非隐私用户数据，用于统计分析插件功能的使用状况<ul>
          <li>数据统计信息可以在 <a href="https://doc.wjghj.cn/InPageEditAnalysis/">https://doc.wjghj.cn/InPageEditAnalysis/</a>
            查看
          </li>
          <li>数据统计接口是小鱼君1月4日下午4时到隔天凌晨原创编写的</li>
          <li>数据统计页面的数据表使用的是ECharts，ECharts研发团队由国人领衔，曾隶属于百度集团，后被Apache收购</li>
        </ul>
      </li>
    </ul>
    <hr>

    <div style="text-align: center; color: #888; font-size: small;">
      <p>InPageEdit-v2 is a MediaWiki plugin based on JavaScript. And write by <a
          href="https://epbureau.fandom.com/wiki/%E6%9C%BA%E6%99%BA%E7%9A%84%E5%B0%8F%E9%B1%BC%E5%90%9B">机智的小鱼君</a></p>
      <p>© Original by Wjghj Project, <a href="https://www.gnu.org/licenses/gpl-3.0-standalone.html">GNU General Public
          License 3.0</a> (2019 -
        <script>document.write(new Date().getFullYear());</script>)<br>
        See more: <a href="https://github.com/Dragon-Fish/InPageEdit-v2">GitHub</a> <a
          href="https://github.com/Dragon-Fish/InPageEdit-v2/docs/Update%20logs.md">Update logs</a> <a
          href="https://github.com/Dragon-Fish/InPageEdit-v2/issue">File issues</a></p>
    </div>
    <style>
      .github-page {
        background: aliceblue url("https://vignette.wikia.nocookie.net/dragonfish/images/5/50/Wiki-background/revision/latest/scale-to-width-down/1280?cb=20180308051626&path-prefix=zh") 50% -100px / cover no-repeat fixed !important;
        background-attachment: fixed !important;
        padding: 16px;
      }

      .github-page main {
        background: rgba(255, 255, 255, .7);
        width: calc(100% - 32px);
        padding: 16px;
        border: 1px solid #aaa;
        box-sizing: content-box;
      }

      h1 {
        border: none;
        background: linear-gradient(90deg, rgb(151, 151, 151), rgba(255, 255, 255, 0));
        background-position: 0 42px;
        background-repeat: repeat-x;
        background-size: 100% 8px;
        text-shadow: 2px 0px 0px white;
        width: 100%;
        padding-left: 4px;
        margin-bottom: 9px;
        font-size: 42px
      }

      h2 {
        padding-top: 2px;
        border: none !important;
        background: linear-gradient(90deg, rgb(127, 172, 255), rgba(210, 232, 255, 0.53));
        background-position: 0 18px !important;
        background-repeat: repeat-x;
        background-size: 100% 4px;
        font-size: 21px;
        text-shadow: 2px 0px 0px white
      }

      h3 {
        border: none;
        background: linear-gradient(90deg, rgb(159, 204, 255), rgba(159, 204, 255, 0));
        background-position: 0 18px;
        background-repeat: repeat-x;
        background-size: 100% 2px;
        font-size: 19px
      }

      h4 {
        border: none;
        background: linear-gradient(90deg, rgb(159, 204, 255), rgba(159, 204, 255, 0));
        background-position: 0 16px;
        background-repeat: repeat-x;
        background-size: 1px 1px;
        font-size: 17px
      }

      h5 {
        font-size: 16px
      }

      a {
        color: #006cb0;
        text-decoration: none;
        text-shadow: 0 -15px 2.5px transparent, 0 15px 2.5px transparent;
        text-decoration: none;
        transition: all .05s;
      }

      code {
        border: 1px solid #aaa;
        border-radius: 2px;
        padding: 0 2px;
        background: rgba(200, 200, 200, .3)
      }

      hr {
        border: none;
        border-bottom: 4px solid #bbb;
        width: 280px;
        margin: 0 auto;
      }

      .infobox {
        font-size: .85em;
        text-align: center;
        width: 260px;
        max-width: 100%;
        float: right;
        background-color: #e6f5f9;
        margin: 1em 10px 2em 1em;
      }

      @media screen and (max-width: 800px) {
        .infobox {
          float: laft;
          width: 100%;
        }
      }
    </style>
  </main>
</body>

</html>
