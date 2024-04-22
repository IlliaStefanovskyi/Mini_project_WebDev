
//********Slides on main page******** (BY ILLIA)
$(document).ready(function () {
    let currentSlide = 1;
    let totalSlides = $(".slide").length;

    function showSlide(index) {
        $(".slide").hide();
        $("#slide" + index).toggle();
    }

    $("#right_b").click(function () {
        //thats for the case if slide will be in position 4 out of 4 (it loops an array)
        currentSlide = (currentSlide % totalSlides) + 1;
        showSlide(currentSlide);
    });
    $("#left_b").click(function () {
        //(-2 because countdown of slides starts from 1, +1 compensates it)
        currentSlide = (currentSlide - 2 + totalSlides) % totalSlides + 1;
        showSlide(currentSlide);
    });

    showSlide(currentSlide);
});

//this function receives the description of products from the API
/*document.addEventListener('DOMContentLoaded', async function getDescription() {
    //PIZZA unblock for presentation only LIMIT 1500 PER MONTH
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
        }

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
});*/


//The cart code starts here***************(BY ILLIA)
function copyCart(){//copies or updates the copy of the cart whenever needed
    var orderItemsHTML = document.querySelector(".orderItems1").outerHTML;//gets html of cart element
    sessionStorage.setItem("copiedOrderItems", orderItemsHTML);//adds it to session storage
}
function pasteCart(){//pastes cart(if it exists) once the page is loaded
    var copiedOrderItemsHTML = sessionStorage.getItem("copiedOrderItems");//gets item from session storage
    if (copiedOrderItemsHTML) {//if it exists
        //replace the existing div with the copied one
        document.querySelector(".orderItems1").outerHTML = copiedOrderItemsHTML;//replaces old one with copied one
    }
}

//counts the amount of block elements inside of cart, counts the sum of ordered items and delivery
function getNumber() {
    let ordItemsCounter = $(".orderItems1").find(".jsItemBlock").length;//gets the amount of items ordered
    $(".cart_counter").text(ordItemsCounter);//displays it in the circle near cart
    if (ordItemsCounter == 0) {//says if there are any items in the basket
        $(".orderItems h2").text("No items yet");
        $(".alert").text("Add items to basket");
        $(".send").prop("disabled", true);//button disabled
    }
    else { // Counts the sum of items ordered
        $(".send").prop("disabled", false);//button enabled
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
                if(amountArray[i]>0){
                    sum += (pricesArray[i] * amountArray[i]); // Calculates subtotal for each item and adds to sum
                }
                else if(amountArray[i]<=0){//if amount is negative or 0
                    $(".hiddenNumberInput").eq(i).val("1");//input stays at 1
                    sum += pricesArray[i];//adds only one item to sum
                    window.alert("Amount can't be negative.");
                }
            }
            //this part adds delivery fee to the price
            var deliveryOption=$(".choiceDelivery").val();
            if(deliveryOption=="delivery"){
                var total=sum+7.99;
                $(".orderItems h2").text("Sum: €" + total.toFixed(2) +"(delivery included)."); // Prints the sum
            }
            else{
                $(".orderItems h2").text("Sum: €" + sum.toFixed(2)); // Prints the sum
            }
        }
    }
}

//hides and shows address details
function deliveryAddress(){
    var choiceDelivery = $(".choiceDelivery").val();//receives the value
    if(choiceDelivery == "select"){//if type not chosen
        $(".alert").text("Choose the delivery type!");//error message
        $(".send").prop("disabled", true);//button disabled
    }
    else if(choiceDelivery == "delivery"){//if type is delivery
        $(".alert").text("");//removes error message
        $(".addressDetails").css("display","block");//displays address
        $(".send").prop("disabled", false);//button is active
    }
    else{//if type is eat in place
        $(".alert").text("");//removes error message
        $(".addressDetails").css("display","none");//hides address
        $(".send").prop("disabled", false);//button is active
        //enables submission by removing required property from address
        $(".addressl1").prop("required", false);
        $(".addressCity").prop("required", false);
        $(".addressCode").prop("required", false);
    }
}

//submits order form 
function submitOrder() {
    let info= $(".orderItems h2").text();//gets the information about order
    
    window.alert("Order submitted! "+info);//displays order details
    
    //email input validation
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//checks for dots,@ and spaces
    var inputEmail = $(".email").val(); //get the value of the email
    var result = pattern.test(inputEmail); //test the email

    if (!result) {//if email is invalid
        $(".alert").text("Invalid email");//changes alert element contents
        return;//stops the function from proceeding
    }
}

//all functions inside of it will run only after the document is loaded
$(document).ready(function () {
    
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

    pasteCart();//pastes cart from memory if there is one
    getNumber();//updates the price and counter
    deliveryAddress();//disables send button until delivery type is entered
    $(".choiceDelivery").on("change", deliveryAddress);//calls for delivery input function once value of select was changed
    $(".choiceDelivery").on("change", getNumber);//calls for it because 7.99 for delivery is charged

    // Burger bar
    var menuVisible = false;//by default
    $(".burgerBar").click(function () {
        menuVisible = !menuVisible;//anti-false
        if (menuVisible) {//if true
            $(".htmlPages").css("display", "flex");//display
        }
        else {//false
            $(".htmlPages").css("display", "none");//hide
        }
    });
    //fixes bug that menu gets hidden after increasing window size back to normal size
    $(window).resize(function () {
        $(".htmlPages").css("display", "flex");//display
    });

    //makes cart visible or not, disables scrolling when cart is opened
    var cartOpen = false;
    $(".cart_image").click(function () {
        $(".cart_page_container").toggle();
        cartOpen = !cartOpen;//anti-false, so true
        if (cartOpen == true) {//when cart opens
            $("body").addClass("noScroll");//disables scrolling
            $('.hiddenNumberInput').on('input', function() {//this is for sum counter
                getNumber();
                copyCart();//updates cart in memory
            });
        }
        else {
            $("body").removeClass("noScroll");//enables scrolling
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

    //controls adding and removal of items to and from the cart
    $(".addItemButton").click(function () {
        var itemBlock = $(this).closest(".jsItemBlock");//finds item block inside which button was pressed
        var clonedItem = itemBlock.clone();//clones it

        var buttonInClonedItem = clonedItem.find(".addItemButton")//finds the button inside of cloned element
        buttonInClonedItem.removeClass("addItemButton");
        buttonInClonedItem.addClass("removeItemButton");//changes the class of button to remove...
        buttonInClonedItem.find("img").attr("src", "images/removeBasket.png");//changes image on the button

        var imageInClonedItem=clonedItem.find(".images_prod_main");//finds the image inside of cloned block
        //removes class to which images are assigned in order to save the image of ordered item when block is pasted onto new page
        imageInClonedItem.removeClass("images_prod_main");
        imageInClonedItem.addClass("styling_Images_prod_main");

        var textInClonedItem=clonedItem.find(".item_block_text");
        textInClonedItem.removeClass("item_block_text");

        var viewButton = clonedItem.find(".item_button");
        viewButton.css("display","none");//hides the view button
        var amountCounter = clonedItem.find(".hiddenNumberInput");
        amountCounter.css("display","block");//displays amount input

        clonedItem.appendTo(".cart_page_container .cart .cart_contents .orderItems .orderItems1");//appends cloned item to cart
        getNumber();
        copyCart();//updates cart in memory

        //prevents cloning of the same block multiple times
        $(this).click(function () {
            clonedItem.remove();
            getNumber();
        });

        //this removes item from the cart when remove button is clicked
        clonedItem.find(".removeItemButton").click(function () {
            clonedItem.remove();
            getNumber();
            copyCart();//updates cart in memory
        });
    });
    //removes the ordered item if it was pasted onto the page
    $(".removeItemButton").click(function () {
        $(this).closest(".jsItemBlock").remove();
        getNumber();//updates price and amount counter
        copyCart();//updates cart in memory
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

    $(".item_button").click(function () {//disables scrolling when description is opened
            $("body").addClass("noScroll");//overflow:hidden
    });
    $(".closeDescription").click(function(){//returns scrolling when window is closed
        $("body").removeClass("noScroll");
    });

    //close the description window
    $(".closeDescription").click(function () {
        $(".descriptionContainer").toggle();
    });
});
//********Slides on main page******** (BY RAHHAL)
$(document).ready(function() {
    var swiper = new Swiper('.swiper', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});