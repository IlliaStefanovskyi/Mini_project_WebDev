
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
    /* THIS api stopped responding LAPTOPS
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
        for (let i = 0; i < 10; i++) {
            description[i].innerHTML = result[i].title;//assigns new contents to the elements 
        }
    } catch (error) {
        console.error(error);
    }*/
    /*PIZZA unblock for presentation only LIMIT 1500 PER MONTH
        const url = 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=pizza&offset=0';
        const url2= 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=pizza&offset=10';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e7cf2100b3mshd9550b251301b38p11ea76jsnc7ff4c9dd65e',
                'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            let description = document.querySelectorAll(".item_block_text");//gets elements to change
            for (let i = 0; i < 10; i++) {
                description[i].innerHTML = result[i].title;//assigns new contents to the elements 
            }
        } catch (error) {
            console.error(error);
        }*/

    //enter search requests here instead of a laptop word %20 is space dell%20laptop%20images
    const url1 = 'https://free-images-api.p.rapidapi.com/images/pizza';//*******Images API import (ONLY 1000 REQUESTS PER DAY!!!)
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
        let image_spaces = document.querySelectorAll(".images_prod_main");//gets image spaces from html
        for (let i = 0; i < 10; i++) {
            image_spaces[i].src = result.results[i].image;//changes the default images to the ones in API response
        }
    } catch (error) {
        console.error(error);
    }
});


//The cart code starts here***************(BY ILLIA)
$(document).ready(function () {
    //makes cart visible or not
    $(".cart_image").click(function () {
        $(".cart_page_container").toggle();
    });

    function getNumber(){//counts the amount of block elements inside of cart
        let ordItemsCounter = $(".orderItems1").find(".jsItemBlock").length;
        $(".cart_counter").text(ordItemsCounter);//displays it in the circle near cart
        if(ordItemsCounter==0){//says if there are any items in the basket
            $(".orderItems h2").text("No items yet");
        }
        else{
            $(".orderItems h2").text("Ordered items");
        }
    }

    $(".addItemButton").click(function () {
        var itemBlock = $(this).closest(".jsItemBlock");//finds item block inside which button was pressed
        var clonedItem = itemBlock.clone();//clones it
        var buttonInClonedItem = clonedItem.find(".addItemButton")//finds the button inside of cloned element
        buttonInClonedItem.removeClass("addItemButton");
        buttonInClonedItem.addClass("removeItemButton");//changes the class of button to remove...
        buttonInClonedItem.find("img").attr("src", "images/removeBasket.png");//changes image on the button
        clonedItem.appendTo(".cart_page_container .cart .cart_contents .orderItems .orderItems1");//appends cloned item to cart
        getNumber();
        
         //prevents cloning of the same block multiple times
        $(this).click(function () {
            clonedItem.remove();
            getNumber();
        });

        //this removes item from the cart when remove button is clicked
        clonedItem.find(".removeItemButton").click(function () {
            clonedItem.remove();
            getNumber();
        });
    });
});