# ReBASIC Web Edition


## Welcome Back to Basic

_ReBasic Web Edition_ is a web-based shell for _ReBasic_, a simple and interactive retro-dialect of BASIC.

_ReBasic_ stands for _Return to BASICs_ or _Retro BASIC_ or maybe _Reimplemented BASIC_. We are not quite sure yet...

_ReBasic_ tries to preserve the interactivity and simplicity of BASIC on the old 8-bit era microcomputers.
There are line numbers, clutterless interactive mode, and a minimalistic environment.
And we believe, these are crucial for beginners to grok the programming.

This project contains only a web shell and related functions and utilities.
The ReBasic interpreter itself and its core functions are located
in [ReBasic Project](https://github.com/invider/rebasic).



## Design Goals
Most modern implementations of BASIC are quite sophisticated. Usually, they have support for advanced features like sophisticated data structures, objects, and a rich runtime environment.

BASIC is ridiculed for line numbers. Modern BASIC implementations drop them completely. And although _ReBasic_ allows you to skip numbers, we consider them crucial to the understanding of algorithms and execution flow.

Just observe, how kids learn to write and count. At some point, they might compile numbered lists of items or actions.
And that is exactly what classic BASIC offers only now with a computer.

Back in 2006, David Brin published [an article called "Why Johnny can't code"](https://www.salon.com/2006/09/14/basic_2/).
It caused a lot of debates on public forums (besides a ton of hate mail to the author by "professional" programmers trying to prove that Java/C#/C++ is so much better than BASIC).

Microsoft, famous for its BASIC implementations in the past, created and published Small Basic to address the issues highlighted in the article. But, although it is a great dev environment, it still got a lot of things wrong. It lacks interactivity, line numbers, and most of all - its core features are object-oriented. The later is the biggest shortcoming since even the simplest operations like printing require a cumbersome object manipulation, e.g.:

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
Too many concepts to understand just to print a simple line.

Compare that to the original:
```
PRINT "HELLO, BASIC"
```

How can you get any simpler than that? It is just a command followed by a string. You are telling the computer to print out a string. Plain and simple. No objects, no boilerplate, no noise.

_And that is how it is supposed to be in a learning environment._ That is how it is in _ReBasic_.



## Getting Started

Here is the canonical "Hello World!" in ReBasic:

```
PRINT "HELLO, BASIC!"
```

or as a runnable program:

```
10 PRINT "HELLO, BASIC!"
```

You can see the program listing with _LIST_ and run it with _RUN_:

```
LIST
CLS
RUN
```

CLS command clears the screen before the run.

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

You can load and run them as simple as that:
```
LOAD "PALETTE"
LIST
RUN
```

Also, some samples can be found here:

[Mark's Journey to the Land of ReBasic](https://github.com/invider/rebasic-journey)

You can download files locally, then just type:

```
LOAD
```

And point to the needed \*.bas file in a dialog window.



## Reference

You can get help directly in the web shell by typing the _help_ command:
```
help
```

Or get help on particular command or function:
```
help abs
```


### Commands
* print <str>... - print provided values
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
* plot(x, y, c) - draw a pixel at <x,y> with color <c>
* background(c) - set the background
* face(c) - set the font color
* box(x, y, w, h, c) - draw a filled rectangle

