module.exports = function(RED) {
    "use strict";
    var os = require('os');
    var fs = require('fs');
    
    function NativeSquare(n) {
        RED.nodes.createNode(this,n);
          
        var node = this;
        var instance = null;
        // standard dynamic library imports
        var imports = {};
        imports.env = imports.env || {};
        imports.env.memoryBase = imports.env.memoryBase || 0;
        imports.env.tableBase = imports.env.tableBase || 0;
        if (!imports.env.memory) {
           imports.env.memory = new WebAssembly.Memory({ initial: 256 });
        }
        if (!imports.env.table) {
           imports.env.table = new WebAssembly.Table({ initial: 0, element: 'anyfunc' });
        }

        const assemblyActivate = async() => {
            const buffer = fs.readFileSync('./node_modules/node-red-contrib-nativesquare/square.wasm');
            const module = await WebAssembly.compile(buffer);
            instance = await WebAssembly.instantiate(module, imports);
            console.log(instance.exports);
        }

        assemblyActivate();

        node.on('input', function(msg) {
            if ( Number.isInteger(msg.payload)) {
                if ( instance ) {
                    this.status({fill:"green",shape:"dot",text:"operating. square("+ msg.payload+ ")"}); 
                    msg.payload = instance.exports._square( parseInt(msg.payload) );
                    node.send(msg);
                } else this.status({fill:"red",shape:"dot",text:"fatal webassembly error."});
            } else {

               this.status({fill:"red",shape:"ring",text:"type error : integer only"});
               node.send(null);
           }
        });
        
    }

    RED.nodes.registerType("native-square", NativeSquare);
}

