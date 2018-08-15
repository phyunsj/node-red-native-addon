
## Compiling lowercase.c -> lowercase.wasm

> emcc lowercase.c -s WASM=1  -O3 -o lowercase.js  

## Passing String (or Array)

WebAssembly doesn't natively support a string type, it rather supports i32 / i64 / f32 / f64 value types as well as i8 / i16 for storage.

```
            var ptr = new Uint8Array(mem.buffer, 0, msg.payload.length );
             
            // String to UTF8
            var utf8 = unescape(encodeURIComponent(msg.payload));
            for (var i = 0; i < utf8.length; i++) {
                ptr[i] = utf8.charCodeAt(i);
            }
            
            instance.exports._lowercase(ptr); // Calling lowercase(char *ptr)
            
            // UTF8 to String
            msg.payload = utf8ToString(ptr);
 ```

You can interact with a WebAssembly instance using:

- exports, where from JavaScript you call into WebAssembly, and WebAssembly returns a single value type.
- imports where WebAssembly calls into JavaScript, with as many value types as you want (note: the count must be known at Module compilation time, this isn't an array and isn't variadic).
- Memory.buffer, which is an ArrayBuffer that can be indexed using (among others) Uint8Array.

More about Array
- [JavaScript typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)
- [Hello World in WebAssembly](https://medium.com/@mbebenita/hello-world-in-webassembly-83951757775)
- [Passing and returning array parameters](https://becominghuman.ai/passing-and-returning-webassembly-array-parameters-a0f572c65d97)

## FYI

- [MDN WebAssembly documentation](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [Code examples that accompany MDN WebAssembly documentation](https://github.com/mdn/webassembly-examples)
- [WebAssembly Example](https://medium.com/@matzewagner/creating-a-webassembly-work-environment-c584b15fdb73)
- [Standalone WebAssembly Example](https://gist.github.com/kripken/59c67556dc03bb6d57052fedef1e61ab)
- [Cheerp Tutorial: Mixed mode C++ to WebAssembly and JavaScript](https://github.com/leaningtech/cheerp-meta/wiki/Cheerp-Tutorial:-Mixed-mode-C---to-WebAssembly-and-JavaScript)
- [Writing WebAssembly By Hand](https://blog.scottlogic.com/2018/04/26/webassembly-by-hand.html)
- [Emscripten](http://kripken.github.io/emscripten-site/index.html)
- [Interacting with Code](https://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html#call-compiled-c-c-code-directly-from-javascript)

## WASM Compilation

#### Option 1. Emscripten SDK

- Installation (Linux or OS X)

>$ git clone https://github.com/juj/emsdk.git
 
>$ cd emsdk

>$ ./emsdk install latest

>$ ./emsdk activate latest

>$ source ./emsdk_env.sh

- Compilation with emcc

> $ emcc main.c -s WASM=1 -o app.html

- Additional Toolkit [WABT](https://github.com/WebAssembly/wabt):WebAssembly Binary Toolkit

#### Option 2. [WebAssembly for Node](https://github.com/dcodeIO/webassembly)

> `wa-compile` -o main.wasm main.c

> `wa-link` utility links multiple wasm files to one.



