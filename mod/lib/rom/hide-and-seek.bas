5 rem hide and seek game
10 let a = 0
20 let r = int(rnd()*10)+1
25 print "what is the number of"
30 print "arturo hiding place?"
35 let a=a+1
40 input n
50 print n
60 if r=3 then goto 200
70 if r=n then goto 100
80 print "he is not here!"
90 goto 25
100 print "you found him!"
101 print
102 print
103 print "in";a;"tries"
105 goto 220
200 print "it does not count!"
201 print "arturo is hiding in the house!"
202 print "try again!"
220 end
