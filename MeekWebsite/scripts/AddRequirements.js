 const addPitch = document.getElementById('addRequirements');

 const urlRoute = "https://meekapi20201003140427.azurewebsites.net/API/Application/AddInvestorRequirements";

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

function getBudget(){
     budget = document.getElementById('budget').value;
}
function getMax(){
     max = document.getElementById('max').value;
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
    const addRequirements = ()=>{
        var location = String(document.getElementById('location-select').value);
        var industry=String(document.getElementById('industry-select').value);
        var stage=String(document.getElementById('stage').value);
        var budget=String(document.getElementById('budget').value);
        var max=String(document.getElementById('max').value);
        sendHttpRequest('POST',urlRoute,{ 
            "InvestorID": 1,
            ID: userStorage.getItem('userId'),
            ProjectGroup: industry,
            Budget:budget,
            MaximumAmount: max,
            Stage: stage,
            Location: location
        }).then(responseData=>{
            if(responseData.message=="OK"){
                console.log(responseData);
                 window.location.href="InvestorPitches.html";
            }
        }).catch(err=>{

            console.log(err);
        });
    };
addPitch.addEventListener('click',function(event){
    addRequirements();
});