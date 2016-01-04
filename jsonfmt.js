var argv = require('yargs').argv;

process.stdin.setEncoding('utf8');
var buf = '';

process.stdin.on('data', function(chunk) {
	buf += chunk;
});
process.stdin.on('end', function() {
	console.log(processJSON(buf));
});
process.stdin.resume();


function processJSON(str) {
	var json = JSON.parse(str);
	if (argv.u || argv.unpack)
		return unpackJSON(json);
	else
		return JSON.stringify(json);
}

function unpackJSON(json) {
	var depth =
		argv.d !== undefined ? argv.d :
		argv.depth !== undefined ? argv.depth :
		Number.MAX_VALUE;
	return unpackJSON_r(json, depth - 1, '');
}

function unpackJSON_r(json, depth, indent) {
	if (depth < 0) return JSON.stringify(json);
	var items = [];
	if (json instanceof Array) {
		for (var i = 0; i < json.length; i++)
			items.push(unpackJSON_r(json[i], depth - 1, indent + '\t'));
		return joinItems(items, '[', ']', indent);
	}
	else if (json instanceof Object) {
		for (var o in json)
			if (json.hasOwnProperty(o))
				items.push('"' + o + '": ' + unpackJSON_r(json[o], depth - 1, indent + '\t'));
		return joinItems(items, '{', '}', indent);
	}
	else if (typeof json == 'string')
		return '"' + json + '"';
	else
		return json; 
}

function joinItems(items, open, close, indent) {
	if (items.length == 0) return open + close;
	return open + '\n' + indent + '\t' +
		items.join(',\n' + indent + '\t') +
		'\n' + indent + close;
}