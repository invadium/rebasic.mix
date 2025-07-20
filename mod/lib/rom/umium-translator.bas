' translator to the UMIUM planet language
10 cls
20 print "enter words to translate one by one"
30 print "when finished, enter a single dot (.)"
40 let phrase = ""
50 input ">",word
55 if word = "." goto 200
62 if LEN(WORD) > 5 then word = word + "IUM"
70 if len(word) < 5 then word = "UM" + word
80 phrase = phrase + word + " "
90 goto 50
200 print "translated phrase:"
210 print phrase;"."
