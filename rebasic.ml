V help titles in ROM
V fix not interrupted after an error

> load with swap (exec/exit?) - ability to load and then return to previous program
> help tags for faster search (e.g. #function #math)?
> output markdown options to control the style and formatting
> fix data elements somehow preserved after new program and data is already there?
> function to read a key state without clearing the buffer (kinda like inkey$ works now - key$?)
> active links 
> capture the mouse on click?
> save full textbuffer as a text file
> help intro
> about command
> additional help pages
> man with command details
> trigger onStop in case of an error
  (could make a test suit with that)
> edit # line? #editor
> DELETE LINE and DELETE FROM-TO
> AUTO command
> shift numbers #editor (and move all goto/gosub numbered entries accordingly)
> wait for a keypress to continue output mode (more...)
> shift line numbers #editor
> "normalize" line numbers (e.g. 20, 23, 25, 27, 30 -> 20, 30, 40, 50, 60)
> wait for a keypress to continue output mode
> cont after stop

> while - while-end loops
> function/procedure declaration with defun
> function-local variables? (LOCAL)

> reload the previous program
> test cases with load with swap -> autoreload on stop -> load next...

# drawing
> draw command (MSX DSL?)
> turtle graphics?
> rect
> color name mapping? (doesn't work everywhere?)
> redefine the color palette

# sprites
> sprite engine 
> sprite hex data
> paired tile loading support (test.bas + test.png), maybe #include comments
> paired sound sprite loading
> game loop engine (setup, level, handle, evo, draw, traps, actors)
> double buffering support
> native js functions

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
