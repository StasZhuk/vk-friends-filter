module.exports = data => {
    let inputAllFriends = document.querySelector('#friends-all');
    let listFriends = document.querySelector('.list-all');
    let listFilterFriends = document.querySelector('.list-filter');
    let liItemsArr = listFriends.querySelectorAll('li');    

    // обработчик ввода в поле фильра всех друзей(левое) 
    inputAllFriends.addEventListener('keyup', () => {
        let inputVal = inputAllFriends.value;
        let liItemsArrLength = liItemsArr.length;
        
        // если поле фиьтра пустое показываем всех
        if (inputVal === '') {
            for (let i = 0; i < liItemsArrLength; i++) {
                liItemsArr[i].style.display = 'flex';
            }
        } else {
            for (let i = 0; i < liItemsArrLength; i++) {
                liItemsArr[i].style.display = 'none';
            }
            // проверяем на совпадения и отображаем нужное
            data.items.forEach(function(user) {
                if (isMatching(user.first_name + ' ' + user.last_name, inputVal)) {
                    // находим элемент по ID друга
                    let userLi = document.getElementById(user.id);

                    userLi.style.display = 'flex';
                }
            });   
        }
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

    // функция сравнения строк
    function isMatching(full, chunk) {
        if (full.toUpperCase().indexOf(chunk.toUpperCase()) >= 0 ) {
            return true;
        }

        return false;
    }
}