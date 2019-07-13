const socket = io("http://localhost:3000");
socket.on("FC1-T-EM",function(data){
    if(data.data[0]==true){
        $("#led1").css("background-color", "yellow");
    }
    else{
        $("#led1").css("background-color", "rgb(138, 138, 138)");
    }
});
socket.on("FC1-S-EM",function(data){
    if(data.data[0]==true){
        $("#led2").css("background-color", "yellow");
    }
    else{
        $("#led2").css("background-color", "rgb(138, 138, 138)");
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
    /*-----------------------------------------------------------------------------------*/
    $("#toggle11").click(function(){
        socket.emit('FC5-S-ON', {
            "unit": 2,
            "address": 2,
            "state": Boolean(this.checked)
        });
        socket.emit("FC1-S-ON", {
            "unit": 2,
            "address": 2,
            "length": 1
        });
    });

    $("#toggle22").click(function(){
        socket.emit('FC16-S-ON', {
            "unit": 2,
            "address": 2,
            "values": [88,123,47]
        });
    });
    $("#toggle33").click(function(){
        socket.emit("FC4-S-ON", {
            "unit": 2,
            "address": 0,
            "length": 10,
            "interval": 1000
        });
    });
  
  
})