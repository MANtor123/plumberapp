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


  var newPlumber ={
    username: name,
    password: password,
    contact: contact
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
