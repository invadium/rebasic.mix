const context = {
    mode:   1,
    width:  256,
    height: 192,

    screen:      1,
    screenOpt:   [],
    screenMask:  0,
    border:     '#808080FF',   // the screen outer edge color
    paper:      '#FFFFFFFF',   // the main screen background color
    ink:        '#000000FF',   // current color for text and drawing
    back:        null,         // each individual character background in the text buffer
    fx:          0,
    x:           0,
    y:           0,
    leftMargin:  0,
    rightMargin: 0,

    MAX_SCREEN:  17,

    buffer:      [],
}

for (let i = 0; i <= context.MAX_SCREEN; i++) {
    context.screenOpt[i] = {
        paper:   0,
    }
}

