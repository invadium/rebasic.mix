# ReBasic Web Edition

Try live demo at [Itch.io](https://invadium.itch.io/rebasic)

## Welcome Back to Basic!

*_ReBasic Web Edition_* is a web shell for the [ReBasic](https://github.com/invadium/rebasic) interpreter, a simple and interactive retro-dialect of BASIC.

*_ReBasic_* stands for _Return to BASICs_ or _Retro BASIC_ or maybe _Reimplemented BASIC_. We are not quite sure...

*_ReBasic_* tries to preserve the simplicity and interactivity of early BASIC dialects
of the old 8-bit microcomputer era.
There are line numbers, a clutterless interactive mode, and a minimalistic environment
all wrapped in a pixelated retro aesthetic reminiscent of what you might have seen in the 80s.

There is no IDE, no build system, no package manager, no frameworks or libraries.
Just you and the machine having an intelligent conversation line after line.
And we believe this straightforward approach is crucial for beginners to grok the programming.

With modern programming environments, one might learn an awful lot about IDEs,
frameworks and libraries, CI/CD pipelines, and other stuff...
Unfortunately, all that clutter doesn't help one to learn the most important thing of all - 
how the computer actually works.
And on the fundamental level, all computers work the same,
executing actions one-by-one with occasional conditional or unconditional branching.
Which maps perfectly on the BASIC model of representing instruction in numbered lines form.


## Project Structure

This project contains only a web shell and related functions and utilities.
The ReBasic interpreter itself and its core functions are located
in [the ReBasic repository](https://github.com/invider/rebasic).


## Design Goals
Most modern implementations of BASIC are quite sophisticated. Typically, they offer support for advanced features, including sophisticated data structures, objects, and a rich runtime environment.

BASIC is ridiculed for line numbers. Modern BASIC implementations drop them completely.
And, although *_ReBasic_* allows you to skip numbers, we consider them crucial to the understanding of algorithms and execution flow.

Just observe how kids learn to write and count.
At some point, they start compiling numbered lists of items or actions -
that is a natural thing to do once you've learned the superpower of written words and numbers.
Children create numbered lists of their favorite toys, rank superheroes,
or create a shopping list of sweets to buy for a holiday.
This is exactly what classic BASIC provides, only now for interactions with a computer.
What is a shopping list if not an algorithm - remap 1-2-3 to 10-20-30,
wrap items in a ```PRINT "..."``` command, and you've got yourself a working BASUC program!

Back in 2006, David Brin published an article called
["Why Johnny can't code"](https://www.salon.com/2006/09/14/basic_2/).
It caused a lot of debates on public forums (besides a ton of hate mail to the author by "professional" programmers trying to prove that Java/C#/C++ is so much better than BASIC).

Microsoft, famous for its BASIC implementations in the past, created and published Small Basic to address the issues highlighted in the article. But, although it is a decent dev environment, it got so many things wrong.
It lacks interactivity, it doesn't have line numbers, and most of all, its core features are object-oriented. The latter is the biggest shortcoming since even the simplest operations like printing require a cumbersome object manipulation, e.g.:

```
TextWindow.WriteLine("Hello, Basic")
```

What is that _TextWindow_ thingy?
Why do I even need that to print a simple line?
Why is it necessary to capitalize WriteLine?
Do I really need parentheses for that?

Ugly...
Too much boilerplate...
Too much clutter...
Too many concepts to understand to print a single line.

Compare that to the original:
```
PRINT "HELLO, BASIC"
```

How can you get any simpler than that? It is just a command followed by a quoted string. You are telling the computer to print out a string. Plain and simple.
No objects, no ```.``` operator, no parentheses, no boilerplate, no noise.

_And that is how it is supposed to be in a learning environment._ That is how it is in
[ReBasic](https://invadium.itch.io/rebasic).



## Getting Started

Here is the canonical "Hello World!" in *_ReBasic_*:

```
PRINT "HELLO, BASIC!"
```

or as a runnable program:

```
10 PRINT "HELLO, BASIC!"
```

You can see the program listing with ```LIST``` and run it with ```RUN```:

```
LIST
CLS
RUN
```

```CLS``` command clears the screen before the run.
But for commands like ```LIST``` and ```RUN``` we have shortcuts
to clear the screen and then run a command:

```
LIST!
RUN!
```

Let's try to create something more complex:

```
5 rem calculate the number of seconds in a day
10 cls
20 let s=60
30 let m=60
40 let h=24
50 let ds=s*m*h
60 print "seconds in a day:",ds
```

On lines 20-40 we are defining 3 variables to store the number of seconds in a minute,
the number of minutes in an hour and the number of hours in a day.

On line 50 we are calculating the number of seconds in a day by multiplying all three variables.

Later, that value gets printed.



### Samples

There are a bunch of samples in
[ReBasic ROM](https://github.com/invider/rebasic.mix/tree/master/mod/lib/rom).

You can load and run them simply as that:
```
ROM
LOAD "PALETTE"
LIST
RUN
```

In this example, ```ROM``` lists examples provided in the Read-Only Memory.
You can use it with a  string key to narrow the results, like so:

```
ROM "MATH"
```

The ```LOAD``` command loads the selected program and ```LIST``` shows the loaded source.
Use PageUp and PageDown keys to scroll the output if it occupies more than a single screen.


Also, some additional examples can be found here:

[Mark's Journey to the Land of ReBasic](https://github.com/invider/rebasic-journey)

You can download files locally, then type:

```
LOAD
```

And point to the desired \*.bas file in a dialog window.



### Autoload from ROM

Use URL # section to indicate a ROM sample you want to load, e.g:

```
http://localhost:9999#stars
```
will load the "STARS" sample from the ROM.

Adding a bang (!) after the (#) will load and then instantly execute the program
(so you don't have to type ```RUN``` after it is loaded):

```
http://localhost:9999#!stars
```

You can also use a special name "latest" to load and run the latest executed source
on this profile:

```
http://localhost:9999#!latest
```


## Profiles
A profile defines the default color schema and some additional environment settings.

You can list existing profiles with the ```PROFILE``` command:

```
PROFILE
```

And load a profile by specifying a name:

```
PROFILE "MOON"
```

You can create a custom profile by creating a program that sets
the necessary environment variables and save it with:

```
PROFILE "MY-NEW-PROFILE", "SAVE"
```



## Reference

You can get help directly in the web shell by typing the _help_ command:
```
HELP
```

Or get help on particular command or function:
```
HELP ABS
```

There are also some help pages not associated with any command in particular:

```
HELP INTRO
HELP START
```


### Commands
* print <params...> - print provided params, where params are comma or semicolon-separated string/number literals or variables
* list [from],[to] - list the lines of current program
* run - run current program
* cls - clear the screen
* new - erase current program
* env - list all defined variables with their values
* clr - erase all defained variables
* input <var>... - read values from the keyboard to provided variables
* sleep <n> - wait for <n> seconds
* poke <address>, <value> - set memory cell at [address] to [value]
* load [name] - load a program from file
* save [name] - save current program to a file
* help [name] - list all commands and functions or show help for particular command/function


### Functions

* abs(x) - absolute values of the number
* rnd() - a random number in the range of 0 <= N < 1
* sin(x) - sine of <x>
* cos(x) - cosine of <x>
* tan(x) - tangent of <x>
* atn(x) - angle in radians for tangent of <x>
* atn2(y, x) - angle to the ray passing <y, x>
* int(x) - truncate the fractional part of <x>
* exp(x) - value of e raised to the power of <x>
* log(x) - natural log of <x>
* sgn(x) - the sign of <x> => -1/0/1
* sqr(x) - square root of <x>
* asc(s$) - ASCII code of the first character of s$
* chr$(x) - character for ASCII code of [x]
* len(s$) - length of the string [s$]
* left$(s$, x) - get left <x> characters of <s$>
* mid$(s$, n, m) - characters of <s$> from <n> to <m>
* right$(s$, x) - get right [x] characters of [s$]
* str$(x) - convert <x> into a string
* val(s$) - convert <s$> into a number
* spc(n) - string of <n> spaces
* tab(n) - string of [n] tabs
* peek(address) - get content of memory at <address>

## Graphics
* background [color] or paper [color] - set the background color
* face [c] - set the font color
* ink [c] - set the current color
* plot [x], [y], <c> - draw a pixel at <x,y> with color <c> or current ink if not specified
* pset [x], [y], <color> - set a pixel with color <color>

* line [x1], [y1], [x2], [y2], <color> - draw a line
* circle [x], [y], [r], <color> - draw a circle
* box [x], [y], [w], [h], [c] - draw a filled rectangle

* iget(x, y, w, h) - copy a square section of the screen, returns image data array
* iput [imageArray], [x], [y] - paste a screen copy at specified coordinates
* xstore - store the graphics context
* xrestore - restore previously stored graphics context

