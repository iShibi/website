export function typeKey(type: string | string[]) {
	return typeof type === 'string' ? type : type.join('-');
}
