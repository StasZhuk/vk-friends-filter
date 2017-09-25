import './index.css';
import { saveToStorage } from './js/localStorage.js';
const template = require('./template.hbs');
const filter = require('./js/fillter');
const dnd = require('./js/dnd');

// функция для получения параметров api VK
function api (method, params) {
    return new Promise((resolve, reject) => {
        VK.api(method, params, data => {
            if (data.error) {
                reject(new Error(data.error.error_msg));
            } else {
                resolve(data.response);
            }
        });
    });
}

// получение авторизации 
const promise = new Promise ((resolve, reject) => {
    VK.init({
        apiId: 6192990
    });

    VK.Auth.login(data => {
        if (data.session) {
            resolve(data);
        } else {
            reject(new Error('Не удалось подключиться'));
        }
    }, 8);
});

promise
    .then(() => {
        // склоняет имя поьзователя
        return api('users.get', { v: 5.68, name_case: 'gen' });
    })
    .then(data => {
        const [user] = data;

        // получаем данные пользователя(имя фамилия фото друзей)
        return api('friends.get', { v: 5.68, fields: 'first_name, last_name, photo_100, id' })
    })
    .then(data => {
        // выводим данные на страницу через Handlebars шаблон
        let leftListHtml = document.querySelector('#leftList');
        let rightListHtml = document.querySelector('#rightList');
        let html = template({ users: data.items });
        
        if (localStorage.dataLeft && localStorage.dataRight) {
            leftListHtml.innerHTML = template({ users: JSON.parse(localStorage.dataLeft) });
            rightListHtml.innerHTML = template({ users: JSON.parse(localStorage.dataRight) });
        } else {
            leftListHtml.innerHTML = html;
        }

        document.querySelector('.btn-save').addEventListener('click', function() {
            saveToStorage();
        });

        dnd();
        filter();
    })
    .catch(function(e) {
        // отлов ошибок
        alert('Ошибка' + e.message);
    })