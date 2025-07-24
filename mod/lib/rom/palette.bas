' render current palette
5 cls
10 c = 0
15 background 7
20 for u = 0 to 6
30   for v = 0 to 8
40     y = u*25 + 5
50     x = v*25 + 5
60     box x, y, 25, 25, c
65     c = C + 1
70   next v
80 next U
