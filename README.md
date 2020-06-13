<table>
  <tbody>
    <tr>
      <td colspan="2"><b>InPageEdit-v2</b>
      </td>
    </tr>
    <tr>
      <td colspan="2"><img alt="Ipe-toolbox.gif"
          src="https://img.moegirl.org/common/0/04/Ipe-toolbox-2.gif" width="240" height="240"><br>
      </td>
    </tr>
    <tr>
      <td colspan="2"><b>信息</b>
      </td>
    </tr>
    <tr>
      <td>类型</td>
      <td>Javascript
      </td>
    </tr>
    <tr>
      <td>版本状态</td>
      <td>稳定版(持续开发中)
      </td>
    </tr>
    <tr>
      <td>描述</td>
      <td>一个JavaScript插件，使您在不打开新标签页的情况下完成常规维护
      </td>
    </tr>
    <tr>
      <td>作者</td>
      <td><a href="https://github.com/Dragon-Fish" title="机智的小鱼君">机智的小鱼君</a>
      </td>
    </tr>
    <tr>
      <td>支持语言</td>
      <td>
        <div class="poem">
          English (en)<br>
          العربية (ar)<br>
          Français (fr)<br>
          Nederlands (nl)<br>
          Polski (pl)<br>
          ‪中文(简体)‬ (zh-hans)<br>
          ‪中文(繁體)‬ (zh-hant)<br>
          <a target="_blank" rel="nofollow noreferrer noopener" class="external text"
            href="https://github.com/Dragon-Fish/InPageEdit-v2/blob/master/i18n/i18n.json">翻译</a>
        </div>
      </td>
    </tr>
  </tbody>
</table>

**InPageEdit-v2**是由机智的小鱼君使用JavaScript编写的MediaWiki插件。具有较好的移动设备支持以及~~毫无卵用~~的五彩斑斓设计。主要功能旨在使许多MediaWiki的功能在不打开新标签页的情况下完成(包括但不限于编辑)，极大加快维护wiki的速度。另外插件采用模块化设计，提供许多SDK可以自由调用，详见
[Wiki](https://github.com/Dragon-Fish/InPageEdit-v2/wiki)

## 特色功能
> 详见 [InPageEdit-v2 GitHub Page](https://dragon-fish.github.io/inpageedit-v2/)

## 如何安装 
### 小工具Gadget(已引入的wiki)
前往 **Special:参数设置**，勾选“InPageEdit-v2”

### 个人JS 
[![](https://data.jsdelivr.com/v1/package/gh/dragon-fish/inpageedit-v2/badge)](https://www.jsdelivr.com/package/gh/dragon-fish/inpageedit-v2)

在*个人JS页*添加以下代码：
```javascript
mw.loader.load('https://cdn.jsdelivr.net/gh/dragon-fish/inpageedit-v2@master/script.min.js');
```

**注意**：在保存之后，您可能需要清除浏览器缓存才能看到所作出的变更的影响。
* Firefox或Safari：按住Shift的同时单击刷新，或按Ctrl-F5或Ctrl-R（Mac为⌘-R）
* Google Chrome：按Ctrl-Shift-R（Mac为⌘-Shift-R）
* Internet Explorer：按住Ctrl的同时单击刷新，或按Ctrl-F5
* Opera：前往菜单 → 设置（Mac为Opera → Preferences），然后隐私和安全 → 清除浏览数据 → 缓存的图片和文件。

### 自定义功能 
InPageEdit采用模块化设计，你可以自由调用IPE提供的几乎所有功能
> 详见：[Wiki](https://github.com/Dragon-Fish/InPageEdit-v2/wiki)

## 卸载插件 
### 停止使用Gadget 
前往**Special:参数设置**，取消勾选“InPageEdit-v2”

### 删除个人js 
删除您的**个人JS页**中的以下代码：
```javascript
mw.loader.load('https://cdn.jsdelivr.net/gh/dragon-fish/inpageedit-v2@master/script.min.js');
```

**注意**：在保存之后，您可能需要清除浏览器缓存才能看到所作出的变更的影响。
* Firefox或Safari：按住Shift的同时单击刷新，或按Ctrl-F5或Ctrl-R（Mac为⌘-R）
* Google Chrome：按Ctrl-Shift-R（Mac为⌘-Shift-R）
* Internet Explorer：按住Ctrl的同时单击刷新，或按Ctrl-F5
* Opera：前往菜单 → 设置（Mac为Opera → Preferences），然后隐私和安全 → 清除浏览数据 → 缓存的图片和文件。

### 手动清理残余项 
本插件安装时会保存localStorage，它们并不会影响到您的浏览器性能，但如果您有“洁癖”，可以打开您的浏览器控制台(F12) → 存储(Shift+F9)
* 找到键<code>InPageEditPreference</code>以及<code>InPageEditVersion</code>→右键→删除本项目
* 找到键<code>i18n-cache-InPageEdit-v2-*</code>(有多个)→右键→删除本项目

## 技术细节 
### 使用的技术 
* 使用jQuery
* 使用mediawiki.api
* 使用localStorage
* 模态框使用ssi-modal插件
* 使用 **AJAX** ~~Pro Plus XS R Premium~~ 异步加载法
* 数据统计用户图形页面的数据表使用ECharts绘制
* 数据统计使用 PHP7.3 + MariaDB10 实现
* 数据库引擎为Inno DB
### 样式设计 
* 外观样式参考''OOUI''，通过CSS进行的还原
### 支持平台 
* **不支持IE浏览器**<sub><s>IE给👴爪巴</s></sub>
* **不支持旧Fandom平台，因为它们使用的是版本较低的jQuery1.8.1👎👎👎，仅支持新版UCP社区(Unified Community Platform)。**
* MediaWiki > 1.22.0
* jQuery > 2.2.0

### 更新日志 
> 详见 [Update logs](https://dragon-fish.github.io/inpageedit-v2/update-logs.html)

### 源代码 
https://github.com/Dragon-Fish/InPageEdit-v2

## 你知道吗 
* 本插件最初是受到萌娘百科用户[妹空酱](https://zh.moegirl.org/User:妹空酱)所编写的小编辑插件[WikiPlus](https://zh.moegirl.org/User:妹空酱/Wikiplus)的启发
  * 由于WikiPlus对于移动设备糟糕的兼容性（在较小的手机上编辑框飞出屏幕）以及<s>难看的绿色配色</s>，加之其不支持Fandom/Wikia平台，机智的小鱼君决定自行编写一款小编辑插件
  * 本插件的最初目的是填补WikiPlus不兼容Fandom平台的遗憾
  * 遗憾而戏剧性的一幕是，本插件也不兼容Fandom😂
* 虽然插件名字叫“页面内编辑(In page edit)”，但事实上IPE提供了比W+更多的编辑以外的额外功能，例如快速比较差异、快速重命名页面等等
* 期初本插件的设计参考的是Fandom Design System，但后来改用类OOUI的设计风格，即便如此，本插件并未直接调用OOUI-JS，而是作者通过css进行的还原，源代码可以在上面的列表找到
* 插件从2020年1月5日开始收集非隐私用户数据，用于统计分析插件功能的使用状况
  * 数据统计信息可以在 https://doc.wjghj.cn/InPageEditAnalysis/ 查看
  * 数据统计接口是小鱼君1月4日下午4时到隔天凌晨原创编写的
  * 数据统计页面的数据表使用的是ECharts，ECharts研发团队由国人领衔，曾隶属于百度集团，后被Apache收购

<hr/>

InPageEdit-v2 is a JavaScript-based MediaWiki plug-in, written by [机智的小鱼君](https://wjghj.cn/wiki/机智的小鱼君)

© Original by Wjghj Project, [GNU General Public License 3.0](https://www.gnu.org/licenses/gpl-3.0-standalone.html) (2019- )<br/>
See more: [GitHub](https://github.com/Dragon-Fish/InPageEdit-v2) | [Update logs](https://dragon-fish.github.io/inpageedit-v2/update-logs/) | [File issues](https://github.com/Dragon-Fish/InPageEdit-v2/issues)
