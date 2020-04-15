**Sometimes the update will cause the translation to be lost, please use <code>?debug=1</code> to update the translation cache.**
This is Update Log of InPageEdit-v2.

<div class="right-toc">
Description: <br/>
<kbd>NEW</kbd> New function(s)<br/>
<kbd>TEST</kbd> Beta testing function(s)<br/>
<kbd>FIXED</kbd> Fixed issue(s)<br/>
<kbd>DELETED</kbd> Deleted function(s)
</div>

## 2.13.0.1(build_c052a80) 
Release date: -
* Security update
* <kbd>DELETED</kbd> Hook <code>dev.i18n</code> modified to <code>dfgh.i18n</code>. Prevent contamination of Fandom devwiki variables.

## 2.13.0(build_2795) 
> **Far From Enough, Continue Cup**
Release date: 17:14, 9 April 2020 (CST)
* <kbd>NEW</kbd> Quick-Edit edit toolbar is available
** Designed similar to 2010 Wiki Editor 
** You can add extra custom buttons, [{{fullurl:InPageEdit-v2/SDK}} read more].
* <kbd>DELETED</kbd> <code>MyInPageEditPreference</code> variable no longer used. Please use <code>InPageEdit.myPreference</code> instead.
```javascript
// Demo to replace old code
// Old
window.MyInPageEditPreference = {"outSideClose":true,"editMinor":false,"editSummary":"[InPageEdit] $section没有编辑摘要$oldid"};
// New
window.InPageEdit = window.InPageEdit || {}> // Keep this line
InPageEdit.myPreference = {"outSideClose":true,"editMinor":false,"editSummary":"[InPageEdit] $section没有编辑摘要$oldid"};
```

## 2.12.0.4(build_2686) 
Release data: 00:11, 6 April 2020 (CST)
* <kbd>FIXED</kbd> When you are editting page section, IPE can display the name of the section correctly and jump to the anchor point after saving.
** Now <code>$section</code> placeholder in edit summary will replace with <code>/* Section title */</code>. Just like the original MW editor. ('''Finally!!!''')
* <kbd>FIXED</kbd> Fixed a logic issue. When you open another editor in the editor (eg. via Page detail links). Saving will no longer reload the page.
* <kbd>FIXED</kbd> Fixed the logic of fetch editnotice.

## 2.12.0.3(build_2629) 
Release date: 02:48, 5 April 2020 (CST)
* <kbd>FIXED</kbd> Fixed the logic to get the last edit timestamp of the page. Edit conflict issues should be encountered less often.
* <kbd>FIXED</kbd> Fixed the logic of whether the editarea is modified.

## 2.12.0.2(build_2619) 
Release date: 01:16, 4 April 2020 (CST)
* <kbd>FIXED</kbd> Fixed https://github.com/Dragon-Fish/InPageEdit-v2/issues/4

## 2.12.0.1(build_2610) 
Release date: 00:11, 4 April 2020 (CST)
* <kbd>FIXED</kbd> Fixed https://github.com/Dragon-Fish/InPageEdit-v2/issues/5
* <kbd>FIXED</kbd> Fixed https://github.com/Dragon-Fish/InPageEdit-v2/issues/2#issuecomment-607441343

## 2.12.0(build_2575) 
> **The Matryoshka Update**
Release date: 01:37, 2 April 2020 (CST)
* <kbd>NEW</kbd> New functions in quick edit editor: page details list!
** Show the list of templates and images on the page!
** You can easily edit the templates or view images via the list.

## 2.11.0(build_2545) 
> **Just Hooks Update**
Release date: 18:15, 1 April 2020 (CST)
* <kbd>NEW</kbd> Quick Delete launched.
* <kbd>FIXED</kbd> Rewrote the logic of move pages, delete pages, and redirect pages modules. In addition, it is now possible to add reasons for your action.
* <kbd>NEW</kbd> Technical update:
** Add module alias: <code>InPageEdit.quickEdit</code>, <code>InPageEdit.quickRename</code>, <code>InPageEdit.quickRedirect</code>, <code>InPageEdit.quickDelete</code>. '''ATTENTION''': Old module name will be archive soon.
** Add mw.hook for InPageEdit. You can now write extended functions for IPE more easily. (eg. <code>mw.hook('InPageEdit.quickEdit').add(myFunctions);</code>)

## 2.10.0.1(build_2519) 
Release date: 12:03, 1 April 2020 (CST)
* <kbd>FIXED</kbd> Minor bug fixed

## 2.10.0(build_2417) 
> **The Structure Tech Update**
Release date: 22:12, 28 March 2020 (CST)
* It's more like a technical update. No new functions.
** We updated the rendering mode of HTML to make it easier to maintain.
** We updated our method to get the version number.

## 2.9.1(build_2369) 
Release date: 00:53, 28 March 2020 (CST)
* <kbd>FIXED</kbd> Add i18n cache mechanism. Improve loading speed.
* <kbd>FIXED</kbd> Fixed styles for multiple components.
** eg. checkbox, header, icons

## 2.9.0.1(build_2319) 
> **World Wild Friends Update**
Release date: 10:14, 26 March 2020 (CST)
* <kbd>FIXED</kbd> Fixed i18n cross-domain reference failure.

## 2.9.0(build_2311) 
Release date: -
* <kbd>NEW</kbd> Now InPageEdit has i18n module. Translate it here: http://dev.fandom.com/wiki/MediaWiki:Custom-InPageEdit-v2/i18n.json

## 2.8.1(build_2236) 
Release date: 02:41, 21 March 2020 (CST)
* <kbd>NEW</kbd> Find and Replace!
: It took me looooooooong time to write this function. So, hope you like it.

## 2.8.0.1(build_2213) 
Release date: 00:27, 18 March 2020 (CST)
* <kbd>NEW</kbd> InPageEdit advanced edittools coming soon.
* <kbd>FIXED</kbd> User feedback that edit notice area takes up too much space. So it will be hide in the beginning.

## 2.8.0(build_2026) 
Release date: 21:45, 29 January 2020 (CST)
* <kbd>FIXED</kbd> InPageEdit Analysis module will no longer trigger error codes
* <kbd>FIXED</kbd> InPageEdit will now register global functions

## 2.7.1.1(build_1960) 
Release date: 20:21, 7 January 2020 (CST)
* <kbd>FIXED</kbd> Fixed a bug that cause IPE not work

## 2.7.1(build_1948) 
> **The Machine**
Release date: 18:01, 7 January 2020 (CST)
* <kbd>NEW</kbd> We add a new feature:
** The plugin adds features that may collect your information. The information that may be collected is: The wiki you edited, the number of times you saved using IPE, the number of times you used other features of IPE, and the date you used IPE
** We '''DO NOT''' collect any of your personal cookies and privacy information, and all information collected will be public
* <kbd>FIXED</kbd> We changed InPageEdit-Analysis's address to https://doc.wjghj.cn/InPageEditAnalysis/

## 2.6.4(build_1897) 
Release date: 23:41, 4 January 2020 (CST)
* <kbd>TEST</kbd> We started testing a new feature:
** The plugin adds features that may collect your information. The information that may be collected is: The wiki you edited, the number of times you saved using IPE, the number of times you used other features of IPE, and the date you used IPE
** We '''DO NOT''' collect any of your personal cookies and privacy information, and all information collected will be public
** <s>You can find all informations here: https://doc.wjghj.cn/InPageEditApi/</s>

## 2.6.3.5(build_1816) 
Release date: 15:29, 11 December 2019 (CST)
* <kbd>FIXED</kbd> Fixed a bug where the newest version of MediaWiki Recentchanges auto-refresh feature overwrites ipe-quick-diff module

## 2.6.3.4(build_1767) 
Release date: 18:10, 8 December 2019 (CST)
* <kbd>FIXED</kbd> Redesigned IPE-Toolbox
* <kbd>DELETED</kbd> '''We no longer support InPageEdit-v2 compressed edition''' (<s>https://common.wjghj.cn/js/InPageEdit-v2/min</s>)

## 2.6.3.3(build_1709) 
Release date: 16:18, 5 December 2019 (CST)
* <kbd>FIXED</kbd> Rewrite quick-edit module
* <kbd>FIXED</kbd> Fixed a bug that cause magic words such like <code><nowiki>{{PAGENAME}}</nowiki></code> not work in quick-edit edit notice
* <kbd>FIXED</kbd> Now, if you don't have permission to edit the page, you will receive a notice message and can't submit content
* <kbd>FIXED</kbd> Adjusted the load order of CSS, it is more easier to override basic styles with your personal CSS now

## 2.6.3.2(build_1659) 
Release date: 05:00, 5 December 2019 (CST)
* <kbd>FIXED</kbd> Minor bug fix

## 2.6.3.1(build_1536) 
Release date: 17:26, 2 December 2019 (CST)
* <kbd>FIXED</kbd> Minor bug fixed: Now quick-diff modal will display at top when quick-edit from quick-diff module

## 2.6.3(build_1517) 
> **Kimi no namai**
Release date: 17:20, 30 November 2019 (CST)
* <kbd>NEW</kbd> New function release: Rename page(Move)!!!
** Try it in your IPE toolbox~
* <kbd>FIXED</kbd> Fixed a bug that cause modal not close after quick redirect

## 2.6.2.3(build_1467) 
Release date: 14:03, 25 November 2019 (CST)
* <kbd>FIXED</kbd> Now the button in quick diff module lead you to the right page

## 2.6.2.2(build_1459) 
Release date: 22:32, 24 November 2019 (CST)
* <kbd>FIXED</kbd> Fixed a bug that cause in editor diff can't work

## 2.6.2.1(build_1444) 
* <kbd>DELETED</kbd> Merged "关于&帮助" button from ipe-toolbox to ipe-preference module

## 2.6.2(build_1432) 
Release date: 21:33, 24 November 2019 (CST)
* <kbd>NEW</kbd> We complete quick diff module
** Now quick diff shows right info
** Now you can jump to next or prev version and quick view diff via quick diff module
* <kbd>FIXED</kbd> We fixed the quick edit summary text
** Now <code>$oldid</code> will shows like <code><nowiki>(编辑自[[Special:Diff/oldid]])</nowiki></code>
* <kbd>FIXED</kbd> We fixed checkbox style
** Made inline width to 1px
** Hover style
** Transition *thanks to [https://minecraft-zh.gamepedia.com/User:Dianliang233 Dianliang233] :)
* <kbd>NEW</kbd> <s>Now you can use compressed version via https://common.wjghj.cn/js/InPageEdit-v2/min</s><sup>'''DO NOT USE'''</sup>

## 2.6.1(build_1238) 
Release date: 14:35, 23 November 2019 (CST)
* <kbd>NEW</kbd> Script now run strict mode
* <kbd>NEW</kbd> <s>We are now using new version number naming rule: </s>
** V2 <code>Main.Primary.Secondary(build_''Code-revision-id'')</code>
** [https://common.wjghj.cn/s/C Canary edition] <code>Main.Primary.Secondary(canary_''Code-revision-id'')</code>

## 2.6.0(build_1196) 
Release date: 00:32, 23 November 2019 (CST)
* <kbd>NEW</kbd> We rewrote quick diff module
** Rename module <code>InPageEdit.viewDiff()</code> → <code>InPageEdit.loadQuickDiff(CompareApiJson)</code>
** Add module <code>InPageEdit.quickDiff()</code>
* <kbd>NEW</kbd> You can now quick view diff on history page!
* <kbd>NEW</kbd> We redesigned the quick edit editor
** More OOUI style (LOL)
* <kbd>NEW</kbd> You can now view difference between your code and old code when you are editting!

## 2.5.3(build_1094) 
* <kbd>DELETED</kbd> We are no longer support skin setting.
** We are now using the new OOUI-like skin. You can customize the look of the IPE on your personal css page.
* <kbd>FIXED</kbd> New OOUI style progress bar: <html><button class="btn btn-primary" onclick="$('#ipe-progress-sample').toggleClass('done')">TOGGLE</button></html>(<s>我可以玩一年</s>)
** <div id="ipe-progress-sample" class="ipe-progress" style="width: 50%> display: block !important;"><div class="ipe-progress-bar"></div></div>

## 2.5.2(build_944) 
* <kbd>NEW</kbd> We are now using the new OOUI-like skin!
** <s>You can still load old Wikia-like designed skin via <code>var InPageEditSkin = 'wds';</code></s>

## 2.5.1(build_876) 
* <kbd>FIXED</kbd> The page content is no longer overwritten when an editing conflict occurs

## 2.5.0(build_821) 
* Release date: 19:59, 16 November 2019 (CST)
* <kbd>NEW</kbd> This is a big update, we replaced the ''cookie'' function with ''localStorage''
** You can manually delete old cookies or wait for 60 days to expire automatically
* <kbd>NEW</kbd> You can turn off the function of clicking outside of edit window to close via setting

## 2.4.1(build_783) 
Release date: 16:03, 16 November 2019 (CST)
* <kbd>FIXED</kbd> Fixed a bug that caused the display title in the preview as **API*** <kbd>FIXED</kbd> Fixed a bug that caused personal local settings(<code>MyInPageEditPreference</code>) not working

## 2.4.0(build_764) 
Release date: 01:55, 12 November 2019 (CST)
* <kbd>FIXED</kbd> This is not important update for most of you, we use a new version number to remind you that we replaced some function names to make the module more holistic
** <code>InPageEdit()</code> → <code>InPageEdit.edit()</code>
** <code>InPageEditRedirect()</code> → <code>InPageEdit.redirect()</code>
** <code>InPageEditDeletepage</code> → <code>InPageEdit.deletepage()</code>
** <code>InPageEditRename()</code> → <code>InPageEdit.renamepage()</code>
** <code>InPageEditPreference()</code> → <code>InPageEdit.preference()</code>
** <code>InPageEditViewDiff()</code> → <code>InPageEdit.viewDiff()</code>
** <code>InPageEditSectionLink()</code> → <code>InPageEdit.articleLink()</code>

## 2.3.1(build_747) 
Release date: 00:16, 11 November 2019 (CST)
* <kbd>NEW</kbd> New function: Quick view page diff!
** Click diff links from ''Special:Recentchanges'' or ''action=history'', make a quick view of the diff log

## 2.3.0.2(build_616) 
Release date: 21:28, 6 November 2019 (CST)
* <kbd>FIXED</kbd> This is not important update for most of you, we use a new version number to remind you that we have modified some css selectors
** Main editor window
*** Add <code>.ipe-editor .timestamp-''<timestamp>''</code>
*** <code>#editPage</code> → <code>.editPage</code>
*** <code>#editArea</code> → <code>.editArea</code>
*** <code>#editSummary</code> → <code>.editSummary</code>
*** <code>#editMinor</code> → <code>.editMinor</code>
** Quick redirect window
*** Add <code>.quick-redirect</code>
** Quick delete window
*** Add → <code>.quick-deletepage</code>
** Quick rename window
*** Add <code>.quick-renamepage</code>
** About & Help window
*** Add <code>.in-page-edit</code>

## 2.3.0.1(build_568) 
Release date: 12:52, 5 November 2019 (CST)
* <kbd>FIXED</kbd> Simplify codes
* <kbd>FIXED</kbd> Fixed a bug that cause in-article edit link save error

## 2.3.0(build_488) 
Release date: 23:03, 3 November 2019 (CST)
* <kbd>NEW</kbd> Now you can save your custom preferences by clicking the gear icon(<span class="material-icons">settings</span>) in the InPageEdit Toolbox!
** Save your prefer edit summary, who doesn't like to be cool and maverick?
** Default set all edits as minor edit

## 2.2.2.1(build_460) 
Release date: 21:49, 2 November 2019 (CST)
* This is not a regular update, we use a new version number to remind you that we have replaced the license agreement
* *Some new functions coming soon (•‾̑⌣‾̑•)✧˖°

## 2.2.2(build_420) 
Release date: 20:45, 1 November 2019 (CST)
* <kbd>NEW</kbd> Quick redirect now released! Check the InPageEdit Toolbox on right bottom of the page!

## 2.2.1(build_382) 
Release date: 16:53, 1 November 2019 (CST)
* <kbd>NEW</kbd> The new design: InPageEdit Toolbox! Checking all ipe tools on right bottom of the page!
* [COMING_SOON] Quick redirect & Quick rename page...

## 2.2.0(build_350) 
Release date: 02:10, 1 November 2019 (CST)
* <kbd>NEW</kbd> New design with [https://fandomdesignsystem.com Fandom Design System]!
* <kbd>DELETED</kbd> No longer support load via URL param

## 2.1.2.1(build_336) 
* <kbd>FIXED</kbd> Simplify json codes

## 2.1.2(build_330) 
Release date: 19:51, 25 October 2019 (CST)
* <kbd>NEW</kbd> Use the new way to get plugin version info

## 2.1.1(build_318) 
Release date: 20191025
* <kbd>NEW</kbd><kbd>TEST</kbd> <s>Load via URL param</s><sup>↑ deleted, see [[#2.2.0(build_350)|Ver.2.2.350]]</sup>

## 2.1.0.1(build_306) 
Release date: 20191025
* <kbd>FIXED</kbd> Replace syntax with mw resource loader

## 2.1.0(build_298) 
Release date: 20191019
* <kbd>NEW</kbd> Now support edit history
* <kbd>FIXED</kbd> Posting error will show you the error code

## 2.0.10(build_279) 
Release date: 20191018
* <kbd>NEW</kbd> Now support minor edit

## 2.0.9 
Release date: unknown
* <kbd>NEW</kbd> Now support multi skins

## 2.0.8 
Release date: unknown
* <kbd>NEW</kbd> Now support preview

## 2.0.7 
Release date: unknown
* <kbd>FIXED</kbd> Multi bugs fixed, content can be published now

## 2.0.0 
Release date: unknown
* <kbd>NEW</kbd> Alpha release, rewrite InPageEdit via ssi modal plugin

## Earlier version 
InPageEdit 1.0 no longer updated
