document.addEventListener('DOMContentLoaded', () => {

    //input some fields for the new items
    const itemInput = document.getElementById('itemInput');

    //button for adding new items
    const addItemBtn = document.getElementById('addItemBtn');

    //button for clearing the shoppinglist
    const clearListBtn = document.getElementById('clearListBtn');

    //unordered list that displays the shopping list
    const shoppingList = document.getElementById('shoppingList');

    //returns the current associated with a given key
    let items = JSON.parse(localStorage.getItem('shoppingItems')) || [];

    const saveItems = () => {
        //creating a new key
        localStorage.setItem('shoppingItems', JSON.stringify(items));
    };

    const renderList = () => {
        shoppingList.innerHTML = '';
        //an argument is taken for each element of th array
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = item.purchased ? 'purchased' : ''; //boolean value
            
            //Creates an instance of the element for a specific tag.
            const label = document.createElement('label');
            label.contentEditable = true;
            label.textContent = item.name;
            label.addEventListener('blur', () => updateItemName(index, label.textContent));

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.purchased;
            checkbox.addEventListener('change', () => togglePurchased(index));
            
            //create a delete button element
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🥱❌⏰';
            deleteBtn.addEventListener('click', () => deleteItem(index));

            
           //append the new list item
            li.appendChild(checkbox);
            li.appendChild(label);
            li.appendChild(deleteBtn);

            shoppingList.appendChild(li);
        });
    };
   //update item name
    const updateItemName = (index, newName) => {
        items[index].name = newName.trim();
        saveItems();
        renderList();
    };
    //toggle purchased
    const togglePurchased = (index) => {
        items[index].purchased = !items[index].purchased;
        saveItems();
        renderList();
    };
     //delete item
    const deleteItem = (index) => {
        items.splice(index, 1);
        saveItems();
        renderList();
    };
    //add item
    const addItem = () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            items.push({ name: itemName, purchased: false });
            itemInput.value = '';
            saveItems();
            renderList();
        }
    };
    //clearlist
    const clearList = () => {
        items = [];
        saveItems();
        renderList();
    };
    
    addItemBtn.addEventListener('click', addItem);//add item function is called when clicked

    clearListBtn.addEventListener('click', clearList);//clearlist function is called when clicked

    itemInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addItem();//call the addItem function
    });

    renderList();//the shopping list is initially rendered
});