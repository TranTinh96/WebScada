(function ($) {

	'use strict';
	
	var height =$(document).height()-238;
	$("#myTable").css("max-height", height);

	$("body").hover(function(){
		var height =$(document).height()-238;
		$("#myTable").css("max-height", height);
	})
	//Xử lí chọn TCP hoặc Serial
	$('input:radio[name="serialtcp"]').change(function () {
		if ($(this).val() == 'Serial') {
			$("#serial").css("display", "block");
			$("#tcp").css("display", "none");
		} else {
			$("#tcp").css("display", "block");
			$("#serial").css("display", "none");
		}
	});
		
   /*-----------------------Xử lí Delete Serial------------------*/
	$('.tbl-accordion-nested-serial').each(function(){
		var tbody = $(this).find('tbody');
      var tbutton = $(this).find('#btn_acc');
      var btn_edit = $(this).find('#bt_edit');
      var btn_delete= $(this).find('#bt_delete');
      var tr = $(this).find('.tr_serial_header');

		var i = $(this).find('#icon_togg');
      tbody.hide();
      btn_edit.hide();
      btn_delete.hide();

      //Xử lí nút show-hide các FC
		tbutton.click(function(){
			i.toggleClass("fa-caret-right fa-caret-down");
			if (i.hasClass("fa-caret-down")){
				tbody.show();
			}
			else{
				tbody.hide();
			}
		});
		
		//Xủ lí khi mouse di chuyen
			tr.hover(function(){
				btn_edit.show();
				btn_delete.show();
			},function(){
				btn_edit.hide();
				btn_delete.hide();
			});

		//Xu li nut Delete Serial
		 btn_delete.on("click",function(event){
			event.preventDefault();
         var id = $(this).attr('data-id');

			$.ajax({
				url: '/home/modbus/delete/serial/'+ id,
				method: 'DELETE'
			})
			location.reload();
		 })
	});
	 /*-----------------------Xử lí Delete TCP------------------*/
	 $('.tbl-accordion-nested-tcp').each(function(){
		var tbody = $(this).find('tbody');
      var tbutton = $(this).find('#btn_acc');
      var btn_edit = $(this).find('#bt_edit');
      var btn_delete= $(this).find('#bt_delete');
      var tr = $(this).find('.tr_tcp_header');

		var i = $(this).find('#icon_togg');
      tbody.hide();
      btn_edit.hide();
      btn_delete.hide();

      //Xử lí nút show-hide các FC
		tbutton.click(function(){
			i.toggleClass("fa-caret-right fa-caret-down");
			if (i.hasClass("fa-caret-down")){
				tbody.show();
			}
			else{
				tbody.hide();
			}
		});
		//Xủ lí khi mouse di chuyen
			tr.hover(function(){
				btn_edit.show();
				btn_delete.show();
			},function(){
				btn_edit.hide();
				btn_delete.hide();
			});
		//Xu li nut Delete TCP
		btn_delete.on("click",function(event){
			event.preventDefault();
         var id = $(this).attr('data-id');

			$.ajax({
				url: '/home/modbus/delete/tcp/'+ id,
				method: 'DELETE'
			});
			location.reload();
		 });
	});
	
	
	



	/*----------------------tìm kiếm----------------------------*/
	$("#q").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#myTable tr").filter(function() {
		 	 $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
		
	});


	$(".btn_close_form").click(function(){
		location.reload();
	})
	// Sự kiện  chọn writeCoil thì lenght=0
	$('#type').on('change',function(){ 
		if($("#type option:selected").text()=="writeCoil")
			{
				$("#lengthtt").val(parseInt(1));
				$('#lengthtt').attr('readonly', 'readonly');
			}
		else{
			$('#lengthtt').removeAttr('readonly');
			$("#lengthtt").val("");
		}
  });
	

	
}).apply(this, [jQuery]);