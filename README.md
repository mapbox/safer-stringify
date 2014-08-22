#safer-stringify

Like JSON.stringify, but escapes forward slashes and line terminators.

##Usage
Same arguments as [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify): 

`saferstringify(obj, replacer, spaces)`

```javascript
var saferstringify = require('safer-stringify');

var obj = {};
obj.github = 'http://www.github.com/mapbox/saferstringify'
obj.escape = '\U2028 and "\U2029"';
obj.script = '<script>wut("lol")</script>';

saferstringify(obj, null, 2);

```
Output:

```javascript
{
  "github": "http:\/\/www.github.com\/mapbox\/saferstringify",
  "escape": "U2028 and \"U2029\"",
  "script": "<script>alert(\"xss\")<\/script>"
}
```
##Reasoning

A unescaped `</script>` tag in JSON will be parsed in HTML as the closing script tag regardless of whether it was intended as that or not. See [http://stackoverflow.com/questions/66837/when-is-a-cdata-section-necessary-within-a-script-tag/1450633#1450633](http://stackoverflow.com/questions/66837/when-is-a-cdata-section-necessary-within-a-script-tag/1450633#1450633)

u2028 and u2029 must be escaped because no string in JavaScript can contain a literal U+2028 or a U+2029, as they are line terminators. See [http://timelessrepo.com/json-isnt-a-javascript-subset](http://timelessrepo.com/json-isnt-a-javascript-subset)