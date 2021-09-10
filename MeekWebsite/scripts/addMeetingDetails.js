const urlRoute =  "https://meekapi20201003140427.azurewebsites.net/API/Application/AddMeetingDetails";
//const urlRoute = "https://localhost:44343/API/Application/AddMeetingDetails";
let params = (new URL(document.location)).searchParams;
let Id = params.get("PitchId");
let userStorage = window.localStorage;

let userId = userStorage.getItem('userId');

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

    function getTime(){
        meetingTime = document.getElementById('time').value;
       console.log(meetingTime);
   }
   function getType(){
        meetingType = document.getElementById('type').value;
        console.log(meetingType);
   }
   function getDate(){
    meetingDate = document.getElementById('date-pick').value;
    console.log(meetingDate);
}

const addMeeting =() =>{

    const date =  String(document.getElementById('date-pick').value);
    const time = String(document.getElementById('time').value);
    const comments = String(document.getElementById('comments').value);
    const room = String(document.getElementById('room').value);
    const type = String(document.getElementById('type').value);

    console.log(date + '\n' + time + '\n' + type + '\n' + room);
    sendHttpRequest('POST',urlRoute,{
        UserId:userId,
        PitchID:Id,
        InterviewDate: date,
        InterviewTime: time,
        InterviewRoom: room,
        isComplete:0,
        TextMessage:comments
    }).then(responseData=>{
        console.log(responseData);
        if(responseData.message == 'OK'){
            window.location.href = 'InvestorPitches.html'
        }
    }).catch(err=>{
        console.log(err);
    });
};

    document.getElementById('addMeeting').addEventListener('click',function(e){
        e.preventDefault();
        addMeeting();
    });