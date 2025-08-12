' render current palette
10 cls
20 c = 0
30 bx = 3
40 by = 3
50 W = limits("width")
60 H = limits("height")

100 ink 43
110 paper 15
120 ' draw lines
130 for x = 1 to 2*W step 4
140   let x2 = x - H
150   line x, 0, x2, H
160 next x

200 for u = 0 to 30
210   for v = 0 to 9
220     y = by + u*7
230     x = bx + v*25
240     box x, y, 25, 7, c
250     c = c + 1
260   next v
270 next u
