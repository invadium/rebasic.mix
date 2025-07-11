05 ' use your math skills to target an enemy ship
10 let c=0
20 let a=int(rnd()*20+1)
30 let b=int(rnd()*20+1)
40 print "enemy spaceship coordinates"
50 print "encoded:";A,B;"fire!"
55 INPUT X
60 let c=c+1
70 if x=a*b then print "enemy ship destroyed!"
80 if x<>A*B then PRINT "missed!"
90 if c<6 then goto 20
100 end
