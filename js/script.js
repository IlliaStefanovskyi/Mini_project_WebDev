
//********Slides on main page******** (BY ILLIA)
$(document).ready(function () {
    let currentSlide = 1;
    let totalSlides = $(".slide").length;

    function showSlide(index) {
        $(".slide").hide();
        $("#slide" + index).toggle();
    }

    $("#right_b").click(function () {
        currentSlide = (currentSlide % totalSlides) + 1;//thats for the case if slide will be in position 4 out of 4 (it loops an array)
        showSlide(currentSlide);
    });
    $("#left_b").click(function () {
        currentSlide = (currentSlide - 2 + totalSlides) % totalSlides + 1;//(-2 because countdown of slides starts from 1, +1 compensates it)
        showSlide(currentSlide);
    });

    showSlide(currentSlide);
});
/*cart script will be activated as only the page gets loaded, it has an array of integers, each time "Add to basket" is clicked on any product, its value(value="5") is transferred to this array. 
each block id="block_5" and price id="price_5" of the product has an id with the same number, this way I can display this product block and count the value*/
document.addEventListener('DOMContentLoaded', async function getDescription() {//this function receives the description of products from the API
    const url = 'https://latest-laptop-deals1.p.rapidapi.com/';//**********description API import
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
        let description = document.querySelectorAll(".item_block_text");//gets elements to change
        for (let i = 0; i < 5; i++) {
            description[i].innerHTML = result[i].title;//assigns new contents to the elements 
        }
    } catch (error) {
        console.error(error);
    }


    const url1 = 'https://free-images-api.p.rapidapi.com/images/wallpaper';//*******Images API import (ONLY 1000 REQUESTS PER DAY!!!)
    const options1 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e7cf2100b3mshd9550b251301b38p11ea76jsnc7ff4c9dd65e',
            'X-RapidAPI-Host': 'free-images-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url1, options1);
        const result = await response.json();//translates to json
        console.log(result);
        let image_spaces=document.querySelectorAll(".images_prod_main");//gets image spaces from html
        for(let i=0;i<5;i++){
            image_spaces[i].src=result.results[i+13].image;//changes the default images to the ones in API response
        }
    } catch (error) {
        console.error(error);
    }
});
