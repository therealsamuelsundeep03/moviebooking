import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

// import axios from "../../service/backendUrl";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MovieFormInput from "../../components/Admin/MovieFormInput";
import Header from "../../components/Admin/Header";

function Hallinfo () {
    const [hallDetails,setHallDetails] = useState(
        {
            hallname:"",
            location:[],
            seats:"",
            price:"",
            firstShow : "",
            secondShow : "",
            thirdShow : "",
            errors:{
                hallname:"",
                location:"",
                seats:"",
                price:"",
                firstShow : "",
                secondShow : "",
                thirdShow : "",
            },
            touched:{
                hallname:false,
                location:false,
                seats:false,
                price:false
            }
        }   
    );

    const [err ,setErr]  = useState();

    // admin input...
    const adminFirstInp = [
        {label:"Name Of The Hall", type:"text", name:"hallname", value:hallDetails.hallname,placeholder:"Eg. PVR",err:hallDetails.errors.hallname},
        {label:"Location", type:"text", name:"location", value:hallDetails.location,placeholder:"Eg. Ampa SkyWalk",err:hallDetails.errors.location},
        {label:"No. Of Seats", type:"number", name:"seats", value:hallDetails.seats,placeholder:"Eg. 90",err:hallDetails.errors.seats},
        {label:"Price In Ruppees", type:"number", name:"price", value:hallDetails.price,placeholder:"Eg. 150",err:hallDetails.errors.price},
    ]

    // const adminSecondInp = [
    //     {label:"First Show", type:"time", name:"firstShow", value:hallDetails.firstShow,err:hallDetails.errors.firstShow},
    //     {label:"Second Show", type:"time", name:"secondShow", value:hallDetails.secondShow,err:hallDetails.errors.secondShow},
    //     {label:"Third Show", type:"time", name:"thirdShow", value:hallDetails.thirdShow,err:hallDetails.errors.thirdShow}
    // ]

    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate();

    const handleChange = ({target:{name,value}}) => {
        setErr("")
        // console.log(name,value)
        const errors = hallDetails.errors;

        // error validations....
        switch (name){
            case "hallname" : 
                errors.hallname = (value.length < 2 || value.length > 35) ? "Hall Name must be between 3 to 35 characters" : "";
                break;

            case "location" :
                errors.location = !value ? "Enter The Location Of The Hall" : "";
                break;
                
            case "seats" : 
                if(value <= 0){
                    errors.seats =  "Please Enter Valid No. Of Seats" ;
                }
                else if(value < 80){
                    errors.seats =  "Must Be Atleast 80 seats" ;
                }
                else if(!value){
                    errors.seats =  "Please Enter The No.Of Seats" ;
                }
                else{
                    errors.seats = "";
                }
                break;
            
            case "price" : 
            if(value <= 0){
                errors.price = "Please Enter Valid Price" ;
            }
            else if(!value){
                errors.price =  "Please Enter The Price";
            }
            else{
                errors.price = "";
            }
            break;

            case "firstShow" : 
                errors.firstShow = !value ? "Enter The Time" : "";
                break;

            case "secondShow" : 
                errors.secondShow = !value ? "Enter The Time" : "";
                break;

            case "firstShow" : 
                errors.thirdShow = !value ? "Enter The Time" : "";
                break;

            default : break;
        }

        setHallDetails({...hallDetails,[name]:value},errors);
    }

    const handleBlur = ({target:{name}}) => {
        // check whether all the user inputs are filled
        const touched = {...hallDetails.touched,[name] : true};
        setHallDetails({...hallDetails,touched})
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        try{
            const errors = hallDetails.errors;
            const error = Object.values(hallDetails.errors).filter(err => err !== "");
            const notTouched = Object.values(hallDetails.touched).filter(e => !e);


            if(!error.length && !notTouched.length){
                const {hallname,location,seats,price} = hallDetails;

                const id = localStorage.getItem('id');
    
                const { data } = await axiosPrivate.post("/halls/hallExist",{
                    id,hallname,location,seats,price
                });

                if(data === "hall exists"){
                    navigate("/addMovies",{state : {hallname,location,seats,price,"hallExists":true}});
                }
                else{
                    navigate("/addMovies",{state : {hallname,location,seats,price,"hallExists":false}});
                }
            }else{
                setErr("Fill All The Inputs")
            }
            setHallDetails({...hallDetails},errors)
        }
        catch(err){
            // if the hall name has been owned by another admin
           if(err.response.status === 403){

                // if all the inputs are filled
                setErr("Fill All The Inputs");
            }
            else if(err.response.status === 401){

                // if all the inputs are filled
                setErr("Please Login Again");
            }
            else if(err.response.status === 406){
                setErr("Hall Owned By Another Admin");
            }
            else if(err.response.data === "Please Login Again"){
                setErr("Please Login Again");
            }
            else{
                setErr("Check The Internet Connectivity");
            }
        }
    }

   return (
    <>
        <div className="hallinfo">
            <Header />

            {err && <span className="" style={{color : "red",marginBottom:"2rem",marginTop:"-2rem"}}>{err}</span>}
             {/* admin form */}
             <form onSubmit={handleSubmit}>
                <div className="hallinfoform">
                    <div className="hallInfoFirst">
                        {adminFirstInp.map((inp) => <MovieFormInput  key={inp.label} label={inp.label} type={inp.type} name={inp.name} value={inp.value} placeholder={inp.placeholder} handleChange={handleChange} handleBlur={handleBlur} err={inp.err}/>)}
                    </div>
                    {/* <div className="hallInfoSecond">
                        {adminSecondInp.map((inp) => <MovieFormInput  key={inp.label} label={inp.label} type={inp.type} name={inp.name} value={inp.value} placeholder={inp.placeholder} handleChange={handleChange} handleBlur={handleBlur} err={inp.err} />)}
                    </div> */}
                 </div>
                <div className="hallInfoBtn">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    </>
   ) 
}

export default Hallinfo