window.onload = function() {
    loadMapFromLocalStorage();
}
let list = new Map();

function saveMapTolocalStorage() { 
    let listArray = Array.from(list);
    let jsonString = JSON.stringify(listArray);
    localStorage.setItem('list', jsonString);
}

function loadMapFromLocalStorage() {
    let jsonString = localStorage.getItem('list');
    if(jsonString){
        let listArray = JSON.parse(jsonString);
        list = new Map(listArray);
    }
    renderValuesOnMap()
}
//  filteredItems, который по умолчанию равен list codeum code
function renderValuesOnMap(filteredItems = list) {
    const ul = document.getElementById('itemList');
    ul.innerHTML = ''; // Очищаем список перед рендерингом
    filteredItems.forEach((value, key) => {
        const li = document.createElement('li');
        li.classList.add('list-item', 'list-group-item', 'mt-2');
        li.setAttribute('id', key);
        li.innerHTML = `
            <span class="list-item-text">${value}</span>
            <div class="mt-2">
                <button class="btn btn-sm btn-warning mr-2" id="${key}" onclick="editItem(this)">Редактировать</button>
                <button class="btn btn-sm btn-danger" id="${key}" onclick="deleteItem(this)">Удалить</button>
            </div>
        `;
        ul.append(li);
    });
}

function search(){
    const input = document.getElementById('searchInput');
    input.addEventListener('keyup', (e) => {
        if(input){


            // в  valueInput кладем то что ввели в инпут
            const valueInput = e.target.value.toLowerCase();
            
            const filteredItems = new Map ([...list]
                .filter(([key, value]) => value.toLowerCase()
                .includes(valueInput)))
            renderValuesOnMap(filteredItems);
            
            if(filteredItems.size === Number(0)){
                let ul = document.getElementById('itemList');
                const pararaf = document.createElement('p');
                pararaf.classList.add('text-center');
                pararaf.innerHTML = 'Ничего не найдено, повторите попытку';
                ul.append(pararaf);
                
            }
        }
    })
}

function addItem() {
    const input = document.getElementById('textInput');
    const value = input.value;

    if(value.trim() !== '') {
        // в лист где клюс сощдаем ключ а значение это валуе
        list.set('' + new Date().getTime(), value);
        input.value = '';
        // функция для сохранения в локалсторадж
        saveMapTolocalStorage();
        // функция отображения на странице лишек
        renderValuesOnMap();
    }else{
        alert('Enter value');
    }
}
function deleteItem(button) {
    // в переменную ключ кладем кнопку у нее такой же ключ или айди
    const key = button.id;
    console.log(key);
    // из листа удаляем по ключю
    list.delete(key);
    // функция для сохранения в локалсторадж
    saveMapTolocalStorage();
    // функция отображения на странице лишек
    renderValuesOnMap();
}
function editItem(button){
    const key = button.id;
    const value = prompt('Enter new value');
    // в лист отправляем ключ и новое значение
    list.set(key, value);
    // функция для сохранения в локалсторадж
    saveMapTolocalStorage();
    // функция отображения на странице лишек
    renderValuesOnMap();
}

// все методы есть в тетради не забыть 