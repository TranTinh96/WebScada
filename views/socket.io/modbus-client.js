var socket = io("http://localhost:3000");

$(document).ready(function(){
   socket.emit("FC1_S", {
      "unit": 1,
      "address": 0,
      "length": 8
  });
});
 