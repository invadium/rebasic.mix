V help titles in ROM
V fix not interrupted after an error
V help tags for faster search (e.g. #function #math)?
V raw DATA entries
V continue after stop
V do/while/until -> break -> loop/while/until flow
V binary format literals support (good for masks in DATA statements)
V ERASE to deallocate maps and arrays or variables?
V save full textbuffer as a text file
V fix data elements somehow preserved after new program and data is already there
V multiple screens
V IGET and IPUT to copy and paste screen areas
V function to read a key state without clearing the buffer (kinda like inkey$ works now - key$?)
V LEN() should work on arrays and maps (# of keys?) - it is only strings now (?)
V MASK & MMAP command to use ASCII art to define sprites
V fix LIST command missing lines
V fix iput edge rendering problem
V redefine the color palette
V multi-statements, e.g. stmt : stmt : stmt : stmt
V store the source in the profile before each run
V load "latest" to load the latest source on this profile from the local store
V warnings on number collisions in the source
V option to just load or run immediately with #<name> in the URL (#!name to run?)
V enable multiple screens at the same time (with transparency and background screen)
V transparent paper (to be able to CLS with the transparent color and use background layers instead)

> read a pixel (is it HEX value or a number from the palette?)
> DELETE LINE and DELETE FROM-TO

> ability to set the border size
> presize scaling in exact multiples to keep pixel size consistent
> save and restore drawing context
> overlay command, like OVERLAY AT 1000 "PROGRAM-NAME"
> output markdown options to control the style and formatting
> active links 
> capture the mouse on click?
> help intro
> about command
> additional help pages
> man with command details
> trigger onStop in case of an error
> edit # line? #editor
> AUTO command
> shift numbers #editor (and move all goto/gosub numbered entries accordingly)
> wait for a keypress to continue output mode (more...)
> shift line numbers #editor
> "normalize" line numbers (e.g. 20, 23, 25, 27, 30 -> 20, 30, 40, 50, 60)
> wait for a keypress to continue output mode?
> REDIM - redefine an array dimentions?
> "no more data entries" error doesn't show up in the console and doesn't return to repl
> FOCUS/UNFOCUS to auto-narrow lines in the list

# core
> function/procedure declaration with defun
> function-local variables? (LOCAL)

# test
> test cases with load with swap -> autoreload on stop -> load next...
> load with swap (exec/exit?) - ability to load and then return to previous program
  (could make a test suit with that)

# drawing
> draw command (MSX DSL?)
> turtle graphics?
> rect
> color name mapping? (doesn't work everywhere?)

# sprites
V sprite hex data
> sprite engine 
> paired tile loading support (test.bas + test.png), maybe #include comments
> paired sound sprite loading
> game loop engine (setup, level, handle, evo, draw, traps, actors)
> double buffering support
> native js functions

# sound
> wave shaping
> FM synth
> music data

# text editors
> extended line editor (look at ed, forth etc...)
> screen editor (look at nano, acme and vim)

# Desktop Edition
> electron app
> local app functions (e.g. load and save files etc...)

V option - start from the top
V rnd(N) to accept the number 0..N
V rnd(-N) to set up the seed
V fix history browser - should retarget the tail after a command execution
V fix plot with float numbers (e.g. rnd)
V don't blink the cursor when lost focus
V index custom profiles and cache the index in the profile config
V map of options in addition to limits
V if - goto - else statement
V single quote ' comments (MSX-BASIC, GW-BASIC and QBASIC)
V fix inkey$ to comply with common behavior (clear the buffer)
V clear command to clear local variables and definitions
V proper line mapping on load
V on - goto statement
V on - gosub statement
V help!
V save the style before run and restore it (on stop/end?)
V INKEY$
V clg
V screenshot
V browse/edit lines with ctrl + up/down just like the history
V autonumber lines
V ! commands to preliminary clear the screen - like run! and list!
V # and ` comments
V subroutines - gosub and return
V text effects
V fix scroll up edge
V hide the cursor on page up
V jump to the bottom on type in
V individual color and background for each cell in the text mode
V line editor with move, insert, delete
V run X - run from a number
V dim and map declaration list
V read for dim and map
V sleep
V box
V line
V background
V face
V save in console mode
V up/down to bring previous commands
