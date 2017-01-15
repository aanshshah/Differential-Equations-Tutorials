    $(".disappear-1").click(function(){
   $("#link-1").toggle();
   $("#link-2").toggle();
   $("#link-3").toggle();
   $("#link-4").toggle();
   $("#link-5").toggle();
   $("#link-6").toggle();
   $("#link-7").toggle();
   $("#link-8").toggle();
   $("#link-9").toggle();
   $("#link-10").toggle();
   $("#link-10.1").toggle();
});
    $(".disappear-2").click(function(){
   $("#link-11").toggle();
   $("#link-12").toggle();
   $("#link-13").toggle();
   $("#link-14").toggle();
   $("#link-15").toggle();
   $("#link-16").toggle();
   $("#link-17").toggle();
   $("#link-18").toggle();
   $("#link-19").toggle();
   $("#link-20").toggle();
   $("#link-21").toggle();
});

    $(".disappear-3").click(function(){
   $("#link-31").toggle();
   $("#link-32").toggle();
   $("#link-33").toggle();
   $("#link-34").toggle();
   $("#link-35").toggle();
   $("#link-36").toggle();
   $("#link-37").toggle();
   $("#link-38").toggle();
   $("#link-39").toggle();
});

    $(".disappear-4").click(function(){
   $("#link-41").toggle();
   $("#link-42").toggle();
   $("#link-43").toggle();
   $("#link-44").toggle();
   $("#link-45").toggle();
   $("#link-46").toggle();
   $("#link-47").toggle();
   $("#link-48").toggle();
});

    $(".disappear-5").click(function(){
   $("#link-51").toggle();
   $("#link-52").toggle();
   $("#link-53").toggle();
   $("#link-54").toggle();
   $("#link-55").toggle();
   $("#link-56").toggle();
   $("#link-57").toggle();
   $("#link-58").toggle();
});

    $(".disappear-6").click(function(){
   $("#link-61").toggle();
   $("#link-62").toggle();
   $("#link-63").toggle();
   $("#link-64").toggle();
   $("#link-65").toggle();
   $("#link-66").toggle();
   $("#link-67").toggle();
   $("#link-68").toggle();
});
$(document).ready(function() {
    var collapsed_sidebar = false;
  $('[data-toggle=offcanvas]').click(function() {
      if(collapsed_sidebar){
     $("#sidebar-wrapper").width(0);
     collapsed_sidebar = false;
      }else{
          collapsed_sidebar = true;
    $("#sidebar-wrapper").width(250);
      }
  });
});