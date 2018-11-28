# #0: Object Oriented Programming
### おしながき
1. OOPとは
2. うるせェ！いこう！！

## OOPとは
OOP (Object Oriented Programming, オブジェクト指向プログラミング) では、プログラムを仮想的な「モノ」の集まりと「関係」として扱います  
JavaScriptでは「モノ」をObjectや、それらを抽象化した (概念を抽出した) Classとして扱います  
そして抽象化されたClassをより具象的なClassに、**継承**することで「関係」づけます  
同じClassから継承されたClass同士は共通した属性 (property) や機能 (method) を持ちます  
Class (抽象) から生成したObjectをinstance (具象) と呼びます
  
## うるせェ！いこう！！ 
JavaScriptではクラスを次のように宣言します
```js
class Classname {
	constructor() {
		this.property = value
	}
	method() {
		// method
	}
}
```
また、次のように継承します
```js
class SubClass extends SuperClass {
	constructor() {
		super()
		this.property = value
	}
	method() {
		// method
	}
}
```
ただし、constructorは上書き (= オーバーライド (後述) ) する必要がなければ省略可能です  
これらのクラスは

人間クラスを作りましょう  
人間ならば名前 (ファーストネームとラストネーム) を持つことにします
```js
class Human {
	constructor(firstname, lastname) {
		this.firstname = firstname
		this.lastname = lastname
	}
	get fullname() {
		return `${ this.firstname } ${ this.lastname }`
	}
}
```
これを継承してアメリカ人クラスを作りましょう
```js
class American extends Human {
	greet() {
		console.log(`Hello! I am ${ this.fullname }.`)
	}
}
```
アメリカ人なので英語で挨拶します
```js
const ry = new American("Ryan", "Dahl")
ry.greet()
// -> Hello! I am Ryan Dahl
```
日本人クラスではどうでしょう
```js
class Japanese extends Human {
	greet() {
		console.log(`こんにちは！ 私は ${ this.fullname } です。`)
	}
}
```
日本人なので日本語で挨拶します
```js
const yf = new American("陽介", "古川")
yf.greet()
// -> こんにちは！ 私は 陽介古川 です。
```
できましたが、これでは少し残念です  
継承では親クラス (super class) のプロパティやメソッドを上書きする (オーバーライドする) ことができます
```js
class Japanese extends Human {
	get fullname() {
		return `${ this.lastname }${ this.firstname }`
	}
	greet() {
		console.log(`こんにちは！ 私は ${ this.fullname } です。`)
	}
}
```
fullnameのgetterをオーバーライドしました
```js
const yf = new American("陽介", "古川")
yf.greet()
// -> こんにちは！ 私は 古川陽介 です。
```
うれしいですね  

