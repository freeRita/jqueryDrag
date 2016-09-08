$(function () {
  $(".boxSelect .box").on("mousedown", function (e) {
    var eS = e.pageX; //get the mouse position initially

    var boxes = $(".boxSelect .box");  //get all boxes elements
    var box = $(this);  //get the special box
    var index = $(this).index(".box");  //get the special box's index

    var boxW = box.outerWidth();  //get the special box's width
    var boxH = box.outerHeight(); //get the special box's height

    var position = new Array(boxes.length); //get the boxes position initially
    for (var i = 0; i <= boxes.length - 1; i++) {
      position[i] = boxes.eq(i).position().left;
    }

    $(addElementDiv()).insertAfter(boxes.eq(index - 1));
    var fakeBox = $(".boxSelect .fakeBox");

    $(".boxSelect").on("mousemove", function (e) {

      var moveDis = e.pageX - eS; //calculate the distance between the mouse's position now and the mouse position initially

      box.css({
        "position": "relative",
        "left": moveDis,
        "width": boxW,
        "height": boxH
      });

      var boxP = box.position().left; //get the special box's position

      //if the box move to left then judge whether the box's position is less than the prev box's position
      if (boxP < position[index - 1]) {
        boxes.eq(index - 1).insertAfter(box); //change the box's order
        getNewInfo();
      }

      //if the box move to right then judge whether the box's position is large than the prev box's position
      if (boxP > position[index + 1]) {
        boxes.eq(index + 1).insertBefore(box); //change the box's order
        getNewInfo();
      }

      function getNewInfo() {
        index = box.index(".box");  //get the box's new index
        boxes = $(".boxSelect .box");  //get all the new sorted boxes
        eS = e.pageX; //because the box's position in css is "relative", after changing the two box's order, it is need to be get new mouse's starting point.
        fakeBox.remove();
        $(addElementDiv()).insertBefore(boxes.eq(index));
        fakeBox = $(".boxSelect .fakeBox");
      }
    });

    $("body").on("mouseup", function () {
      $(".boxSelect").unbind("mousemove");
      box.css("left", "auto");  //to set the default position.
      fakeBox.remove();
    });
  });
});

//add a dotted box
function addElementDiv() {
  var div = document.createElement("div");
  div.setAttribute("class", "fakeBox");

  return div;
}