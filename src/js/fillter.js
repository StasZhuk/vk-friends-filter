import { FilterList, isMatching} from './functions.js';

module.exports = () => {
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

    // обработчик события клика по кнопке 'добавить друга'
    listFriends.addEventListener('click', e => {
        let target = e.target;

        // делегируем событие на кнопку
        if ( target.classList.contains('vk-filter__btn-close')) {
            let itemLi = target.parentElement;
            
            // добавляем друга в правый список
            listFilterFriends.appendChild(itemLi);
        }
        FilterList(listFilterFriends, inputFilterFriends);
    });
    
    // обработчик события клика по кнопке 'удалить друга'
    listFilterFriends.addEventListener('click', e => {
        let target = e.target;

        // делегируем событие на кнопку
        if ( target.classList.contains('vk-filter__btn-close')) {
            let itemLi = target.parentElement;
            
            // возвращаем друга в левый список
            listFriends.appendChild(itemLi);
        }
        FilterList(listFriends, inputAllFriends);
    });
}