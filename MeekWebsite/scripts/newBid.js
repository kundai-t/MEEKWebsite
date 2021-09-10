let userStorage = window.localStorage;
const login = document.getElementById('login');
const pitch = document.getElementById('pitch');
const register = document.getElementById('register');
const logout = document.getElementById('logout');
console.log(userStorage.getItem('role'));
const userId =  userStorage.getItem('userId');
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
const urlRoute = "https://meekapi20201003140427.azurewebsites.net/API/Application/BidEquity";

let params = (new URL(document.location)).searchParams;
let PitchId = params.get("PitchId");

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

    const addBid =  ()=>{
        const amount = String(document.getElementById('amount').value);
        const percentage = String(document.getElementById('percentage').value);
        const comments = String(document.getElementById('comments').value);
        sendHttpRequest('POST',urlRoute,{
            pitchId:PitchId,
            InvestorUserID:userId,
            Investorfunds:amount,
            InvestorMessage:comments,
            Investorpercentage:percentage
        }).then(responseData=>{
            console.log(responseData);
            if(responseData.message = 'OK'){
                window.location.href='InvestorPitches.html';
            }
        }).catch(err=>{
            console.log(err);
        });
    };
    document.getElementById('place').addEventListener('click',function(event){
        addBid();
    });