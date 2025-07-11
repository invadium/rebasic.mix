05 rem space ship docking game
10 print "spaceship-1 x coordinate?"
20 input a
30 print "spaceship-1 y coordinate?"
40 input b
50 cls
60 print "spaceship-2 x coordinate?"
70 input c
80 print "spaceship-2 y coordinate?"
90 input d
100 cls
110 let x=sqr((a-c)*(a-c)+(b-d)*(b-d))
120 print "the distance between ships"
130 print x;" space miles"
140 if x<1.5 then print "docking complete"
150 if x<1.5 then stop
155 print "where are you now?"
160 goto 10
170 end
