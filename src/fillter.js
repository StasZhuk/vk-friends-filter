module.exports = data => {
    let inputAllFriends = document.querySelector('#friends-all');
    let inputFilterFriends = document.querySelector('#friends-filter');
    let listFriends = document.querySelector('.list-all');
    let listFilterFriends = document.querySelector('.list-filter');    

    // обработчик ввода в поле фильтра всех друзей(левое) 
    inputAllFriends.addEventListener('keyup', () => {
        FilterList(listFriends, inputAllFriends);
    });

    // обработчик ввода в поле отфильтрованых друзей(правое) 
    inputFilterFriends.addEventListener('keyup', () => {
        FilterList(listFilterFriends, inputFilterFriends);
    });

    // обработчик события клика по кнопке добавления друга
    listFriends.addEventListener('click', e => {
        let target = e.target;

        // делегируем событие на кнопку
        if ( target.classList.contains('vk-filter__btn-close')) {
            let itemLi = target.parentElement;
            
            // добавляем друга в правый список
            listFilterFriends.appendChild(itemLi);
        }
    });
    
    // обработчик события клика по кнопке удалить друга
    listFilterFriends.addEventListener('click', e => {
        let target = e.target;

        // делегируем событие на кнопку
        if ( target.classList.contains('vk-filter__btn-close')) {
            let itemLi = target.parentElement;
            
            // возвращаем друга в левый список
            listFriends.appendChild(itemLi);
        }
    });

    function FilterList(list, inputField) {
        let listItems = list.querySelectorAll('.friends-item');
        let listItemsLength = listItems.length;
        let inputFieldVal = inputField.value;

        if (listItemsLength == 0) {
            return false;
        }

        // если поле фиьтра пустое показываем всех
        if (inputFieldVal === '') {
            for (let i = 0; i < listItemsLength; i++) {
                listItems[i].style.display = 'flex';
            }
        } else {
            for (let i = 0; i < listItemsLength; i++) {
                listItems[i].style.display = 'none';
                let itemTitle = listItems[i].querySelector('.friends-item__title');

                // проверяем на совпадения и отображаем нужное
                if (isMatching(itemTitle.innerHTML, inputFieldVal)) {
                    listItems[i].style.display = 'flex';
                }
            }
        }
    }

    // функция сравнения строк
    function isMatching(full, chunk) {
        if (full.toUpperCase().indexOf(chunk.toUpperCase()) >= 0 ) {
            return true;
        }

        return false;
    }
}