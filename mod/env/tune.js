const tune = {
    scale: 1,
    edge: 100,
    maxLines: 16384,
    storagePrefix: 'rebasic',

    defaults: {
        border:      RGB(30, 32, 34),   // the screen outer edge color
        paper:       hsl(.16, .4, .7),  // the main screen background color
        ink:        '#252527',          // current color for text and drawing
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
