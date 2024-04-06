
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
    /*//PIZZA unblock for presentation only LIMIT 1500 PER MONTH
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
            const response = await fetch(url, options);//one request returns 10 items, but we need 20
            const response1=await fetch(url2,options);//so we make 2 requests at the time and the second one has offset of 10
            const result = await response.json();//each response is 
            const result1=await response1.json();
            console.log(result);
            console.log(result1);
            let description = document.querySelectorAll(".item_block_text");//gets elements to change
            let servingsH = document.querySelectorAll(".servingsH");//H means hidden
            let ingredientsH = document.querySelectorAll(".ingredientsH");
            let descriptionH = document.querySelectorAll(".descriptionH");
            for (let i = 0; i < (result.length+result1.length); i++) {
                if(i<result.length){
                    description[i].innerHTML = result[i].title;//assigns new contents to the elements in description
                    servingsH[i].innerHTML = result[i].servings;
                    ingredientsH[i].innerHTML = result[i].ingredients;
                    descriptionH[i].innerHTML = result[i].instructions;
                }
                else{//required for the second request
                    description[i].innerHTML = result1[i-10].title;
                    servingsH[i].innerHTML = result1[i-10].servings;
                    ingredientsH[i].innerHTML = result1[i-10].ingredients;
                    descriptionH[i].innerHTML = result1[i-10].instructions;
                }
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
        for (let i = 0; i < result.results.length; i++) {
            image_spaces[i].src = result.results[i].image;//changes the default images to the ones in API response
        }
    } catch (error) {
        console.error(error);
    }
});


//The cart code starts here***************(BY ILLIA)

function getNumber() {//counts the amount of block elements inside of cart, counts the sum of ordered items
    let ordItemsCounter = $(".orderItems1").find(".jsItemBlock").length;
    $(".cart_counter").text(ordItemsCounter);//displays it in the circle near cart
    if (ordItemsCounter == 0) {//says if there are any items in the basket
        $(".orderItems h2").text("No items yet");
    }
    else { // Counts the sum of items ordered
        var pricesArray = [];
        var amountArray = [];
        let sum = 0;
        $(".orderItems").find(".item_block_price").each(function () { // Finds all the prices in ordered items
            pricesArray.push(parseFloat($(this).text().slice(1))); // Adds found price to an array
        });
        $(".orderItems").find(".hiddenNumberInput").each(function () {
            amountArray.push(parseFloat($(this).val())); // Retrieves quantity value and adds it to an array
        });
        if (pricesArray.length > 0) {
            for (let i = 0; i < pricesArray.length; i++) { // Loops through arrays
                sum += (pricesArray[i] * amountArray[i]); // Calculates subtotal for each item and adds to sum
            }
            $(".orderItems h2").text("Sum: €" + sum.toFixed(2)); // Prints the sum
        }
    }
}

$(document).ready(function () {//all functions inside of it will run only after the document is loaded

    //products page************(by Khalid)
    var block=$(".productsLayout").find(".productsBlock");
    for(let i=0;i<19;i++){
        var clonedBlock=block.clone()
        let randomPrice=(Math.random()*(30-10)+10).toFixed(2);
        var priceBlock=clonedBlock.find(".item_block_price");
        priceBlock.text("€"+randomPrice);
        clonedBlock.appendTo(".productsLayout");
    }
    //*************

    //dropdown on products
    var dropdownVisible=false;
    $(".activator").click(function(){
        dropdownVisible=!dropdownVisible;
        if(dropdownVisible){
            $(".dropMiniItem").css("display","block");
        }
        else{
            $(".dropMiniItem").css("display","none");
        }
    });

    //this one is for burger bar
    var menuVisible=false;//by default
    $(".burgerBar").click(function(){
        menuVisible=!menuVisible;//anti-false
        if(menuVisible){//if true
            $(".htmlPages").css("display","flex");//display
        }
        else{
            $(".htmlPages").css("display","none");//hide
        }
    });
    //makes cart visible or not, disables scrolling when cart is opened
    var cartOpen = false;
    $(".cart_image").click(function () {
        $(".cart_page_container").toggle();
        cartOpen = !cartOpen;//anti-false, so true
        if (cartOpen == true) {
            $("body").addClass("noScroll");
            $('.hiddenNumberInput').on('input', function() {
                getNumber();
            });
        }
        else {
            $("body").removeClass("noScroll");
        }
    });

    //this one adjusts the cart when the screen size is small
    var position=false;//true is details, false is products
    $(".switchImage").click(function(){
        position=!position;
        if(position){//is true
        $(".orderItems").css("display", "none");//hides items
        $(".orderDetails").css("display","flex");//displays details
        $(".orderDetails").css("margin-top","10px");
        $(".orderDetails").css("grid-column","1 /span2");
        }
        else{
            $(".orderDetails").css("display","none");//hides details
            $(".orderItems").css("display", "block");//displays items
        }

    });

    $(".addItemButton").click(function () {
        var itemBlock = $(this).closest(".jsItemBlock");//finds item block inside which button was pressed
        var clonedItem = itemBlock.clone();//clones it
        var buttonInClonedItem = clonedItem.find(".addItemButton")//finds the button inside of cloned element
        buttonInClonedItem.removeClass("addItemButton");
        buttonInClonedItem.addClass("removeItemButton");//changes the class of button to remove...
        buttonInClonedItem.find("img").attr("src", "images/removeBasket.png");//changes image on the button

        var viewButton = clonedItem.find(".item_button");
        var amountCounter = clonedItem.find(".hiddenNumberInput");
        viewButton.css("display","none");//hides the view button
        amountCounter.css("display","block");//displays amount input

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

    //description block***********************************

    $(".item_button").click(function () {

        $(".descriptionContainer").toggle();//makes description visible
        var itemBlock = $(this).closest(".jsItemBlock");//gets item block

        var image = itemBlock.find(".images_prod_main");//finds image in item block
        var imageDescription = $(".itemImageInDescription");//finds image space in description
        imageDescription.attr("src", image.attr("src"));//changes image in description

        var value = itemBlock.find(".item_block_text").text();//finds title
        var nameDescription = $(".itemName");//finds it in description
        nameDescription.text(value);//pastes it

        value = itemBlock.find(".servingsH").text();//gets number of servings
        var servesDesc = $(".servings");
        servesDesc.text(value);

        value = itemBlock.find(".ingredientsH").text();//gets ingredients
        var ingredientsDesc = $(".ingredients");
        ingredientsDesc.text(value);

        value = itemBlock.find(".descriptionH").text();//gets desciption
        var descriptionDesc = $(".descriptionItemText");
        descriptionDesc.text(value);
        
    });

    var descriptionOpen = false;
    $(".item_button").click(function () {//disables scrolling when description is opened
        descriptionOpen= !descriptionOpen;//anti-false, so true
        if (descriptionOpen == true) {
            $("body").addClass("noScroll");//overflow:hidden
        }
    });
    $(".closeDescription").click(function(){//returns scrolling when window is closed
        $("body").removeClass("noScroll");
        descriptionOpen = false;
    });

    $(".closeDescription").click(function () {//close the description window
        $(".descriptionContainer").toggle();
    });
});