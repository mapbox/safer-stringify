var fs = require('fs');
var test = require('tape');
var assert = require('assert');
var saferstringify = require('../index.js');

test('saferstringify escapes forward slash and line breaks', function(t){
	var obj = {};
	obj.github = 'http://www.github.com/mapbox/saferstringify';
	t.deepEqual(saferstringify(obj, null, 2), '{\n  "github": "http:\\/\\/www.github.com\\/mapbox\\/saferstringify"\n}');
	t.end();
});

test('saferstringify escapes forward slash and quotes', function(t){
	var obj = {};
	obj.script = '<script>wut("lol")</script>';
	t.deepEqual(saferstringify(obj, null, 2), '{\n  "script": "<script>wut(\\"lol\\")<\\/script>"\n}');
	t.end();
});

test('saferstringify escapes u2028 + u2029', function(t){
	var obj = fs.readFileSync('./test/fixture.txt', 'utf8');
	t.deepEqual(saferstringify(obj, null, 2), "\"{'github': 'http:\\/\\/www.github.com\\/mapbox\\/saferstringify', 'escape': 'a\\u2028a\\u2029a\\u2028a\\u2029a', 'script': '<script>wut(\\\"lol\\\")<\\/script>' }\"");
	t.end();
});
