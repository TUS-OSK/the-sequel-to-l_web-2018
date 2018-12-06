# #1: Introduction
[Google Slides](https://docs.google.com/presentation/d/1M-3jyZwTDjjaM7M8Mi1DdN_nCIkjyQrs7FuiP6cor6k/edit?usp=sharing)
### おしながき
1. Node.jsのインストール
2. npm (yarn) の使い方
3. サーバーを書いてping/pongする
4. HTMLでGUIをつける

## Node.jsのインストール
### Windows
[nodejs.org](https://nodejs.org/)からLTSをダウンロード&インストールしてください

### Mac / Linux
[nvm](https://github.com/creationix/nvm#installation)をインストールします
```shell
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```
インストールしたら、
```shell
nvm install --lts
```
を実行して最新のLTSをインストールしてください

### 各OS共通
Node.jsのインストールが終わったら
```shell
node -v
```
でバージョンを確認してください
```shell
$ node -v
v10.13.0
```
というお返事があれば完璧です

```shell
node: command not found
```
とかなんとか仰る場合は見せてください

## npm (yarn) の使い方
Node.jsをインストールすると一緒にnpmも入ります  
npmとはNode Package Managerのことで、強いおじさんが作ってくれたパッケージを使うときにその依存関係を賢く管理してくれるツールです
```shell
npm install <パッケージ名> --save
```
とするとパッケージを node_modules/ 下にインストールするとともに、 package.json に依存関係をまとめたJSONデータを書き出します  
node_modulesは宇宙でも指折りの重さを誇っている (参考画像) ので、Gitではこれをignoreしてpackage.jsonだけをコミットするようにしましょう  
<img style="width: 300px;" alt="heaviest objects in the universe" src="https://i.redd.it/tfugj4n3l6ez.png" />

つまりクローンしてきたNodeのプロジェクトにはnode_modulesがないためまずはインストールしなければなりません
```shell
npm install
```
パッケージ名を指定せずにnpm installを実行するとpackage.jsonを元に自動的にパッケージ群をインストールしてくれます

また、ほぼ (全く？) 同じ機能を持つコマンドに yarn があります  
こっちはnpmと違って付属品ではありません  
でも、npmより若干速いとかなんとか、たくさんの人が使っています  
気になったら[Yarn](https://yarnpkg.com/docs/install)からインストールしてみましょう

### Tips
```shell
npm install
```
は
```shell
npm i
```
とクソ省略して書くことができます

## サーバーを書いてping/pongする
ついにサーバーを書きます  
まずはNode.js上で動くExpressというサーバーフレームワークを使います  
作業ディレクトリに入り、Expressをインストールします
```shell
cd practice	# 作業ディレクトリ
npm init	# Enter連打
npm install express --save
# = yarn add express
```
インストールできたら server.js を作り編集します
```js
// server.js
const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})
```
[公式リファレンス](https://expressjs.com/en/starter/hello-world.html)の丸パクリです

保存したら実行しましょう
```shell
node server.js
```
実行したまま、ブラウザで [localhost:3000](http://localhost:3000) にアクセスするとHello World!が見えるのではないでしょうか  
ノルマ達成ですね

/pingにアクセスすると"pong"と返すようにしましょう  
Hello Worldのコピペでできますね
```js
// server.js
const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res) => {
	res.send("Hello World!")
})
app.get("/ping", (req, res) => {
	res.send("pong")
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})
```
ブラウザで [localhost:3000/ping](http://localhost:3000/ping) にアクセスしてみましょう  
このping/pongはサーバーが生きてるかどうかを確認 (疎通確認) するために実装しておくと便利です

## HTMLでGUIをつける
人力でブラウザからサーバーのレスポンスを見ることはできました  
では、クライアントサイドのJSからサーバーにアクセスしてみましょう  
public/ ディレクトリを作って、その中に index.html と main.js を作って編集しましょう
```html
<!DOCTYPE html>
<html>
<head>
	<title>ajax practice</title>
	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body>
	<div id="response"></div>
	<div>
		<input id="send" type="button" value="ping" />
	</div>
	<script src="main.js"></script>
</body>
</html>
```
5行目に[axios](https://github.com/axios/axios)というライブラリを仕込んでいます
```js
// main.js
document.querySelector("#send").addEventListener("click", event => {
	axios.get("/ping")
	.then(res => {
		document.querySelector("#response").innerText += res.data
	})
})
```
axiosを使って/pingからのレスポンスを取得してHTMLに書き込みます  
このような画面遷移を伴わない動的なHTMLの更新を目的とした通信をAjaxと呼びます  
でも、このままではサーバーがHTMLを返してくれないので実行できません  
server.jsからHello World!を消して
```js
app.use(express.static("public"))
```
に差し替えます  
express.staticという標準の静的ファイルサーバーミドルウェアをexpressに登録する関数です
```js
// server.js
const express = require("express")
const app = express()
const port = 3000

app.use(express.static("public"))

app.get("/ping", (req, res) => {
	res.send("pong")
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})
```
ここまでできたらまたブラウザで [localhost:3000](http://localhost:3000) にアクセスしてみましょう  
表示されたHTMLのボタンを押すとpongが書き込まれるはずです

基本は以上です  
あとはこれを応用するだけです
