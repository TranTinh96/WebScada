(function ($) {

	'use strict';
   /*-----------------------Xử lí form Add Tag------------------*/
	 $(".btn_save_form").click(function(e){
      if($("#form_addTag").valid())
      {
         e.preventDefault();
         var data=$("#form_addTag").serialize();
          $.ajax({
            type : 'POST', 
            url  : '/home/modbus/devices',
            data : data
          });
      } else{    
         return; 
      }
    return false;
   })

   /*-----------------------Xử lí Update Serial------------------*/
	$('.tr_serial').each(function(){
      var btn_save= $(this).find("#bt_save");
      var btn_close= $(this).find("#bt_close");
		var name_click=$(this).find(".column2");
      var name_value=$(this).find("#custId");
      var value=name_click.text();

      btn_save.hide();
      btn_close.hide();
      // Click name
      name_click.on("focus",function(){
         btn_save.show();
         btn_close.show();
      });
      // Button Close
      btn_close.on("click",function(){
         name_click.html(value);
         btn_save.hide();
         btn_close.hide();
      })

      //Button Update
		btn_save.on("focus",function(event){
         event.preventDefault();
         var name=name_click.text();
         var id = $(this).attr('data-id');
       
         name_value.val(name);
         var data=name_value.serialize();

			$.ajax({
				url: '/home/modbus/update/serial/'+ id,
				method: 'PATCH',
				data:data
         });
         btn_save.hide(500); 
         btn_close.hide(500);
      
    });
   });

   
   /*-----------------------Xử lí Update tcp------------------*/
   $('.tr_tcp').each(function(){
		var btn_save= $(this).find("#bt_save");
		var name_click=$(this).find(".column2");
      var name_value=$(this).find("#custIdd");
      var value=name_click.text();
      btn_save.hide();
      btn_close.hide();

      //Hien-an icon update
      name_click.on("click",function(){
         btn_save.show();
         btn_close.show();
      });
      // Button Close
      btn_close.on("click",function(){
         name_click.html(value);
         btn_save.hide();
         btn_close.hide();
      })

      //Xu ly button Save
		btn_save.on("click",function(event){
         event.preventDefault();
         var name=name_click.text();
         var id = $(this).attr('data-id');
       
         name_value.val(name);
         var data=name_value.serialize();

			$.ajax({
				url: '/home/modbus/update/tcp/'+ id,
				method: 'PATCH',
				data:data
          });
         btn_save.hide(500);
         btn_close.hide(500);
    });
   });
  
   
	
}).apply(this, [jQuery]);