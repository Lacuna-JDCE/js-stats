# JavaScript source code statistics tool.
This Node.js script parses a source file and provides information about the following:

+ Source size
+ Function statistics:
	+ total number of functions and empty functions
	+ number of function declarations and expressions
	+ number of empty function declarations and expressions



## Running
```
node ./stats.js <file> [options]
```
_file_ is the JS source file the tool is run upon (mandatory). _options_ allow you to specify more settings:

| Long      | Short | Description                                    |
|-----------|-------|------------------------------------------------|
| --plain   | -p    | Only output numbers, without description.      |

The plain option will output the following numbers, separated with a space:
```
source-size functions function-declarations function-expressions empty-functions empty-function-declarations empty-function-expressions
```
