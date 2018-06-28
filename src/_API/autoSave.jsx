export function createAutoSave(interval = 5000) {
	const localState = localStorage.getItem('@lh/project')
	if(localState) {
		const state = JSON.parse(localState)
		this.setState(state)
	}

	return setInterval(() => {
		localStorage.setItem('@lh/project', JSON.stringify(this.state))
	}, interval)
}