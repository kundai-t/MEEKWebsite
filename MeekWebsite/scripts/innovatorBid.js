let userStorage = window.localStorage;
const login = document.getElementById('login');
const pitch = document.getElementById('pitch');
let params = (new URL(document.location)).searchParams;
let PitchId = params.get("Id");
let pitchName = params.get("pitchName");
const register = document.getElementById('register');
const logout = document.getElementById('logout');
console.log(userStorage.getItem('role'));
document.getElementById('title').innerText = pitchName;
const urlRouteGetBid =  "https://meekapi20201003140427.azurewebsites.net/API/Application/GetBidDetails";
const urlRouteMeeting = "https://meekapi20201003140427.azurewebsites.net/API/Application/GetMeetingDetails";
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
        document.getElementById('common-section').style.display='none';
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
$(document).ready(function(){
   getBiddingDetails();
   getMeetingDetails();
});

const getMeetingDetails = ()=>{
    sendHttpRequest('POST',urlRouteMeeting,{
        PitchID:PitchId
    }).then(responseData=>{
        console.log(responseData);
        var data = responseData;
        for(var i=0; i<data.length; i++){
            var html ="";
            html +="<div class='single-services mb-30'>";
            html+= "<div class=features-icon'>";
            html +=" <img src='assets/img/icon/icon3.svg' alt=''>";
            html +="</div>";
            html +="<div class='features-caption'>";
            html +="<h3>Meeting Details</h3>";
            html +="<p>Meeting Time: <span>"+data[i].InterviewTime+"</span></p>" ;
            html +="<p>Meeting Date: <span>"+data[i].InterviewDate+"</span></p>" ;
            html +="<p>Meeting Room: <span></span>"+data[i].InterviewRoom+"</p>" ;
            html +="<p>Additional Comments: <br><span>"+data[i].InvestorMessage+"</span></p>"
            html +="<br>";            
            html +="<p><a href='meeting.html?room="+data[i].InterviewRoom+"' class='btn btn-primary'>Join</a></p>"
            html +="</div>";
            html +="</div>" ;  
            
            document.getElementById('meeting').innerHTML +=html;
        }
    }).catch(err=>{

    });
};
const getBiddingDetails = ()=>{
    sendHttpRequest('POST',urlRouteGetBid,{
        pitchId:PitchId
    }).then(responseData=>{
        console.log(responseData);
        var data = responseData;
        var acceptLink = '';
        var rejectLink = '';
        var counterLink = '';
        for(var i=0;i<data.length; i++){
            for(var i=0;i<data.length; i++){
                if(data[i].isComplete== '1'){
                    acceptLink ='#';
                    rejectLink = '#';
                    counterLink = '#';
                }
                else if(data[i].isComplete  != '1'){
                    acceptLink = `accept.html?PitchId=${data[i].pitchId}&InvestorId=${data[i].InvestorUserID}`;
                    rejectLink = `reject.html?PitchId=${data[i].pitchId}&InvestorId=${data[i].InvestorUserID}`;
                    counterLink = `counter.html?PitchId=${data[i].pitchId}&InvestorId=${data[i].InvestorUserID}`;
                }
            var html1 =  "";
                html1 +="<div class='single-services mb-30'>";
                html1+= " <div class='features-icon'>";
                html1+=  "<img src='assets/img/icon/icon2.svg' alt=''>";
                html1+=  " </div>";
                 html1+=  "<div class='features-caption'>";
                 html1+= "<h3>Your Offer</h3>";
                 html1+=  "<p>Amount Asking For: <span>R"+data[i].Innovatorfunds+"</span></p>";
                 html1+= " <p>Percentage Willing To Give: <span>"+data[i].Innovatorpercentage+"%</span></p>";
                 html1+= " <p>Additional Comments: <br><span>"+data[i].InnovatorMessage+"</span></p>";
                 html1+=  " <br>";
                 html1+=  "<p><a href='"+counterLink+"' class='btn btn-secondary'>Counter</a></p>";
                 html1+= "</div>";
                 html1+= "</div>";

                 document.getElementById('your-offer').innerHTML +=html1;
            var html2 = "";
            html2 +="<div class='single-services mb-30'>";
            html2+= " <div class='features-icon'>";
            html2+=  "<img src='assets/img/icon/icon2.svg' alt=''>";
            html2+=  " </div>";
             html2+=  "<div class='features-caption'>";
             html2+= "<h3>Investor's Offer</h3>";
             html2+=  "<p>Amount Willing To Give: <span>R"+data[i].Investorfunds+"</span></p>";
             html2+= " <p>Percentage Requested: <span>"+data[i].Investorpercentage+"%</span></p>";
             html2+= " <p>Additional Comments: <br><span>"+data[i].InvestorMessage+"</span></p>";
             html2+=  "<br>";
             html2+= "<p><a href='"+acceptLink+"' class='btn btn-sucess'>Accept</a></p>";
             html2+=  " <br>";
             html2+=  "<p><a href='"+rejectLink+"' class='btn btn-danger'>Reject</a></p>";
             html2+= "</div>";
             html2+= "</div>";
             document.getElementById('offer').innerHTML +=html2;
        }
    }}).catch(err=>{

    });
};