' read keypresses
05 cls
07 print "reading the keyboard..."
10 let A$ = inkey$()
20 if A$ = "" then goto 10
30 print A$;
35 sleep 0.25
40 goto 10
