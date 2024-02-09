function _error(code, result) {
	if (code === 'http') {
		return result.exception || result.textStatus
	} else if (code === 'okay-but-empty') {
		return result
	}
	return result.errors[0].html
}

module.exports = {
	_error,
}
