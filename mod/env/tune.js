const tune = {
    scale:    1,
    dscale:   1,
    edge:     0,
    maxLines: 16384,
    storagePrefix: 'rebasic',

    defaults: {
        border:     '#808080FF',   // the screen outer edge color
        paper:      '#FFFFFFFF',   // the main screen background color
        ink:        '#000000FF',   // current color for text and drawing
    },

    mode: [
        null,
        {
            width:  256,
            height: 192,
        },
        {
            width:  192,
            height: 160,
        },
        {
            width:  160,
            height: 160,
        },
        {
            width:  128,
            height: 128,
        },
        {
            width:  320,
            height: 200,
        },
        {
            width:  640,
            height: 480,
        },
    ],
}
