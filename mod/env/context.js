const context = {
    width: 256,
    height: 192,

    //border: hsl(.6, .15, .15),
    border:      RGB(30, 32, 34),   // the screen outer edge color
    paper:       hsl(.16, .4, .7),  // the main screen background color
    ink:        '#252527',          // current color for text and drawing
    back:        null,              // each individual character background in the text buffer
    fx:          0,
    leftMargin:  0,
    rightMargin: 0,
}
