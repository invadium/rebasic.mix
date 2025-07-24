010 REM DRAW A CIRCLE USING PLOT

020 DIM i, r, x, y, q as FLOAT
030 DIM ax, ay, zx, zy, dx, dy as Integer

040 x = 127
050 y = 87
060 r = 40
070 q = 1 / r

080 FOR i = 0 TO PI / 2 STEP q
090    dy = SIN(i) * r
100    dx = COS(i) * r

110    zx = x - dx
120    zy = y - dy
130    ax = x + dx
140    ay = y + dy

150    PLOT ax, ay
160    PLOT zx, ay
170    PLOT ax, zy
180    PLOT zx, zy
190 NEXT i

