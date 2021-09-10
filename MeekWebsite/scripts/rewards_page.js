let userStorage = window.localStorage;
const login = document.getElementById('login');
const pitch = document.getElementById('pitch');
const register = document.getElementById('register');
const logout = document.getElementById('logout');
let UserId = userStorage.getItem('userId');
console.log(userStorage.getItem('role'));
const route = "https://meekapi20201003140427.azurewebsites.net/API/Application/GetRewardsList";
const claimRoute = "https://meekapi20201003140427.azurewebsites.net/API/Application/ClaimRewards";
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
$(document).ready(function(){
move();
getCoupon();
  });
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
function move() {
    sendHttpRequest("POST",route,{
        "Id":UserId
    }).then(responseData=>{
        console.log(responseData);
        document.getElementById('register-xp').innerHTML=responseData.map(a=>a.registerXP);
        document.getElementById('mobile-xp').innerHTML=responseData.map(a=>a.mobileXP);
        document.getElementById('submit-xp').innerHTML=responseData.map(a=>a.submitPitchXP);
        document.getElementById('success-xp').innerHTML=responseData.map(a=>a.progressXP);
        document.getElementById('review-xp').innerHTML=responseData.map(a=>a.reviewerXP);
        document.getElementById('invest-xp').innerHTML=responseData.map(a=>a.invest);
        let claimCounter =  Number(responseData.map(a=>a.isClaimed));
        let miniRequired = (claimCounter + 1) * 100;
        console.log(miniRequired);
        let totalXP = Number(responseData.map(a=>a.registerXP)) + Number(responseData.map(a=>a.mobileXP)) + Number(responseData.map(a=>a.submitPitchXP)) + Number(responseData.map(a=>a.progressXP)) + Number(responseData.map(a=>a.reviewerXP)) + Number(responseData.map(a=>a.invest));
        console.log(totalXP);
        document.getElementById('collected').innerHTML =  totalXP;
        document.getElementById('needed').innerHTML = miniRequired;
        var elem = document.getElementById("myBar");
        var width = (totalXP/miniRequired)*100;
        elem.style.width = width + "%";
        if(totalXP < miniRequired){
            document.getElementById('div-claim').style.display='none';
        }
    }).catch(err=>{
        console.log(err);
    });
    //elem.innerHTML = width + "%";
} 
const urlRouteGetRequirements = "https://meekapi20201003140427.azurewebsites.net/API/GetCoupon";
function getCoupon(){
    sendHttpRequest('POST',urlRouteGetRequirements,{
        userId:UserId
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
            html +="<h3><a href='#' id='pitch-name'>"+data[i].value+"</a></h3>";
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
}

const claimRewards = ()=>{
    sendHttpRequest('POST',claimRoute,{
        userId:UserId
    }).then(responseData=>{
        if(responseData.message == "OK"){
            window.location.href='rewards_page.html';
        }
    }).catch(err=>{
        console.log(err);
    });
};

document.getElementById('claim').addEventListener('click',function(event){
    event.preventDefault();
    claimRewards();
});

