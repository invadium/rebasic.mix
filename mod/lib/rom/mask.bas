10 cls
20 let w = limits("width")
30 let h = limits("height")
40 let iw = 12
50 let ih = 4
60 let x = int(w/2 - iw/2)
70 let y = int(h/2 - ih/2)
80 let dx = 1
90 let dy = 10
100 let now = time()
110 let timer = 0
120 let fpsa = 0
130 let fps = 0

200 let delta = (time() - now) * 0.001
210 let now = time()
220 let x = x + dx * delta
230 let y = y + dy * delta
240 if x > w and dx > 0 then dx = dx * -1
250 if x < -iw and dx < 0 then dx = dx * -1
260 if y > h and dy > 0 then dy = dy * -1
270 if y < -ih and dy < 0 then dy = dy * -1

300 ' draw the frame
310 cls
320 iput invader1, x, y

330 locate 40, 1
340 timer = timer + delta
350 if timer > 1 then gosub 500
360 fpsa = fpsa + 1
370 print "FPS:",fps

400 ' next frame
410 vsync
420 goto 200

500 timer = timer - 1
510 fps = fpsa
520 fpsa = 0
530 return

1000 mmap x, 7
1010 mask invader1
1020 mask ------------
1030 mask x  xxxxxx  x
1040 mask xx x xx x xx
1050 mask   xxxxxxxx  
1060 mask   x  xx  x  
1070 mask ------------

