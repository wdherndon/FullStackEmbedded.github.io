(function($) {
$(document).ready(function(){

  // putting lines by the pre blocks
  $("pre").each(function(){
    var pre = $(this).text().split("\n");
    var lines = new Array(pre.length+1);
    for(var i = 0; i < pre.length; i++) {
      var wrap = Math.floor(pre[i].split("").length / 70)
      console.log("10");
      if (pre[i]==""&&i==pre.length-1) {
        lines.splice(i, 1);
      } else {
        lines[i] = i+1;
        for(var j = 0; j < wrap; j++) {
          lines[i] += "\n";
        }
      }
    }
    console.log("20");
    $(this).before("<pre class='lines'>" + lines.join("\n") + "</pre>");
  });

  var headings = [];

  var collectHeaders = function(){
    headings.push({"top":$(this).offset().top - 15,"text":$(this).text()});
  }

  console.log("30");
  console.log($(".markdown-body h1"));
  if($(".markdown-body h1").length > 1) $(".markdown-body h1").each(collectHeaders)
  else if($(".markdown-body h2").length > 1) $(".markdown-body h2").each(collectHeaders)
  else if($(".markdown-body h3").length > 1) $(".markdown-body h3").each(collectHeaders)
  console.log("headings length:");
  // This is 0, why?
  console.log(headings.length);

  $(window).scroll(function(){
    console.log("Headings length is:");
    console.log(headings.length);
    if(headings.length==0) return true;
    console.log("Upper bracket");
    var scrolltop = $(window).scrollTop() || 0;
    console.log("Lower bracket");
    console.log("Checking scroll state");
    if(headings[0] && scrolltop < headings[0].top) {
      $(".current-section").css({"opacity":0,"visibility":"hidden"});
      console.log("40");
      return false;
    }
    $(".current-section").css({"opacity":1,"visibility":"visible"});
    for(var i in headings) {
      if(scrolltop >= headings[i].top) {
        $(".current-section .name").text(headings[i].text);
      }
    }
  });
  console.log("50");

  $(".current-section a").click(function(){
    $(window).scrollTop(0);
    return false;
  })
});
})(jQuery)
