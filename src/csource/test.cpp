#include <stdio.h>
#include <stdlib.h>
#include <time.h>
// #include <string.h>
#include <emscripten.h>


extern "C" {

    /* Functions provided by Memory API */
	extern double mallocjs(int len);
	extern void freejs(int start, int len);

    // Simple C function that returns a number between 1 and 6.
    EMSCRIPTEN_KEEPALIVE
    int roll_dice() {
        srand ( time(NULL) );
        return rand() % 6 + 1;
    }

    EMSCRIPTEN_KEEPALIVE /* get the value at a given pointer */
	float getC(float* ptr)
	{
		return *ptr;
	}


}