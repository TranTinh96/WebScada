const socket = io("http://localhost:8080");
socket.on("Led",function(data){
    if(data==1){
        $(".led").css("background-color", "yellow");
    }
    else{
        $(".led").css("background-color", "rgb(138, 138, 138)");
    }
});

$(document).ready(function(){

    $("#toggle1").click(function(){
        socket.emit('FC1-T-ON', {
            "unit": 1,
            "address": 2,
            "state": Boolean(this.checked)
        });
    });

    $("#toggle2").click(function(){
        socket.emit("Camera");
    });
  
})