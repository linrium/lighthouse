export const captureFile = (cbBuffer, cbURL) => files => {
	// e.preventDefault()
	const file = files[0]
	const reader = new window.FileReader()
	reader.readAsArrayBuffer(file)
	reader.onloadend = () => {
		cbBuffer(reader)
	}


	const readerURL = new window.FileReader()
	readerURL.readAsDataURL(file)
	readerURL.onloadend = () => {
		cbURL(readerURL)
	}
}