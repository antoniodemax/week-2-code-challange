document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemBtn = document.getElementById('addItemBtn');
    const clearListBtn = document.getElementById('clearListBtn');
    const shoppingList = document.getElementById('shoppingList');

    let items = JSON.parse(localStorage.getItem('shoppingItems')) || [];

    const saveItems = () => {
        localStorage.setItem('shoppingItems', JSON.stringify(items));
    };

    const renderList = () => {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = item.purchased ? 'purchased' : '';

            const label = document.createElement('label');
            label.contentEditable = true;
            label.textContent = item.name;
            label.addEventListener('blur', () => updateItemName(index, label.textContent));

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.purchased;
            checkbox.addEventListener('change', () => togglePurchased(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🏃❌';
            deleteBtn.addEventListener('click', () => deleteItem(index));

            li.appendChild(checkbox);
            li.appendChild(label);
            li.appendChild(deleteBtn);

            shoppingList.appendChild(li);
        });
    };

    const updateItemName = (index, newName) => {
        items[index].name = newName.trim();
        saveItems();
        renderList();
    };

    const togglePurchased = (index) => {
        items[index].purchased = !items[index].purchased;
        saveItems();
        renderList();
    };

    const deleteItem = (index) => {
        items.splice(index, 1);
        saveItems();
        renderList();
    };

    const addItem = () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            items.push({ name: itemName, purchased: false });
            itemInput.value = '';
            saveItems();
            renderList();
        }
    };

    const clearList = () => {
        items = [];
        saveItems();
        renderList();
    };

    addItemBtn.addEventListener('click', addItem);
    clearListBtn.addEventListener('click', clearList);
    itemInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addItem();
    });

    renderList();
});