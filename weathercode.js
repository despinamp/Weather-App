document.addEventListener('DOMContentLoaded',function(){
    let incelsius=true; //default degrees are celsius when first visiting app
    let tempf,tempc,feelslikef,feelslikec;
    const monthArr=['January','February','March','April','May','June','July','August','September','October','November','December'];
   

    //fetching data from visual crossing api
    const getweatherinfo=(locationvalue)=>{
        if (incelsius===true){
            var tempsymbol='°C';
            unitGroup='uk';
        }
        else{
            var tempsymbol='°F';
            unitGroup='us';
        }

        url='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+locationvalue+'/?unitGroup='+unitGroup+'&key=FZRM4QGNURRJWUZU2H8CZYKX2'
        
        fetch(url)
        .then(response=>{
        return response.json()
         })
        .then(jsonresponse=>{
            
            let {temp,feelslike,humidity,uvindex,conditions}=jsonresponse.currentConditions; 
            console.log(jsonresponse.currentConditions);
            const resolvedAddress=jsonresponse.resolvedAddress;
            const sdate=jsonresponse.days[0].datetime;
            const dateArr=sdate.split('-')
            const yearString=dateArr[0];
            const monthString=monthArr[parseInt(dateArr[1])-1];
            const dayInt=parseInt(dateArr[2]);
            const fullDate=dayInt.toString()+" "+monthString+" "+yearString;
            //check if we want temp in celsius or farenheit-temp in currentConditions in api json is in farenheit        
           if (incelsius===true){
                tempc=temp;
                feelslikec=feelslike;
                let tempfs=tempc*9/5+32;
                tempf=parseFloat(tempfs.toFixed(1));
                let feelslikefs=feelslikec*9/5+32;
                feelslikef=parseFloat(feelslikefs.toFixed(1));
           }
           else{
            tempf=temp;
            feelslikef=feelslike;
            let tempcs=(tempf-32)*5/9;
            tempc=parseFloat(tempcs.toFixed(1));
            let feelslikecs=(feelslikef -32)*5/9;
            feelslikec=parseFloat(feelslikecs.toFixed(1));

           }            
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
        .catch(err=>document.getElementById('errormessage').innerHTML='Invalid location,please try again!'+err);

    }
    getweatherinfo('london');
    //farenheit to celsius
    const ftoc=()=>{
        if (incelsius===false){        
            incelsius=true;                                   
            document.getElementById('temp').innerHTML=tempc+'°C';
            document.getElementById('feelslike').innerHTML=feelslikec+'°C';
        }
    }

    //celsius to farenheit
    const ctof=()=>{        
        if (incelsius===true){
            incelsius=false;           
            document.getElementById('temp').innerHTML=tempf+'°F';
            document.getElementById('feelslike').innerHTML=feelslikef+'°F'; 
            
        }

    }   
        
    document.getElementById('farenheit').onclick=ctof;
    document.getElementById('celsius').onclick=ftoc; 



    const newlocation=document.getElementById('location');
    document.querySelector('form').onsubmit=()=>{
        const locationvalue=newlocation.value;     
        getweatherinfo(locationvalue);        
        return false;
    }
});
    

    
