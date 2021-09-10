let params = (new URL(document.location)).searchParams;
let Id = params.get("Id");
let cat = params.get("Industry");
console.log(cat);
let userStorage = window.localStorage;
const id=userStorage.getItem('userId');
const login = document.getElementById('login');
const pitch = document.getElementById('pitch');
const register = document.getElementById('register');
const logout = document.getElementById('logout');
logout.style.display='none';
if(userStorage.getItem('role') !=null){
login.style.display='none';
register.style.display='none';
logout.style.display='inline';
    if(userStorage.getItem('role')=='Innovator'){
        document.getElementById('investor').style.display='none';
        document.getElementById('pitch-review').style.display='none';
    }

    if(userStorage.getItem('role')=='Investor'){
        document.getElementById('innovator').style.display='none';
        document.getElementById('pitch-review').style.display='none';
    }
    if(userStorage.getItem('role')=='Reviewer'){
        document.getElementById('innovator').style.display='none';
        document.getElementById('investor').style.display='none';
    }
}
else{
    document.getElementById('rewards').style.display='none';
    document.getElementById('insights').style.display='none';
login.style.display='inline';
register.style.display='inline';
logout.style.display='none';
document.getElementById('profile').style.display  = 'none';
document.getElementById('innovator').style.display='none';
document.getElementById('pitch-review').style.display='none';
document.getElementById('investor').style.display='none';
}
const urlRouteGetRequirements = "https://meekapi20201003140427.azurewebsites.net/API/GetCoupon";

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
    window.addEventListener('load',function(){
        sendHttpRequest('POST',urlRouteGetRequirements,{
            userId:id
        }).then(responseData=>{
            console.log(responseData);
            var data = responseData;
            for(var i=0; i<data.length; i++){
                var html = "";
                html +="<div class='col-lg-4'>";
                html +="<div class='properties properties2 mb-30'>";
                html +="<div class='properties__card'>";
                html +="<div class='properties__caption'>";
                html +="<p id='pitch-category'>"+data[i].date+"</p>";
                html +="<h3><a href='#' id='pitch-name'>"+data[i].code+"</a></h3>";
                html +="</div>";
                html +="</div>";
                html +="</div>";
                html +="</div>";
                html +="</div>";
                html +="</div>";
                document.getElementById('data').innerHTML += html;
            }
        }).catch(err=>{

            console.log(err);
        });
    });

