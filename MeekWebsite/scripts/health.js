var urlRoute="https://meekapi20201003140427.azurewebsites.net/API/Application/GetPitchesReviewedByCategory";

let userStorage = window.localStorage;
const login = document.getElementById('login');
const pitch = document.getElementById('pitch');
const register = document.getElementById('register');
const logout = document.getElementById('logout');
console.log(userStorage.getItem('role'));
logout.style.display='none';
if(userStorage.getItem('role') !=null){
login.style.display='none';
register.style.display='none';
logout.style.display='inline';
    if(userStorage.getItem('role')=='Innovator'){
        window.location.href='pitches.html';
        document.getElementById('investor').style.display='none';
        document.getElementById('pitch-review').style.display='none';
    }

    if(userStorage.getItem('role')=='Investor'){
        document.getElementById('innovator').style.display='none';
        document.getElementById('pitch-review').style.display='none';
    }
    if(userStorage.getItem('role')=='Reviewer'){
        window.location.href='HealthNotReviewed.html';
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
        sendHttpRequest('POST',urlRoute,{
            Industry:"Health"
        }).then(responseData=>{
            console.log(responseData);
            var data = responseData;
            for(var i=0; i<data.length; i++){
                var html = "";
                html +="<div class='col-lg-4'>";
                html +="<div class='properties properties2 mb-30'>";
                html +="<div class='properties__card'>";
                html +="<div class='properties__caption'>";
                html +="<p id='pitch-category'>"+data[i].Industry+"</p>";
                html +="<h3><a href='#' id='pitch-name'>"+data[i].PitchName+"</a></h3>";
                html +="<p id='pitch-location'><span>Location<img src='assets\\solid\\placeholder.svg' width='25' height='25'/>:</span>"+data[i].ManagementLocation+"</p>";
                html +="<p id='pitch-stage'><span>Stage<img src='assets\\solid\\flag.svg' width='25' height='25'/>:</span>"+data[i].Stage+"</p>";
                html +="<p id='pitch-role'><span>Investor Role<img src='assets\\solid\\ceo.svg' width='25' height='25'/>:</span>"+data[i].IdealInvestorRole+"</p>";
                html +="<div class='properties__footer d-flex justify-content-between align-items-center'>";
                html +="<div class='restaurant-name'>";
                html +="<p>Estimated Budget</p>";
                html +="</div>";
                html +="<div class='price'>";
                html +="<span>R"+data[i].Budget+"</span>";
                html +="</div>";
                html +="</div>";
                html +="<a href='fullpitchReview.html?Id="+data[i].PitchID+"&Industry="+data[i].Industry+"&Name="+data[i].PitchName+"' class='border-btn border-btn2'>Find out more</a>";
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

