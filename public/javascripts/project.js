// $(document).ready(function(){
//      $.getJSON("/customer/fetchstates",function(data){
//         $.each(data,function(index,item){
//             $('#estate').append($('<option>').text(item.statename).val(item.stateid))
//         })
//     })
// $('#estate').change(function(){
//     $('#ecity').empty()
//     $('#ecity').append($('<option>').text('-Select City-'))
//     $.getJSON('/customer/fetchcities',{sid:$('#estate').val()},function(data){
//     $.each(data,function(index,item){
//         $('#ecity').append($('<option>').text(item.cityname).val(item.cityid))
//     })
// })
// })
// })