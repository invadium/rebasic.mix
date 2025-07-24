' air raid alert message
10 cls
20 paper 12
30 ink 4
40 fx 1
50 locate 18, 10, 0
60 print "AIR RAID ALERT !!!"
70 locate 10, 12, 0
80 print "proceed to the nearest shelter !!!"
90 if inkey$() = "" goto 90
