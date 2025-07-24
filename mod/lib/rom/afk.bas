' Show a blinking AFK message and wait for a keypress
10 cls
20 paper 27
30 ink 4
40 fx 1
50 locate 17, 10, 0
60 print "AFK for 10 minutes"
70 let k = inkey$()
80 if k = "" goto 70
90 print "back at the keyboard..."
