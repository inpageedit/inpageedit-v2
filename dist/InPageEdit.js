/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./i18n/languages.json":
/*!*****************************!*\
  !*** ./i18n/languages.json ***!
  \*****************************/
/*! exports provided: _metadata, en, ar, fr, nl, pl, zh-hans, zh-hant, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"_metadata\":{\"noTranslate\":[\"noticeid\",\"noticeid-canary\"]},\"en\":{\"noticeid\":\"build_2311_notify\",\"noticeid-canary\":\"canary\",\"version-notice-title\":\"Install successful\",\"version-notice\":\"Hello, thanks for using InPageEdit~です! The plug-in may collect your information, which will not be used for business purposes, and will not collect any of your personal cookies and privacy information. You can find the plug-in's analysis link in the preference window. If you do not want any of your information to be collected, please stop using this plug-in. For feedback, please file issues in GitHub.\",\"version-notice-canary-title\":\"Canary stability warning\",\"version-notice-canary\":\"Canary version is the version used by the author for debugging and development. Any untested experimental features may appear in this version, or even may not work normally at some time. For your experience, it is recommended to switch to the normal version!\",\"updatelog-update-success-title\":\"InPageEdit update successful\",\"updatelog-update-success\":\"InPageEdit $1 has been installed.\",\"updatelog-button-versioninfo\":\"View version info\",\"updatelog-after-close\":\"This pop-up window will not pop up again until the next version update. Find all release info at $1. If you find issues with the plug-in. $2\",\"updatelog-dismiss\":\"DISMISS\",\"updatelog-file-issue\":\"Submit it at GitHub.\",\"updatelog-title\":\"Update Log\",\"updatelog-about\":\"About\",\"quick-edit\":\"Quick Edit\",\"redirect-from\":\"Redirect from\",\"redirect-to\":\"Redirect to\",\"quick-delete\":\"Quick Delete\",\"quick-rename\":\"Quick Rename\",\"quick-diff\":\"Quick Diff\",\"ipe-preference\":\"Preferences\",\"confirm\":\"confirm\",\"cancel\":\"cancel\",\"close\":\"close\",\"done\":\"Done\",\"ok\":\"OK\",\"notify-success\":\"Success\",\"notify-info\":\"Info\",\"notify-error\":\"Error\",\"notify-editing-history\":\"You are editing old version of this page\",\"editor-title-editRevision\":\"Reversion\",\"editor-summary-rivision\":\"Edit from\",\"editor-title-editSection\":\"Part $1\",\"editor-title-editing\":\"Editing\",\"editSummary\":\"Summary\",\"markAsMinor\":\"This is a minor edit\",\"editor-button-save\":\"Save changes\",\"editor-confirm-save\":\"Are you sure you want to save the changes?\",\"editor-button-preview\":\"Show preview\",\"editor-button-diff\":\"Show changes\",\"editor-button-findAndReplace\":\"Find&Replace\",\"fAndR-title\":\"Find & Replace\",\"fAndR-find-text\":\"Find text:\",\"fAndR-replace-text\":\"Replace text:\",\"fAndR-globl\":\"Find global\",\"fAndR-case-sen\":\"Case sensitive\",\"fAndR-enable-regex\":\"Enable regex\",\"fAndR-button-undo\":\"UNDO\",\"fAndR-button-replace\":\"REPLACE\",\"notify-fAndR-undo\":\"Content has been restored to the text before F&R window was opened\",\"notify-fAndR-done\":\"$1 text replaced\",\"editor-detail-button-toggle\":\"Page details\",\"editor-detail-button-templates\":\"Templates used\",\"editor-detail-title-templates\":\"Templates used on this page\",\"editor-detail-button-images\":\"Images used\",\"editor-detail-title-images\":\"Images used on this page\",\"editor-detail-images-quickview\":\"Quick View\",\"editor-detail-images-upload\":\"(Re)upload\",\"window-leave-confirm\":\"Are you sure you want to leave this tab? Your text will NOT be saved.\",\"notify-no-right\":\"No permission\",\"editor-no-right\":\"You do NOT have permission to edit this page. You can leave comments on this page's talk page.\",\"editor-title-editNotice\":\"Editnotice\",\"editor-has-editNotice\":\"This page has editnotice!\",\"editor-leave-confirm\":\"Are you sure you want to leave the editor? Your text will NOT be saved.\",\"notify-no-change\":\"Nothing changed.\",\"editor-title-saving\":\"Publishing...\",\"notify-save-success\":\"Saved successfully. Refreshing page...\",\"notify-save-success-noreload\":\"Saved successfully.\",\"editor-save-error\":\"Some error(s) occurred while saving\",\"redirect-summary\":\"Quick redirect\",\"redirect-question-to\":\"Which page do you want to redirect $1 to?\",\"redirect-question-from\":\"Which page do you want to redirect to $1?\",\"redirect-title\":\"Quick Redirect\",\"notify-redirect-success\":\"Redirect successful.\",\"notify-redirect-error\":\"Some error(s) occurred while creating redirect\",\"delete-reason-default\":\"No longer used\",\"delete-title\":\"Quick Delete\",\"delete-no-right\":\"You do NOT have permission to delete the page.\",\"delete-reason\":\"Why are you want to deleting $1 ?\",\"delete-confirm-title\":\"Delete confirm\",\"delete-confirm-content\":\"Are you sure you want to delete this page? You can restore it later in [[Special:DeletedPages]]\",\"notify-delete-success\":\"Deletion successful\",\"notify-delete-error\":\"Some error(s) occurred while deleting the page\",\"rename-title\":\"Quick Rename Page\",\"rename-moveTo\":\"Choose a new name for $1\",\"rename-movetalk\":\"Move talk page\",\"rename-movesubpages\":\"Move subpage(s) (up to 100)\",\"rename-noredirect\":\"Don't leave a redirect behind\",\"rename-summary\":\"Quick rename\",\"notify-rename-success\":\"Rename successful\",\"notify-rename-error\":\"Some error(s) occurred while moving the page\",\"rename-articleexists-title\":\"Target page exist\",\"rename-articleexists\":\"Page with new page name already exists. The force move function is under development, stay tuned.\",\"rename-no-right\":\"You do NOT have permission to delete the page.\",\"preference-title\":\"InPageEdit preferences\",\"preference-editor-label\":\"Editor settings\",\"preference-outSideClose\":\"Click out side to close editor\",\"preference-setMinor\":\"Minor edit as default\",\"preference-summary-label\":\"Edit summary\",\"preference-editSummary\":\"<code>$section</code> - will be replaced by <code>/<!-- -->* Section header */</code><br><code>$oldid</code> - will be replaced by <code>Edit from [<!-- -->[Special:Diff/oldid]]</code>\",\"preference-analysis-label\":\"Analysis\",\"preference-analysis-view\":\"We will collect some of your non-sensitive information to record the usage of the plugin. Information will be used to improve the experience. You can find the information we collected at $1.\",\"preference-about-label\":\"About InPageEdit\",\"preference-aboutAndHelp\":\"About&Help\",\"preference-updatelog\":\"Update Log\",\"preference-savelocal-label\":\"You can save your InPageEdit-v2 preferences here.\",\"preference-savelocal\":\"Attention: Your preferences will save in your browser. That means you must save again when you change your device.\",\"preference-savelocal-btn\":\"Save locally\",\"preference-reset\":\"reset\",\"preference-save\":\"save\",\"preference-summary-default\":\"[InPageEdit] $section No summary given $oldid\",\"preference-savelocal-popup-title\":\"Save preferences locally\",\"preference-savelocal-popup\":\"Add the following code above the code that calls this plugin on your personal JS page:\",\"preference-savelocal-popup-notice\":\"Attention: If you save the settings locally, you will not be able to use this window for configuration. Although the wrong settings will be ignored, it will not prompt you what went wrong.\",\"preference-savelocal-popup-haslocal\":\"You are saving your preferences locally. You should modify your preferences at [[Special:Mypage/common.js|your personal JS page]] or global.js.\",\"preference-savelocal-popup-yourjspage\":\"your personal JS page\",\"preference-translate\":\"translate\",\"preference-discord\":\"Discord\",\"diff-loading\":\"Loading difference\",\"diff-button-todiffpage\":\"Jump to diff page\",\"diff-usertalk\":\"talk\",\"diff-usercontrib\":\"contribs\",\"diff-userblock\":\"block\",\"diff-title\":\"Difference\",\"diff-edit\":\"edit\",\"diff-version\":\"Revision\",\"diff-prev\":\"Older edit\",\"diff-nextv\":\"Newer edit\",\"diff-bytes\":\"bytes\",\"diff-title-original-content\":\"Original text\",\"diff-title-your-content\":\"Your text\",\"diff-error\":\"Failed to load difference.\",\"preview-placeholder\":\"Loading preview...\",\"preview-title\":\"Preview\",\"preview-error\":\"Failed to load preview.\",\"editor-edittool-header\":\"Header\",\"editor-edittool-header-text\":\"Header text\",\"editor-edittool-bold\":\"Bold\",\"editor-edittool-italic\":\"Italic\",\"editor-edittool-internal-link\":\"Internal link\",\"editor-edittool-list-bulleted\":\"Unordered list\",\"editor-edittool-list-numbered\":\"Ordered list\",\"editor-edittool-nowiki\":\"Nowiki text\",\"editor-edittool-format-label\":\"Format\",\"editor-edittool-insert-label\":\"Insert\",\"editor-edittool-custom-label\":\"Custom\",\"editor-reload-page\":\"Reload the page after saving\",\"preference-reset-confirm-title\":\"Restore your preferences\",\"preference-reset-confirm\":\"Are you sure you want to restore your preferences to default?\",\"target-exists-title\":\"Target page exists\",\"target-exists-no-delete\":\"Page [[$1]] already exists. Do you want to view this page?\",\"target-exists-can-delete\":\"Page [[$1]] already exists. Do you want to view this page or just delete it?\"},\"ar\":{\"version-notice-title\":\"نجاح التثبيت\",\"version-notice\":\"مرحبا ، شكرا لاستخدام انبايجاديت۔ قد يقوم المكون الإضافي بجمع معلوماتك ، والتي لن يتم استخدامها لأغراض العمل ، ولن تجمع أيًا من ملفات تعريف الارتباط الشخصية ومعلومات الخصوصية۔ يمكنك العثور على رابط تحليلات المكون الإضافي في نافذة التفضيل۔ إذا كنت لا ترغب في جمع أي من معلوماتك ، يرجى التوقف عن استخدام هذا المكون الإضافي۔ للحصول على ملاحظات  يرجى تقديم مشاكل في جيتهوب۔\",\"version-notice-canary-title\":\"تحذير استقرار الكناري\",\"version-notice-canary\":\"إصدار الكناري هو الإصدار الذي يستخدمه المؤلف لتصحيح الأخطاء والتطوير۔ قد تظهر أي ميزات تجريبية غير مجربة في هذا الإصدار ، أو قد لا تعمل بشكل طبيعي في وقت ما۔ لتجربتك ، يوصى بالتبديل إلى الإصدار العادي۔\",\"updatelog-update-success-title\":\"InPageEdit نجاح تحديث\",\"updatelog-update-success\":\"InPageEdit $1 تم تثبيت\",\"updatelog-button-versioninfo\":\"عرض معلومات الإصدار\",\"updatelog-after-close\":\"لن تظهر هذه النافذة المنبثقة مرة أخرى حتى يتم تحديث الإصدار التالي. البحث عن جميع معلومات الإصدار في 1$. إذا وجدت مشكلات في المكون الإضافي \",\"updatelog-dismiss\":\"رفض\",\"updatelog-file-issue\":\"قم بتقديمه في جيتهوب\",\"updatelog-title\":\"سجل التحديث\",\"updatelog-about\":\"حول\",\"quick-edit\":\"تحرير سريع\",\"redirect-from\":\"إعادة التوجيه من\",\"redirect-to\":\"إعادة توجيه ل\",\"quick-delete\":\"حذف سريع\",\"quick-rename\":\"إعادة تسمية سريعة\",\"quick-diff\":\"الاختلاف السريع\",\"ipe-preference\":\"التفضيلات\",\"confirm\":\"تؤكد\",\"cancel\":\"إلغاء\",\"close\":\"أغلق\",\"done\":\"منجز\",\"ok\":\"حسنا\",\"notify-success\":\"نجاح\",\"notify-info\":\"معلومات\",\"notify-error\":\"خطأ\",\"notify-editing-history\":\"أنت تقوم بتحرير نسخة قديمة من هذه الصفحة\",\"editor-title-editRevision\":\"الارتداد\",\"editor-summary-rivision\":\"تحرير من\",\"editor-title-editSection\":\"الجزء $1\",\"editor-title-editing\":\"التحرير\",\"editSummary\":\"ملخص\",\"markAsMinor\":\"هذا تعديل طفيف\",\"editor-button-save\":\"احفظ التغييرات\",\"editor-confirm-save\":\"هل أنت متأكد أنك تريد حفظ التغييرات؟\",\"editor-button-preview\":\"عرض المعاينة\",\"editor-button-diff\":\"إظهار التغييرات\",\"editor-button-findAndReplace\":\"بحث واستبدال\",\"fAndR-title\":\"بحث واستبدال\",\"fAndR-find-text\":\":بحث عن نص\",\"fAndR-replace-text\":\":استبدل النص\",\"fAndR-globl\":\"ابحث عن العالمية\",\"fAndR-case-sen\":\"حساسية الموضوع\",\"fAndR-enable-regex\":\"تمكين التعبير العادي\",\"fAndR-button-undo\":\"الغاء التحميل\",\"fAndR-button-replace\":\"يحل محل\",\"notify-fAndR-undo\":\"تمت استعادة المحتوى إلى النص قبل فتح نافذة البحث والاستبدال\",\"notify-fAndR-done\":\"تم استبدال نص 1$\",\"window-leave-confirm\":\"هل أنت متأكد أنك تريد ترك علامة التبويب هذه؟ لن يتم حفظ النص الخاص بك\",\"notify-no-right\":\"لا يوجد إذن\",\"editor-no-right\":\"ليس لديك إذن بتحرير هذه الصفحة ولكن يمكنك ترك تعليقات على صفحة نقاش هذه الصفحة\",\"editor-title-editNotice\":\"ملاحظة التحرير\",\"editor-has-editNotice\":\"تحتوي هذه الصفحة على إشعار تحرير ، انقر هنا.\",\"editor-leave-confirm\":\"هل أنت متأكد أنك تريد مغادرة المحرر؟ لن يتم حفظ النص الخاص بك\",\"notify-no-change\":\"لا شيء تغير\",\"editor-title-saving\":\"...نشر\",\"notify-save-success\":\"...حفظ الصفحة بنجاح ومنعش\",\"editor-save-error\":\"حدثت بعض الأخطاء أثناء الحفظ\",\"redirect-summary\":\"إعادة توجيه سريعة\",\"redirect-question-to\":\"ما الصفحة التي تريد إعادة توجيه 1$ إليها؟\",\"redirect-question-from\":\"ما هي الصفحة التي تريد إعادة توجيهها إلى 1$؟\",\"redirect-title\":\"إعادة التوجيه السريع\",\"notify-redirect-success\":\"تمت إعادة التوجيه بنجاح\",\"notify-redirect-error\":\"حدثت بعض الأخطاء أثناء إنشاء إعادة التوجيه\",\"delete-reason-default\":\"حدثت بعض الأخطاء أثناء إنشاء إعادة التوجيه\",\"delete-title\":\"حذف سريع\",\"delete-no-right\":\"ليس لديك إذن بحذف الصفحة\",\"delete-confirm-title\":\"تأكيد الحذف\",\"delete-confirm-content\":\"هل أنت متأكد أنك تريد حذف هذه الصفحة؟ يمكنك استعادته لاحقًا في الصفحة الخاصة بالصفحات المحذوفة\",\"notify-delete-success\":\"حذف بنجاح\",\"notify-delete-error\":\"حدثت بعض الأخطاء أثناء حذف الصفحة\",\"rename-title\":\"صفحة إعادة تسمية سريعة\",\"rename-moveTo\":\"اختر اسمًا جديدًا لـ $1\",\"rename-movetalk\":\"الخامس\",\"rename-movesubpages\":\"نقل الصفحات الفرعية حتى ١٠٠\",\"rename-noredirect\":\"لا تترك إعادة توجيه خلفك\",\"rename-summary\":\"إعادة تسمية سريعة\",\"notify-rename-success\":\"تمت إعادة التسمية بنجاح\",\"notify-rename-error\":\"حدثت بعض الأخطاء أثناء نقل الصفحة\",\"rename-articleexists-title\":\"الصفحة المستهدفة موجودة\",\"rename-articleexists\":\".الصفحة التي تحتوي على اسم الصفحة الجديدة موجودة بالفعل. وظيفة تحريك القوة قيد التطوير ، ترقبوا\",\"rename-no-right\":\"ليس لديك إذن بحذف الصفحة\",\"preference-title\":\"تفضيلات هذا البرنامج المساعد\",\"preference-editor-label\":\"إعدادات المحرر\",\"preference-outSideClose\":\"انقر خارج لإغلاق المحرر\",\"preference-setMinor\":\"تعديل طفيف كافتراضي\",\"preference-summary-label\":\"تحرير الملخص\",\"preference-analysis-label\":\"تحليل\",\"preference-analysis-view\":\"سنقوم بجمع بعض المعلومات غير الحساسة الخاصة بك لتسجيل استخدام البرنامج المساعد۔ سيتم استخدام المعلومات لتحسين التجربة۔ يمكنك العثور على المعلومات التي جمعناها في 1$۔\",\"preference-about-label\":\"حول هذا البرنامج المساعد\",\"preference-aboutAndHelp\":\"حول ومساعدة\",\"preference-updatelog\":\"سجل التحديث\",\"preference-savelocal-label\":\"يمكنك حفظ تفضيلاتك لهذا البرنامج المساعد هنا\",\"preference-savelocal\":\".تنبيه: سيتم حفظ تفضيلاتك في متصفحك. هذا يعني أنه يجب عليك الحفظ مرة أخرى عند تغيير جهازك\",\"preference-reset\":\"إعادة تعيين\",\"preference-save\":\"حفظ\",\"preference-summary-default\":\"$section $oldid لا يوجد ملخص معطى [InPageEdit] \",\"preference-savelocal-popup\":\":أضف الكود التالي أعلى الكود الذي يستدعي هذا البرنامج المساعد في صفحة جافا سكريبت الشخصية الخاصة بك\",\"preference-savelocal-popup-yourjspage\":\"صفحة جافا سكريبت الشخصية\",\"diff-loading\":\"فرق التحميل\",\"diff-button-todiffpage\":\"انتقل إلى صفحة الفروق\",\"diff-usertalk\":\"حديث\",\"diff-usercontrib\":\"يساهم\",\"diff-userblock\":\"منع\",\"diff-title\":\"فرق\",\"diff-edit\":\"تعديل\",\"diff-version\":\"مراجعة\",\"diff-prev\":\"تحرير أقدم\",\"diff-nextv\":\"تحرير أحدث\",\"diff-bytes\":\"بايت\",\"diff-title-original-content\":\"النص الأصلي\",\"diff-title-your-content\":\"نصك\",\"diff-error\":\"فشل تحميل الفرق\",\"preview-placeholder\":\"...تحميل المعاينة\",\"preview-title\":\"معاينة\",\"preview-error\":\"فشل تحميل المعاينة\"},\"fr\":{\"version-notice-title\":\"Installation réussie\",\"version-notice\":\"Salut, merci pour l'utilisation de InPageEdit ! Ce plug-in peut collecter vos informations qui ne seront pas utilisées à but commercial et ne collecte pas tous vos cookies personnel et vos renseignements personnels. Vous pouvez trouver les liens d'analyses de ce plug-in dans la fenêtre de préférences. Si vous ne voulez pas que vos informations sont collectés, désactivez ce plug-in. Pour des suggestions, veuillez signaler des problèmes sur GitHub.\",\"version-notice-canary-title\":\"Avertissement de stabilité de Canary\",\"version-notice-canary\":\"La version Canary est une version utilisée par l'auteur pour le développement et le débogage. Toutes les fonctionnalités expérimentales non testés peuvent apparaître dans cette version et peuvent ne pas fonctionner correctement à un moment. Pour votre expérience, il est recommandé de passer à la version normale !\",\"updatelog-update-success-title\":\"Mise à jour de InPageEdit réussie\",\"updatelog-update-success\":\"InPageEdit $1 a été installée.\",\"updatelog-button-versioninfo\":\"À propos de cette version\",\"updatelog-after-close\":\"Cette fenêtre secondaire n'apparaîtra plus jusqu'à la prochaine mise à jour. Toutes ces informations de cette mise à jour se trouvent $1. Si vous décelez des problèmes avec ce plug-in, $2\",\"updatelog-dismiss\":\"REJETER\",\"updatelog-file-issue\":\"Soumettez-le sur GitHub.\",\"updatelog-title\":\"Journal des mises à jour\",\"updatelog-about\":\"À propos\",\"quick-edit\":\"Modification rapide\",\"redirect-from\":\"Redirection de\",\"redirect-to\":\"Redirection à\",\"quick-delete\":\"Suppression rapide\",\"quick-rename\":\"Renommage rapide\",\"quick-diff\":\"Diff rapide\",\"ipe-preference\":\"Préférences\",\"confirm\":\"confirmer\",\"cancel\":\"annuler\",\"close\":\"fermer\",\"done\":\"Fait\",\"ok\":\"OK\",\"notify-success\":\"Réussi\",\"notify-info\":\"Info\",\"notify-error\":\"Erreur\",\"notify-editing-history\":\"Vous êtes en train de modifier une ancienne version de cette page\",\"editor-title-editRevision\":\"Réversion\",\"editor-summary-rivision\":\"Modification de\",\"editor-title-editSection\":\"Partie $1\",\"editor-title-editing\":\"Modification en cours\",\"editSummary\":\"Résumé de modification\",\"markAsMinor\":\"C'est une modification mineure\",\"editor-button-save\":\"Sauvegarder la modification\",\"editor-confirm-save\":\"Êtes-vous {{GENDER:|sûr|sûre|sûr(e)}} de vouloir sauvegarder des modifications ?\",\"editor-button-preview\":\"Afficher la prévisualisation\",\"editor-button-diff\":\"Voir la différence\",\"editor-button-findAndReplace\":\"Trouver&Remplacer\",\"fAndR-title\":\"Trouver et Remplacer\",\"fAndR-find-text\":\"Trouver le texte :\",\"fAndR-replace-text\":\"Remplacer le texte :\",\"fAndR-globl\":\"Recherche globale\",\"fAndR-case-sen\":\"Respecter la case\",\"fAndR-enable-regex\":\"Utiliser l'expression régulière\",\"fAndR-button-undo\":\"ANNULER\",\"fAndR-button-replace\":\"REMPLACER\",\"notify-fAndR-undo\":\"Le contenu a été restauré à un texte avant que la fenêtre de \\\"T&R\\\" a été ouverte\",\"notify-fAndR-done\":\"Texte de $1 remplacé\",\"window-leave-confirm\":\"Voulez-vous vraiment quitter cet onglet ? Votre texte ne sera PAS sauvegardé.\",\"notify-no-right\":\"Aucune permission\",\"editor-no-right\":\"Vous n'avez pas la permission de modifier cette page. Vous pouvez laisser vos commentaires sur cette page de discussion de cette page.\",\"editor-title-editNotice\":\"Editnotice\",\"editor-has-editNotice\":\"Cette page a editnotice!\",\"editor-leave-confirm\":\"Voulez-vous vraiment quitter l'éditeur? Votre texte ne sera PAS enregistré.\",\"notify-no-change\":\"Aucune différence.\",\"editor-title-saving\":\"Publication en cours...\",\"notify-save-success\":\"Publication effectuée, page en cours d'actualisation...\",\"editor-save-error\":\"Certaines erreurs se sont produites lors de sauvegarde\",\"redirect-summary\":\"Redirection rapide\",\"redirect-question-to\":\"Quelle page que vous voulez rediriger $1 à ?\",\"redirect-question-from\":\"Quelle page que vous voulez rediriger à $1 ?\",\"redirect-title\":\"Redirection rapide\",\"notify-redirect-success\":\"Redirection établie.\",\"notify-redirect-error\":\"Certaines erreurs se sont produites lors de la création de redirection\",\"delete-reason-default\":\"N'est plus utilisée\",\"delete-title\":\"Supprimer rapidement\",\"delete-no-right\":\"Vous n'avez pas la permission de supprimer cette page.\",\"delete-confirm-title\":\"Confirmer la suppression\",\"delete-confirm-content\":\"Voulez-vous vraiment supprimer cette page? Vous pouvez la restaurer dans Special:DeletedPages plus tard\",\"notify-delete-success\":\"Suppression effectuée\",\"notify-delete-error\":\"Certaines erreurs se sont produites lors de la suppression de cette page\",\"rename-title\":\"Renommage rapide d'une page\",\"rename-moveTo\":\"Choisissez le nouveau nom pour $1\",\"rename-movetalk\":\"Renommer la page de discussion\",\"rename-movesubpages\":\"Renommer des sous-pages (jusqu'à 100 pages)\",\"rename-noredirect\":\"Ne pas laisser la redirection\",\"rename-summary\":\"Renommage rapide\",\"notify-rename-success\":\"Renommage effectué\",\"notify-rename-error\":\"Certaines erreurs se sont produites lors du renommage de cette page\",\"rename-articleexists-title\":\"Page cible existant\",\"rename-articleexists\":\"La page avec un nouveau nom de page existe déjà. La fonction de déplacement forcé est en cours de développement, restez au courant.\",\"rename-no-right\":\"Vous n'avez pas la permission de supprimer cette page.\",\"preference-title\":\"Préférences de InPageEdit\",\"preference-editor-label\":\"Paramètres de l'éditeur\",\"preference-outSideClose\":\"Cliquez en dehors pour fermer l'éditeur\",\"preference-setMinor\":\"Modification mineure par défaut\",\"preference-summary-label\":\"Résumé de modification\",\"preference-analysis-label\":\"Analyses\",\"preference-analysis-view\":\"Nous collecterons certaines de vos informations non sensibles pour enregistrer l'utilisation du plug-in. Les informations seront utilisées pour améliorer l'expérience. Vous pouvez trouver les informations que nous avons collectées sur $1.\",\"preference-about-label\":\"À propos de InPageEdit\",\"preference-aboutAndHelp\":\"À-propos&Aide\",\"preference-updatelog\":\"Journal des mises à jour\",\"preference-savelocal-label\":\"Vous pouvez sauvegarder vos préférences de InPageEdit-v2 ici.\",\"preference-savelocal\":\"Attention : Vos préférences seront enregistrées dans votre navigateur. Cela signifie que vous devez enregistrer à nouveau lorsque vous changez votre appareil.\",\"preference-reset\":\"réinitialiser\",\"preference-save\":\"sauvegarder\",\"preference-summary-default\":\"[InPageEdit] $section Aucun résumé de modification $oldid\",\"preference-savelocal-popup\":\"Ajoutez le code suivant au-dessus du code qui invoque ce plugin sur votre page JS personnelle :\",\"preference-savelocal-popup-yourjspage\":\"votre page personnelle de JS\",\"diff-loading\":\"Chargement de la différence\",\"diff-button-todiffpage\":\"Basculer à une page de diff\",\"diff-usertalk\":\"discuter\",\"diff-usercontrib\":\"contributions\",\"diff-userblock\":\"bloquer\",\"diff-title\":\"Différence\",\"diff-edit\":\"modifier\",\"diff-version\":\"Révision\",\"diff-prev\":\"Modification précédente\",\"diff-nextv\":\"Modification suivante\",\"diff-bytes\":\"octets\",\"diff-title-original-content\":\"Texte original\",\"diff-title-your-content\":\"Votre texte\",\"diff-error\":\"Échec lors du chargement de la différence.\",\"preview-placeholder\":\"Chargement de la prévisualisation...\",\"preview-title\":\"Prévisualisation\",\"preview-error\":\"Échec lors du chargement de la prévisualisation.\"},\"nl\":{\"version-notice-title\":\"Installatie successvol\",\"version-notice\":\"Hallo, bedankt voor het gebruiken van InPageEdit~です! De plug-in kan je informatie verzamelen. Dit zal niet gebruikt worden voor zakelijke doeleinden en zal geen persoonlijke cookies en privacygevoelige informatie verzamelen. U kan de plug-in's analyse link in het voorkeurvenster vinden. Als U geen informatie verzameld wil hebben, stop alstublieft met het gebruiken van deze plug-in. Voor feedback, dien problemen alstublieft in op GitHub.\",\"version-notice-canary-title\":\"Canary stabiliteit waarschuwing\",\"version-notice-canary\":\"Canary versie is de versie gebruikt door de auteur voor debuggen en ontwikkeling. Niet geteste, experimentele kenmerken kunnen voorkomen in deze versie, of kunnen soms niet normaal werken. Voor uw ervaring is het aangeraden om over te schakelen naar de normale versie!\",\"updatelog-update-success-title\":\"InPageEdit update success\",\"updatelog-update-success\":\"InPageEdit $1 is geïnstalleerd.\",\"updatelog-button-versioninfo\":\"Bekijk versie informatie\",\"updatelog-after-close\":\"Dit pop-up venster zal niet meer verschijnen tot de volgende versie-update. Vind alle release-informatie bij $1. Als u problemen ondervindt met de plug-in. $2\",\"updatelog-dismiss\":\"AFWIJZEN\",\"updatelog-file-issue\":\"Dien het in op GitHub.\",\"updatelog-title\":\"Update Log\",\"updatelog-about\":\"Over\",\"quick-edit\":\"Snelle Bewerking\",\"redirect-from\":\"Verwijs van\",\"redirect-to\":\"Verwijs naar\",\"quick-delete\":\"Snel verwijderen\",\"quick-rename\":\"Snel hernoemen\",\"quick-diff\":\"Snelle Diff\",\"ipe-preference\":\"Voorkeuren\",\"confirm\":\"bevestigen\",\"cancel\":\"annuleren\",\"close\":\"sluiten\",\"done\":\"Klaar\",\"ok\":\"OK\",\"notify-success\":\"Succesvol\",\"notify-info\":\"Info\",\"notify-error\":\"Fout\",\"notify-editing-history\":\"U bewerkt een oudere versie van deze pagina\",\"editor-title-editRevision\":\"Herziening\",\"editor-summary-rivision\":\"Bewerking van\",\"editor-title-editSection\":\"Deel $1\",\"editor-title-editing\":\"Aan het bewerken\",\"editSummary\":\"Samenvatting\",\"markAsMinor\":\"Dit is een kleine bewerking\",\"editor-button-save\":\"Veranderingen opslaan\",\"editor-confirm-save\":\"Weet u zeker dat u de verandering wilt opslaan?\",\"editor-button-preview\":\"Toon preview\",\"editor-button-diff\":\"Toon veranderingen\",\"editor-button-findAndReplace\":\"Vinden&Vervangen\",\"fAndR-title\":\"Vinden & Vervangen\",\"fAndR-find-text\":\"Vind tekst:\",\"fAndR-replace-text\":\"Vervang tekst:\",\"fAndR-globl\":\"Vind globaal\",\"fAndR-case-sen\":\"Hoofdlettergevoelig\",\"fAndR-enable-regex\":\"Schakel regex in\",\"fAndR-button-undo\":\"ONGEDAAN MAKEN\",\"fAndR-button-replace\":\"VERVANGEN\",\"notify-fAndR-undo\":\"Inhoud is hersteld naar de tekst voordat het V & V-venster werd geopend\",\"notify-fAndR-done\":\"$1 tekst vervangen\",\"window-leave-confirm\":\"Weet u zeker dat u dit tabblad wilt verlaten? Uw tekst zal NIET opgeslagen worden.\",\"notify-no-right\":\"Geen toestemming\",\"editor-no-right\":\"U heeft GEEN toestemming om deze pagina te bewerking. U kan commentaar achterlaten op de discussie-pagina van deze pagina.\",\"editor-title-editNotice\":\"Bewerkingsbericht\",\"editor-has-editNotice\":\"Deze pagina heeft een bewerkingsbericht!\",\"editor-leave-confirm\":\"Weet u zeker dat u de bewerker wilt verlaten? Uw tekst zal NIET opgeslagen worden.\",\"notify-no-change\":\"Niets is verandert\",\"editor-title-saving\":\"Publiceren...\",\"notify-save-success\":\"Opslaan succesvol, pagina wordt herladen...\",\"editor-save-error\":\"Er zijn enkele fout(en) opgetreden tijdens het opslaan\",\"redirect-summary\":\"Snel verwijzen\",\"redirect-question-to\":\"Welke pagina wilt u $1 naar verwijzen?\",\"redirect-question-from\":\"Welke pagina wilt u verwijzen naar $1?\",\"redirect-title\":\"Snel Verwijzen\",\"notify-redirect-success\":\"Verwijzing succesvol.\",\"notify-redirect-error\":\"Er zijn enkele fout(en) opgetreden tijdens het maken van de verwijzing.\",\"delete-reason-default\":\"Niet langer gebruikt\",\"delete-title\":\"Snel Verwijderen\",\"delete-no-right\":\"U heeft GEEN toestemming om deze pagina te verwijderen.\",\"delete-confirm-title\":\"Verwijderen bevestigen\",\"delete-confirm-content\":\"Weet u zeker dat u deze pagina wilt verwijderen? You can restore it later in Special:DeletedPages\",\"notify-delete-success\":\"Succesvol verwijderd\",\"notify-delete-error\":\"Er zijn enkele fout(en) opgetreden tijdens het verwijderen van de pagina.\",\"rename-title\":\"Snel Pagina Hernoemen\",\"rename-moveTo\":\"Kies een nieuwe naam voor $1\",\"rename-movetalk\":\"Discussie-pagina verplaatsen\",\"rename-movesubpages\":\"Sub-pagina('s) verplaatsen (up to 100)\",\"rename-noredirect\":\"Laat geen verwijzing achter\",\"rename-summary\":\"Snel hernoemen\",\"notify-rename-success\":\"Hernoemen succesvol\",\"notify-rename-error\":\"Er zijn enkele fout(en) opgetreden tijdens het verplaatsen van de pagina.\",\"rename-articleexists-title\":\"Doelpagina bestaat\",\"rename-articleexists\":\"Er bestaat al een pagina met deze naam. De \\\"verplaatsing forceren\\\"-functie is in ontwikkeling, blijf op de hoogte.\",\"rename-no-right\":\"U hebt GEEN toestemming om de pagina te verwijderen.\",\"preference-title\":\"InPageEdit voorkeuren\",\"preference-editor-label\":\"Bewerker instellingen\",\"preference-outSideClose\":\"Klik buiten om de bewerker te sluiten\",\"preference-setMinor\":\"Kleine bewerking als standaard\",\"preference-summary-label\":\"Bewerk samenvatting\",\"preference-analysis-label\":\"Analyse\",\"preference-analysis-view\":\"We zullen een deel van uw niet-gevoelige informatie verzamelen om het gebruik van de plug-in vast te leggen. Informatie zal worden gebruikt om de ervaring te verbeteren. U kunt de informatie die we hebben verzameld vinden bij $1.\",\"preference-about-label\":\"Over InPageEdit\",\"preference-aboutAndHelp\":\"Over&Help\",\"preference-updatelog\":\"Update Log\",\"preference-savelocal-label\":\"U kunt uw InPageEdit-v2 voorkeuren hier opslaan.\",\"preference-savelocal\":\"Waarschuwing: Uw voorkeuren zullen opgeslagen worden in uw browser. Dat betekent dat u ze opnieuw moet opslaan wanneer u uw toestel wijzigt.\",\"preference-reset\":\"opnieuw instellen\",\"preference-save\":\"bewaren\",\"preference-summary-default\":\"[InPageEdit] $section Geen samenvatting gegeven $oldid\",\"preference-savelocal-popup\":\"Voeg de volgende code toe boven de code die deze plug-in oproept op uw persoonlijke JS-pagina:\",\"preference-savelocal-popup-yourjspage\":\"Je persoonlijke JS-pagina.\",\"diff-loading\":\"Verschil aan het laden\",\"diff-button-todiffpage\":\"Spring naar diff-pagina\",\"diff-usertalk\":\"discussie\",\"diff-usercontrib\":\"bijdragen\",\"diff-userblock\":\"blokkeren\",\"diff-title\":\"Verschil\",\"diff-edit\":\"bewerken\",\"diff-version\":\"Herziening\",\"diff-prev\":\"Oudere bewerking\",\"diff-nextv\":\"Nieuwere bewerking\",\"diff-bytes\":\"bytes\",\"diff-title-original-content\":\"Originele tekst\",\"diff-title-your-content\":\"Uw tekst\",\"diff-error\":\"Kan het verschil niet laden\",\"preview-placeholder\":\"Preview aan het laden...\",\"preview-title\":\"Preview\",\"preview-error\":\"Kan het preview niet laden.\"},\"pl\":{\"quick-edit\":\"Szybka edycja\",\"redirect-from\":\"Przekieruj z\",\"redirect-to\":\"Przekieruj do\",\"quick-delete\":\"Szybkie usuwanie\",\"quick-rename\":\"Szybka zmiana nazwy\",\"quick-diff\":\"Quick Diff\",\"ipe-preference\":\"Preferencje\",\"confirm\":\"potwierdź\",\"cancel\":\"anuluj\",\"done\":\"Gotowe\",\"ok\":\"OK\",\"notify-success\":\"Sukces\",\"notify-info\":\"Informacje\",\"notify-error\":\"Błąd\",\"notify-editing-history\":\"Edytujesz starją wersję tej strony\",\"editor-title-editRevision\":\"Wersja\",\"editor-summary-rivision\":\"Edytuj z\",\"editor-title-editSection\":\"Część $1\",\"editor-title-editing\":\"Edycja\",\"editSummary\":\"Opis zmian\",\"markAsMinor\":\"To jest drobna edycja\",\"editor-button-save\":\"Zapisz zmiany\",\"editor-confirm-save\":\"Czy na pewno chcesz zapisać zmiany?\",\"editor-button-preview\":\"Pokaż podgląd\",\"editor-button-diff\":\"Pokaż zmiany\",\"editor-button-findAndReplace\":\"Find&Replace\",\"fAndR-title\":\"Znajdź & zamień\",\"fAndR-find-text\":\"Znajdź tekst:\",\"fAndR-replace-text\":\"Zastąp tekst\",\"fAndR-globl\":\"Globalne wyszukiwanie\",\"fAndR-case-sen\":\"Rozróżniaj wielkość liter\",\"fAndR-enable-regex\":\"Włącz wyrażenia regularne\",\"fAndR-button-undo\":\"COFNIJ\",\"fAndR-button-replace\":\"ZAMIEŃ\",\"notify-fAndR-undo\":\"Treść została przywrócona do stanu sprzed otwarcia okna znajdź i zamień\",\"notify-fAndR-done\":\"$1 zamieniono\",\"window-leave-confirm\":\"Czy na pewno chcesz opuścić tę zakładkę? Tekst NIE zostanie zapisany.\",\"notify-no-right\":\"Brak uprawnień\",\"editor-no-right\":\"NIE posiadasz uprawnień do edycji tej strony. Możesz zostawić uwagi na jej stronie dyskusji.\",\"editor-title-editNotice\":\"Komunikaty\",\"editor-has-editNotice\":\"Ta strona posiada komunikaty!\",\"editor-leave-confirm\":\"Czy na pewno chcesz opuścić edytor? Tekst NIE zostanie zapisany.\",\"notify-no-change\":\"Nic nie zmieniono.\",\"editor-title-saving\":\"Publikowanie…\",\"notify-save-success\":\"Pomyślnie zapisano, odświeżanie…\",\"editor-save-error\":\"Podczas zapiswania wystąpiły błędy\",\"redirect-summary\":\"Szybkie przekierowanie\",\"redirect-question-to\":\"Do jakiej strony chcesz przekierować „$1”?\",\"redirect-question-from\":\"Jaka strona ma kierować do „$1”?\",\"redirect-title\":\"Szybkie przekierowanie\",\"notify-redirect-success\":\"Przekierowano pomyślnie\",\"notify-redirect-error\":\"Podczas przekierowywania wystąpiły błędy\",\"delete-reason-default\":\"Nieużywane\",\"delete-title\":\"Szybkie usuwanie\",\"delete-no-right\":\"NIE posiadasz uprawnień do usuwania tej strony.\",\"delete-confirm-title\":\"Potwierdź usuwanie\",\"delete-confirm-content\":\"Czy na pewno chcesz usunąć tę stronę? Możesz ją później przywrócić na Specjalna:Odtwórz\",\"notify-delete-success\":\"Usunięto pomyślnie\",\"notify-delete-error\":\"Podczas usuwania wystąpiły błędy\",\"rename-title\":\"Szybka zmiana nazwy strony\",\"rename-moveTo\":\"Wybierz nową nazwę dla „$1”\",\"rename-movetalk\":\"Przenieś stronę edyskusji\",\"rename-movesubpages\":\"Przenieś podstrony (do 100)\",\"rename-noredirect\":\"Nie pozostawiaj przekierowania pod dotychczasowym tytułem\",\"rename-summary\":\"Szybka zmiana nazwy\",\"notify-rename-success\":\"Zmieniono nazwę pomyślnie\",\"notify-rename-error\":\"Podczas zmieniania nazwy wystąpiły błędy\",\"rename-articleexists-title\":\"Strona docelowa istnieje\",\"rename-articleexists\":\"Pod nowym tytułem istnieje już inne strona. Funkcja wymuszonego przenoszenia jest ciągle tworzona, prosimy o cierpliwość.\",\"rename-no-right\":\"NIE posiadasz uprawnień do usuwania strony.\",\"preference-title\":\"Preferencje InPageEdita\",\"preference-editor-label\":\"Ustawienia edytora\",\"preference-outSideClose\":\"Kliknij z boku aby zamknąć edytor\",\"preference-setMinor\":\"Domyślnie oznaczaj edycje jako drobne\",\"preference-summary-label\":\"Opis zmian\",\"preference-analysis-label\":\"Telemetria\",\"preference-analysis-view\":\"Zbieramy niewielkie ilości niewrażliwych informacji, aby badać użycie wtyczki. Informacje te zostaną wykorzystane do poprawienia doświadczenia. Możesz znaleźć informacje które zbieramy na $1\",\"preference-about-label\":\"O InPageEdit\",\"preference-aboutAndHelp\":\"O nas & pomoc\",\"preference-updatelog\":\"Dziennik zmian\",\"preference-savelocal-label\":\"Tutaj możesz zapisać swoje preferencje InPageEdit-v2.\",\"preference-savelocal\":\"Uwaga: Preferencje zostaną zapisane w przeglądarce. Oznacza to, że musisz zapisać je ponownie po zmianie urządzenia.\",\"preference-reset\":\"resetuj\",\"preference-save\":\"zapisz\",\"preference-summary-default\":\"[InPageEdit] $section Nie podano opisu zmian $oldid\",\"preference-savelocal-popup\":\"Dodaj poniższy kod nad kodem wywołującym wtyczkę w swoim osobistym JS-ie:\",\"preference-savelocal-popup-yourjspage\":\"swojej osobistej stronie JS\",\"diff-loading\":\"Ładowanie różnicy\",\"diff-button-todiffpage\":\"Przejdź do strony różnicy\",\"diff-usertalk\":\"dyskusja\",\"diff-usercontrib\":\"wkład\",\"diff-userblock\":\"zablokuj\",\"diff-title\":\"Różnica\",\"diff-edit\":\"edytuj\",\"diff-version\":\"Wersja\",\"diff-prev\":\"Poprzednia\",\"diff-nextv\":\"Następna\",\"diff-bytes\":\"bajtów\",\"diff-title-original-content\":\"Oryginalny tekst\",\"diff-title-your-content\":\"Twój tekst\",\"diff-error\":\"Ładowanie różnicy nie powiodło się.\",\"preview-placeholder\":\"Ładowanie podglądu…\",\"preview-title\":\"Podgląd\",\"preview-error\":\"Ładowanie podglądu nie powiodło się.\"},\"zh-hans\":{\"quick-edit\":\"快速编辑\",\"redirect-from\":\"重定向至此\",\"redirect-to\":\"重定向到\",\"quick-delete\":\"快速删除\",\"quick-rename\":\"快速重命名\",\"ipe-preference\":\"偏好设置\",\"confirm\":\"确定\",\"cancel\":\"取消\",\"done\":\"完成\",\"ok\":\"好的\",\"notify-success\":\"成功\",\"notify-info\":\"注意\",\"notify-error\":\"警告\",\"notify-editing-history\":\"你正在编辑此页面的历史版本\",\"editor-title-editRevision\":\"历史版本\",\"editor-summary-rivision\":\"编辑自\",\"editor-title-editSection\":\"第$1部分\",\"editor-title-editing\":\"正在编辑\",\"editSummary\":\"编辑摘要\",\"markAsMinor\":\"标记为小编辑\",\"editor-button-save\":\"保存更改\",\"editor-confirm-save\":\"确定要保存编辑吗？\",\"editor-button-preview\":\"显示预览\",\"editor-button-diff\":\"比较差异\",\"editor-button-findAndReplace\":\"查找替换\",\"window-leave-confirm\":\"确定离开页面吗？您的编辑不会被保存。\",\"notify-no-right\":\"权限不足\",\"editor-no-right\":\"您没有编辑此页面的权限，您可以在讨论页提交修改建议。\",\"editor-title-editNotice\":\"编辑提示\",\"editor-has-editNotice\":\"当前页面有编辑提示！\",\"editor-leave-confirm\":\"您输入的内容尚未保存，确定关闭窗口吗？\",\"notify-no-change\":\"没有进行任何改动\",\"editor-title-saving\":\"正在保存……\",\"notify-save-success\":\"保存成功，正在刷新页面……\",\"notify-save-success-noreload\":\"保存成功！\",\"editor-save-error\":\"保存时出现错误\",\"redirect-summary\":\"快速重定向到\",\"redirect-question-to\":\"要将$1重定向到哪个页面？\",\"redirect-question-from\":\"将哪个页面重定向到$1？\",\"redirect-title\":\"快速重定向\",\"notify-redirect-success\":\"创建重定向成功！\",\"notify-redirect-error\":\"创建重定向时出现错误。\",\"delete-reason-default\":\"不再需要的页面\",\"delete-title\":\"快速删除\",\"delete-no-right\":\"您没有删除页面（delete）的权限。\",\"delete-confirm-title\":\"确认删除\",\"delete-confirm-content\":\"确定要删除这个页面吗？之后您可以从已删除页面中恢复。\",\"notify-delete-success\":\"成功删除页面\",\"notify-delete-error\":\"删除页面时发生错误\",\"rename-title\":\"快速重命名\",\"rename-moveTo\":\"您要将$1重命名为什么？\",\"rename-movetalk\":\"同时移动讨论页\",\"rename-movesubpages\":\"同时移动子页面（最多100个）\",\"rename-noredirect\":\"不留重定向\",\"rename-summary\":\"快速重命名\",\"notify-rename-success\":\"重命名成功，正在刷新页面……\",\"notify-rename-error\":\"重命名时遇到错误\",\"rename-articleexists-title\":\"目标页面已存在\",\"rename-articleexists\":\"以新页面名命名的页面存在内容，强制移动页面的功能正在开发中，敬请期待。\",\"rename-no-right\":\"您没有移动页面（move）的权限。\",\"preference-title\":\"InPageEdit偏好设置\",\"preference-editor-label\":\"编辑器设置\",\"preference-outSideClose\":\"点击编辑器外侧关闭\",\"preference-setMinor\":\"预设编辑为小编辑\",\"preference-summary-label\":\"编辑摘要\",\"preference-editSummary\":\"<code>$section</code> - 将会被替换为<code>/<!-- -->* 段落名字 */</code><br><code>$oldid</code> - 将会被替换为<code>编辑自[<!-- -->[Special:Diff/oldid]]</code>\",\"preference-analysis-label\":\"数据收集\",\"preference-analysis-view\":\"此插件会收集您的一些非敏感信息，用于记录插件的使用情况以便研究发展的方向，您可以在$1找到此插件收集的信息。\",\"preference-about-label\":\"关于InPageEdit\",\"preference-aboutAndHelp\":\"关于&帮助\",\"preference-updatelog\":\"更新日志\",\"preference-savelocal-label\":\"您可以在这里保存InPageEdit-v2的个人偏好设定。\",\"preference-savelocal\":\"注意：这些设置保存在您的浏览器本地，这意味着你必须在不同的设备上分别保存设置。\",\"preference-savelocal-btn\":\"永久保存\",\"preference-reset\":\"重置\",\"preference-save\":\"保存\",\"preference-summary-default\":\"[InPageEdit] $section 没有编辑摘要 $oldid\",\"preference-savelocal-popup-title\":\"参数设置另存为\",\"preference-savelocal-popup\":\"在您个人JS页调用本插件的代码的上方添加以下代码：\",\"preference-savelocal-popup-notice\":\"注意：如果将设置保存在本地，则将无法使用此窗口进行配置。尽管错误的设置将被忽略，但不会提示您哪里出了问题。\",\"preference-savelocal-popup-haslocal\":\"您使用个人JS将偏好设置保存在本地，您应当在[[Special:Mypage/common.js|您的个人JS页面]]或者global.js修改您的偏好设置。\",\"preference-savelocal-popup-yourjspage\":\"您的个人JS页面\",\"preference-translate\":\"改进翻译\",\"preference-discord\":\"Discord\",\"diff-loading\":\"正在加载差异……\",\"diff-button-todiffpage\":\"转到原版比较页面\",\"diff-usertalk\":\"讨论\",\"diff-usercontrib\":\"贡献\",\"diff-userblock\":\"封禁\",\"diff-title\":\"比较差异\",\"diff-edit\":\"编辑\",\"diff-version\":\"版本\",\"diff-prev\":\"上一版本\",\"diff-nextv\":\"下一版本\",\"diff-bytes\":\"字节\",\"diff-title-original-content\":\"原始内容\",\"diff-title-your-content\":\"您的编辑\",\"diff-error\":\"加载差异时遇到问题\",\"preview-placeholder\":\"正在加载预览……\",\"preview-title\":\"预览\",\"preview-error\":\"加载预览时出现错误。\",\"quick-diff\":\"快速差异\",\"fAndR-title\":\"查找 & 替换\",\"fAndR-find-text\":\"查找文字：\",\"fAndR-replace-text\":\"替换文字：\",\"fAndR-globl\":\"全局查找\",\"fAndR-case-sen\":\"区分大小写\",\"fAndR-enable-regex\":\"使用正则表达式\",\"fAndR-button-undo\":\"重置\",\"fAndR-button-replace\":\"替换\",\"notify-fAndR-undo\":\"编辑框内的文字已被还原为打开查找替换窗口前的状态\",\"notify-fAndR-done\":\"已替换$1处文字\",\"version-notice-title\":\"安装成功\",\"version-notice\":\"您好，感谢您使用InPageEdit！此插件可能会收集您的使用信息，但这些信息不会用于商业目的，也不会收集您的个人Cookie和隐私信息。您可以在设定中查看插件收集的信息统计链接。如果您不想让此插件收集您的任何信息，请停止使用此插件。如需反馈，请在GitHub中提交issue。\",\"version-notice-canary-title\":\"Canary版本稳定性警告\",\"version-notice-canary\":\"Canary版本是作者用于测试与开发的版本。未经测试的实验功能可能会出现在此版本中，甚至某些时候可能无法使用。为获得更好的体验，建议您切换至正常版本！\",\"updatelog-update-success-title\":\"InPageEdit升级成功\",\"updatelog-update-success\":\"InPageEdit已升级到$1\",\"updatelog-button-versioninfo\":\"查看更新\",\"updatelog-after-close\":\"在下一个版本更新之前之前，此窗口将不再弹出，您可以在$1找到更新信息。如果您发现了任何问题，$2\",\"updatelog-dismiss\":\"不再显示\",\"updatelog-file-issue\":\"请提交至GitHub。\",\"updatelog-title\":\"更新日志\",\"updatelog-about\":\"关于\",\"close\":\"关闭\",\"editor-detail-button-toggle\":\"页面详情\",\"editor-detail-button-templates\":\"使用的模板\",\"editor-detail-title-templates\":\"本页面引用的模板\",\"editor-detail-button-images\":\"使用的图片\",\"editor-detail-title-images\":\"本页面使用的图片\",\"editor-detail-images-quickview\":\"快速查看\",\"editor-detail-images-upload\":\"(重新)上传\",\"delete-reason\":\"您为什么要删除$1？\",\"editor-edittool-header\":\"标题\",\"editor-edittool-header-text\":\"标题文字\",\"editor-edittool-bold\":\"粗体文字\",\"editor-edittool-italic\":\"斜体文字\",\"editor-edittool-internal-link\":\"内部链接\",\"editor-edittool-list-bulleted\":\"无序列表\",\"editor-edittool-list-numbered\":\"有序列表\",\"editor-edittool-nowiki\":\"去格式化\",\"editor-edittool-format-label\":\"格式\",\"editor-edittool-insert-label\":\"插入\",\"editor-edittool-custom-label\":\"自定\",\"editor-reload-page\":\"保存后刷新页面\",\"preference-reset-confirm-title\":\"还原偏好设置\",\"preference-reset-confirm\":\"确定要将您的偏好设置还原为默认状态吗？\",\"target-exists-title\":\"目标页面已存在\",\"target-exists-no-delete\":\"页面 [[$1]] 已存在，你想查看此页面吗？\",\"target-exists-can-delete\":\"页面 [[$1]] 已存在，您可以查看或者删除该页面\"},\"zh-hant\":{\"quick-edit\":\"快速編輯\",\"redirect-from\":\"重新導向至此\",\"redirect-to\":\"重新導向到\",\"quick-delete\":\"快速刪除\",\"quick-rename\":\"快速移動\",\"ipe-preference\":\"偏好設定\",\"confirm\":\"確認\",\"cancel\":\"取消\",\"done\":\"完成\",\"ok\":\"好的\",\"notify-success\":\"成功\",\"notify-info\":\"注意\",\"notify-error\":\"警告\",\"notify-editing-history\":\"您正在編輯本頁面的舊版本\",\"editor-title-editRevision\":\"舊版本\",\"editor-summary-rivision\":\"編輯自\",\"editor-title-editSection\":\"第$1部分\",\"editor-title-editing\":\"正在編輯\",\"editSummary\":\"編輯摘要\",\"markAsMinor\":\"標記為次要修訂\",\"editor-button-save\":\"儲存變更\",\"editor-confirm-save\":\"確定要儲存變更嗎？\",\"editor-button-preview\":\"顯示預覽\",\"editor-button-diff\":\"比較差異\",\"editor-button-findAndReplace\":\"尋找與取代\",\"window-leave-confirm\":\"確定離開頁面嗎？您的變更不會被儲存。\",\"notify-no-right\":\"權限不足\",\"editor-no-right\":\"您沒有編輯此頁面的權限，您可以在討論頁提交修改建議。\",\"editor-title-editNotice\":\"編輯提示\",\"editor-has-editNotice\":\"當前頁面有編輯提示！\",\"editor-leave-confirm\":\"您輸入的內容尚未儲存，確定關閉視窗嗎？\",\"notify-no-change\":\"沒有進行任何改動\",\"editor-title-saving\":\"正在儲存……\",\"notify-save-success\":\"儲存成功，正在刷新頁面……\",\"editor-save-error\":\"儲存時出現錯誤\",\"redirect-summary\":\"快速導向到\",\"redirect-question-to\":\"要將$1重新導向到哪個頁面？\",\"redirect-question-from\":\"將哪個頁面重新導向到$1？\",\"redirect-title\":\"快速導向\",\"notify-redirect-success\":\"成功建立重新導向！\",\"notify-redirect-error\":\"建立重新導向時出現錯誤。\",\"delete-reason-default\":\"不再需要的頁面\",\"delete-title\":\"快速刪除\",\"delete-no-right\":\"您沒有刪除頁面的權限。\",\"delete-confirm-title\":\"確認刪除\",\"delete-confirm-content\":\"確定要刪除這個頁面嗎？之後您可以從已刪除頁面中恢復。\",\"notify-delete-success\":\"成功刪除頁面\",\"notify-delete-error\":\"刪除頁面時發生錯誤\",\"rename-title\":\"快速移動\",\"rename-moveTo\":\"您要將$1移動至哪裡？\",\"rename-movetalk\":\"同時移動討論頁\",\"rename-movesubpages\":\"同時移動子頁面（最多100個）\",\"rename-noredirect\":\"不留重新導向\",\"rename-summary\":\"快速移動\",\"notify-rename-success\":\"移動成功，正在刷新頁面……\",\"notify-rename-error\":\"移動時遇到錯誤\",\"rename-articleexists-title\":\"目標頁面已存在\",\"rename-articleexists\":\"以新頁面名命名的頁面存在內容，強制移動頁面的功能正在開發中，敬請期待。\",\"rename-no-right\":\"您沒有移動頁面的權限。\",\"preference-title\":\"InPageEdit偏好設定\",\"preference-editor-label\":\"編輯器設定\",\"preference-outSideClose\":\"點擊編輯器外側關閉\",\"preference-setMinor\":\"預設編輯為次要修訂\",\"preference-summary-label\":\"變更摘要\",\"preference-editSummary\":\"<code>$section</code> - 將會被替換為<code>/<!-- -->* 段落名稱 */</code><br><code>$oldid</code> - 將會被替換為<code>編輯自[<!-- -->[Special:Diff/oldid]]</code>\",\"preference-analysis-label\":\"資料收集\",\"preference-analysis-view\":\"此外掛會收集您一些非敏感的資訊，用於記錄外掛的使用情況以便研究發展的方向，您可以在$1找到此外掛收集的資訊。\",\"preference-about-label\":\"關於InPageEdit\",\"preference-aboutAndHelp\":\"關於&說明\",\"preference-updatelog\":\"更新紀錄\",\"preference-savelocal-label\":\"您可以在這裡儲存InPageEdit-v2的偏好設定。\",\"preference-savelocal\":\"注意：這些設定會儲存在您的瀏覽器本地端，這意味著您必須在不同的裝置上分別儲存設定\",\"preference-savelocal-btn\":\"永久儲存\",\"preference-reset\":\"重設\",\"preference-save\":\"儲存\",\"preference-summary-default\":\"[InPageEdit] $section 沒有編輯摘要 $oldid\",\"preference-savelocal-popup-title\":\"參數設定另存為\",\"preference-savelocal-popup\":\"在您個人JS頁調用本外掛的代碼的上方加入以下代碼：\",\"preference-savelocal-popup-notice\":\"注意：如果將設置保存在本地，則將無法使用此窗口進行配置。儘管錯誤的設置將被忽略，但不會提示您哪裡出了問題。\",\"preference-savelocal-popup-haslocal\":\"您使用個人JS將偏好設定儲存在本地端，您應當在[[Special:Mypage/common.js|您的個人JS頁]]或者global.js修改您的偏好設定。\",\"preference-savelocal-popup-yourjspage\":\"您的個人JS頁\",\"preference-translate\":\"改進翻譯\",\"preference-discord\":\"Discord\",\"diff-loading\":\"正在載入差異……\",\"diff-button-todiffpage\":\"轉到原版比較頁面\",\"diff-usertalk\":\"討論\",\"diff-usercontrib\":\"貢獻\",\"diff-userblock\":\"封鎖\",\"diff-title\":\"比較差異\",\"diff-edit\":\"變更\",\"diff-version\":\"版本\",\"diff-prev\":\"上一版本\",\"diff-nextv\":\"下一版本\",\"diff-bytes\":\"位元組\",\"diff-title-original-content\":\"原始內容\",\"diff-title-your-content\":\"您的編輯\",\"diff-error\":\"載入差異時遇到問題\",\"preview-placeholder\":\"正在載入預覽……\",\"preview-title\":\"預覽\",\"preview-error\":\"載入預覽時出現錯誤。\",\"quick-diff\":\"快速差異\",\"fAndR-title\":\"尋找與取代\",\"fAndR-find-text\":\"尋找下一個\",\"fAndR-replace-text\":\"替換文字\",\"fAndR-globl\":\"尋找全部\",\"fAndR-case-sen\":\"區分大小寫\",\"fAndR-enable-regex\":\"使用正規表示式（regex）\",\"fAndR-button-undo\":\"復原\",\"fAndR-button-replace\":\"取代\",\"notify-fAndR-undo\":\"編輯框內的文字已被還原為開啟此視窗前的狀態\",\"notify-fAndR-done\":\"成功取代$1\"}}");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @license GPL-3.0 GNU GENERAL PUBLIC LICENSE 3.0
 *
 * @name InPageEdit
 * @description A useful MediaWiki JavaScript Plugin written with jQuery
 * @author 机智的小鱼君 Dragon-Fish <dragon-fish@qq.com>
 * @url https://github.com/Dragon-Fish/InPageEdit-v2
 */

!(async function () {
  'use strict';

  // 创建 InPageEdit 变量
  var InPageEdit = window.InPageEdit || {};

  // 防止多次运行
  if (typeof InPageEdit.version !== 'undefined') {
    throw '[InPageEdit] InPageEdit 已经在运行了';
  }

  // 初始化插件
  var init = __webpack_require__(/*! ./method/init */ "./method/init.js");

  var mainFunctions = await init();

  // 合并入全局变量
  window.InPageEdit = $.extend({}, window.InPageEdit, mainFunctions);

})();

/***/ }),

/***/ "./method/_dir.js":
/*!************************!*\
  !*** ./method/_dir.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @returns {String} https://cdn.jsdelivr.net/... 结尾没有/
 */
function getDir() {
  var thisScript = document.currentScript.src;
  var thisUrl = thisScript.split('/');
  // 理论上入口文件位于 /dist/*.js
  // 因此删掉最后两位路径
  thisUrl.pop();
  thisUrl.pop();
  thisUrl = thisUrl.join('/');
  return thisUrl;
}

/**
 * @constant {String} _dir CDN URL
 */
const _dir = getDir();

module.exports = _dir;

/***/ }),

/***/ "./method/getUserInfo.js":
/*!*******************************!*\
  !*** ./method/getUserInfo.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var mwApi = new mw.Api();

var getUserInfo = function () {
  /**
 * @description 获取用户权限信息
 */
  mw.user.getRights().then(rights => {
    console.info('[InPageEdit] 成功获取用户权限信息');
    mw.config.set('wgUserRights', rights);
  }).fail(function () {
    console.warn('[InPageEdit] 警告：无法获取用户权限信息');
    mw.config.set('wgUserRights', []);
  });

  /**
   * @description 获取封禁状态
   */
  if (mw.user.getName() !== null) {
    mwApi.get({
      action: 'query',
      list: 'users',
      usprop: 'blockinfo',
      ususers: mw.user.getName()
    }).then(data => {
      if (data.query.users[0].blockid) {
        mw.config.set('wgUserIsBlocked', true);
      } else {
        mw.config.set('wgUserIsBlocked', false);
      }
    });
  }
}

module.exports = {
  getUserInfo
}

/***/ }),

/***/ "./method/i18njs.js":
/*!**************************!*\
  !*** ./method/i18njs.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* <nowiki>
 * Library for accessing i18n messages for use in Dev Wiki scripts.
 * See [[I18n-js]] for documentation.
 *
 * @author Cqm <https://dev.fandom.com/User:Cqm>
 * @author OneTwoThreeFall <https://dev.fandom.com/User:OneTwoThreeFall>
 *
 * @version 0.5.8
 *
 * @notes Also used by VSTF wiki for their reporting forms (with a non-dev i18n.json page)
 * @notes This is apparently a commonly used library for a number of scripts and also includes
 *        a check to prevent double loading. This can make it painful to test from your JS
 *        console. To get around this, add ?usesitejs=0&useuserjs=0 to your URL.
 */



window.i18njs = window.i18njs || {};

// prevent double loading and loss of cache
if (window.i18njs.loadMessages !== undefined) {
  return;
}

/*
 * Cache of mw config variables.
 */
var conf = mw.config.get([
  'debug',
  'wgContentLanguage',
  'wgUserLanguage'
]),

  /*
   * Cache of loaded I18n instances.
   */
  cache = {},

  /*
   * Initial overrides object, initialised below with the i18n global variable.
   * Allows end-users to override specific messages. See documentation for how to use.
   */
  overrides = null,

  /*
   * Language fallbacks for those that don't fallback to English.
   * Shouldn't need updating unless Wikia change theirs.
   *
   * To generate this, use `$ grep -R "fallback =" /path/to/messages/`,
   * pipe the result to a text file and format the result.
   */
  fallbacks = {
    'ab': 'ru',
    'ace': 'id',
    'aln': 'sq',
    'als': 'gsw',
    'an': 'es',
    'anp': 'hi',
    'arn': 'es',
    'arz': 'ar',
    'av': 'ru',
    'ay': 'es',
    'ba': 'ru',
    'bar': 'de',
    'bat-smg': 'sgs',
    'bcc': 'fa',
    'be-x-old': 'be-tarask',
    'bh': 'bho',
    'bjn': 'id',
    'bm': 'fr',
    'bpy': 'bn',
    'bqi': 'fa',
    'bug': 'id',
    'cbk-zam': 'es',
    'ce': 'ru',
    'ckb': 'ckb-arab',
    'crh': 'crh-latn',
    'crh-cyrl': 'ru',
    'csb': 'pl',
    'cv': 'ru',
    'de-at': 'de',
    'de-ch': 'de',
    'de-formal': 'de',
    'dsb': 'de',
    'dtp': 'ms',
    'eml': 'it',
    'ff': 'fr',
    'fiu-vro': 'vro',
    'frc': 'fr',
    'frp': 'fr',
    'frr': 'de',
    'fur': 'it',
    'gag': 'tr',
    'gan': 'gan-hant',
    'gan-hans': 'zh-hans',
    'gan-hant': 'zh-hant',
    'gl': 'pt',
    'glk': 'fa',
    'gn': 'es',
    'gsw': 'de',
    'hif': 'hif-latn',
    'hsb': 'de',
    'ht': 'fr',
    'ii': 'zh-cn',
    'inh': 'ru',
    'iu': 'ike-cans',
    'jut': 'da',
    'jv': 'id',
    'kaa': 'kk-latn',
    'kbd': 'kbd-cyrl',
    'kbd-cyrl': 'ru',
    'khw': 'ur',
    'kiu': 'tr',
    'kk': 'kk-cyrl',
    'kk-arab': 'kk-cyrl',
    'kk-cn': 'kk-arab',
    'kk-kz': 'kk-cyrl',
    'kk-latn': 'kk-cyrl',
    'kk-tr': 'kk-latn',
    'kl': 'da',
    'koi': 'ru',
    'ko-kp': 'ko',
    'krc': 'ru',
    'ks': 'ks-arab',
    'ksh': 'de',
    'ku': 'ku-latn',
    'ku-arab': 'ckb',
    'kv': 'ru',
    'lad': 'es',
    'lb': 'de',
    'lbe': 'ru',
    'lez': 'ru',
    'li': 'nl',
    'lij': 'it',
    'liv': 'et',
    'lmo': 'it',
    'ln': 'fr',
    'ltg': 'lv',
    'lzz': 'tr',
    'mai': 'hi',
    'map-bms': 'jv',
    'mg': 'fr',
    'mhr': 'ru',
    'min': 'id',
    'mo': 'ro',
    'mrj': 'ru',
    'mwl': 'pt',
    'myv': 'ru',
    'mzn': 'fa',
    'nah': 'es',
    'nap': 'it',
    'nds': 'de',
    'nds-nl': 'nl',
    'nl-informal': 'nl',
    'no': 'nb',
    'os': 'ru',
    'pcd': 'fr',
    'pdc': 'de',
    'pdt': 'de',
    'pfl': 'de',
    'pms': 'it',
    // 'pt': 'pt-br',
    'pt-br': 'pt',
    'qu': 'es',
    'qug': 'qu',
    'rgn': 'it',
    'rmy': 'ro',
    'rue': 'uk',
    'ruq': 'ruq-latn',
    'ruq-cyrl': 'mk',
    'ruq-latn': 'ro',
    'sa': 'hi',
    'sah': 'ru',
    'scn': 'it',
    'sg': 'fr',
    'sgs': 'lt',
    'shi': 'ar',
    'simple': 'en',
    'sli': 'de',
    'sr': 'sr-ec',
    'srn': 'nl',
    'stq': 'de',
    'su': 'id',
    'szl': 'pl',
    'tcy': 'kn',
    'tg': 'tg-cyrl',
    'tt': 'tt-cyrl',
    'tt-cyrl': 'ru',
    'ty': 'fr',
    'udm': 'ru',
    'ug': 'ug-arab',
    'uk': 'ru',
    'vec': 'it',
    'vep': 'et',
    'vls': 'nl',
    'vmf': 'de',
    'vot': 'fi',
    'vro': 'et',
    'wa': 'fr',
    'wo': 'fr',
    'wuu': 'zh-hans',
    'xal': 'ru',
    'xmf': 'ka',
    'yi': 'he',
    'za': 'zh-hans',
    'zea': 'nl',
    'zh': 'zh-hans',
    'zh-classical': 'lzh',
    'zh-cn': 'zh-hans',
    'zh-hant': 'zh-hans',
    'zh-hk': 'zh-hant',
    'zh-min-nan': 'nan',
    'zh-mo': 'zh-hk',
    'zh-my': 'zh-sg',
    'zh-sg': 'zh-hans',
    'zh-tw': 'zh-hant',
    'zh-yue': 'yue'
  };

/*
 * Get a translation of a message from the messages object in the
 * requested language.
 *
 * @param messages the message object to look the message up in.
 * @param name The name of the message to get.
 * @param lang The language to get the message in.
 * @param messageKey
 *
 * @return The requested translation or the name wrapped in < ... > if no
 *     message could be found.
 */
function getMsg(messages, name, lang, messageKey) {
  // https://www.mediawiki.org/wiki/Help:System_message#Finding_messages_and_documentation
  if (conf.wgUserLanguage === 'qqx') {
    return '(i18njs-' + messageKey + '-' + name + ')';
  }

  // if the message has been overridden, use that without checking the language
  if (overrides[messageKey] && overrides[messageKey][name]) {
    return overrides[messageKey][name];
  }

  if (messages[lang] && messages[lang][name]) {
    return messages[lang][name];
  }

  if (lang === 'en') {
    return '<' + name + '>';
  }

  lang = fallbacks[lang] || 'en';
  return getMsg(messages, name, lang);
}

/*
 * Substitute arguments into the string, where arguments are represented
 * as $n where n > 0.
 *
 * @param message The message to substitute arguments into
 * @param arguments The arguments to substitute in.
 *
 * @return The resulting message.
 */
function handleArgs(message, args) {
  args.forEach(function (elem, index) {
    var rgx = new RegExp('\\$' + (index + 1), 'g');
    message = message.replace(rgx, elem);
  });

  return message;
}

/*
 * Generate a HTML link using the supplied parameters.
 *
 * @param href The href of the link which will be converted to
 *     '/wiki/href'.
 * @param text The text and title of the link. If this is not supplied, it
 *     will default to href.
 * @param hasProtocol True if the href parameter already includes the
 *     protocol (i.e. it begins with 'http://', 'https://', or '//').
 *
 * @return The generated link.
 */
function makeLink(href, text, hasProtocol, blank) {
  text = text || href;
  href = hasProtocol ? href : mw.util.getUrl(href);

  text = mw.html.escape(text);
  href = mw.html.escape(href);

  blank = blank ? 'target="_blank"' : '';

  return '<a href="' + href + '" title="' + text + '"' + blank + '>' + text + '</a>';
}

/*
 * Allow basic inline HTML tags in wikitext.does not support <a> as that's handled by the
 * wikitext links instead.
 *
 * Supports the following tags:
 * - <i>
 * - <b>
 * - <s>
 * - <br>
 * - <em>
 * - <strong>
 * - <span>
 *
 * Supports the following tag attributes:
 * - title
 * - style
 * - class
 *
 * @param html
 *
 * @return
 */
function sanitiseHtml(html) {
  var context = document.implementation.createHTMLDocument(''),
    $html = $.parseHTML(html, /* document */ context, /* keepscripts */ false),
    $div = $('<div>', context).append($html),
    whitelistAttrs = [
      'title',
      'style',
      'class'
    ],
    whitelistTags = [
      'b',
      'br',
      'code',
      'del',
      'em',
      'i',
      's',
      'strong',
      'span',
    ];

  $div.find('*').each(function () {
    var $this = $(this),
      tagname = $this.prop('tagName').toLowerCase(),
      attrs,
      array,
      style;

    if (whitelistTags.indexOf(tagname) === -1) {
      mw.log('[I18n-js] Disallowed tag in message: ' + tagname);
      $this.remove();
      return;
    }

    attrs = $this.prop('attributes');
    array = Array.prototype.slice.call(attrs);

    array.forEach(function (attr) {
      if (whitelistAttrs.indexOf(attr.name) === -1) {
        mw.log('[I18n-js] Disallowed attribute in message: ' + attr.name + ', tag: ' + tagname);
        $this.removeAttr(attr.name);
        return;
      }

      // make sure there's nothing nasty in style attributes
      if (attr.name === 'style') {
        style = $this.attr('style');

        if (style.indexOf('url(') > -1) {
          mw.log('[I18n-js] Disallowed url() in style attribute');
          $this.removeAttr('style');

          // https://phabricator.wikimedia.org/T208881
        } else if (style.indexOf('var(') > -1) {
          mw.log('[I18n-js] Disallowed var() in style attribute');
          $this.removeAttr('style');
        }
      }
    });
  });

  return $div.prop('innerHTML');
}

/*
 * Parse some basic wikitext into HTML. Also supports basic inline HTML tags.
 *
 * Will process:
 * - http/https
 * - [url text]
 * - [[pagename]]
 * - [[pagename|text]]
 * - {{PLURAL:count|singular|plural}}
 * - {{GENDER:gender|masculine|feminine|neutral}}
 *
 * @param message The message to process.
 *
 * @return The resulting string.
 */
function parse(message) {
  // [url text] -> [$1 $2]
  var urlRgx = /\[((?:https?:)?\/\/.+?) (.+?)\]/g,
    // [[pagename]] -> [[$1]]
    simplePageRgx = /\[\[([^|]*?)\]\]/g,
    // [[pagename|text]] -> [[$1|$2]]
    pageWithTextRgx = /\[\[(.+?)\|(.+?)\]\]/g,
    // {{PLURAL:count|singular|plural}} -> {{PLURAL:$1|$2}}
    pluralRgx = /\{\{PLURAL:(\d+)\|(.+?)\}\}/gi,
    // {{GENDER:gender|masculine|feminine|neutral}} -> {{GENDER:$1|$2}}
    genderRgx = /\{\{GENDER:([^|]+)\|(.+?)\}\}/gi;

  if (message.indexOf('<') > -1) {
    message = sanitiseHtml(message);
  }

  return message
    .replace(urlRgx, function (_match, href, text) {
      return makeLink(href, text, true, true);
    })
    .replace(simplePageRgx, function (_match, href) {
      return makeLink(href);
    })
    .replace(pageWithTextRgx, function (_match, href, text) {
      return makeLink(href, text);
    })
    .replace(pluralRgx, function (_match, count, forms) {
      return mw.language.convertPlural(Number(count), forms.split('|'));
    })
    .replace(genderRgx, function (_match, gender, forms) {
      return mw.language.gender(gender, forms.split('|'));
    });
}

/*
 * Parse markdown links into HTML. Also supports basic inline HTML tags.
 *
 * Will process:
 * - [text](url)
 * - [page]
 * - [text](page)
 *
 * @param The message to process.
 *
 * @return the resulting string.
 */
function markdown(message) {
  // [text](url)
  var urlRgx = /\[(.+?)\]\(((?:https?:)?\/\/.+?)\)/g,
    // [page]
    simplePageRgx = /\[(.+?)\]/g,
    // [text](page)
    pageWithTextRgx = /\[(.+?)\]\((.+?)\)/g;

  if (message.indexOf('<') > -1) {
    message = sanitiseHtml(message);
  }

  return message
    .replace(urlRgx, function (_match, text, href) {
      return makeLink(href, text, true);
    })
    .replace(simplePageRgx, function (_match, href) {
      return makeLink(href);
    })
    .replace(pageWithTextRgx, function (_match, text, href) {
      return makeLink(href, text);
    });
}

/*
 * Create a new Message instance.
 *
 * @param message The name of the message.
 * @param defaultLang
 * @param args Any arguments to substitute into the message.
 * @param messageKey
 */
function message(messages, defaultLang, args, messageKey) {
  if (!args.length) {
    return;
  }

  var msgName = args.shift(),
    noMsg = '<' + msgName + '>',
    msg = getMsg(messages, msgName, defaultLang, messageKey);

  if (args.length) {
    msg = handleArgs(msg, args);
  }

  return {
    /*
     * Boolean representing whether the message exists.
     */
    exists: msg !== noMsg,

    /*
     * Parse wikitext links in the message and return the result.
     *
     * @return The resulting string.
     */
    parse: function () {
      // skip parsing if the message wasn't found otherwise
      // the sanitisation will mess with it
      if (!this.exists) {
        return this.escape();
      }

      return parse(msg);
    },

    /*
     * Parse markdown links in the message and return the result.
     *
     * @return The resulting string.
     */
    markdown: function () {
      // skip parsing if the message wasn't found otherwise
      // the sanitisation will mess with it
      if (!this.exists) {
        return this.escape();
      }

      return markdown(msg);
    },

    /*
     * Escape any HTML in the message and return the result.
     *
     * @return The resulting string.
     */
    escape: function () {
      return mw.html.escape(msg);
    },

    /*
     * Return the message as is.
     *
     * @return The resulting string.
     */
    plain: function () {
      return msg;
    }
  };
}

/*
 * Create a new i18n object.
 *
 * @param messages The message object to look translations up in.
 * @param name
 */
function i18n(messages, name) {
  var defaultLang = conf.wgUserLanguage,
    tempLang = null,
    messageKey = null;

  if (name.indexOf('u:') !== 0) {
    messageKey = name;
  }

  return {
    /*
     * Set the default language.
     *
     * @param lang The language code to use by default.
     */
    useLang: function (lang) {
      defaultLang = lang;
    },

    /*
     * Set the language for the next msg call.
     *
     * @param lang The language code to use for the next `msg` call.
     *
     * @return The current object for use in chaining.
     */
    inLang: function (lang) {
      tempLang = lang;
      return this;
    },

    /*
     * Set the default language to the content language.
     */
    useContentLang: function () {
      defaultLang = conf.wgContentLanguage;
    },

    /*
     * Set the language for the next `msg` call to the content language.
     *
     * @return The current object for use in chaining.
     */
    inContentLang: function () {
      tempLang = conf.wgContentLanguage;
      return this;
    },


    /*
     * Set the default language to the user's language.
     */
    useUserLang: function () {
      defaultLang = conf.wgUserLanguage;
    },

    /*
     * Set the language for the next msg call to the user's language.
     *
     * @return The current object for use in chaining.
     */
    inUserLang: function () {
      tempLang = conf.wgUserLanguage;
      return this;
    },

    /*
     * Create a new instance of Message.
     */
    msg: function () {
      var args = Array.prototype.slice.call(arguments),
        lang = defaultLang;

      if (tempLang !== null) {
        lang = tempLang;
        tempLang = null;
      }

      return message(messages, lang, args, messageKey);
    },

    /*
     * For accessing the raw messages.
     */
    _messages: messages
  };
}

/*
 * Parse JSON string loaded from page and create an i18n object.
 *
 * @param name
 * @param res The JSON string.
 * @param cacheVersion Cache version requested by the loading script.
 *
 * @return The resulting i18n object.
 */
function parseMessagesToObject(name, res) {
  var json = {},
    obj,
    msg;

  // handle parse errors gracefully
  try {
    json = JSON.parse(res);
  } catch (e) {
    msg = e.message;

    if (msg === 'Unexpected end of JSON input') {
      msg += '. This may be caused by a non-existent i18n.json page.';
    }

    console.warn('[I18n-js] SyntaxError in messages: ' + msg);
  }

  obj = i18n(json, name);

  // cache the result in case it's used multiple times
  cache[name] = obj;

  return obj;
}

/*
 * Load messages stored as JSON on a page.
 *
 * @param name The name of the script the messages are for. This will be
 *     used to get messages from
 *     https://dev.fandom.com/wiki/MediaWiki:Custom-name/i18n.json.
 * @param options Options that can be set by the loading script:
 *     cacheVersion: Minimum cache version requested by the loading script.
 *     noCache: Never load i18n from cache (not recommended for general use).
 *
 * @return A jQuery.Deferred instance.
 */
function loadMessages(name, options, file) {
  options = options || {};
  // if using the special 'qqx' language code, there's no need to load
  // the messages, so resolve with an empty i18n object and return early
  if (conf.wgUserLanguage === 'qqx') {
    return i18n({}, name);
  }

  if (file) {
    return parseMessagesToObject(name, JSON.stringify(file));
  }
}

// expose under the dev global
var i18njs = {
  loadMessages,

  // 'hidden' functions to allow testing
  _getMsg: getMsg,
  _handleArgs: handleArgs,
  _parse: parse,
  _markdown: markdown,
  _fallbacks: fallbacks
}

// window.i18njs = i18njs;

// initialise overrides object
window.i18njs = window.i18njs || {};
window.i18njs.overrides = window.i18njs.overrides || {};
overrides = window.i18njs.overrides;

// fire an event on load
mw.hook('i18njs').fire(i18njs);

module.exports = {
  i18njs
}

/***/ }),

/***/ "./method/init.js":
/*!************************!*\
  !*** ./method/init.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 导入方法
const { loadScript } = __webpack_require__(/*! ./loadScript */ "./method/loadScript.js");
const { getUserInfo } = __webpack_require__(/*! ./getUserInfo */ "./method/getUserInfo.js");
const { loadStyles } = __webpack_require__(/*! ./loadStyles */ "./method/loadStyles.js");
const { updateNotice } = __webpack_require__(/*! ./updateNotice */ "./method/updateNotice.js");

// 导入全部模块
const { _analysis } = __webpack_require__(/*! ../module/_analysis */ "./module/_analysis.js");
const { _msg } = __webpack_require__(/*! ../module/_msg */ "./module/_msg.js");
const { about } = __webpack_require__(/*! ../module/about */ "./module/about.js");
const api = __webpack_require__(/*! ../module/api.json */ "./module/api.json");
const { articleLink } = __webpack_require__(/*! ../module/articleLink */ "./module/articleLink.js");
const { findAndReplace } = __webpack_require__(/*! ../module/findAndReplace */ "./module/findAndReplace.js");
const { loadQuickDiff } = __webpack_require__(/*! ../module/loadQuickDiff */ "./module/loadQuickDiff.js");
const { pluginPreference } = __webpack_require__(/*! ../module/pluginPreference */ "./module/pluginPreference.js");
const { pluginStore } = __webpack_require__(/*! ../module/pluginStore */ "./module/pluginStore.js");
const { progress } = __webpack_require__(/*! ../module/progress */ "./module/progress.js");
const { quickDelete } = __webpack_require__(/*! ../module/quickDelete */ "./module/quickDelete.js");
const { quickDiff } = __webpack_require__(/*! ../module/quickDiff */ "./module/quickDiff.js");
const { quickEdit } = __webpack_require__(/*! ../module/quickEdit */ "./module/quickEdit.js");
const { quickPreview } = __webpack_require__(/*! ../module/quickPreview */ "./module/quickPreview.js");
const { quickRedirect } = __webpack_require__(/*! ../module/quickRedirect */ "./module/quickRedirect.js");
const { quickRename } = __webpack_require__(/*! ../module/quickRename */ "./module/quickRename.js");
const { specialNotice } = __webpack_require__(/*! ../module/specialNotice */ "./module/specialNotice.js");
const version = __webpack_require__(/*! ../module/version */ "./module/version.js");
const { versionInfo } = __webpack_require__(/*! ../module/versionInfo */ "./module/versionInfo.js");


/**
 * @method initMain
 * @return {Object} InPageEdit
 */
module.exports = async function init() {

  // 加载前置插件以及样式表
  loadStyles();
  await loadScript('https://cdn.jsdelivr.net/gh/dragon-fish/inpageedit-v2@master/src/ssi_modal/ssi-modal.min.js');
  // 初始化前置模块
  pluginPreference.set();
  getUserInfo();
  loadQuickDiff();
  articleLink();
  updateNotice();

  // 暂定，触发工具盒插件
  pluginStore.load('toolbox.js');

  // 写入模块
  var InPageEdit = {
    about,
    api,
    articleLink,
    findAndReplace,
    loadQuickDiff,
    pluginPreference,
    progress,
    quickDelete,
    quickDiff,
    quickEdit,
    quickPreview,
    quickRedirect,
    quickRename,
    specialNotice,
    version,
    versionInfo,
    // 别名 Alias
    fnr: findAndReplace,
    delete: quickDelete,
    diff: quickDiff,
    edit: quickEdit,
    preview: quickPreview,
    redirect: quickRedirect,
    quickMove: quickRename,
    rename: quickRename,
  }

  // 锁定重要变量
  var importantVariables = [
    'api',
    'version',
  ];
  importantVariables.forEach(key => {
    try {
      Object.freeze(InPageEdit[key]);
    } catch (e) {
      // Do nothing
    }
  });

  // 触发钩子，传入上下文
  mw.hook('InPageEdit').fire({
    _analysis,
    _msg,
    InPageEdit
  });

  // 花里胡哨的加载提示
  console.info('    ____      ____                   ______    ___ __              _    _____ \n   /  _/___  / __ \\____ _____ ____  / ____/___/ (_) /_            | |  / /__ \\\n   / // __ \\/ /_/ / __ `/ __ `/ _ \\/ __/ / __  / / __/  ______    | | / /__/ /\n _/ // / / / ____/ /_/ / /_/ /  __/ /___/ /_/ / / /_   /_____/    | |/ // __/ \n/___/_/ /_/_/    \\__,_/\\__, /\\___/_____/\\__,_/_/\\__/              |___//____/ \n                      /____/');

  // 传回InPageEdit
  return InPageEdit;
}

/***/ }),

/***/ "./method/loadScript.js":
/*!******************************!*\
  !*** ./method/loadScript.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var loadScript = function (src) {
  return $.ajax({
    url: src,
    dataType: 'script',
    crossDomain: true,
    cache: true
  });
}

module.exports = {
  loadScript
}

/***/ }),

/***/ "./method/loadStyles.js":
/*!******************************!*\
  !*** ./method/loadStyles.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const _dir = __webpack_require__(/*! ./_dir */ "./method/_dir.js");

function loadStyles() {

  // 放在越上面优先级越高
  const styleFiles = [
    // Default Skin
    '/src/skin/ipe-default.css',
    // ssi-modal Style
    '/src/ssi_modal/ssi-modal.css',
    // FontAwesome
    'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
  ];

  styleFiles.forEach(link => {
    if (/^https?:\/\//.test(link) !== true) {
      link = _dir + link;
    }
    $('head').prepend(
      $('<link>', { href: link, rel: 'stylesheet', 'data-ipe': 'style' })
    );
  });
}

module.exports = {
  loadStyles
}

/***/ }),

/***/ "./method/updateNotice.js":
/*!********************************!*\
  !*** ./method/updateNotice.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const version = __webpack_require__(/*! ../module/version */ "./module/version.js");

const { _msg } = __webpack_require__(/*! ../module/_msg */ "./module/_msg.js");
const api = __webpack_require__(/*! ../module/api.json */ "./module/api.json");
const { versionInfo } = __webpack_require__(/*! ../module/versionInfo */ "./module/versionInfo.js");
const { specialNotice } = __webpack_require__(/*! ../module/specialNotice */ "./module/specialNotice.js");

function updateNotice() {
  if (localStorage.getItem('InPageEditVersion') !== version) {
    ssi_modal.notify('', {
      title: _msg('updatelog-update-success-title'),
      content: _msg('updatelog-update-success', version),
      className: 'in-page-edit',
      buttons: [{
        className: 'btn btn-primary',
        label: _msg('updatelog-button-versioninfo'),
        method: function (a, modal) {
          localStorage.InPageEditVersion = version;
          versionInfo();
          modal.close();
        }
      }],
      closeAfter: {
        time: 30,
        resetOnHover: true
      },
      onClose: function () {
        ssi_modal.notify('', {
          className: 'in-page-edit',
          content: _msg('updatelog-after-close', `[${api.updatelogsUrl} ${api.updatelogsUrl}]`, `[${api.githubLink}/issues ${_msg('updatelog-file-issue')}]`),
          closeAfter: {
            time: 10
          },
          buttons: [{
            className: 'btn btn-primary',
            label: _msg('ok'),
            method: function (a, modal) {
              modal.close();
            }
          }]
        });
        localStorage.InPageEditVersion = version;
      }
    });
  }
  if (localStorage.getItem('InPageEditNoticeId') !== _msg('noticeid')) {
    specialNotice();
  }
}

module.exports = {
  updateNotice
}

/***/ }),

/***/ "./module/_analysis.js":
/*!*****************************!*\
  !*** ./module/_analysis.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var config = mw.config.get();
var api = __webpack_require__(/*! ./api.json */ "./module/api.json");

/**
 * @module _analysis 提交统计信息模块
 * @param {String} functionID 模块ID，例如 quick_edit
 */
const _analysis = function (functionID) {
  if (InPageEdit.doNotCollectMyInfo === true) {
    // console.info('[InPageEdit] 我们已不再收集您使用插件的信息。');
    // return;
  }
  var submitdata = {
    'action': 'submit',
    'url': config.wgServer + config.wgArticlePath.replace('$1', ''),
    'sitename': config.wgSiteName,
    'username': config.wgUserName,
    'function': functionID
  }
  $.ajax({
    url: api.analysis,
    data: submitdata,
    type: 'post',
    dataType: 'json'
  }).done(function (data) {
    console.log('[InPageEdit] Analysis response\nStatus: ' + data.status + '\nMessage: ' + data.msg);
  });
}

module.exports = {
  _analysis
}

/***/ }),

/***/ "./module/_elements.js":
/*!*****************************!*\
  !*** ./module/_elements.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @module _elements 常用html元素
 */
var $br = '<br>',
  $hr = '<hr>',
  $progress = '<div class="ipe-progress" style="width: 100%"><div class="ipe-progress-bar"></div></div>';

module.exports = {
  $br,
  br: $br,
  $hr,
  hr: $hr,
  $progress,
  progress: $progress,
}

/***/ }),

/***/ "./module/_hasRight.js":
/*!*****************************!*\
  !*** ./module/_hasRight.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var config = mw.config.get();

/** 
 * @module _hasRight 是否拥有权限
 * @param {String} right
 * @return {Boolean}
 */
const _hasRight = function (right) {
  if (config.wgUserIsBlocked === true) {
    return false;
  }
  if (mw.config.get('wgUserRights').indexOf(right) > -1) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  _hasRight
}

/***/ }),

/***/ "./module/_msg.js":
/*!************************!*\
  !*** ./module/_msg.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var { i18njs } = __webpack_require__(/*! ../method/i18njs */ "./method/i18njs.js");

/**
 * @module _msg
 * @param {String} msgKey 消息的键
 * @param  {...String} params 替代占位符的内容，可以解析简单的wikitext
 */
var _msg = async function (msgKey, ...params) {
  var i18n = i18njs.loadMessages('InPageEdit', {}, __webpack_require__(/*! ../i18n/languages.json */ "./i18n/languages.json"));
  return i18n.msg(msgKey, ...params).parse();
}

module.exports = {
  _msg
}

/***/ }),

/***/ "./module/_resolveExists.js":
/*!**********************************!*\
  !*** ./module/_resolveExists.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { _hasRight } = __webpack_require__(/*! ./_hasRight */ "./module/_hasRight.js");

const { quickDelete } = __webpack_require__(/*! ./quickDelete */ "./module/quickDelete.js");
const { quickEdit } = __webpack_require__(/*! ./quickEdit */ "./module/quickEdit.js");

/**
 * @module _resolveExists 解决目标页面已存在的问题
 * @param {String} page 需要解决的页面
 * @param {Object|String} reason 填字符串则直接指定两种原因
 * @param {String} reason.delete 删除原因
 * @param {String} reason.edit 编辑原因
 */
var _resolveExists = function (page, reason = {}) {
  var canDelete = _hasRight('delete');

  if (typeof reason === 'string') {
    reason = {
      delete: reason,
      edit: reason
    }
  }

  ssi_modal.show({
    className: 'in-page-edit resovle-exists',
    sizeClass: 'dialog',
    center: true,
    outSideClose: false,
    title: _msg('target-exists-title'),
    content: _msg((canDelete ? 'target-exists-can-delete' : 'target-exists-no-delete'), page),
    buttons: [
      {
        className: 'btn btn-danger btn-exists-delete-target',
        label: _msg('quick-delete'),
        method(a, modal) {
          modal.close();
          quickDelete(page, reason.delete || null);
        }
      },
      {
        className: 'btn btn-primary',
        label: _msg('quick-edit'),
        method() {
          quickEdit({
            page: page,
            summary: (reason.edit ? '[InPageEdit] ' + reason : null),
            reload: false
          })
        }
      },
      {
        className: 'btn btn-secondary' + (canDelete ? ' btn-single' : ''),
        label: _msg('cancel'),
        method: (a, modal) => {
          modal.close();
        }
      }
    ],
    onShow: () => {
      if (!canDelete) {
        $('.btn-exists-delete-target').hide();
      }
    }
  });
}

module.exports = {
  _resolveExists
}

/***/ }),

/***/ "./module/about.js":
/*!*************************!*\
  !*** ./module/about.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const api = __webpack_require__(/*! ./api.json */ "./module/api.json");

/**
 * @module about 关于插件模块
 * @description Show "What is" modal box of IPE2
 */
var about = function () {
  ssi_modal.show({
    title: _msg('preference-about-label'),
    className: 'in-page-edit in-page-edit-about',
    content: $('<section>').append(
      $('<iframe>', { style: 'margin: 0;padding: 0;width: 100%;height: 80vh;border: 0;', src: api.aboutUrl })
    )
  });
}

module.exports = {
  about
}

/***/ }),

/***/ "./module/api.json":
/*!*************************!*\
  !*** ./module/api.json ***!
  \*************************/
/*! exports provided: aboutUrl, analysis, analysisUrl, githubLink, specialNotice, updatelogsUrl, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"aboutUrl\":\"https://ipe.netlify.app/\",\"analysis\":\"https://doc.wjghj.cn/inpageedit-v2/analysis/api/index.php\",\"analysisUrl\":\"https://dragon-fish.github.io/inpageedit-v2/analysis/\",\"githubLink\":\"https://github.com/Dragon-Fish/InPageEdit-v2\",\"specialNotice\":\"https://wjghj.fast.io/InPageEdit/specialNotice.json\",\"updatelogsUrl\":\"https://ipe.netlify.app/update/\"}");

/***/ }),

/***/ "./module/articleLink.js":
/*!*******************************!*\
  !*** ./module/articleLink.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var config = mw.config.get();
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const { pluginPreference } = __webpack_require__(/*! ./pluginPreference */ "./module/pluginPreference.js");
const { quickEdit } = __webpack_require__(/*! ./quickEdit */ "./module/quickEdit.js");

/**
 * @module articleLink 获取段落编辑以及编辑链接
 * @param {Element} element jQuery element to find edit links
 */
var articleLink = function (element) {
  if (element === undefined) {
    if (pluginPreference.get('redLinkQuickEdit') === true) {
      element = $('#mw-content-text a');
    } else {
      element = $('#mw-content-text a:not(.new)');
    }
  }
  element.each(() => {
    if ($(this).attr('href') === undefined)
      return;
    var url = $(this).attr('href'),
      action = mw.util.getParamValue('action', url) || mw.util.getParamValue('veaction', url),
      title = mw.util.getParamValue('title', url),
      section = mw.util.getParamValue('section', url).replace(/(T-)/ig, ''),
      revision = mw.util.getParamValue('oldid', url);

    // 不是本地编辑链接
    if (url.split('/')['2'] !== location.href.split('/')['2'] && url.substr(0, 1) !== '/')
      return;

    // 不是 index.php?title=FOO 形式的url
    if (title === null) {
      var splitStr = config.wgArticlePath.replace('$1', '');
      if (splitStr === '/') {
        splitStr = config.wgServer.substring(config.wgServer.length - 4) + '/';
      }
      title = url.split(splitStr).pop().split('?')['0'];
    }

    if (action === 'edit' && title !== undefined) {
      $(this).after(
        $('<span>', {
          'class': 'in-page-edit-article-link-group'
        }).append(
          $('<a>', {
            href: 'javascript:void(0)',
            class: 'in-page-edit-article-link',
            text: _msg('quick-edit')
          }).click(function () {
            var options = {};
            options.page = title;
            if (revision !== null) {
              options.revision = revision;
            } else if (section !== null) {
              options.section = section;
            }
            if (!config.wgIsArticle) options.reload = false;
            quickEdit(options);
          })
        )
      );
    }
  });
}

module.exports = {
  articleLink
}

/***/ }),

/***/ "./module/findAndReplace.js":
/*!**********************************!*\
  !*** ./module/findAndReplace.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { $br } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

/**
 * @module findAndReplace 查找替换模块
 * @param {element} element Textarea
 */
function findAndReplace(element) {
  if (element === undefined) element = $('.in-page-edit.ipe-editor:last .editArea');
  var origin = element.val();

  ssi_modal.show({
    className: 'in-page-edit',
    sizeClass: 'dialog',
    center: true,
    outSideClose: false,
    // position: 'right bottom',
    title: _msg('fAndR-title'),
    content:
      $('<div>', { class: 'module far-module' }).append(
        $('<div>', { class: 'module_content', id: 'findfielddiv' }).append(
          $('<section>').append(
            $('<h4>', { text: _msg('fAndR-find-text') }),
            $('<textarea>', { id: 'find_this', style: 'margin: 0', rows: 4 }),
            $('<h4>', { text: _msg('fAndR-replace-text') }),
            $('<textarea>', { id: 'replace_with', style: 'margin: 0', rows: 4 })
          ),
          $('<section>', { style: 'padding: 7px 0' }).append(
            $('<label>').append(
              $('<input>', { type: 'checkbox', id: 'globl', checked: '' }),
              $('<span>', { text: _msg('fAndR-globl') })
            ),
            $br,
            $('<label>').append(
              $('<input>', { type: 'checkbox', id: 'case_sen' }),
              $('<span>', { text: _msg('fAndR-case-sen') })
            ),
            $br,
            $('<label>').append(
              $('<input>', { type: 'checkbox', id: 'regex_search' }),
              $('<span>', { text: _msg('fAndR-enable-regex') })
            ),
          )
        )
      ),
    buttons: [
      {
        label: _msg('fAndR-button-undo'),
        className: 'btn btn-danger',
        method() {
          element.val(origin);
          ssi_modal.notify('info', {
            className: 'in-page-edit',
            title: _msg('notify-info'),
            content: _msg('notify-fAndR-undo')
          });
          // modal.close();
        }
      },
      {
        className: 'btn btn-primary',
        label: _msg('fAndR-button-replace'),
        method() {
          /**
           * 查找替换主函数
           * 借鉴：https://dev.fandom.com/wiki/MediaWiki:FindAndReplace/code.js
           **/
          if ($('#find_this').val() === '') return;
          var searchfor = '',
            searchexp,
            $textarea = element,
            replacewith = $('#replace_with').val().replace(/\r/gi, ''),
            text = $textarea.val().replace(/\r/gi, ''),
            flagg = 'g',
            flagi = 'i',
            enableregex = 0;

          if ($('#globl').prop('checked') === false) {
            flagg = '';
          }
          if ($('#case_sen').prop('checked') === true) {
            flagi = '';
          }
          if ($('#regex_search').prop('checked') === true) {
            enableregex = 1;
          }
          var flags = flagg + flagi + 'm';
          if (enableregex === 1) {
            searchfor = $('#find_this').val();
          } else {
            searchfor = $('#find_this').val().replace(/\r/gi, '').replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
          }
          searchexp = new RegExp(searchfor, flags);
          var rcount = 0;
          var matched = text.match(searchexp);
          if (matched !== null) {
            rcount = matched.length;
          }
          text = text.replace(searchexp, replacewith);
          $textarea.val(text);
          ssi_modal.notify('success', {
            className: 'in-page-edit',
            title: _msg('notify-success'),
            content: _msg('notify-fAndR-done', rcount)
          });
          // modal.close();
        }
      }
    ]
  });
}

module.exports = {
  findAndReplace
}

/***/ }),

/***/ "./module/loadQuickDiff.js":
/*!*********************************!*\
  !*** ./module/loadQuickDiff.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var config = mw.config.get();
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { _analysis } = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");

const { quickDiff } = __webpack_require__(/*! ./quickDiff */ "./module/quickDiff.js");

/**
 * @module loadQuickDiff 在特定页面查询差异链接并绑定快速差异
 */
var loadQuickDiff = function () {
  // 最近更改
  function addLink() {
    $('.mw-changeslist-groupdiff, .mw-changeslist-diff, .mw-changeslist-diff-cur, .mw-history-histlinks a').unbind('click', ipeDiffLink);
    var ipeDiffLink = $('.mw-changeslist-groupdiff, .mw-changeslist-diff, .mw-changeslist-diff-cur, .mw-history-histlinks a').click(function (e) {
      e.preventDefault();
      _analysis('quick_diff_recentchanges');
      var $this = $(this),
        href = $this.attr('href'),
        diff = mw.util.getParamValue('diff', href),
        curid = mw.util.getParamValue('curid', href),
        oldid = mw.util.getParamValue('oldid', href);
      if (diff === '0') {
        quickDiff({ fromrev: oldid, toid: curid });
      } else if (diff === 'prev' || diff === 'next' || diff === 'cur') {
        quickDiff({ fromrev: oldid, torelative: diff });
      } else {
        quickDiff({ fromrev: oldid, torev: diff });
      }
    });
  }
  if ($('.mw-rcfilters-enabled').length > 0) {
    setInterval(addLink, 500);
    $('.mw-rcfilters-enabled').addClass('ipe-continuous-active');
  } else {
    addLink();
  }
  // 查看历史页面的比较按钮与快速编辑
  if (config.wgAction === 'history') {
    $('.historysubmit.mw-history-compareselectedversions-button').after(
      $('<button>').text(_msg('quick-diff')).click(function (e) {
        e.preventDefault();
        _analysis('quick_diff_history_page');
        var before = $('.selected.before').attr('data-mw-revid'),
          after = $('.selected.after').attr('data-mw-revid');
        quickDiff({ fromrev: after, torev: before });
      })
    );
    $('[data-mw-revid]').each(function () {
      var $this = $(this),
        oldid = $this.attr('data-mw-revid');
      $this.find('.mw-history-undo').after(
        $('<span>').html(' | <a class="in-page-edit-article-link" href="javascript:void(0);" onclick="InPageEdit.quickEdit({page:mw.config.get(\'wgPageName\'),revision:' + oldid + '});">' + _msg('quick-edit') + '</a>')
      );
    });
  }
}

module.exports = {
  loadQuickDiff
}

/***/ }),

/***/ "./module/pluginPreference.js":
/*!************************************!*\
  !*** ./module/pluginPreference.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var InPageEdit = window.InPageEdit || {};

const { _analysis } = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { $br, $hr } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

const api = __webpack_require__(/*! ./api.json */ "./module/api.json")
const version = __webpack_require__(/*! ./version */ "./module/version.js");

/**
 * @module preference 个人设置模块
 */
var pluginPreference = {
  /**
   * @name 预设值
   * @return {object}
   */
  "default": {
    doNotCollectMyInfo: false,
    doNotShowLocalWarn: false,
    editMinor: false,
    editSummary: _msg('preference-summary-default'),
    lockToolBox: false,
    redLinkQuickEdit: true,
    outSideClose: true,
    watchList: Boolean(mw.user.options.get('watchdefault'))
  },
  /**
   * @name 获取设置 
   * @description 合并保存在用户页的设置以及localStorage的设置，有容错机制
   * @param {string} setting 返回相应的设置，为空时返回全部设置
   * @return {object|string}
   */
  get: function (setting) {
    setting = setting || undefined;
    var local = localStorage.getItem('InPageEditPreference') || '{}';
    try {
      local = JSON.parse(local);
    } catch (e) {
      local = {};
    }
    if (typeof InPageEdit.myPreference === 'object') {
      local = $.extend({}, local, InPageEdit.myPreference);
    }
    var json = $.extend({}, pluginPreference.default, local);
    if (typeof (setting) === 'string' && setting !== '') {
      return json.setting ? json[setting] : null;
    } else {
      return json;
    }
  },
  /**
   * @name 保存设置
   * @param {Object|string} settingKey
   * @param {any} settingValue
   * @example 可以这样 pluginPreference.set({ key: 'value' }) 也可以 pluginPreference.set('key', 'value')
   */
  set: function (settingKey = {}, settingValue = undefined) {
    var options = {};
    if (typeof settingKey === 'string' && settingValue !== undefined) {
      options[settingKey] = settingValue;
    } else if (typeof settingKey === 'object') {
      options = settingKey;
    } else {
      return;
    }
    options = $.extend({}, pluginPreference.get(), options);
    options = JSON.stringify(options);
    localStorage.setItem('InPageEditPreference', options);
  },
  /**
   * @name 用户图形界面
   * @description 打开可视化设置窗口
   */
  modal: function () {
    // 防止多开设置页面
    if ($('#ipe-preference-form').length > 0) return;

    mw.hook('pluginPreference').fire();
    pluginPreference.set();
    var local = pluginPreference.get();
    _analysis('plugin_setting');

    ssi_modal.show({
      outSideClose: false,
      title: _msg('preference-title') + ' - ' + version,
      content:
        $('<section>', { id: 'ipe-preference-form', class: 'ipe-preference-form' }).append(
          $('<h4>', { text: _msg('preference-editor-label') }),
          $('<label>').append(
            $('<input>', { id: 'outSideClose', type: 'checkbox' }).prop('checked', local.outSideClose),
            $('<span>', { text: _msg('preference-outSideClose') })
          ),
          $br,
          $('<label>').append(
            $('<input>', { id: 'editMinor', type: 'checkbox' }).prop('checked', local.editMinor),
            $('<span>', { text: _msg('preference-setMinor') })
          ),
          $br,
          $('<h4>', { text: _msg('preference-summary-label') }),
          $('<label>', { for: 'editSummary', style: 'padding-left: 0; font-size: small', html: _msg('preference-editSummary') }),
          $br,
          $('<input>', { id: 'editSummary', style: 'width: 96%', value: local.editSummary, placeholder: 'Edit via InPageEdit, yeah~' }),
          $('<h4>', { text: _msg('preference-analysis-label') }),
          $('<span>', { style: 'font-size: small; line-height: 0.9em', html: _msg('preference-analysis-view', `[${api.analysisUrl} ${api.analysisUrl}]`) }),
          $('<h4>', { text: _msg('preference-about-label') }),
          $('<button>', { class: 'btn btn-secondary', onclick: "InPageEdit.about()", text: _msg('preference-aboutAndHelp') }),
          $('<button>', { class: 'btn btn-secondary', style: 'margin-left: 1em;', onclick: "InPageEdit.versionInfo()", text: _msg('preference-updatelog') }),
          $('<a>', { href: 'https://ipe.miraheze.org/wiki/', target: '_blank', style: 'margin-left: 1em;' }).append(
            $('<button>', { class: 'btn btn-secondary', text: _msg('preference-translate') })
          ),
          $('<a>', { href: 'https://discord.gg/VUVAh8w', target: '_blank', style: 'margin-left: 1em;' }).append(
            $('<button>', { class: 'btn btn-secondary', text: _msg('preference-discord') })
          ),
          $hr,
          $('<strong>', { style: 'font-size: small; line-height: 0.9em', text: _msg('preference-savelocal-label') }),
          $br,
          $('<span>', { style: 'font-size: small; line-height: 0.9em', text: _msg('preference-savelocal') }).append(
            $('<a>', { href: 'javascript:;', id: 'ipeSaveLocalShow', text: _msg('preference-savelocal-btn') }).click(function () {
              // 永久保存（本地用户页）
              ssi_modal.dialog({
                className: 'in-page-edit',
                center: true,
                title: _msg('preference-savelocal-popup-title'),
                content: '<section id="ipeSaveLocal">' + _msg('preference-savelocal-popup') + '<br/><textarea style="font-size: 12px; resize: none; width: 100%; height: 10em;" readonly></textarea><br/>' + _msg('preference-savelocal-popup-notice') + '</section>',
                okBtn: {
                  className: 'btn btn-primary btn-single',
                  label: _msg('ok')
                }
              });
              $('#ipeSaveLocal textarea').val('/** InPageEdit Preferences **/\nwindow.InPageEdit = window.InPageEdit || {}; // Keep this line\nInPageEdit.myPreference = ' + JSON.stringify($.extend({}, pluginPreference.get(), $('#ipe-preference-form').data()), null, 2));
            })
          )
        ),
      sizeClass: 'dialog',
      className: 'in-page-edit ipe-preference',
      center: true,
      buttons: [{
        label: _msg('preference-reset'),
        className: 'btn btn-danger',
        method: function (a, modal) {
          ssi_modal.confirm({
            title: _msg('preference-reset-confirm-title'),
            content: _msg('preference-reset-confirm'),
            className: 'in-page-edit',
            center: true,
            okBtn: {
              label: _msg('ok'),
              className: 'btn btn-danger'
            },
            cancelBtn: {
              label: _msg('cancel'),
              className: 'btn'
            }
          }, (res) => {
            if (res) {
              pluginPreference.set(pluginPreference.default);
              modal.close();
            } else {
              return false;
            }
          });
        }
      }, {
        label: _msg('preference-save'),
        className: 'btn btn-primary',
        method: function (a, modal) {
          pluginPreference.set($('#ipe-preference-form').data());
          modal.close();
        }
      }
      ],
      onShow: function () {
        function setData() {
          if (this.type === 'checkbox') {
            $('#ipe-preference-form').data(this.id, this.checked);
          } else if (this.type === 'text') {
            $('#ipe-preference-form').data(this.id, this.value);
          }
        }
        $('#ipe-preference-form input').each(setData).change(setData);

        if (typeof (InPageEdit.myPreference) !== 'undefined') {
          $('#ipe-preference-form input, .ipe-preference .ssi-modalBtn').attr({ 'disabled': 'disabled' });
          $('#ipe-preference-form').prepend(
            $('<p>', { class: 'has-local-warn', style: 'padding-left: 8px; border-left: 6px solid orange; font-size: small;', html: _msg('preference-savelocal-popup-haslocal') })
          );
        }
      }
    });
  }
}

module.exports = {
  pluginPreference
}

/***/ }),

/***/ "./module/pluginStore.js":
/*!*******************************!*\
  !*** ./module/pluginStore.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/********************************
 ********** 未完工的模块 **********
 ********************************/

const pluginsIndex = __webpack_require__(/*! ../plugins/index.json */ "./plugins/index.json");
const _dir = __webpack_require__(/*! ../method/_dir */ "./method/_dir.js");
const _msg = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

/**
 * @module pluginStore 加载InPageEdit插件
 */
var pluginStore = {
  /**
   * @module pluginStore.get 打开插件商店
   */
  get() {
    ssi_modal.show({
      className: 'in-page-edit plugins-store',
      sizeClass: 'dialog',
      center: true,
      title: _msg('plugins-store-title'),
      content: 'Under development...',
      buttons: [{
        label: _msg('ok'),
        className: 'btn btn-single',
        method(a, modal) {
          modal.close();
        }
      }]
    })
  },
  /**
   * @module pluginStore.load 载入插件
   * @param {String} name 
   */
  load(name) {
    if (pluginsIndex[name]) {
      mw.loader.load(_dir + '/plugins/' + name);
    } else {
      console.warn('[InPageEdit] 无法找到插件', name);
    }
  }
}

module.exports = {
  pluginStore
}

/***/ }),

/***/ "./module/progress.js":
/*!****************************!*\
  !*** ./module/progress.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const { $progress } = __webpack_require__(/*! ./_elements.js */ "./module/_elements.js");

/**
 * @module progress 载入中模块
 * @param {Boolean|String} title
 * @default "Loading..."
 * @returns
 * - true: Mark top progress box as done
 * - false: Close top progress box
 * - String: Show new progress box with title
 */
var progress = function (title) {
  if (title === true) {
    $('.in-page-edit.loadingbox .ssi-modalTitle').html(_msg('done'));
    $('.in-page-edit.loadingbox .ipe-progress').addClass('done');
  } else if (title === false) {
    if ($('.in-page-edit.loadingbox').length > 0) {
      $('.in-page-edit.loadingbox').appendTo('body');
      ssi_modal.close();
    }
  } else {
    if ($('.in-page-edit.loadingbox').length > 0) return;
    if (typeof title === 'undefined') {
      title = 'Loading...'
    }
    ssi_modal.show({
      title: title,
      content: $progress,
      className: 'in-page-edit loadingbox',
      center: true,
      sizeClass: 'dialog',
      closeIcon: false,
      outSideClose: false
    });
  }
}

module.exports = {
  progress
}

/***/ }),

/***/ "./module/quickDelete.js":
/*!*******************************!*\
  !*** ./module/quickDelete.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mwApi = new mw.Api();
var config = mw.config.get();
const { _analysis } = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { _hasRight } = __webpack_require__(/*! ./_hasRight */ "./module/_hasRight.js");
const { $br } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

/** 
 * @module quickDelete 删除页面模块
 * @param {String} page
 */
var quickDelete = function (page, givenReason = '') {
  mw.hook('InPageEdit.quickDelete').fire();
  console.log('Quick delete', page, givenReason);
  var reason;
  page = page || config.wgPageName;

  ssi_modal.show({
    outSideClose: false,
    className: 'in-page-edit quick-delete',
    center: true,
    sizeClass: 'dialog',
    title: _msg('delete-title'),
    content: $('<div>').append(
      $('<section>', { id: 'InPageEditDeletepage' }).append(
        $('<span>', { html: _msg('delete-reason', '<b>' + page.replace(/_/g, ' ') + '</b>') }),
        $br,
        $('<label>', { for: 'delete-reason', text: _msg('editSummary') }),
        $('<input>', { id: 'delete-reason', style: 'width:96%', onclick: "$(this).css('box-shadow', '')", value: givenReason })
      )
    ),
    beforeShow: function () {
      if (!_hasRight('delete')) {
        ssi_modal.dialog({
          title: _msg('notify-no-right'),
          content: _msg('delete-no-right'),
          className: 'in-page-edit quick-deletepage',
          center: true,
          okBtn: {
            className: 'btn btn-primary btn-single'
          }
        });
        return false;
      }
    },
    buttons: [
      {
        label: _msg('cancel'),
        className: 'btn btn-primary',
        method: function (e, modal) {
          modal.close();
        }
      }, {
        label: _msg('confirm'),
        className: 'btn btn-danger',
        method: function (e, modal) {
          reason = $('#InPageEditDeletepage #delete-reason').val();
          if (reason === '') {
            $('#InPageEditDeletepage #delete-reason').css('box-shadow', '0 0 4px #f00');
            return;
          }
          _analysis('quick_delete');

          ssi_modal.confirm({
            center: true,
            className: 'in-page-edit',
            title: _msg('delete-confirm-title'),
            content: _msg('delete-confirm-content'),
            okBtn: {
              label: _msg('confirm'),
              className: 'btn btn-danger'
            },
            cancelBtn: {
              label: _msg('cancel'),
              className: 'btn'
            }
          }, function (result) {
            if (result) {
              reason = _msg('delete-title') + ' (' + reason + ')';
              mwApi.postWithToken('csrf', {
                action: 'delete',
                title: page,
                reason: reason,
                format: 'json'
              }).then(() => {
                ssi_modal.notify('success', {
                  className: 'in-page-edit',
                  title: _msg('notify-success'),
                  content: _msg('notify-delete-success', page)
                });
              }).fail(function (errorCode, feedback, errorThrown) {
                ssi_modal.notify('error', {
                  className: 'in-page-edit',
                  title: _msg('notify-error'),
                  content: _msg('notify-delete-error') + ': <br/><span style="font-size:amall">' + errorThrown.error['*'] + '(<code>' + errorThrown.error['code'] + '</code>)</span>'
                });
              });
              modal.close();
            } else {
              return false;
            }
          });
        }
      }
    ]
  });
}

module.exports = {
  quickDelete
}

/***/ }),

/***/ "./module/quickDiff.js":
/*!*****************************!*\
  !*** ./module/quickDiff.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mwApi = new mw.Api();
var config = mw.config.get();

const { _analysis } = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const { articleLink } = __webpack_require__(/*! ./articleLink */ "./module/articleLink.js");
const { $br, $progress } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

/**
 * @module quickDiff 快速页面差异模块
 * @param {Object} param standard MediaWiki API params
 */
var quickDiff = function (param) {
  mw.hook('InPageEdit.quickDiff').fire();
  _analysis('quick_diff');
  if ($('[href*="mediawiki.diff.styles"]').length < 1) {
    mw.loader.load(mw.util.wikiScript('load') + '?modules=mediawiki.legacy.shared|mediawiki.diff.styles&only=styles', 'text/css');
  }
  var $modalTitle,
    $diffArea,
    $loading;
  if ($('.quick-diff').length > 0) {
    console.info('[InPageEdit] Quick diff 正在加载新内容');
    $modalTitle = $('.quick-diff .pageName');
    $diffArea = $('.quick-diff .diffArea');
    $loading = $('.quick-diff .ipe-progress');
    $modalTitle.text(_msg('diff-loading'));
    $diffArea.hide();
    $('.quick-diff').appendTo('body');
  } else {
    $modalTitle = $('<span>', { class: 'pageName', text: _msg('diff-loading') });
    $diffArea = $('<div>', { class: 'diffArea', style: 'display: none' });
    $loading = $($progress);

    ssi_modal.show({
      className: 'in-page-edit quick-diff',
      sizeClass: 'large',
      fixedHeight: true,
      fitScreen: true,
      title: $modalTitle,
      content: $('<div>').append($loading, $diffArea),
      buttons: [{
        label: _msg('diff-button-todiffpage'),
        className: 'btn btn-secondary toDiffPage',
        method: function () {
          // ...
        }
      }]
    });
  }
  $loading.show().css('margin-top', $('.quick-diff .ssi-modalContent').height() / 2);
  $('.quick-diff .toDiffPage').unbind();
  param.action = 'compare';
  param.prop = 'diff|diffsize|rel|ids|title|user|comment|parsedcomment|size';
  param.format = 'json';
  if (param.totext) {
    param.topst = true;
  } else if (param.fromtext) {
    param.frompst = true;
  }
  mwApi.post(param).then(function (data) {
    var diffTable = data.compare['*'];
    var toTitle;
    $loading.hide();
    if (param.pageName === undefined) {
      toTitle = data.compare.totitle;
    } else {
      toTitle = param.pageName;
    }
    var userLink = function (user) {
      return '<a class="diff-user" href="' + mw.util.getUrl('User:' + user) + '">' + user + '</a> (<a href="' + mw.util.getUrl('User_talk:' + user) + '">' + _msg('diff-usertalk') + '</a> | <a href="' + mw.util.getUrl('Special:Contributions/' + user) + '">' + _msg('diff-usercontrib') + '</a> | <a href="' + mw.util.getUrl('Special:Block/' + user) + '">' + _msg('diff-userblock') + '</a>)';
    }
    $modalTitle.html(_msg('diff-title') + ': <u>' + toTitle + '</u>');
    $diffArea.show().html('').append(
      $('<table>', { class: 'diff difftable' }).append(
        $('<colgroup>').append(
          $('<col>', { class: 'diff-marker' }),
          $('<col>', { class: 'diff-content' }),
          $('<col>', { class: 'diff-marker' }),
          $('<col>', { class: 'diff-content' })
        ),
        $('<tbody>').append(
          $('<tr>').append(
            $('<td>', { colspan: 2, class: 'diff-otitle' }).append(
              $('<a>', { href: config.wgScript + '?oldid=' + data.compare.fromrevid, text: data.compare.fromtitle }),
              ' (',
              $('<span>', { class: 'diff-version', text: _msg('diff-version') + data.compare.fromrevid }),
              ') (',
              $('<a>', { class: 'editLink', href: config.wgScript + '?action=edit&title=' + data.compare.fromtitle + '&oldid=' + data.compare.fromrevid, text: _msg('diff-edit') }),
              ')',
              $br,
              userLink(data.compare.fromuser),
              $br,
              ' (',
              $('<span>', { class: 'diff-comment', html: data.compare.fromparsedcomment }),
              ') ',
              $br,
              $('<a>', { class: 'prevVersion ipe-analysis-quick_diff_modalclick', href: 'javascript:void(0);', text: '←' + _msg('diff-prev') }).click(() => {
                quickDiff({
                  fromrev: data.compare.fromrevid,
                  torelative: 'prev'
                });
              })
            ),
            $('<td>', { colspan: 2, class: 'diff-ntitle' }).append(
              $('<a>', { href: config.wgScript + '?oldid=' + data.compare.torevid, text: data.compare.totitle }),
              ' (',
              $('<span>', { class: 'diff-version', text: _msg('diff-version') + data.compare.torevid }),
              ') (',
              $('<a>', { class: 'editLink', href: config.wgScript + '?action=edit&title=' + data.compare.totitle + '&oldid=' + data.compare.torevid, text: _msg('diff-edit') }),
              ')',
              $br,
              userLink(data.compare.touser),
              $br,
              ' (',
              $('<span>', { class: 'diff-comment', html: data.compare.toparsedcomment }),
              ') ',
              $br,
              $('<a>', { class: 'nextVersion ipe-analysis-quick_diff_modalclick', href: 'javascript:void(0);', text: _msg('diff-nextv') + '→' }).click(() => {
                _analysis('quick_diff_modalclick');
                quickDiff({
                  fromrev: data.compare.torevid,
                  torelative: 'next'
                });
              })
            )
          ),
          diffTable,
          $('<tr>', { class: 'diffSize', style: 'text-align: center' }).append(
            $('<td>', { colspan: '2', text: data.compare.fromsize + _msg('diff-bytes') }),
            $('<td>', { colspan: '2', text: data.compare.tosize + _msg('diff-bytes') })
          )
        )
      )
    );
    $('.quick-diff button.toDiffPage').click(function () {
      location.href = config.wgScript + '?oldid=' + data.compare.fromrevid + '&diff=' + data.compare.torevid;
    });
    articleLink($('.quick-diff .editLink'));
    if (param.isPreview === true) {
      $('.quick-diff button.toDiffPage').hide();
      $diffArea.find('.diff-otitle').html('<b>' + _msg('diff-title-original-content') + '</b>');
      $diffArea.find('.diff-ntitle').html('<b>' + _msg('diff-title-your-content') + '</b>');
    }
    if (data.compare.fromsize === undefined || data.compare.tosize === undefined) {
      $diffArea.find('.diffSize').hide();
    }
    // 无上一版本或下一版本
    if (data.compare.fromrevid === undefined && param.isPreview !== true) {
      $diffArea.find('.diff-otitle').html('<span class="noPrevVerson">' + data.warnings.compare['*'] + '</span>');
    } else if (data.compare.torevid === undefined && param.isPreview !== true) {
      $diffArea.find('.diff-ntitle').html('<span class="noNextVerson">' + data.warnings.compare['*'] + '</span>');
    }
    // GitHub@issue#5 修复被隐藏版本的问题
    if (data.compare.fromtexthidden !== undefined) {
      $diffArea.find('.diff-otitle .diff-version').addClass('diff-hidden-history');
    }
    if (data.compare.totexthidden !== undefined) {
      $diffArea.find('.diff-ntitle .diff-version').addClass('diff-hidden-history');
    }
    if (data.compare.fromuserhidden !== undefined) {
      $diffArea.find('.diff-otitle .diff-user').addClass('diff-hidden-history');
    }
    if (data.compare.touserhidden !== undefined) {
      $diffArea.find('.diff-ntitle .diff-user').addClass('diff-hidden-history');
    }
    if (data.compare.fromcommenthidden !== undefined) {
      $diffArea.find('.diff-comment').addClass('diff-hidden-history');
    }
    if (data.compare.tocommenthidden !== undefined) {
      $diffArea.find('.diff-ntitle .diff-comment').addClass('diff-hidden-history');
    }
    if (data.error) {
      console.warn('[InPageEdit] 快速差异获取时系统告知出现问题');
      $diffArea.html(_msg('diff-error') + ': ' + data.error.info + '(<code>' + data.error.code + '</code>)');
    }
  }).fail(function (errorCode, feedback, errorThrown) {
    console.warn('[InPageEdit] 快速差异获取失败');
    $loading.hide();
    $diffArea.show().html(_msg('diff-error') + ': ' + errorThrown.error['info'] + '(<code>' + errorThrown.error['code'] + '</code>)');
  });
}

module.exports = {
  quickDiff
}

/***/ }),

/***/ "./module/quickEdit.js":
/*!*****************************!*\
  !*** ./module/quickEdit.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mwApi = new mw.Api();
var config = mw.config.get();

const { _analysis } = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { _hasRight } = __webpack_require__(/*! ./_hasRight */ "./module/_hasRight.js");

const { $br, $progress } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

const { findAndReplace } = __webpack_require__(/*! ./findAndReplace */ "./module/findAndReplace.js");
const { pluginPreference } = __webpack_require__(/*! ./pluginPreference */ "./module/pluginPreference.js");
const { progress } = __webpack_require__(/*! ./progress */ "./module/progress.js")
const { quickPreview } = __webpack_require__(/*! ./quickPreview */ "./module/quickPreview.js");
const { quickDiff } = __webpack_require__(/*! ./quickDiff */ "./module/quickDiff.js");

/**
 * @module quickEdit 快速编辑模块
 * 
 * @param {Object} options
 * @param {String} options.page edit page (default: wgPageName)
 * @param {Number} options.revision page rev ID
 * @param {Number} options.section edit section
 * @param {Boolean} options.reload if reload page after save successful (default: true)
 */
var quickEdit = function (options) {
  mw.hook('InPageEdit.quickEdit').fire();
  /** 获取设定信息，设置缺省值 **/
  options = options || {};
  if (typeof options === 'string') {
    options = {
      page: options
    }
  }
  var defaultOptions = {
    page: config.wgPageName,
    pageId: -1,
    revision: null,
    summaryRevision: '',
    section: null,
    editText: '',
    editMinor: false,
    editSummary: _msg('preference-summary-default'),
    editNotice: '',
    outSideClose: true,
    jsonGet: {
      action: 'parse',
      page: options.page || config.wgPageName,
      prop: 'wikitext|langlinks|categories|templates|images|sections',
      format: 'json'
    },
    jsonPost: {},
    pageDetail: {},
    jumpTo: '',
    reload: true
  }

  /** 获取用户设置 **/
  var preference = pluginPreference.get();

  /** 缓存时间戳 **/
  var date = new Date(),
    timestamp = date.getTime(),
    now = date.toUTCString();

  /** 将选项合并并标准化 **/
  options = $.extend({}, defaultOptions, options, preference);
  options.page = decodeURIComponent(options.page); // 解码网址 Unicode

  _analysis('quick_edit');

  if (options.revision !== null && options.revision !== '' && options.revision !== config.wgCurRevisionId) {
    ssi_modal.notify('warning', {
      className: 'in-page-edit',
      content: _msg('notify-editing-history'),
      title: _msg('notify-info')
    });
    delete options.jsonGet.page;
    options.jsonGet.oldid = options.revision;
    options.summaryRevision = '(' + _msg('editor-summary-rivision') + '[[Special:Diff/' + options.revision + ']])';
  } else {
    if (options.section !== null && options.section !== '') {
      options.jsonGet.section = options.section;
    }
  }

  // Debug
  console.time('[InPageEdit] 获取页面源代码');
  console.info('[InPageEdit] QuickEdit start with options:');
  console.table(options);

  // 显示主窗口
  ssi_modal.show({
    title: _msg('editor-title-editing') + ': <u class="editPage">' + options.page.replace(/_/g, ' ') + '</u>',
    content:
      $('<div>').append(
        $progress,
        $('<section>', { class: 'hideBeforeLoaded' }).append(
          // 编辑工具条
          $('<div>', { class: 'editTools' }).append(
            $('<div>', { class: 'btnGroup' }).append(
              $('<div>', { class: 'toolSelect' }).append(
                $('<div>', { class: 'label', text: _msg('editor-edittool-header') }),
                $('<ul>', { class: 'ul-list' }).append(
                  $('<li>', { class: 'editToolBtn', 'data-open': '\n== ', 'data-middle': _msg('editor-edittool-header-text'), 'data-close': ' ==\n', text: 'H2' }),
                  $('<li>', { class: 'editToolBtn', 'data-open': '\n=== ', 'data-middle': _msg('editor-edittool-header-text'), 'data-close': ' ===\n', text: 'H3' }),
                  $('<li>', { class: 'editToolBtn', 'data-open': '\n==== ', 'data-middle': _msg('editor-edittool-header-text'), 'data-close': ' ====\n', text: 'H4' }),
                  $('<li>', { class: 'editToolBtn', 'data-open': '\n===== ', 'data-middle': _msg('editor-edittool-header-text'), 'data-close': ' =====\n', text: 'H5' })
                )
              )
            ),
            $('<div>', { class: 'btnGroup' }).append(
              $('<span>', { class: 'label', text: '格式' }),
              $('<button>', { class: 'editToolBtn fa fa-bold btn', 'data-open': "'''", 'data-middle': _msg('editor-edittool-bold'), 'data-close': "'''" }),
              $('<button>', { class: 'editToolBtn fa fa-italic btn', 'data-open': "''", 'data-middle': _msg('editor-edittool-italic'), 'data-close': "''" }),
              $('<button>', { class: 'editToolBtn fa fa-list-ul btn', 'data-open': '\n* ', 'data-middle': _msg('editor-edittool-list-bulleted'), 'data-close': '\n' }),
              $('<button>', { class: 'editToolBtn fa fa-list-ol btn', 'data-open': '\n# ', 'data-middle': _msg('editor-edittool-list-numbered'), 'data-close': '\n' }),
              $('<button>', { class: 'editToolBtn fa fa-won btn', 'data-open': '<' + 'nowiki>', 'data-middle': _msg('editor-edittool-nowiki'), 'data-close': '</nowiki>' }),
              $('<button>', { class: 'editToolBtn fa fa-level-down fa-rotate-90 btn', 'data-open': '<br>\n', 'data-middle': '', 'data-close': '' })
            ),
            $('<div>', { class: 'btnGroup' }).append(
              $('<span>', { class: 'label', text: '插入' }),
              $('<button>', { class: 'editToolBtn fa fa-link btn', 'data-open': '[' + '[', 'data-middle': _msg('editor-edittool-internal-link'), 'data-close': ']]' }),
              $('<button>', { class: 'editToolBtn fa fa-file-image-o btn', 'data-open': '[' + '[File:', 'data-middle': 'Example.png', 'data-close': '|thumb]]' }),
              $('<button>', { class: 'editToolBtn btn', 'data-open': '\n<' + 'gallery>\n', 'data-middle': 'Example1.jpg|Description\nExample2.png|Description', 'data-close': '\n</gallery>\n', html: '<span class="fa-stack"><i class="fa fa-picture-o fa-stack-1x"></i><i class="fa fa-picture-o fa-stack-1x" style="left: 2px;top: 2px;text-shadow: 1px 1px 0 #fff;"></i></span>' })
            ),
            $('<div>', { class: 'btnGroup extra', style: 'display: none' }).append(
              $('<span>', { class: 'label', text: '自定义' })
            ),
            $('<div>', { class: 'btnGroup special-tools', style: 'float: right' }).append(
              $('<button>', { class: 'btn fa fa-search' }).click(function () {
                findAndReplace($('.ipe-editor.timestamp-' + timestamp + ' .editArea'));
              })
            )
          ),
          // 编辑框
          $('<textarea>', { class: 'editArea', style: 'margin-top: 0;' }),
          // 页面分析
          $('<div>', { class: 'editOptionsLabel hideBeforeLoaded' }).append(
            $('<aside>', { class: 'detailArea' }).append(
              $('<label>', { class: 'detailToggle', text: _msg('editor-detail-button-toggle') }),
              $('<div>', { class: 'detailBtnGroup' }).append(
                $('<a>', { href: 'javascript:;', class: 'detailBtn', id: 'showTemplates', text: _msg('editor-detail-button-templates') }),
                ' | ',
                $('<a>', { href: 'javascript:;', class: 'detailBtn', id: 'showImages', text: _msg('editor-detail-button-images') })
              )
            ),
            // 摘要&小编辑
            $('<label>', { for: 'editSummary', text: _msg('editSummary') }),
            $br,
            $('<input>', { class: 'editSummary', id: 'editSummary', placeholder: 'Edit via InPageEdit~', value: options.editSummary.replace(/\$oldid/ig, options.summaryRevision) }),
            $br,
            $('<label>').append(
              $('<input>', { type: 'checkbox', class: 'editMinor', id: 'editMinor', checked: options.editMinor }),
              $('<span>', { text: _msg('markAsMinor') })
            ),
            $br,
            $('<label>').append(
              $('<input>', { type: 'checkbox', class: 'reloadPage', id: 'reloadPage', checked: options.reload }),
              $('<span>', { text: _msg('editor-reload-page') })
            )
          )
        )
      ),
    outSideClose: options.outSideClose,
    className: 'in-page-edit ipe-editor timestamp-' + timestamp,
    sizeClass: 'large',

    /* 按钮 */
    buttons: [{
      label: _msg('editor-button-save'),
      className: 'btn btn-primary leftBtn hideBeforeLoaded save-btn',
      method(e, modal) {
        ssi_modal.confirm({
          className: 'in-page-edit',
          center: true,
          content: _msg('editor-confirm-save'),
          okBtn: {
            className: 'btn btn-primary',
            label: _msg('confirm')
          },
          cancelBtn: {
            className: 'btn btn-secondary',
            label: _msg('cancel')
          },
        },
          function (result) {
            if (result) {
              var text = $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val(),
                minor = $('.ipe-editor.timestamp-' + timestamp + ' .editMinor').prop('checked'),
                section = options.section,
                summary = $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val();
              postArticle({
                text: text,
                page: options.page,
                minor: minor,
                section: section,
                summary: summary
              }, modal);
            }
          });
      }
    }, {
      label: _msg('editor-button-preview'),
      className: 'btn btn-secondary leftBtn hideBeforeLoaded',
      method: function () {
        _analysis('preview_edit');
        var text = $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val();
        quickPreview({
          title: options.page,
          text: text,
          pst: true
        });
      }
    }, {
      label: _msg('editor-button-diff'),
      className: 'btn btn-secondary leftBtn hideBeforeLoaded diff-btn',
      method: function () {
        // ...
      }
    }, {
      label: _msg('cancel'),
      className: 'btn btn-danger',
      method: function (e, modal) {
        modal.close();
      }
    }
    ],

    /* 预加载 */
    beforeShow: function () {
      // 设置样式
      $('.ipe-editor.timestamp-' + timestamp + ' .hideBeforeLoaded').hide();
      $('.ipe-editor.timestamp-' + timestamp + ' .ipe-progress').css('margin', Number($(window).height() / 3 - 50) + 'px 0');
      $('.ipe-editor.timestamp-' + timestamp + ' .editArea').css('height', $(window).height() / 3 * 2 - 100);
      $('.ipe-editor.timestamp-' + timestamp + ' .editOptionsLabel').prependTo('.ipe-editor.timestamp-' + timestamp + ' .ssi-buttons');
      $('.ipe-editor.timestamp-' + timestamp + ' .leftBtn').appendTo('.ipe-editor.timestamp-' + timestamp + ' .ssi-leftButtons');
      $('.ipe-editor.timestamp-' + timestamp + ' .ssi-modalTitle').append(
        $('<a>', {
          class: 'showEditNotice',
          href: 'javascript:void(0);',
          html: '<i class="fa fa-info-circle"></i> ' + _msg('editor-has-editNotice'),
          style: 'display: none;'
        }).click(function () {
          ssi_modal.show({
            className: 'in-page-edit',
            center: true,
            title: _msg('editor-title-editNotice'),
            content: '<section class="editNotice">' + $('.ipe-editor.timestamp-' + timestamp).data('editNotice') + '</section>'
          });
        })
      );

      /** Edit-Tool 扩展 **/
      function insertText(strings, obj) {
        var textarea = obj || $('.in-page-edit.ipe-editor .editArea')[0],
          start = textarea.selectionStart,
          stop = textarea.selectionEnd,
          selectedText = textarea.value.slice(start, stop);
        textarea.value =
          textarea.value.slice(0, start) +
          (strings.open || '') +
          (selectedText || strings.middle || '') +
          (strings.close || '') +
          textarea.value.slice(stop);
        var selectStart = start + (strings.open.length || 0);
        textarea.setSelectionRange(selectStart, selectStart + (selectedText.length || strings.middle.length || 0));
        textarea.focus();
      }
      // 添加按钮
      function addBtn(open, middle, close, icon) {
        open = open || '';
        middle = middle || '';
        close = close || '';
        icon = 'fa-' + icon || false;
        $('.ipe-editor.timestamp-' + timestamp + ' .btnGroup.extra').append(
          $('<button>', { class: 'editToolBtn btn', 'data-open': open, 'data-middle': middle, 'data-close': close, html: `<i class="fa ${icon}"></i>` })
        );
      }
      // 用户自定义按钮
      if (InPageEdit.buttons) {
        var btns = InPageEdit.buttons;
        $('.ipe-editor.timestamp-' + timestamp + ' .btnGroup.extra').show();

        for (var i = 0; i < btns.length; i++) {
          var btn = btns[i];
          addBtn(btn.open, btn.middle, btn.close, btn.text);
        }
      }
      $('.ipe-editor.timestamp-' + timestamp + ' .editToolBtn').click(function (e) {
        e.preventDefault();
        var $this = $(this),
          $open = $this.attr('data-open') || '',
          $middle = $this.attr('data-middle') || '',
          $close = $this.attr('data-close') || '';
        insertText({
          open: $open,
          middle: $middle,
          close: $close
        }, $('.ipe-editor.timestamp-' + timestamp + ' .editArea')[0]);
      });
    },
    /**
  * @event onShow
  * @description 模态框显示后
  */
    onShow() {
      mw.hook('InPageEdit.quickEdit.modal').fire();
      // 绑定事件，在尝试离开页面时提示
      $('.ipe-editor.timestamp-' + timestamp + ' .editArea').change(function () {
        $(this).attr('data-modifiled', 'true');
        $(window).bind('beforeunload', function () {
          return _msg('window-leave-confirm');
        });
      });
      // 获取权限
      if (_hasRight('edit') === false) {
        ssi_modal.notify('dialog', {
          className: 'in-page-edit',
          position: 'center bottom',
          title: _msg('notify-no-right'),
          content: _msg('editor-no-right'),
          okBtn: {
            label: _msg('ok'),
            className: 'btn btn-primary',
            method: function (e, modal) {
              modal.close();
            }
          }
        });
        $('.ipe-editor.timestamp-' + timestamp + ' .save-btn').addClass('btn-danger');
      }

      // 解析页面内容
      mwApi.get(options.jsonGet).done(function (data) {
        console.timeEnd('[InPageEdit] 获取页面源代码');
        contentDone(data);
      }).fail(function (a, b, errorThrown) {
        console.timeEnd('[InPageEdit] 获取页面源代码');
        console.warn('[InPageEdit]警告：无法获取页面内容');
        var data = errorThrown;
        contentDone(data);
      });

      // 页面内容获取完毕，后续工作
      function contentDone(data) {
        options.pageDetail = data;

        if (data.error) {
          console.warn('[InPageEdit]警告：无法获取页面内容');
          options.editText = '<!-- ' + data.error.info + ' -->';
          options.pageId = -1;
          $('.ipe-editor.timestamp-' + timestamp + ' .detailArea').hide();
        } else {
          options.editText = data.parse.wikitext['*'];
          options.pageId = data.parse.pageid;
        }
        // 设定一堆子样式
        $('.ipe-editor.timestamp-' + timestamp + ' .ipe-progress').hide();
        $('.ipe-editor.timestamp-' + timestamp + ' .hideBeforeLoaded').fadeIn(500);
        $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val(options.editText + '\n');

        var summaryVal;
        if (options.section !== null) {
          summaryVal = $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val();
          summaryVal = summaryVal.replace(/\$section/ig, '/* ' + data.parse.sections[0].line + ' */');
          $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val(summaryVal);
          $('.ipe-editor.timestamp-' + timestamp + ' .editPage').after('<span class="editSection">→' + data.parse.sections[0].line + '</span>');
          options.jumpTo = '#' + data.parse.sections[0].anchor;
        } else {
          summaryVal = $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val();
          summaryVal = summaryVal.replace(/\$section/ig, '');
          $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val(summaryVal);
          options.jumpTo = '';
        }
        if (options.revision !== null && options.revision !== '' && options.revision !== config.wgCurRevisionId) {
          $('.ipe-editor.timestamp-' + timestamp + ' .editPage').after('<span class="editRevision">(' + _msg('editor-title-editRevision') + '：' + options.revision + ')</span>');
          $('.ipe-editor.timestamp-' + timestamp + ' .diff-btn').click(() => {
            _analysis('quick_diff_edit');
            var text = $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val();
            var diffJson = {
              fromrev: options.revision,
              totext: text,
              hideBtn: true,
              pageName: options.page,
              isPreview: true
            }
            if (options.section) {
              diffJson.fromsection = options.section;
            }
            quickDiff(diffJson);
          });
        } else {
          $('.ipe-editor.timestamp-' + timestamp + ' .diff-btn').attr('disabled', true);
        }

        // 获取页面基础信息
        console.time('[InPageEdit] 获取页面基础信息');
        var queryJson = {
          action: 'query',
          prop: 'revisions|info',
          inprop: 'protection',
          format: 'json'
        }
        if (options.pageId !== -1) {
          queryJson.pageids = options.pageId;
        } else {
          queryJson.titles = options.page;
        }
        mwApi.get(queryJson).done(function (data) {
          console.info('[InPageEdit] 获取页面基础信息成功');
          console.timeEnd('[InPageEdit] 获取页面基础信息');
          // 记录页面最后编辑时间，防止编辑冲突
          $('.ipe-editor.timestamp-' + timestamp).data('basetimestamp', data['query']['pages'][options.pageId].revisions ? data['query']['pages'][options.pageId]['revisions'][0]['timestamp'] : now);
          queryDone(data);
        }).fail(function (a, b, errorThrown) {
          var data = errorThrown;
          console.timeEnd('[InPageEdit] 获取页面基础信息');
          console.warn('[InPageEdit] 获取页面基础信息失败');
          $('.ipe-editor.timestamp-' + timestamp).data('basetimestamp', now);
          queryDone(data);
        });

        /** 页面保护等级和编辑提示等 **/
        function queryDone(data) {
          options.namespace = data.query.pages[options.pageId].ns; // 名字空间ID
          options.protection = data.query.pages[options.pageId]['protection'] || []; // 保护等级
          if (data.query.pages[options.pageId].revisions) {
            options.revision = data.query.pages[options.pageId]['revisions'][0]['revid']; // 版本号
          }

          // 使页面名标准化
          options.page = data.query.pages[options.pageId].title;
          $('.ipe-editor.timestamp-' + timestamp + ' .editPage').text(options.page);

          if (options.revision) {
            $('.ipe-editor.timestamp-' + timestamp + ' .diff-btn').attr('disabled', false).click(function () {
              _analysis('quick_diff_edit');
              var text = $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val();
              var diffJson = {
                fromrev: options.revision,
                totext: text,
                hideBtn: true,
                pageName: options.page,
                isPreview: true
              }
              if (options.section) {
                diffJson.fromsection = options.section;
              }
              quickDiff(diffJson);
            })
          }

          // 页面是否被保护
          if (options.protection.length > 0) {
            for (var i = 0; i < options.protection.length; i++) {
              if (options.protection[i].type === 'edit') {
                if (
                  (options.protection[i].level === 'autoconfirmed' && !_hasRight('autoconfirmed')) ||
                  (options.protection[i].level === 'sysop' && !_hasRight('editprotected')) ||
                  (config.wgNamespaceNumber === 8 && !_hasRight('editinterface'))
                ) {
                  ssi_modal.notify('dialog', {
                    className: 'in-page-edit',
                    position: 'center bottom',
                    title: _msg('notify-no-right'),
                    content: _msg('editor-no-right'),
                    okBtn: {
                      label: _msg('ok'),
                      className: 'btn btn-primary',
                      method: function (e, modal) {
                        modal.close();
                      }
                    }
                  });
                  $('.ipe-editor.timestamp-' + timestamp + ' .save-btn').addClass('btn-danger');
                }
              }
            }
          }

          // 获取编辑提示
          var namespaceNoticePage = 'Editnotice-' + options.namespace,
            pageNoticePage = namespaceNoticePage + '-' +
              options.page
                .replace(/_/, ' ') // 将页面名里的 _ 转换为空格
                .replace(config.wgFormattedNamespaces[options.namespace] + ':', ''); // 去掉名字空间

          mwApi.get({
            action: 'query',
            meta: 'allmessages',
            ammessages: namespaceNoticePage + '|' + pageNoticePage
          }).done(function (data) {
            var wikitextNs = data.query.allmessages[0]['*'] || '',
              wikitextPage = data.query.allmessages[1]['*'] || '';
            if (wikitextNs === '' && wikitextPage === '') return; // 没有编辑提示
            // 将编辑提示解析为 html
            mwApi.post({
              action: 'parse',
              title: options.page,
              contentmodel: 'wikitext',
              preview: true,
              text: wikitextPage + '\n' + wikitextNs
            }).done(function (data) {
              options.editNotice = data.parse.text['*'];
              var notice = $('.ipe-editor.timestamp-' + timestamp).data('editNotice') || '';
              notice += '\n' + options.editNotice;
              $('.ipe-editor.timestamp-' + timestamp).data('editNotice', notice);
              $('.ipe-editor.timestamp-' + timestamp + ' .showEditNotice').show();
            });
          });

        }
      }
    },

    /* 确认是否取消 */
    beforeClose: function (modal) {
      if ($('.ipe-editor.timestamp-' + timestamp + ' .editArea').attr('data-modifiled') !== 'true') {
        close();
        return;
      } else if ($('.ipe-editor.timestamp-' + timestamp + ' .editArea').attr('data-confirmclose') === 'true') {
        closeNoReload();
        return;
      }
      ssi_modal.confirm({
        className: 'in-page-edit',
        center: true,
        content: _msg('editor-leave-confirm'),
        okBtn: {
          className: 'btn btn-danger',
          label: _msg('confirm')
        },
        cancelBtn: {
          className: 'btn btn-secondary',
          label: _msg('cancel')
        }
      },
        function (result) {
          if (result === true) {
            close();
          }
        });
      function close() {
        $(window).unbind('beforeunload');
        modal.options.keepContent = false;
        modal.options.beforeClose = '';
        modal.close();
        ssi_modal.notify('info', {
          className: 'in-page-edit',
          position: 'right top',
          title: _msg('cancel'),
          content: _msg('notify-no-change')
        });
      }
      function closeNoReload() {
        $(window).unbind('beforeunload');
        modal.options.keepContent = false;
        modal.options.beforeClose = '';
        modal.close();
      }
      return false;
    }
  });

  // 页面详情模块
  $('.ipe-editor.timestamp-' + timestamp + ' .detailBtnGroup .detailBtn').click(function () {
    _analysis('quick_edit_pagedetail');
    var $this = $(this),
      id = $this.attr('id'),
      content = $('<ul>');
    switch (id) {
      case 'showTemplates':
        var templates = options.pageDetail.parse.templates,
          templateName;
        for (let i = 0; i < templates.length; i++) {
          templateName = templates[i]['*'];
          $('<li>').append(
            $('<a>', { href: mw.util.getUrl(templateName), target: '_blank', text: templateName }),
            ' (',
            $('<a>', { href: 'javascript:;', text: _msg('quick-edit'), class: 'quickEditTemplate', 'data-template-name': templateName }),
            ')'
          ).appendTo(content);
        }
        ssi_modal.show({
          className: 'in-page-edit quick-edit-detail',
          sizeClass: 'dialog',
          title: _msg('editor-detail-title-templates'),
          content: content
        });
        break;
      case 'showImages':
        var images = options.pageDetail.parse.images,
          imageName;
        for (let i = 0; i < images.length; i++) {
          imageName = images[i];
          $('<li>').append(
            $('<a>', { href: mw.util.getUrl('File:' + imageName), target: '_balnk', text: imageName }),
            ' (',
            $('<a>', { href: 'javascript:;', class: 'quickViewImage', text: _msg('editor-detail-images-quickview'), 'data-image-name': imageName }),
            ' | ',
            $('<a>', { href: config.wgScript + '?title=Special:Upload&wpDestFile=' + imageName + '&wpForReUpload=1', target: '_balnk', text: _msg('editor-detail-images-upload') }),
            ')'
          ).appendTo(content);
        }
        ssi_modal.show({
          className: 'in-page-edit quick-edit-detail',
          sizeClass: 'dialog',
          title: _msg('editor-detail-title-images'),
          content: content
        });
        break;
    }
    $('.in-page-edit.quick-edit-detail .quickEditTemplate').click(function () {
      _analysis('quick_edit_pagedetail_edit_template');
      var $this = $(this);
      var page = $this.attr('data-template-name');
      quickEdit({
        page: page
      });
    });
    $('.in-page-edit.quick-edit-detail .quickViewImage').click(function () {
      _analysis('quick_edit_pagedetail_view_image');
      var $this = $(this);
      var imageName = $this.attr('data-image-name');
      ssi_modal.show({
        className: 'in-page-edit quick-view-image',
        center: true,
        title: imageName.replace(/_/g, ' '),
        content: $('<center>', { id: 'imageLayer' }).append(
          $progress
        ),
        buttons: [{
          label: _msg('editor-detail-images-upload'),
          className: 'btn btn-primary',
          method() {
            window.open(config.wgScript + '?title=Special:Upload&wpDestFile=' + imageName + '&wpForReUpload=1');
          }
        }, {
          label: _msg('close'),
          className: 'btn btn-secondary',
          method: function (a, modal) { modal.close() }
        }],
        onShow: function () {
          mwApi.get({
            action: 'query',
            format: 'json',
            prop: 'imageinfo',
            titles: 'File:' + imageName.replace(/file:/g, ''),
            iiprop: 'url'
          }).done(function (data) {
            $('.quick-view-image .ipe-progress').hide();
            $('.quick-view-image #imageLayer').append(
              $('<img>', { src: data.query.pages['-1'].imageinfo[0].url, class: 'loading', style: 'max-width: 80%; max-height: 60vh' })
            );
            $('.quick-view-image #imageLayer img').load(function () {
              $(this).removeClass('loading');
            });
          })
        }
      });
    });
  });

  // 发布编辑模块
  function postArticle(pValue, modal) {
    _analysis('quick_edit_save');
    progress(_msg('editor-title-saving'));
    options.jsonPost = {
      action: 'edit',
      basetimestamp: $('.ipe-editor.timestamp-' + timestamp).data('basetimestamp'),
      starttimestamp: now,
      text: pValue.text,
      title: pValue.page,
      minor: pValue.minor,
      summary: pValue.summary,
      errorformat: 'plaintext'
    }
    if (pValue.section !== undefined && pValue.section !== '' && pValue.section !== null) {
      options.jsonPost.section = pValue.section;
      delete options.jsonPost.basetimestamp;
    }

    mwApi.postWithToken('csrf', options.jsonPost).done(saveSuccess).fail(saveError);

    // 保存正常
    function saveSuccess(data, feedback, errorThrown) {
      if (data.edit.result === 'Success') {
        progress(true);
        // 是否重载页面
        if ($('.ipe-editor.timestamp-' + timestamp + ' .reloadPage').prop('checked')) {
          var content;
          $(window).unbind('beforeunload');
          content = _msg('notify-save-success');
          setTimeout(function () {
            if (pValue.page === config.wgPageName) {
              window.location = mw.util.getUrl(pValue.page) + options.jumpTo;
              window.location.reload();
            } else {
              window.location.reload();
            }
          }, 500);
        } else {
          console.info('[InPageEdit] 将不会重载页面！');
          content = _msg('notify-save-success-noreload');
          setTimeout(function () {
            progress(false);
            $('.ipe-editor.timestamp-' + timestamp + ' .editArea').attr('data-confirmclose', 'true');
            modal.close();
          }, 1500);
        }

        ssi_modal.notify('success', {
          className: 'in-page-edit',
          position: 'right top',
          title: _msg('notify-success'),
          content: content
        });
      } else {
        saveError(data, feedback, errorThrown)
      }
    }

    // 保存失败
    function saveError(errorCode, feedback, errorThrown) {
      progress(false);
      var data = errorThrown || errorCode; // 规范错误代码
      var errorInfo,
        errorMore = '';
      if (data.errors !== undefined) {
        errorCode = data.errors[0].code;
        errorInfo = data.errors[0]['*'];
        errorMore = '';
      } else if (data.edit.result !== 'Success') {
        errorCode = data.edit.code || 'Unknown';
        errorInfo = data.edit.info || 'Reason unknown.';
        errorMore = data.edit.warning || '';
      } else {
        errorCode = 'unknown';
        errorInfo = 'Reason unknown.';
        errorMore = 'Please contact plug-in author or try again.'
      }
      ssi_modal.show({
        className: 'in-page-edit',
        sizeClass: 'dialog',
        center: true,
        title: _msg('editor-save-error'),
        content: errorInfo + '<hr style="clear: both" />' + errorMore
      });
      ssi_modal.notify('error', {
        className: 'in-page-edit',
        position: 'right top',
        closeAfter: {
          time: 15
        },
        title: _msg('notify-error'),
        content: _msg('editor-save-error') + '：<code>' + errorCode + '</code>'
      });

      console.error('[InPageEdit] Submit failed: \nCode: ' + errorCode);
      return;
    }
  }
}

module.exports = {
  quickEdit
}

/***/ }),

/***/ "./module/quickPreview.js":
/*!********************************!*\
  !*** ./module/quickPreview.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { $progress } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

var mwApi = new mw.Api();

/**
 * @module quickPreview 快速预览文章页
 * @param params {Object} 
 */
var quickPreview = function (params, modalSize = 'large', center = false) {
  var defaultOptions = {
    action: 'parse',
    preview: true,
    disableeditsection: true,
    prop: 'text',
    format: 'json'
  }
  var options = $.extend({}, defaultOptions, params);
  mw.hook('InPageEdit.quickPreview').fire();
  var timestamp = new Date().getTime();
  console.time('[InPageEdit] Request preview');
  ssi_modal.show({
    sizeClass: new RegExp(/dialog|small|smallToMedium|medium|mediumToLarge|large|full|auto/).test(modalSize) ? modalSize : 'large',
    center: Boolean(center),
    className: 'in-page-edit previewbox',
    title: _msg('preview-title'),
    content: $('<section>').append(
      $progress,
      $('<div>', { class: 'InPageEditPreview', 'data-timestamp': timestamp, style: 'display:none', text: _msg('preview-placeholder') })
    ),
    fixedHeight: true,
    fitScreen: true,
    buttons: [{ label: '', className: 'hideThisBtn' }],
    onShow() {
      $('.previewbox .ipe-progress').css('margin-top', $('.previewbox .ipe-progress').parent().height() / 2);
      $('.previewbox .hideThisBtn').hide();
      mwApi.post(options).then(function (data) {
        console.timeEnd('[InPageEdit] Request preview');
        var content = data.parse.text['*'];
        $('.previewbox .ipe-progress').hide(150);
        $('.InPageEditPreview[data-timestamp="' + timestamp + '"]').fadeIn(500).html(content);
      }).fail(function () {
        console.timeEnd('[InPageEdit] Request preview');
        console.warn('[InPageEdit] 预览失败');
        $('.previewbox .ipe-progress').hide(150);
        $('.InPageEditPreview[data-timestamp="' + timestamp + '"]').fadeIn(500).html(_msg('preview-error'));
      });
    }
  });
}

module.exports = {
  quickPreview
}

/***/ }),

/***/ "./module/quickRedirect.js":
/*!*********************************!*\
  !*** ./module/quickRedirect.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mwApi = new mw.Api();
var config = mw.config.get();

const { _analysis } = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { $br, $progress } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

const { _resolveExists } = __webpack_require__(/*! ./_resolveExists */ "./module/_resolveExists.js");
const { pluginPreference } = __webpack_require__(/*! ./pluginPreference */ "./module/pluginPreference.js");

/**
 * @module quickRedirect 快速重定向模块
 * @param {'from'|'to'} type
 */
var quickRedirect = function (type = 'to') {
  mw.hook('InPageEdit.quickRedirect').fire();
  var text = '#REDIRECT [[:$1]]',
    question,
    target,
    json = {
      action: 'edit',
      createonly: 1,
      minor: pluginPreference.get('editMinor'),
      format: 'json',
      errorformat: 'plaintext'
    },
    summary;

  if (type === 'to') {
    json.title = config.wgPageName;
    question = _msg('redirect-question-to', '<b>' + config.wgPageName.replace(/_/g, ' ') + '</b>');
  } else if (type === 'from') {
    question = _msg('redirect-question-from', '<b>' + config.wgPageName.replace(/_/g, ' ') + '</b>');
    summary = _msg('redirect-summary') + ' → [[:' + config.wgPageName + ']]';
    json.text = text.replace('$1', config.wgPageName);
  } else {
    console.error('[InPageEdit] quickRedirect only accept "from" or "to"');
    return;
  }

  ssi_modal.show({
    outSideClose: false,
    className: 'in-page-edit quick-redirect',
    center: true,
    sizeClass: 'dialog',
    title: _msg('redirect-title'),
    content: $('<div>').append(
      $('<section>').append(
        $('<span>', { html: question }),
        $br,
        $('<input>', { id: 'redirect-page', style: 'width:96%' }).click(function () { $(this).css('box-shadow', '') }),
        $br,
        $('<label>', { for: 'redirect-reason', text: _msg('editSummary') }),
        $('<input>', { id: 'redirect-reason', style: 'width:96%' })
      ),
      $($progress).css('display', 'none')
    ),
    buttons: [{
      label: _msg('confirm'),
      className: 'btn btn-primary btn-single okBtn',
      method: function (a, modal) {
        target = $('.in-page-edit.quick-redirect #redirect-page').val();
        if (target === '' || target.replace(/_/g, ' ') === config.wgPageName.replace(/_/g, ' ')) {
          $('.in-page-edit.quick-redirect #redirect-page').css('box-shadow', '0 0 4px #f00');
          return;
        }

        _analysis('quick_redirect');

        if (type === 'to') {
          summary = _msg('redirect-summary') + ' → [[:' + target + ']]';
          json.text = text.replace('$1', target);
        } else if (type === 'from') {
          json.title = target;
        }
        if ($('.in-page-edit.quick-redirect #redirect-reason').val() !== '') {
          summary = summary + ' (' + $('.in-page-edit.quick-redirect #redirect-reason').val() + ')';
        }
        json.summary = summary;

        $('.in-page-edit.quick-redirect .ipe-progress').show();
        $('.in-page-edit.quick-redirect section').hide();
        $('.in-page-edit.quick-redirect .okBtn').attr('disabled', 'disabled');

        mwApi.postWithToken('csrf', json).done(successed).fail(failed);
        // 重定向成功
        function successed(data) {
          if (data.errors) {
            failed(data.errors[0].code, data);
            return;
          }
          $('.in-page-edit.quick-redirect .ipe-progress').addClass('done');
          ssi_modal.notify('success', {
            className: 'in-page-edit',
            content: _msg('notify-redirect-success'),
            title: _msg('notify-success')
          });
          if (type === 'to') {
            window.location.reload();
          } else {
            $('.in-page-edit.quick-redirect .ipe-progress').addClass('done');
            setTimeout(function () { modal.close() }, 2000);
          }
        }
        // 重定向失败
        function failed(errorCode, errorThrown) {
          $('.in-page-edit.quick-redirect .ipe-progress').hide();
          $('.in-page-edit.quick-redirect section').show();
          $('.in-page-edit.quick-redirect .okBtn').attr('disabled', false);
          $('.in-page-edit.quick-redirect .ipe-progress').addClass('done');
          ssi_modal.notify('error', {
            className: 'in-page-edit',
            content: _msg('notify-redirect-error') + '<br>' + errorThrown.errors[0]['*'] + ' (<code>' + errorCode + '</code>)',
            title: _msg('notify-error')
          });
          // 如果是由于页面存在，给出解决方案
          if (errorCode === 'articleexists') {
            var fromPage,
              toPage;
            if (type === 'from') {
              fromPage = target;
              toPage = config.wgPageName;
            } else if (type === 'to') {
              fromPage = config.wgPageName;
              toPage = target;
            }
            _resolveExists(fromPage, {
              delete: 'Delete for redirect to [[' + toPage + ']]',
              edit: 'Modify for redirect'
            });
          }
        }
      }
    }
    ]
  });
}

module.exports = {
  quickRedirect
}

/***/ }),

/***/ "./module/quickRename.js":
/*!*******************************!*\
  !*** ./module/quickRename.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mwApi = new mw.Api();
var config = mw.config.get();

const { _analysis } = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { _hasRight } = __webpack_require__(/*! ./_hasRight */ "./module/_hasRight.js");
const { _resolveExists } = __webpack_require__(/*! ./_resolveExists */ "./module/_resolveExists.js");
const { $br } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

const { progress } = __webpack_require__(/*! ./progress */ "./module/progress.js");

/**
 * @module quickRename 快速重命名模块
 * @param {String} from
 * @param {String} to
 */
var quickRename = function (from, to) {
  mw.hook('InPageEdit.quickRename').fire();
  from = from || config.wgPageName;
  to = to || '';
  var reason,
    movetalk,
    movesubpages,
    noredirect;

  ssi_modal.show({
    outSideClose: false,
    className: 'in-page-edit quick-rename',
    center: true,
    sizeClass: 'dialog',
    title: _msg('rename-title'),
    content:
      $('<section>').append(
        $('<label>', { for: 'move-to', html: _msg('rename-moveTo', '<b>' + from.replace(/_/g, ' ') + '</b>') }),
        $br,
        $('<input>', { id: 'move-to', style: 'width:96%', onclick: "$(this).css('box-shadow','')" }),
        $br,
        $('<label>', { for: 'move-reason', text: _msg('editSummary') }),
        $br,
        $('<input>', { id: 'move-reason', style: 'width:96%' }),
        $br,
        $('<label>').append(
          $('<input>', { type: 'checkbox', id: 'movetalk', checked: 'checked' }),
          $('<span>', { text: _msg('rename-movetalk') })
        ),
        $br,
        $('<label>').append(
          $('<input>', { type: 'checkbox', id: 'movesubpages', checked: 'checked' }),
          $('<span>', { text: _msg('rename-movesubpages') })
        ),
        $br,

        $('<label>').append(
          $('<input>', { type: 'checkbox', id: 'noredirect' }),
          $('<span>', { text: _msg('rename-noredirect') })
        ),
      ),
    buttons: [{
      label: _msg('cancel'),
      className: 'btn btn-secondary',
      method: function (a, modal) {
        modal.close();
      }
    }, {
      label: _msg('confirm'),
      className: 'btn btn-primary',
      method: function () {
        to = $('.in-page-edit.quick-rename #move-to').val();
        if (to === '' || to === config.wgPageName || to === config.wgPageName.replace(/_/g, ' ')) {
          $('.in-page-edit.quick-rename #move-to').css('box-shadow', '0 0 4px #f00');
          return;
        }

        _analysis('quick_move');

        progress(_msg('editor-title-saving'));
        movetalk = $('.in-page-edit.quick-rename #movetalk').prop('checked');
        movesubpages = $('.in-page-edit.quick-rename #movesubpages').prop('checked');
        noredirect = $('.in-page-edit.quick-rename #noredirect').prop('checked');
        reason = $('.in-page-edit.quick-rename #move-reason').val();

        if (reason === '') {
          reason = _msg('rename-summary') + ' → [[:' + to + ']]';
        } else {
          reason = _msg('rename-summary') + ' → [[:' + to + ']] (' + reason + ')';
        }
        mwApi.postWithToken('csrf', {
          action: 'move',
          from: from,
          to: to,
          reason: reason,
          movetalk: movetalk,
          movesubpages: movesubpages,
          noredirect: noredirect
        }).done(function () {
          progress(true);
          ssi_modal.notify('success', {
            className: 'in-page-edit',
            content: _msg('notify-rename-success'),
            title: _msg('notify-success')
          });
          location.href = config.wgArticlePath.replace('$1', to);
        }).fail(function (errorCode, feedback, errorThrown) {
          progress(false);
          ssi_modal.notify('error', {
            className: 'in-page-edit',
            content: _msg('notify-rename-error') + ': ' + errorThrown.error.info + '<code>' + errorThrown.error.code + '</code>',
            title: _msg('notify-error')
          });
          // 如果原因是页面已存在，给出解决方案
          if (errorThrown.error.code === 'articleexists') {
            _resolveExists(to, 'For move page [[' + from + ']] to here.');
          }
        });
      }
    }],
    beforeShow: function () {
      if (!_hasRight('move')) {
        ssi_modal.dialog({
          title: _msg('notify-no-right'),
          content: _msg('rename-no-right'),
          className: 'in-page-edit quick-deletepage',
          center: true,
          okBtn: {
            className: 'btn btn-primary btn-single'
          }
        });
        return false;
      }
    }
  });
}

module.exports = {
  quickRename
}

/***/ }),

/***/ "./module/specialNotice.js":
/*!*********************************!*\
  !*** ./module/specialNotice.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// const api = require('./api.json');
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js")

/**
 * @module specialNotice 特别通知
 */
var specialNotice = function () {
  ssi_modal.notify('dialog', {
    className: 'in-page-edit ipe-special-notice',
    title: _msg('version-notice-title'),
    content: _msg('version-notice'),
    okBtn: {
      label: _msg('updatelog-dismiss'),
      className: 'btn btn-primary'
    }
  }, function (e, modal) {
    localStorage.setItem('InPageEditNoticeId', _msg('noticeid'));
    modal.close();
  });
}

module.exports = {
  specialNotice
}

/***/ }),

/***/ "./module/version.js":
/*!***************************!*\
  !*** ./module/version.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const version = __webpack_require__(/*! ../package.json */ "./package.json").version;

module.exports = version;

/***/ }),

/***/ "./module/versionInfo.js":
/*!*******************************!*\
  !*** ./module/versionInfo.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const api = __webpack_require__(/*! ./api.json */ "./module/api.json");
const version = __webpack_require__(/*! ./version */ "./module/version.js");

/**
 * @module versionInfo 版本信息模块
 * @description Show Update Logs Modal box
 */
var versionInfo = function () {
  // 显示模态框
  ssi_modal.show({
    className: 'in-page-edit update-logs-modal',
    title: _msg('updatelog-title') + ' - <span id="yourVersion">' + version + '</span>',
    content: $('<section>').append(
      $('<iframe>', { style: 'margin: 0;padding: 0;width: 100%;height: 80vh;border: 0;', src: api.updatelogsUrl })
    ),
    buttons: [{
      label: 'GitHub',
      className: 'btn btn-secondary',
      method: function () {
        window.open(api.githubLink);
      }
    }, {
      label: _msg('updatelog-about'),
      className: 'btn btn-secondary',
      method: function () {
        window.open(api.aboutUrl);
      }
    }, {
      label: _msg('close'),
      className: 'btn btn-primary',
      method: function (a, modal) {
        modal.close();
      }
    }]
  });
}

module.exports = {
  versionInfo
}

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, dependencies, devDependencies, scripts, repository, keywords, author, license, bugs, homepage, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"inpageedit-v2\",\"version\":\"14.0.0\",\"description\":\"A useful MediaWiki JavaScript Plugin written with jQuery\",\"main\":\"index.js\",\"dependencies\":{\"jquery\":\">1.9.x\",\"ssi-modal\":\"1.0.28\"},\"devDependencies\":{\"css-loader\":\"^4.2.2\",\"eslint\":\"^7.7.0\",\"file-loader\":\"^6.0.0\",\"style-loader\":\"^1.2.1\",\"webpack\":\"^4.44.1\",\"webpack-cli\":\"^3.3.12\"},\"scripts\":{\"build\":\"webpack && set MINIFY=1 && webpack\",\"dev\":\"webpack --watch --output-filename [name].test.js\",\"test\":\"eslint ./index.js ./module/*.js ./method/*.js\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/Dragon-Fish/InPageEdit-v2.git\"},\"keywords\":[\"mediawiki\",\"mediawiki-gadget\",\"inpageedit\"],\"author\":\"Dragon Fish\",\"license\":\"GPL-3.0-or-later\",\"bugs\":{\"url\":\"https://github.com/Dragon-Fish/InPageEdit-v2/issues\"},\"homepage\":\"https://github.com/Dragon-Fish/InPageEdit-v2#readme\"}");

/***/ }),

/***/ "./plugins/index.json":
/*!****************************!*\
  !*** ./plugins/index.json ***!
  \****************************/
/*! exports provided: demo.js, toolbox.js, edit-any-page.js, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"demo.js\":{\"name\":\"Plugin Demo\",\"description\":\"A InPageEdit Plugin Demo\"},\"toolbox.js\":{\"name\":\"InPageEdit Toolbox\",\"author\":\"机智的小鱼君\",\"description\":\"[Official] Add a toolbox in the bottom-right corner of your screen. Let you quickly access frequently used IPE functions.\"},\"edit-any-page.js\":{\"name\":\"Edit any page\",\"author\":\"机智的小鱼君\",\"description\":\"Add a button into IPE Toolbox that let you edit any page any where\",\"dependency\":[\"toobox.js\"]}}");

/***/ })

/******/ });
//# sourceMappingURL=InPageEdit.js.map