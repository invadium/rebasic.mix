' render current palette
5 cls
10 c = 0
12 bx = 3
14 by = 10
15 background 7
20 for u = 0 to 15
30   for v = 0 to 9
40     y = by + u*10
50     x = bx + v*25
60     box x, y, 25, 10, c
65     c = C + 1
70   next v
80 next U
