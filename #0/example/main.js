class Human {
	constructor(firstname, lastname) {
		this.firstname = firstname
		this.lastname = lastname
	}
	get fullname() {
		return `${ this.firstname } ${ this.lastname }`
	}
}
class American extends Human {
	greet() {
		console.log(`Hello! I am ${ this.fullname }.`)
	}
}
class Japanese extends Human {
	get fullname() {
		return `${ this.lastname }${ this.firstname }`
	}
	greet() {
		console.log(`こんにちは！ 私は ${ this.fullname } です。`)
	}
}
