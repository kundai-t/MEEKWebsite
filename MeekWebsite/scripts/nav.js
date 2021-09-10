
document.addEventListener('load', function(){
    let userStorage = window.localStorage;
    const login = document.getElementById('login');
    const pitch = document.getElementById('pitch');
    const register = document.getElementById('register');
    const logout = document.getElementById('logout');
    console.log(userStorage.getItem('role'));
    logout.style.display='none';
    if(userStorage != null){
    login.style.display='none';
    register.style.display='none';
    logout.style.display='inline';
        if(userStorage.getItem('role')=='Innovator'){
            document.getElementById('investor').style.display='none';
            document.getElementById('pitch-review').style.display='none';
        }
    
        if(userStorage.getItem('role')=='investor'){
            document.getElementById('innovator').style.display='none';
            document.getElementById('pitch-review').style.display='none';
        }
    }
    else{
        document.getElementById('insights').style.display='none';
    login.style.display='inline';
    register.style.display='inline';
    document.getElementById('profile').style.display  = 'none';
    logout.style.display='none';
    }
});