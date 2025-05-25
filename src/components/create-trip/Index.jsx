import React, { useState, useRef, useEffect } from "react";
import { AI_PROMPT, SelectBudgetList } from "@/constants/options";
import { SelectTravelesList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import { chatSession } from "@/service/Ai_model.jsx";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { Dialog,DialogHeader, DialogDescription, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../service/firebaseConfig";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ViewTrip from "../../view-trip/tripId/index.jsx";


const CreateTrip = () => {
  const [selectedPlace, setSelectedPlace] = useState();
  const[formData,setformData]=useState({});
  const[opendialog,setopendialog]=useState(false);
  const [loading, setLoading] = useState(false);
  
   const router = useNavigate();

    const handleInputChanges = (name,value)=>{
      if(name == 'noOfDays' && value > 5 && value < 1){       
        return;
      }
      setformData({
       ...formData,
       [name]:value
      })
    }

    useEffect(()=>{
      console.log(formData);
    },[formData]);
 
    const login = useGoogleLogin({
      onSuccess:(codeResponse) => GetUserProfile(codeResponse),
      onError: (error) => console.error(error)
    });

   const OnGenerateTrip = async () => {    
    console.log("loading....")  
    setLoading(true);
    if(formData?.noOfDays > 5 && !formData?.budget || !formData?.location || !formData?.traveller){
      toast("Please fill all the details")
      return;
    }

    const user =  localStorage.getItem('user');
     if(!user){
      setopendialog(true);
      return;
     }

    const FINAL_PROMPT=AI_PROMPT
    .replace('{location}',formData?.location?.label)
    .replace('{traveller}',formData?.traveller)
    .replace('{budget}',formData?.budget)
    .replace('{totalDays}',formData?.noOfDays);    
    try{
    const res = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(res?.response?.text());
    setLoading(false);
     SaveAiTrip(res?.response?.text());
    
  }catch (error) {
    console.error("Error sending message:", error);
    toast.error("Something went wrong while generating the trip.");
  }
   }
   const SaveAiTrip=async(TripData)=>{
     setLoading(true);
   const docId = Date.now.toString();
   const user =  JSON.parse(localStorage.getItem('user'));

    await setDoc(doc(db, "AITrips", docId), {
   userSelection:formData,
   tripdata:JSON.parse(TripData),
     userEmail: user?.email,
    id:docId
});
setLoading(false);
router('/view-trip/' + docId);
   }
  
  const GetUserProfile =async (tokenInfo) => {
  await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
        headers:{
          Authorization:`Bearer ${tokenInfo?.access_token}`,
          Accept:'Application/json',
        }
      }).then((res)=>{  
        console.log(res);
         localStorage.setItem('user',JSON.stringify(res?.data));
         setopendialog(false);
         OnGenerateTrip();
      }).catch((error)=>{
        console.error(error);
      })
      const user =  localStorage.getItem('user');
  }

  return (
    <div className="text-center flex flex-col 
     p-9 items-center space-y-8">
      {/* Introduction */}
      <div className="text-center"> 
        <h2 className="font-extrabold text-2xl text-black">Tell Us Your Travel Preferences🏕️🌴</h2>
        <p className="text-xl font-bold text-gray-500 mt-2">
          Just provide some basic information, and our trip <br/>planner will generate
          a customized itinerary based on your preferences.
        </p>
      </div>

      {/* Destination Input */}
      <div>
      <div className="w-full max-w-md mt-8 mb-2">
        <h2 className="text-left font-bold text-xl mb-2">What is your destination of choice?</h2>
        <GooglePlacesAutocomplete className="cursor-pointer"
        apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        placeholder="Search for a place"
        selectProps={{
          selectedPlace,
          onChange: (v) => {
            setSelectedPlace(v);
            handleInputChanges('location',v);
          }
        }}
       />
      </div>

      {/* Days Input */}
      <div className="w-full max-w-md ">
        <h2 className="text-left font-bold text-xl mb-2">How many days are you planning for the trip?</h2>
        <input  placeholder="E.g., 3 days" type="Number"
          onChange={(e) =>handleInputChanges('noOfDays',e.target.value)}
          className="p-3 border rounded-xl w-full font-sans"
        />
      </div>
      </div>
   {/* budget information */}
      <div>
  <h2 className="-ml-45 font-bold text-xl mb-4 text-center">What is your Budget for Trip?</h2>
  
  <div className="flex flex-wrap gap-3">
  
    {SelectBudgetList.map((item, index) => (
      <div 
        key={index} 
        onClick={()=>handleInputChanges('budget',item.title)}
        className={`p-2 border rounded-lg l cursor-pointer  w-50 text-center
        ${formData?.budget===item.title&&'shadow-xl border-1 border-black'}
        `}>
        <h2 className="text-3xl mb-2">{item.icon}</h2>
        <h4 className="font-semibold text-lg">{item.title}</h4>
        <p className="text-gray-600">{item.desc}</p>
      </div>
    ))}
  </div>
</div>

{/* Traveller information */}
<div>
  <h3 className=" ml-21 font-bold text-xl mb-4 text-left">With whom you travel on your next Adventure?</h3>
  
  <div className="flex flex-wrap gap-2">
    {SelectTravelesList.map((item, index) => (
      <div 
        key={index} 
        onClick={()=>handleInputChanges('traveller',item.people)}
        className={`p-6 border rounded-lg cursor-pointer w-40 text-center
        ${formData?.traveller==item.people&&'shadow-xl border-1 border-black'}
         `}>
        <h2 className="text-3xl mb-2">{item.icon}</h2>
        <h4 className="font-semibold text-m">{item.title}</h4>
        <p className="text-gray-600">{item.desc}</p>
      </div>
    ))}
  </div>
</div>

<Button 
disabled={loading}
onClick={OnGenerateTrip}>
{loading?
 <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />:'Generate Trip'
}
</Button>

<Dialog open={opendialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        <img src="logo.svg" alt="logo" className="w-60 h-20" />
        Please Sign In with Google
      </DialogTitle>
      <DialogDescription>
        You need to sign in to generate a trip for authentication securely.
      </DialogDescription>
    </DialogHeader>
    <Button onClick={() => {login(); setopendialog(false);}}
  className="text-l p-3 m-3 rounded-l w-full text-center text-white gap-4"
>
  <FcGoogle /> Sign In With Google
</Button>
  </DialogContent>
</Dialog>
  </div>
  );
};

export default CreateTrip

