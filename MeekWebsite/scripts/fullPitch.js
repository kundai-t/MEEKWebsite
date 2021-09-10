let params = (new URL(document.location)).searchParams;
let Id = params.get("Id");
let Pitch_Name = params.get("Name");
let category = params.get("Industry");
const urlRoute =  "https://meekapi20201003140427.azurewebsites.net/API/Application/GetPitchById";
const urlRouteDecision =  "https://meekapi20201003140427.azurewebsites.net/API/Application/UpdatePitchDecision";
const urlRouteSave="https://meekapi20201003140427.azurewebsites.net/API/Application/ChoosePitch";

let userStorage = window.localStorage;
let UserId = userStorage.getItem('userId');
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
        document.getElementById('investor').style.display='none';
        document.getElementById('pitch-review').style.display='none';
        document.getElementById('reject').style.display='none';
        document.getElementById('accept').style.display='none';
        document.getElementById('section').style.display='none';
        document.getElementById('sectionInvestor').style.display='none';
    }

    if(userStorage.getItem('role')=='Investor'){
        document.getElementById('requirements-section').style.display='none';
        document.getElementById('section').style.display='none';
        document.getElementById('innovator').style.display='none';
        document.getElementById('pitch-review').style.display='none';
        document.getElementById('reject').style.display='none';
        document.getElementById('accept').style.display='none';
    }
    if(userStorage.getItem('role')=='Reviewer'){
        document.getElementById('innovator').style.display='none';
        document.getElementById('investor').style.display='none';
        document.getElementById('sectionInvestor').style.display='none';
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
        var firebaseConfig = {
            apiKey: "AIzaSyBks5CrSrR7LcKlTMwae-w_-AbHP1c4qAg",
            authDomain: "profile-pic-57c57.firebaseapp.com",
            databaseURL: "https://profile-pic-57c57.firebaseio.com",
            projectId: "profile-pic-57c57",
            storageBucket: "profile-pic-57c57.appspot.com",
            messagingSenderId: "747666154641",
            appId: "1:747666154641:web:90a7a8a0f7f9e30fbdcb30",
            measurementId: "G-QV0G6EB24D"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
        let URL="";
        getFinanceDocURL(Pitch_Name);
        getOtherURL(Pitch_Name);
        sendHttpRequest('POST',urlRoute,{
            PitchID:Id
        }).then(responseData=>{
            console.log(responseData);
            if(responseData.map(h=>h.VideoLink) != 'N/A'){
                URL = responseData.map(h=>h.VideoLink);
            }
            else{
                URL = "#NoVideo";
                document.getElementById('video-text').innerText="No video submitted";
            }
            document.getElementById('location').innerText = responseData.map(a=>a.ManagementLocation);
            document.getElementById('stage').innerText=responseData.map(b=>b.Stage);
            document.getElementById('industry').innerText=responseData.map(c=>c.Industry);
            document.getElementById('role').innerText = responseData.map(d=>d.IdealInvestorRole);
            document.getElementById('budget').innerText  = responseData.map(e=>e.Budget);
            document.getElementById('raise').innerText =  responseData.map(f=>f.PreviousRoundRaise);
            document.getElementById('mini').innerText = responseData.map(g=>g.MinimumInvestmentPerInvestor);
            document.getElementById('max').innerText = responseData.map(g=>g.MaximumInvestmentPerInvestor);
            document.getElementById('summary').innerText = responseData.map(h=>h.ShortSummary);
            document.getElementById('objectives').innerText = responseData.map(h=>h.Objectives);
            document.getElementById('progress').innerText = responseData.map(h=>h.ProgressProof);
            document.getElementById('business').innerText = responseData.map(h=>h.TheBusiness);
            document.getElementById('market').innerText = responseData.map(h=>h.TheMarket);
            document.getElementById('title').innerText = responseData.map(h=>h.PitchName);
            document.getElementById('video-link').setAttribute('href',URL);
        }).catch(err=>{

            console.log(err);
        });
    });
    function getFinanceDocURL(name){
        firebase.storage().ref('Pitches/' + name + '/Finance.pdf').getDownloadURL().then(fileURL=>{
            document.getElementById('finance').addEventListener('click',function(event){
                event.preventDefault();
                window.open(`${fileURL}`, '_blank');
            });
        }).catch(err=>{
            console.log(err);
        })
    }
    function getOtherURL(name){
        firebase.storage().ref('Pitches/' + name + '/Other.pdf').getDownloadURL().then(fileURL=>{
            document.getElementById('other').addEventListener('click',function(event){
                event.preventDefault();
                window.open(`${fileURL}`, '_blank');
            }); 
        }).catch(err=>{
            console.log(err);
        })
    }
    document.getElementById('accept').addEventListener('click',function(event){
        event.preventDefault();
        sendHttpRequest('POST',urlRouteDecision,{
            PitchID:Id,
            isSuccess :"1" ,
            ReviewerMessage :"Hi there you application made past our review stage and it has been sent to our investors",
            userId:UserId
        }).then(responseData=>{
            console.log(responseData);
            document.getElementById('preloader-active1').style.display='block';
            setTimeout(function(){
                window.location.href='Reviewpitches.html';
            },4000);
        }).catch(err=>{

            console.log(err);
        });
    });

    document.getElementById('reject').addEventListener('click',function(event){
        event.preventDefault();
        sendHttpRequest('POST',urlRouteDecision,{
            PitchID:Id,
            isSuccess :"0" ,
            ReviewerMessage :"Hi there, we regret to inform you that your application did not make it through",
            userId:UserId
        }).then(responseData=>{
            console.log(responseData);
            document.getElementById('preloader-active1').style.display='block';
                    setTimeout(function(){
                        window.location.href='Reviewpitches.html';
                    },4000);
        }).catch(err=>{

            console.log(err);
        });
    });
    document.getElementById('saveLater').addEventListener('click',function(event){
        event.preventDefault();
        sendHttpRequest('POST',urlRouteSave,{
            PitchID:Id,
            UserId:userStorage.getItem('userId')
        }).then(responseData=>{
            console.log(responseData);
            window.location.href='InvestorPitches.html';
        }).catch(err=>{

            console.log(err);
        });
    });
    document.getElementById('addMeeting').addEventListener('click',function(event){
        window.location.href=`meetingSetup.html?PitchId=${Id}`;
    });
    document.getElementById('view-requirements').addEventListener('click',function(event){
        window.open(`getRequirements.html?Industry=${category}`, '_blank');
    });