const socket = io("http://localhost:8080");
socket.on("Led",function(data){
    if(data==1){
        $(".led").css("background-color", "yellow");
    }
    else{
        $(".led").css("background-color", "rgb(138, 138, 138)");
    }
});


socket.on("Cam",function(data){
  
});

$(document).ready(function(){

    $("#toggle1").click(function(){
        socket.emit("Light",Number(this.checked));
    });

    $("#toggle2").click(function(){
        socket.emit("Camera");
    });
  
})