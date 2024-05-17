PORT=8000

//MONGODB_URI=mongodb+srv://prajoyt:prajoyt123@cluster0.bfgtpbz.mongodb.net/

removed slash from the end to become routing easy.
so we get
//MONGODB_URI=mongodb+srv://prajoyt:prajoyt123@cluster0.bfgtpbz.mongodb.net

whenever connect db always use async await and trycatch method because db may be in another continent.(watch in src/index.js) better use IIFE(immediatelyinovked function ) and good practice is it to start  with ;