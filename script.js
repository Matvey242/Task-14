import { PREFIX } from './api.js'
import { getDataFunction, postDataFunction } from './functions.js'

const list = document.querySelector('.list')
const sendBlock = document.querySelector('.sendBlock')
const getbtn = document.querySelector('.getbtn')
const sortbtn = document.querySelector('.sortbtn')
const smashbtn = document.querySelector('.smashbtn')
const nameInput = document.querySelector('.i-name > input')
const linkInput = document.querySelector('.i-link > input')


class Block {
	constructor(name, link) {
		this.name = name
		this.link = link
	}

	static createBlock(block) {
		return `
			position: relative;
			background-image: url('${block.link}');
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			width: 400px;
			height: 500px;
			border: 2px solid orange;
			border-radius: 5px;
			flex-shrink: 0;
			display: flex; 
			align-items: flex-end; 
			justify-content: center;
		`
	}

	static displayBlock(list, block) {
		const blockS = Block.createBlock(block);
		list.insertAdjacentHTML(
			'beforeend',
			`<div style="${blockS}">
				<div style="padding: 10px; background-color: rgba(255, 165, 0, 0.7); width: 100%; text-align: center;">${block.name}</div>
			</div>`
		)
	}
}

sortbtn.addEventListener('click', async e => {
	e.preventDefault()
	const blocks = await getDataFunction(PREFIX)
	blocks.sort((a, b) => a.name.localeCompare(b.name))
	list.innerHTML = ''
	blocks.forEach(blockData => {
		const block = new Block(blockData.name, blockData.link)
		Block.displayBlock(list, block)
	})
})

smashbtn.addEventListener('click', async e => {
	e.preventDefault()
	try {
		const blocks = await getDataFunction(PREFIX)
		const randomBlocks = randomchik(blocks)
		list.innerHTML = ''
		randomBlocks.forEach(blockData => {
			const block = new Block(blockData.name, blockData.link)
			Block.displayBlock(list, block)
		})
	} catch (err) {
		console.error('Ошибка при перемешивании блоков', err)
	}
})

function randomchik(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let randomm = Math.floor(Math.random() * (i + 1))
		while (randomm === i) {
			randomm = Math.floor(Math.random() * (i + 1))
		}
		[array[i], array[randomm]] = [array[randomm], array[i]]
	}
	return array
}

async function getBlocks() {
	try {
		const blocks = await getDataFunction(PREFIX)
		blocks.forEach(blockData => {
			const block = new Block(blockData.name, blockData.link)
			Block.displayBlock(list, block)
		})
		console.log(blocks)
	} catch (err) {
		console.error('Ошибка при получении блоков', err)
	}
}

async function createAndSendBlockToDB() {
	const newBlock = new Block(
		nameInput.value,
        linkInput.value
	)
	try {
		const response = await postDataFunction(PREFIX, newBlock)
		console.log(response)
	} catch (err) {
		console.error('Ошибка при отправке блока в БД', err)
	}
	console.log(newBlock)
}


getbtn.addEventListener('click', e => {
	e.preventDefault()
	getBlocks(PREFIX)
})

sendBlock.addEventListener('click', e => {
	e.preventDefault()
	createAndSendBlockToDB(PREFIX)
})