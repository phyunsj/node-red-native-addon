module.exports = function(RED) {
    "use strict";
    var os = require('os');
    var fs = require('fs');

    function utf8ToString( utf8Array ) {
        let s = "";
        for (let i = 0; utf8Array[i]; i++) {
          s += String.fromCharCode(utf8Array[i]);
        }
        return s;
    }

    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var instance = null;
        var mem = new WebAssembly.Memory({ initial: 256, maximum: 256 });

        // standard dynamic library imports
        var imports = {};
        imports.env = imports.env || {};
        imports.env.memoryBase = imports.env.memoryBase || 0;
        imports.env.tableBase = imports.env.tableBase || 0;
        if (!imports.env.memory) {
           imports.env.memory = mem;
        }
        if (!imports.env.table) {
           imports.env.table = new WebAssembly.Table({ initial: 0, element: 'anyfunc' });
        }
        

        const assemblyActivate = async() => {
            const buffer = fs.readFileSync('./node_modules/node-red-contrib-lowercase/lowercase.wasm');
            const module = await WebAssembly.compile(buffer);
            instance = await WebAssembly.instantiate(module, imports || {} );  
            console.log(instance.exports);
        }

        assemblyActivate();

        node.on('input', function(msg) {
            /* Uint8Array(buffer [, byteOffset [, length]]); */
            var ptr = new Uint8Array(mem.buffer, 0, msg.payload.length );
             
            // String to UTF8
            var utf8 = unescape(encodeURIComponent(msg.payload));
            for (var i = 0; i < utf8.length; i++) {
                ptr[i] = utf8.charCodeAt(i);
            }
            
            console.log(ptr); 
            instance.exports._lowercase(ptr);
            console.log(ptr);
            
            // UTF8 to String
            msg.payload = utf8ToString(ptr);
            node.send(msg);
            
        });


    }
    RED.nodes.registerType("lower-case",LowerCaseNode);
}