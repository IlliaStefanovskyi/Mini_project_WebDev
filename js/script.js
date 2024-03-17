
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
document.addEventListener('DOMContentLoaded', async function getDescription(){//this function receives the description of products from the API
    const url = 'https://latest-laptop-deals1.p.rapidapi.com/';//API import
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e7cf2100b3mshd9550b251301b38p11ea76jsnc7ff4c9dd65e',
            'X-RapidAPI-Host': 'latest-laptop-deals1.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);//fetch function
        const result = await response.json();//transformation to json
        console.log(result);
        let description=document.querySelectorAll(".item_block_text");//gets elements to change
        for(let i=0;i<5;i++){
            description[i].innerHTML=result[i].title;//assigns new contents to the elements 
            }
    } catch (error) {
        console.error(error);
    }
    });
    