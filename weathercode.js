document.addEventListener('DOMContentLoaded',function(){
    let incelsius=true; //default degrees are celsius when first visiting app
    let tempsymbol,unitGroup;
    const monthArr=['January','February','March','April','May','June','July','August','September','October','November','December'];
   let locationvalue='london';
    //fetching data from visual crossing api
    const getweatherinfo=(locationvalue)=>{
        if (incelsius===true){
            tempsymbol='°C'
            unitGroup='metric'; //unitGroup parameter available in url, metric returns temp in celsius, us in farenheit
        }
        else{
            tempsymbol='°F';
            unitGroup='us';
        }
        url='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+locationvalue+'/?unitGroup='+unitGroup+'&key=F5GR3SUYYWMPYAT7KJTY2GFW2'
        console.log(url);
        fetch(url)
        .then(response=>{
            return response.json()
         })
        .then(jsonresponse=>{ 
            console.log(jsonresponse);           
            let {temp,feelslike,humidity,uvindex,conditions}=jsonresponse.currentConditions; 
            const resolvedAddress=jsonresponse.resolvedAddress;
            const sdate=jsonresponse.days[0].datetime;
            const dateArr=sdate.split('-')
            const yearString=dateArr[0];
            const monthString=monthArr[parseInt(dateArr[1])-1];
            const dayInt=parseInt(dateArr[2]);
            const fullDate=dayInt.toString()+" "+monthString+" "+yearString;       
            
               
            document.getElementById('errormessage').innerHTML='';            
            document.getElementById('resolvedAddress').innerHTML=resolvedAddress;            
            document.getElementById('temp').innerHTML=temp+tempsymbol;
            document.getElementById('feelslike').innerHTML=feelslike+tempsymbol;           
            document.getElementById('humidity').innerHTML=humidity+"%";            
            document.getElementById('uv').innerHTML=uvindex; 
            document.getElementById('conditions').innerHTML=conditions;  
            document.getElementById('fullDate').innerHTML=fullDate;         
        })    
        .catch(err=>document.getElementById('errormessage').innerHTML='Invalid location,please try again!');

    }
  
    getweatherinfo(locationvalue);

    const newlocation=document.getElementById('location');
    document.querySelector('form').onsubmit=()=>{
        locationvalue=newlocation.value;     
        getweatherinfo(locationvalue);        
        return false;
    }

    //farenheit to celsius
    const ftoc=()=>{
        if (incelsius===false){        
            incelsius=true;           
            getweatherinfo(locationvalue);
        }
        else{
            getweatherinfo(locationvalue);
        }
    }

    //celsius to farenheit
    const ctof=()=>{        
        if (incelsius===true){
            incelsius=false; 
            getweatherinfo(locationvalue);         
        
        }
        else{
            getweatherinfo(locationvalue);
        }

    }   
    document.getElementById('farenheit').onclick=ctof;
    document.getElementById('celsius').onclick=ftoc; 
    
});