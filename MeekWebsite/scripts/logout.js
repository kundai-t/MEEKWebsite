document.getElementById('logout').addEventListener('click',function(){
    let userStorage = window.localStorage;
    userStorage.clear();
    window.location.href='index.html';
});