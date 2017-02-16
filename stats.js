/*
	JavaScript source code statistics tool.
	v1.0
	Niels Groot Obbink

	Outputs information about a JavaScript source file.
	If the 'plain' option is set, the output contains just the numbers separated by a space.
*/

'use strict';

const argument_parser = require('command-line-args'),
      file_system = require('fs'),
      esprima = require('esprima');



// Get command line arguments.
const options = argument_parser(
[
	{ name: 'file', type: String, defaultOption: true },
	{ name: 'plain', type: Boolean, alias: 'p' }
]);

if( ! options['file'] )
{
	console.error('No file specified.');
	process.exit(1);
}

if( ! options['plain'] )
{
	options['plain'] = false;
}


// Check if the input file exists.
if( ! file_system.existsSync( options.file ) )
{
	console.error('File', options.file, 'doesn\'t exist or isn\'t readable.');
	process.exit(2);
}


// Save all function declaration and expressions in [functions].
let functions = [];

// Retrieve the source code, and save the length.
const source_code = file_system.readFileSync( options.file ).toString();

// Parse the source code and walk over every node.
esprima.parse(source_code, {range: true}, function(node, meta)
{
	if( node.type == 'FunctionExpression' || node.type == 'FunctionDeclaration' )
	{
		functions.push( node );
	}
});


// Initialize the results.
let results =
{
	size: source_code.length,

	functions: 0,
	function_declarations: 0,
	function_expressions: 0,
	empty_functions: 0,
	empty_function_declarations: 0,
	empty_function_expressions: 0
};


// Check out each function node and update the results accordingly.
functions.forEach(function(func)
{
	results.functions++;

	if( func.type == 'FunctionDeclaration' )
	{
		results.function_declarations++;
	}else{
		results.function_expressions++;
	}

	// If the body of our function has no elements, it's an empty function.
	if(func.body.body.length == 0)
	{
		results.empty_functions++;

		if( func.type == 'FunctionDeclaration' )
		{
			results.empty_function_declarations++;
		}else{
			results.empty_function_expressions++;
		}
	}
});


if( options.plain )
{
	let output = [];

	for(let prop in results)
	{
		output.push( results[prop] );
	}

	console.log(output.join(' '));
}else{
	for(let prop in results)
	{
		console.log(prop.replace('_', ' ') + ': ' + results[prop]);
	}	
}
