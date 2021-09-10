
const btnRegister = document.getElementById('btnRegister');
const errorMessage = document.getElementById('msg');
const url  =  "https://meekapi20201003140427.azurewebsites.net/API/User/UserRegistration";


function getrole(){
    role = document.getElementById('role').value;
    console.log(role);
}

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
        var role=String(document.getElementById('role').value);
        if(role != ""){
            sendHttpRequest('POST',url,{ 
                FullName:document.getElementById("name").value,
                Email:document.getElementById("email").value,
                Password:document.getElementById("PASS1").value,
                Role:role
            }).then(responseData=>{
                if(responseData.message  == "OK"){
                    console.log(responseData);
                    document.getElementById('preloader-active1').style.display='block';
                    setTimeout(function(){
                        window.location.href="login.html";
                    },4000);
                }
                else{
                    console.log(responseData);
                    errorMessage.style.display='block';
                    errorMessage.innerHTML=responseData.message;
                }
            }).catch(err=>{
                errorMessage.style.display='block';
                errorMessage.innerHTML=err;
                console.log(err);
            });
        }
        else{
            errorMessage.style.display='block';
                errorMessage.innerHTML="err";
        }
    };
    btnRegister.addEventListener('click',function(event){
        event.preventDefault();
        console.log(role);
       loginUser();
    });