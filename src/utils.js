String.prototype.capitalize = function() {
	if(!this) return ''
	return this.charAt(0).toUpperCase() + this.slice(1);
}