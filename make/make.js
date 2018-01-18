var fs = require("fs");

var remark = function (mark, txt, vars) {
	var rx = "<!----"+mark+"---->[\\S\\s]*<!---/"+mark+"---->"
	var re = new RegExp(rx, "gm");

	var replacementFile = fs.readFileSync("../"+mark)+"";

	var rg = new RegExp("[["+vars+"]]", "gm")
	replacementFile = replacementFile.replace(rg, ' class="active"');

	replacementFile = replacementFile.replace(/\[\[.*?\]\]/gm, '');


	var replacement = "<!----"+mark+"---->"+replacementFile+"<!---/"+mark+"---->"

	var txt = txt.replace(re, replacement)
	return txt;
}

var repl = function (vars) {
	var fn = "../"+vars;
	var txt = fs.readFileSync(fn)+"";
	var re = /<!----(.*?)---->/g
	//var marks = re.exec(txt);
	var marks = txt.match(re);

	marks = marks.map(function(s){return s.replace("<!----","").replace("---->","")})

	for (var i=0;i<marks.length;i++) {
		txt = remark(marks[i],txt,vars)
	}

	//console.log(txt)

	fs.writeFileSync(fn,txt)

}

repl("index.html")