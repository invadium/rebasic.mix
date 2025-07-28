' render a starfield
03 ' setup the screen and parameters
05 cls
10 ink 31
20 paper 26
30 border 25
40 let w = limits("width")
50 let h = limits("height")
60 let stars = 256

100 ' draw stars in a loop
110 for i = 1 to stars
120   let x = rnd(w)
130   let y = rnd(h)
140   let color = int(rnd(20)) + 1
150   plot x, y, color
160 next i

200 ' wait for a keypress
210 let k = inkey$()
220 if k = "" goto 210

