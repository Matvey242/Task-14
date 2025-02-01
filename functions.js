export const postDataFunction = async (url, obj) => {
	const postData = async (url, obj) => {
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(obj),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
		const json = await res.json()
		return json
	}

	try {
		const data = await postData(url, obj)
		return data
	} catch (error) {
		console.log(`Произошла ошибка в postData, ${error.message}`)
	}
}

export const getDataFunction = async url => {
    const getData = async url => {
        const res = await fetch(url)
        const json = await res.json()
        return json
    }

    try {
        const data = await getData(url)
        return data
    } catch (error) {
        console.log(`Произошла ошибка в getData, ${error.message}`)
    }
}