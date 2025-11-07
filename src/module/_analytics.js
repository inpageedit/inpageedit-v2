/**
 * @deprecated
 * @module _analytics 提交统计信息模块
 */
export function _analytics(_) {
  return console.debug('[InPageEdit] 我们已不再收集 v2 的使用信息。')
}

export {
  _analytics as _analysis, // legacy alias
}
