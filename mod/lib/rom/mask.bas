10 cls
20 let w = limits("width")
30 let h = limits("height")
40 let iw = 12
50 let ih = 4
60 let x = int(w/2 - iw/2)
70 let y = int(h/2 - ih/2)
80 let dx = 10
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
320 gosub 630 ' show FPS
330 if (now * 0.001) % 1 < 0.5 then gosub 700 else gosub 800

400 ' next frame
410 vsync
420 goto 200

500 timer = 0
510 fps = fpsa
520 fpsa = 0
530 return

630 locate 40, 1
640 timer = timer + delta
650 if timer > 1 then gosub 500
660 fpsa = fpsa + 1
670 print "FPS:",fps
680 return

700 iput invader1, x, y
710 return

800 iput invader2, x, y
810 return

1000 mmap x, 22
1005 mmap o, 26
1010 mask invader1
1020 mask ------------
1030 mask x  xxxxxx  x
1040 mask xx xoxxox xx
1050 mask   xxxxxxxx  
1060 mask   x  xx  x  
1070 mask ------------

2010 mask invader2
2020 mask ------------
2030 mask    xxxxxx   
2040 mask  x xoxxox x 
2050 mask x xxxxxxxx x
2060 mask x x  xx  x x
2070 mask ------------

