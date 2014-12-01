function clicker(key){
 
 // console.log(path['key'], key, path)
 // var path = {
 // 	"ball": "./balldemo/ballbounce.html"
 // 	"grow": "./growdemo/containerGrow.html"
 // 	"window": "./window demo/windowScroll.html"
 // }
var path = {
	ball: "./balldemo/ballbounce.html",
	grow: "./growdemo/containerGrow.html",
	pane: "./window demo/windowScroll.html"
}
console.log(path[key])

console.log(document.getElementById('frame').src = path[key])
//document.getElementById('frame').src = path[key];

}