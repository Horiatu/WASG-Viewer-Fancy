
$(function() {
  $('#panelCollapse').click(function(){
    // alert('ai!');
    $('#mainPanel').hide("slide", { direction: "right" }, 300);
  });

  $('#panelExpand').click(function(){
    // alert('ai!');
    $('#mainPanel').show("slide", { direction: "right" }, 300);
  });

});

