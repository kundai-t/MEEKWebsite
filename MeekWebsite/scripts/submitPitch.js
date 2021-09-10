const addPitch = document.getElementById('addPitch');

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
        document.getElementById('investor').style.display='none';
        document.getElementById('pitch-review').style.display='none';
    }

    if(userStorage.getItem('role')=='Investor'){
        window.location.href='AddRequirement.html';
        document.getElementById('innovator').style.display='none';
        document.getElementById('pitch-review').style.display='none';
    }
    if(userStorage.getItem('role')=='Reviewer'){
        window.location.href='Reviewpitches.html';
        document.getElementById('innovator').style.display='none';
        document.getElementById('investor').style.display='none';
    }
}
else{
    document.getElementById('rewards').style.display='none';
    document.getElementById('insights').style.display='none';
    window.location.href='login.html';
login.style.display='inline';
register.style.display='inline';
document.getElementById('profile').style.display  = 'none';
logout.style.display='none';
document.getElementById('innovator').style.display='none';
document.getElementById('pitch-review').style.display='none';
document.getElementById('investor').style.display='none';
}
document.getElementById('tell').innerHTML="1/9";
document.getElementById('second-stuff').style.display='none';
document.getElementById('third-stuff').style.display='none';
document.getElementById('forth-stuff').style.display='none';
document.getElementById('fifth-stuff').style.display='none';
document.getElementById('six-stuff').style.display='none';
document.getElementById('seven-stuff').style.display='none';
document.getElementById('eight-stuff').style.display='none';
document.getElementById('nine-stuff').style.display='none';

document.getElementById('next1').addEventListener('click',function(){
    document.getElementById('title-first').style.display='none';
    document.getElementById('second-stuff').style.display='inline';
    document.getElementById('tell').innerHTML="2/9";
});
document.getElementById('prev2').addEventListener('click',function(){
    document.getElementById('title-first').style.display='block';
    document.getElementById('second-stuff').style.display='none';
    document.getElementById('third-stuff').style.display='none';
    document.getElementById('tell').innerHTML="1/9";
});
document.getElementById('next2').addEventListener('click',function(){
    document.getElementById('tell').innerHTML="3/9";
    document.getElementById('title-first').style.display='none';
    document.getElementById('second-stuff').style.display='none';
    document.getElementById('third-stuff').style.display='block';
});
document.getElementById('prev3').addEventListener('click',function(){
    document.getElementById('tell').innerHTML="2/9";
    document.getElementById('second-stuff').style.display='block';
    document.getElementById('third-stuff').style.display='none';
    document.getElementById('forth-stuff').style.display='none';
    document.getElementById('fifth-stuff').style.display='none';
    document.getElementById('six-stuff').style.display='none';
    document.getElementById('seven-stuff').style.display='none';
    document.getElementById('eight-stuff').style.display='none';
    document.getElementById('nine-stuff').style.display='none';
});
document.getElementById('next3').addEventListener('click',function(){
    document.getElementById('tell').innerHTML="4/9";
    document.getElementById('second-stuff').style.display='none';
    document.getElementById('third-stuff').style.display='none';
    document.getElementById('forth-stuff').style.display='block';
    document.getElementById('fifth-stuff').style.display='none';
    document.getElementById('six-stuff').style.display='none';
    document.getElementById('seven-stuff').style.display='none';
    document.getElementById('eight-stuff').style.display='none';
    document.getElementById('nine-stuff').style.display='none';
});
document.getElementById('prev4').addEventListener('click',function(){
    document.getElementById('tell').innerHTML="3/9";
    document.getElementById('second-stuff').style.display='none';
    document.getElementById('third-stuff').style.display='block';
    document.getElementById('forth-stuff').style.display='none';
    document.getElementById('fifth-stuff').style.display='none';
    document.getElementById('six-stuff').style.display='none';
    document.getElementById('seven-stuff').style.display='none';
    document.getElementById('eight-stuff').style.display='none';
    document.getElementById('nine-stuff').style.display='none';
});
document.getElementById('next4').addEventListener('click',function(){
    document.getElementById('tell').innerHTML="5/9";
    document.getElementById('second-stuff').style.display='none';
    document.getElementById('third-stuff').style.display='none';
    document.getElementById('forth-stuff').style.display='none';
    document.getElementById('fifth-stuff').style.display='block';
    document.getElementById('six-stuff').style.display='none';
    document.getElementById('seven-stuff').style.display='none';
    document.getElementById('eight-stuff').style.display='none';
    document.getElementById('nine-stuff').style.display='none';
});
document.getElementById('prev5').addEventListener('click',function(){
    document.getElementById('tell').innerHTML="4/9";
    document.getElementById('second-stuff').style.display='none';
    document.getElementById('third-stuff').style.display='none';
    document.getElementById('forth-stuff').style.display='block';
    document.getElementById('fifth-stuff').style.display='none';
    document.getElementById('six-stuff').style.display='none';
    document.getElementById('seven-stuff').style.display='none';
    document.getElementById('eight-stuff').style.display='none';
    document.getElementById('nine-stuff').style.display='none';
});
document.getElementById('next5').addEventListener('click',function(){
    document.getElementById('tell').innerHTML="6/9";
    document.getElementById('second-stuff').style.display='none';
document.getElementById('third-stuff').style.display='none';
document.getElementById('forth-stuff').style.display='none';
document.getElementById('fifth-stuff').style.display='none';
document.getElementById('six-stuff').style.display='block';
document.getElementById('seven-stuff').style.display='none';
document.getElementById('eight-stuff').style.display='none';
document.getElementById('nine-stuff').style.display='none';
});
document.getElementById('prev6').addEventListener('click',function(){
    document.getElementById('tell').innerHTML="5/9";
    document.getElementById('second-stuff').style.display='none';
    document.getElementById('third-stuff').style.display='none';
    document.getElementById('forth-stuff').style.display='none';
    document.getElementById('fifth-stuff').style.display='block';
    document.getElementById('six-stuff').style.display='none';
    document.getElementById('seven-stuff').style.display='none';
    document.getElementById('eight-stuff').style.display='none';
    document.getElementById('nine-stuff').style.display='none';
});
document.getElementById('next6').addEventListener('click',function(){
    document.getElementById('tell').innerHTML="7/9";
    document.getElementById('second-stuff').style.display='none';
    document.getElementById('third-stuff').style.display='none';
    document.getElementById('forth-stuff').style.display='none';
    document.getElementById('fifth-stuff').style.display='none';
    document.getElementById('six-stuff').style.display='none';
    document.getElementById('seven-stuff').style.display='block';
    document.getElementById('eight-stuff').style.display='none';
    document.getElementById('nine-stuff').style.display='none';
});
document.getElementById('prev7').addEventListener('click',function(){
    document.getElementById('tell').innerHTML="6/9";
    document.getElementById('second-stuff').style.display='none';
    document.getElementById('third-stuff').style.display='none';
    document.getElementById('forth-stuff').style.display='none';
    document.getElementById('fifth-stuff').style.display='none';
    document.getElementById('six-stuff').style.display='block';
    document.getElementById('seven-stuff').style.display='none';
    document.getElementById('eight-stuff').style.display='none';
    document.getElementById('nine-stuff').style.display='none';
});
document.getElementById('next7').addEventListener('click',function(){
    document.getElementById('tell').innerHTML="8/9";
    document.getElementById('second-stuff').style.display='none';
    document.getElementById('third-stuff').style.display='none';
    document.getElementById('forth-stuff').style.display='none';
    document.getElementById('fifth-stuff').style.display='none';
    document.getElementById('six-stuff').style.display='none';
    document.getElementById('seven-stuff').style.display='none';
    document.getElementById('eight-stuff').style.display='block';
    document.getElementById('nine-stuff').style.display='none';
});
document.getElementById('prev8').addEventListener('click',function(){
    document.getElementById('tell').innerHTML="7/9";
    document.getElementById('second-stuff').style.display='none';
    document.getElementById('third-stuff').style.display='none';
    document.getElementById('forth-stuff').style.display='none';
    document.getElementById('fifth-stuff').style.display='none';
    document.getElementById('six-stuff').style.display='none';
    document.getElementById('seven-stuff').style.display='block';
    document.getElementById('eight-stuff').style.display='none';
    document.getElementById('nine-stuff').style.display='none';
});
document.getElementById('next8').addEventListener('click',function(){
    document.getElementById('tell').innerHTML="9/9";
    document.getElementById('second-stuff').style.display='none';
    document.getElementById('third-stuff').style.display='none';
    document.getElementById('forth-stuff').style.display='none';
    document.getElementById('fifth-stuff').style.display='none';
    document.getElementById('six-stuff').style.display='none';
    document.getElementById('seven-stuff').style.display='none';
    document.getElementById('eight-stuff').style.display='none';
    document.getElementById('nine-stuff').style.display='block';
});
document.getElementById('saveLater').addEventListener('click',function(){
    document.getElementById('tell').innerHTML="8/9";
    document.getElementById('second-stuff').style.display='none';
    document.getElementById('third-stuff').style.display='none';
    document.getElementById('forth-stuff').style.display='none';
    document.getElementById('fifth-stuff').style.display='none';
    document.getElementById('six-stuff').style.display='none';
    document.getElementById('seven-stuff').style.display='none';
    document.getElementById('eight-stuff').style.display='block';
    document.getElementById('nine-stuff').style.display='none';
});

 const urlRoute = "https://meekapi20201003140427.azurewebsites.net/API/Application/AddPitch";
var location2,industry,stage,role,budget,max,min,raise;
//pitch stuff

function getLocation(){
     location2 = document.getElementById('location-select').value;
    console.log(location2);
}
function getIndustry(){
     industry = document.getElementById('industry-select').value;
}
function getStage(){
     stage = document.getElementById('stage').value;
}
function getRole(){
     role = document.getElementById('role-select').value;
}
function getBudget(){
     budget = document.getElementById('budget').value;
}
function getMax(){
     max = document.getElementById('max').value;
}
function getMini(){
     mini = document.getElementById('min').value;
}
function getRasied(){
     raise = document.getElementById('rasied').value;
}
let file = {};
function chooseFile(e){
    file = e.target.files[0];
}
function uploadFile(name){
    firebase.storage().ref('Pitches/' + name + '/Finance.pdf').put(file).then(function(){
        console.log('Successfully uploaded');
    }).catch(err=>{
        console.log(err.message);
    });
}
function uploadFile2(name){
    firebase.storage().ref('Pitches/' + name + '/Other.pdf').put(file).then(function(){
        console.log('Successfully uploaded');
    }).catch(err=>{
        console.log(err.message);
    });
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
    const addNewPitch = ()=>{
        const summary = String(document.getElementById('sumarry').value);
        const business = String(document.getElementById('business').value);
        const market = String(document.getElementById('market').value);
        const progress = String(document.getElementById('progress').value);
        const objective = String(document.getElementById('objective').value);
        const url = String(document.getElementById('url').value);
        var location2=String(document.getElementById('location-select').value);
        var industry=String(document.getElementById('industry-select').value);
        var stage=String(document.getElementById('stage').value);
        var role=String(document.getElementById('role-select').value);
        var budget=String(document.getElementById('budget').value);
        var max=String(document.getElementById('max').value);
        var min=String(document.getElementById('min').value);
        var raise=String(document.getElementById('rasied').value);
        uploadFile(document.getElementById('name').value);
        uploadFile2(document.getElementById('name').value);
        sendHttpRequest('POST',urlRoute,{ 
            id:userStorage.getItem('userId'),
            PitchName:document.getElementById('name').value,
            ManagementLocation:location2,
            Industry:industry,
            Stage:stage,
            IdealInvestorRole:role,
            Budget:budget,
            MinimumInvestmentPerInvestor:min,
            MaximumInvestmentPerInvestor:max,
            PreviousRoundRaise:raise,
            ShortSummary:summary,
            TheBusiness:business,
            TheMarket:market,
            ProgressProof:progress,
            Objectives:objective,
            VideoLink:url,
            isDeleted:0,
            isSuccess:0,
            isReviewed:0
        }).then(responseData=>{
            if(responseData.message=="OK"){
                console.log(responseData);
                document.getElementById('preloader-active1').style.display='block';
                    setTimeout(function(){
                        window.location.href="pitches.html";
                    },4000);
            }
        }).catch(err=>{

            console.log(err);
        });
    };
addPitch.addEventListener('click',function(){
    addNewPitch();
});
window.addEventListener('load',function(event){
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
});