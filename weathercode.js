document.addEventListener('DOMContentLoaded',function(){
    let incelsius=true; //default degrees are celsius when first visiting app
    let tempval,feelslikeval;
    const monthArr=['January','February','March','April','May','June','July','August','September','October','November','December'];
   
    //farenheit to celsius
    const ftoc=()=>{
        if (incelsius===false){        
            incelsius=true;           
            const newtemp=Math.round((tempval-32)*5/9);
            const newfeelslike=Math.round((feelslikeval-32)*5/9);
            tempval=newtemp;
            feelslikeval=newfeelslike;                            
            document.getElementById('temp').innerHTML=newtemp+'°C';
            document.getElementById('feelslike').innerHTML=newfeelslike+'°C';
        }
    }

    //celsius to farenheit
    const ctof=()=>{        
        if (incelsius===true){
            incelsius=false; 
            const newtemp=Math.round((tempval*9/5)+32);
            const newfeelslike=Math.round((feelslikeval*9/5)+32);
            tempval=newtemp;
            feelslikeval=newfeelslike;            
            document.getElementById('temp').innerHTML=newtemp+'°F';
            document.getElementById('feelslike').innerHTML=newfeelslike+'°F';         
            
        }

    }   

    document.getElementById('farenheit').onclick=ctof;
    document.getElementById('celsius').onclick=ftoc; 

    //fetching data from visual crossing api
    const getweatherinfo=(locationvalue)=>{
        url='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+locationvalue+'?key=FZRM4QGNURRJWUZU2H8CZYKX2'
        
        fetch(url)
        .then(response=>{
        return response.json()
         })
        .then(jsonresponse=>{
            let tempsymbol='°C'
            let {temp,feelslike,humidity,uvindex,conditions}=jsonresponse.currentConditions; 
            const resolvedAddress=jsonresponse.resolvedAddress;
            const sdate=jsonresponse.days[0].datetime;
            const dateArr=sdate.split('-')
            const yearString=dateArr[0];
            const monthString=monthArr[parseInt(dateArr[1])-1];
            const dayInt=parseInt(dateArr[2]);
            const fullDate=dayInt.toString()+" "+monthString+" "+yearString;
            //check if we want temp in celsius or farenheit-temp in currentConditions in api json is in farenheit        
            if (incelsius===true){
                temp=Math.round((temp-32)*5/9);
                feelslike=Math.round((feelslike-32)*5/9);
            }
            else{
                tempsymbol='°F'
            }
            tempval=temp;
            feelslikeval=feelslike;     
            document.getElementById('errormessage').innerHTML='';
            document.getElementById('fullDate').innerHTML='';
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
    getweatherinfo('london');

    const newlocation=document.getElementById('location');
    document.querySelector('form').onsubmit=()=>{
        const locationvalue=newlocation.value;     
        getweatherinfo(locationvalue);        
        return false;
    }
});
    

    

