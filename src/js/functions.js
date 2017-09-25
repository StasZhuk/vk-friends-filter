// функцияя фильтрации списков
export function FilterList(list, inputField) {
    let listItems = list.querySelectorAll('.friends-item');
    let listItemsLength = listItems.length;
    let inputFieldVal = inputField.value;

    // если в списке пусто ничего не делаем
    if (listItemsLength == 0) {
        return false;
    }

    // если поле фиьтра пустое показываем всех
    if (inputFieldVal === '') {
        for (let i = 0; i < listItemsLength; i++) {
            listItems[i].style.display = 'flex';
        }
    } else {
        // если в поле чтото введено
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
export function isMatching(full, chunk) {
    if (full.toUpperCase().indexOf(chunk.toUpperCase()) >= 0 ) {
        return true;
    }

    return false;
}