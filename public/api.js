$(function(){

//first template
var all = document.querySelector('#button');
var searchTemplate = document.querySelector('.searchTemplate');
var searchTemp = Handlebars.compile(searchTemplate.innerHTML);
var output = document.querySelector('.output');

var reg = document.querySelector('#reg')

$.ajax({
   url: "api/plumbers",
   type: "GET",
   dataType: "json",
   success:function(data){
     output.innerHTML = searchTemp({
       plumber: data.results
     })

   }
 })

 $('#reg').click(function(){
  var name = document.querySelector('.name').value
  var password = document.querySelector('.password').value
  var contact = document.querySelector('.contact').value
  var slots = document.querySelector('.slots').value
  var dayss = document.querySelector('.dayss').value
  var string = ''
  var day = ''
$('.slots:checked').each(function(){
  var values = $(this).val();
  string  += values;
});

$('.dayss:checked').each(function(){
  var valuess = $(this).val();
  day += valuess;
});

  var newPlumber ={
    username: name,
    password: password,
    contact: contact,
    days: day,
    slots: string
}

$.ajax({
  url: "api/plumbers",
  type: "POST",
  data: newPlumber,
  dataType: "json",
  success:function(data){
}
})

window.location.reload()

    //console.log(data);

});





});
