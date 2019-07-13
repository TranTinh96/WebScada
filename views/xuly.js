const socket = io("http://localhost:8080");
socket.on("FC1-T-EM",function(data){
    if(data[0]==1){
        $(".led").css("background-color", "yellow");
    }
    else{
        $(".led").css("background-color", "rgb(138, 138, 138)");
    }
});

$(document).ready(function(){

    $("#toggle1").click(function(){
        socket.emit('FC5-T-ON', {
            "unit": 1,
            "address": 2,
            "state": Boolean(this.checked)
        });
        socket.emit("FC1-T-ON", {
            "unit": 1,
            "address": 2,
            "length": 1
        });
    });

    $("#toggle2").click(function(){
        socket.emit('FC16-T-ON', {
            "unit": 1,
            "address": 2,
            "values": [88,123,47]
        });
    });
    $("#toggle3").click(function(){
        socket.emit("FC4-T-ON", {
            "unit": 1,
            "address": 0,
            "length": 10,
            "interval": 1000
        });
    });
  
})