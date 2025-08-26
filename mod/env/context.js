const context = {
    mode:   1,
    width:  256,
    height: 192,

    screen:      1,
    screenOpt:   [],
    screenMask:  0,
    border:      RGB(30, 32, 34),   // the screen outer edge color
    paper:       hsl(.16, .4, .7),  // the main screen background color
    ink:        '#252527',          // current color for text and drawing
    back:        null,              // each individual character background in the text buffer
    fx:          0,
    leftMargin:  0,
    rightMargin: 0,

    MAX_SCREEN:  16,
}

for (let i = 0; i <= context.MAX_SCREEN; i++) {
    context.screenOpt[i] = {
        paper:   0,
    }
}

