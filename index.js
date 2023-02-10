import { menuArray } from './data.js'
    let selectedItem = []

document.addEventListener('click', function(e){
    if (e.target.dataset.add){
        addSelectedFood(e.target.dataset.add)
    }
    if (e.target.dataset.remove){
        removeSelected(e.target.dataset.remove)
    }
    else if (e.target.id === 'complete-order-btn'){
        completeOrder()
    }
    else if (e.target.id === 'pay-btn'){
        paymentBtn()
    }
})

function paymentBtn(){
    const nameInput = document.getElementById('name-input')
    document.getElementById('order-render').innerHTML = `
            <div class="order-complete">
                <p class="compliment">Thanks, ${nameInput.value}! Your order is on its way!</p>
            </div>
        
    `
    document.getElementById('payment-details').style.display = 'none'
    document.getElementById('order-render').style.background = '#fefae0'
    render()
}

function completeOrder(){
    document.getElementById('payment-details').style.display = 'flex'
}

function removeSelected(foodID){
    const selectedFood = menuArray.find(function(item){
        return item.id.toString() === foodID
    })
    if (selectedItem){
       const index = selectedItem.indexOf(selectedFood)
        selectedItem.splice(index, 1)
    }
    orderRender()
}

function addSelectedFood(foodID){
    const selectedFood = menuArray.filter(function(item){
        return item.id.toString() === foodID
    })[0]
    if (selectedItem.includes(selectedFood)){
     }
     else {
         selectedItem.push(selectedFood)
     }
    orderRender()
   }

function renderSelectedItems(){
    let selectedFoodRender = ''
    selectedItem.forEach(function(item){
        selectedFoodRender += `
                    <div class="order-details">
                        <div class="order-item-names">
                            <p class="order-item-name-added">${item.name}</p>
                            <p class="remove-added" data-remove="${item.id}">remove</p>
                        </div>
                        <p class="prices" id="prices">$${item.price}</p>
                    </div>
        `
    })
    return selectedFoodRender
}

function orderRender(){
    document.getElementById('order-details').innerHTML = renderSelectedItems()
       
    let total = 0
            selectedItem.forEach(function(item){
                total += item.price
            })
    document.getElementById('total').textContent = total
        
            render()
}

function itemRender(){
    let itemsRender = ``

    menuArray.forEach(function(food){
        
        itemsRender += `
    <div id="items-container">
        <div id="items-icon">
            <img src="${food.emoji}" class="food-image">
                <div id="item-details">
                        <p id="food-names">${food.name}</p>
                        <p id="food-ingredients">${food.ingredients}</p>
                        <p class="prices">$${food.price}</p>
                </div>
        </div>
                <div id="add-food">
                    <i class="fa-solid fa-plus"
                    data-add="${food.id}"
                    ></i>
                </div>
    </div>
`
    })
    return itemsRender
    }

    function render() {
        document.getElementById('food-render').innerHTML = itemRender()
        if (selectedItem.length < 1){
           document.getElementById('order-render').style.display = 'none'
        }
        else {
            document.getElementById('order-render').style.display = 'block'
            
        }
    }
    render()
    
