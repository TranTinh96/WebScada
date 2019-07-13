
$(document).ready(function(){
	'use strict';
	  /*------------------------------Xử lí form Connection----------------------------*/
     
    // Button Connect
	 $("#btn_connect").click(function(e){
		if($("#form_Connection").valid())
		{  
         e.preventDefault();
         var data=$("#form_Connection").serialize();
			$.ajax({
            type : 'POST', 
            url  : '/home/opcua/connect',
            data : data
          });
      } else {    
         return; 
      }
    return false;
   })
   //Button Cancel
   $("#btn_cancel").click(function(){
		location.reload();
	})

});
   
	
