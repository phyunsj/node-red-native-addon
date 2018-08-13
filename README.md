# Node-RED Native (WebAssembly) Addon 

## What is WebAssembly? 

 
> WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable target for compilation of high-level languages like C/C++/Rust, enabling deployment on the web for client and server applications.    _from [WebAssembly.org](https://webassembly.org/)_


> WebAssembly has huge implications for the web platform — it provides a way to run code written in multiple languages on the web at near native speed, with client apps running on the web that previously couldn’t have done so. _from [Mozila.org](https://developer.mozilla.org/en-US/docs/WebAssembly)_

## WebAssembly in node

- [Getting Started With WebAssembly in Node.js](http://thecodebarbarian.com/getting-started-with-webassembly-in-node.js.html)
- [Run wast (WebAssembly) in node](https://gist.github.com/kanaka/3c9caf38bc4da2ecec38f41ba24b77df)

## WebAssembly + Node-RED (node v8+)

Since WebAssembly is available in node (v8.x+), I experimented in Node-RED environment

#### Example : node-red-contrib-nativesquare :  calling `_square()` from `square.wasm`.

square.wasm was pre-built wasm (originally in C).

```
Welcome to Node-RED
===================
9 Aug 13:31:36 - [info] Node-RED version: v0.18.6
9 Aug 13:31:36 - [info] Node.js  version: v8.11.2
9 Aug 13:31:36 - [info] Windows_NT 10.0.10586 x64 LE
```

<p align="center">
<img src="https://github.com/phyunsj/node-red-native-addon/blob/master/node-red-contrib-nativesquare.png" width="600px"/>
</p>

[native-square-flow.json](https://github.com/phyunsj/node-red-native-addon/blob/master/node-red-native-addon-example.json)



## FYI

- [MDN WebAssembly documentation](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [WebAssembly Examples](https://github.com/mdn/webassembly-examples)
- [WebAssembly Example](https://medium.com/@matzewagner/creating-a-webassembly-work-environment-c584b15fdb73)
- [Standalone WebAssembly Example](https://gist.github.com/kripken/59c67556dc03bb6d57052fedef1e61ab)
- [Cheerp Tutorial: Mixed mode C++ to WebAssembly and JavaScript](https://github.com/leaningtech/cheerp-meta/wiki/Cheerp-Tutorial:-Mixed-mode-C---to-WebAssembly-and-JavaScript)
- [Writing WebAssembly By Hand](https://blog.scottlogic.com/2018/04/26/webassembly-by-hand.html)
