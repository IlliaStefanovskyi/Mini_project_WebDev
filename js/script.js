
//********Slides on main page******** (BY ILLIA)
$(document).ready(function() {
    let currentSlide=1;
    let totalSlides=$(".slide").length;

    function showSlide(index) {
        $(".slide").hide();
        $("#slide"+index).toggle();
    }

    $("#right_b").click(function () {
        currentSlide=(currentSlide%totalSlides)+1;//thats for the case if slide will be in position 4 out of 4 (it loops an array)
        showSlide(currentSlide);
    });
    $("#left_b").click(function () {
        currentSlide=(currentSlide-2 +totalSlides)%totalSlides+1;//(-2 because countdown of slides starts from 1, +1 compensates it)
        showSlide(currentSlide);
    });

    showSlide(currentSlide);
});
/*cart script will be activated as only the page gets loaded, it has an array of integers, each time "Add to basket" is clicked on any product, its value(value="5") is transferred to this array. 
each block id="block_5" and price id="price_5" of the product has an id with the same number, this way I can display this product block and count the value*/