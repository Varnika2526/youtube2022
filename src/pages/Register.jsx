import React,{useState} from 'react';
import Add from '../img/Add.png'
import {createUserWithEmailAndPassword,updateProfile  } from "firebase/auth";
import {auth,db,storage } from "../firebase/";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const [err,setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];


    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);

const storageRef = ref(storage, displayName);

const uploadTask = uploadBytesResumable(storageRef, file);


await uploadBytesResumable(storageRef, file).then(() => {
  getDownloadURL(storageRef).then(async (downloadURL) => {
    try {
      //Update profile
      await updateProfile(res.user, {
        displayName,
        photoURL: downloadURL,
      });
      //create user on firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });

      //create empty user chats on firestore
      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }
  });
});
} catch (err) {
setErr(true);
setLoading(false);
}
};



  return (
    <div className="formContainer center">
        <div className="formWrapper">
            <span className="logo">TextIn</span>
            <span className="title">Register</span>
            <form onSubmit = {handleSubmit}>
                <input type="text" placeholder="Enter name"></input>
                <input type="email" placeholder="Email"></input>
                <input type="password" placeholder="Create Password"></input>
                <input style={{display:"none"}} type="file" id="file"></input>
                <label htmlFor="file">
                    <img src={Add} alt=""/>
                    Add a File
                </label>
                <button>Sign up</button>
                {err && <span>Something went wrong !</span>}
            </form>
            <p><a>Already Signed Up ? Log in</a></p>
        </div>
    </div>
  )
}

export default Register

