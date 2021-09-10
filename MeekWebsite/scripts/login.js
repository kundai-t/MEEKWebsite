const btnLogin = document.getElementById('loginBtn');
const errorMessage = document.getElementById('msg');
const url = 'https://meekapi20201003140427.azurewebsites.net/API/User/UserLogin';
const sendHttpRequest = (method,url,data)=>{

    const promise = new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open(method,url);
        xhr.responseType = 'json';
        if(data){
            xhr.setRequestHeader('Content-Type','application/json');
        }
        xhr.onload = () => {
            if(xhr.status >=400){
                reject(xhr.response);
            }
            else{
                resolve(xhr.response);
            }
        };
        xhr.onerror = () => {
            reject('Something went wrong!');
          };
      
          xhr.send(JSON.stringify(data));
    });
    return promise;
    };
    const loginUser = ()=>{
        sendHttpRequest('POST',url,{ 
            Email:document.getElementById("email").value,
            Password:document.getElementById("PASS1").value
        }).then(responseData=>{
            if(Array.isArray(responseData) && responseData.length){
                console.log(responseData);
                let lemail = responseData.map(a=>a.email);
                let name = responseData.map(b=>b.surname);
                let userId = responseData.map(c=>c.id);
                let role  = responseData.map(d=>d.usertype);
                 let userStorage = window.localStorage;
                 userStorage.setItem('email',lemail[0]);
                 userStorage.setItem('name',name[0]);
                 userStorage.setItem('userId',userId[0]);
                 userStorage.setItem('role',role[0]);

                 window.location.href="index.html";
            }
            else{
                errorMessage.style.display='block';
                errorMessage.innerHTML="Invalid username or password";
            }
        }).catch(err=>{
            errorMessage.style.display='block';
            errorMessage.innerHTML=err;
            console.log(err);
        });
    };
    btnLogin.addEventListener('click',function(event){
        event.preventDefault();
        loginUser();
    });