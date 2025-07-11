' how to use inkey$() to pause the program
05 cls
10 print "press any key to continue..."
20 if inkey$() = "" then goto 20
30 print "going forward!"
