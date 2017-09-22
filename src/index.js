import './index.css';
const template = require('./template.hbs');

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
        return api('users.get', { v: 5.68, name_case: 'gen' });
    })
    .then(data => {
        const [user] = data;

        return api('friends.get', { v: 5.68, fields: 'first_name, last_name, photo_100' })
    })
    .then(data => {
        console.log(data.items);
        let html = template({ users: data.items }) ;
        let result = document.querySelector('#result');
        
        result.innerHTML = html;
    })
    .catch(function(e) {
        alert('Ошибка' + e.message);
    })