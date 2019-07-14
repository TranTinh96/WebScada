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

//FC4-TCP
socket.on("FC4-T-EM",function(data){
    $("#FC-T").append( "<div>" + data.data + "</div>");
});


//FC4-SERIAL
socket.on("FC3-S-EM",function(data){
    $("#FC-S").append( "<div>" + data.data + "</div>");
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
            "values": [Number($("#so1").val()),
                      Number($("#so2").val()),
                      Number($("#so3").val()),
                      Number($("#so4").val())]
        });
    });
    
    $("#toggle3").click(function(){
        socket.emit("FC4-T-ON", {
            "unit": 1,
            "address": 0,
            "length": 5,
            "interval": 2000
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
            "values":  [Number($("#so11").val()),
                        Number($("#so22").val()),
                        Number($("#so33").val()),
                        Number($("#so44").val())]
        });
    });
    $("#toggle33").click(function(){
        socket.emit("FC4-S-ON", {
            "unit": 2,
            "address": 0,
            "length": 5,
            "interval": 2000
        });

    });
  
  
})