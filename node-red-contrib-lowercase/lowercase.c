#include <stdio.h>
#include <ctype.h>
#include <emscripten/emscripten.h>


void EMSCRIPTEN_KEEPALIVE lowercase(char *str) {
    for (int i=0; str[i]; i++) 
        str[i] = tolower(str[i]);
    return; 
}