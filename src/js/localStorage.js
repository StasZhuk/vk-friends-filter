export function saveToStorage() {
    let storage = localStorage;
    let itemsListFriends = document.querySelectorAll('.list-all li');
    let itemsListFilterFriends = document.querySelectorAll('.list-filter li');
    let leftList = [];
    let rightList = [];

    Array.prototype.forEach.call(itemsListFriends, function(item) {
        let obj = {};
        let imgSrc = item.querySelector('img').getAttribute('src'); 
        let itemName = item.querySelector('.friends-item__title').innerText.split(' '); 
        
        obj.photo_100 = imgSrc;
        obj.first_name = itemName[0];
        obj.last_name = itemName[1];

        leftList.push(obj);
    });

    Array.prototype.forEach.call(itemsListFilterFriends, function(item) {
        let obj = {};
        let imgSrc = item.querySelector('img').getAttribute('src'); 
        let itemName = item.querySelector('.friends-item__title').innerText.split(' '); 
        
        obj.photo_100 = imgSrc;
        obj.first_name = itemName[0];
        obj.last_name = itemName[1];

        rightList.push(obj);
    });

    storage.dataLeft = JSON.stringify(leftList);
    storage.dataRight = JSON.stringify(rightList);
}