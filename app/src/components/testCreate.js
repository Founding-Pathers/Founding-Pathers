import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   email: "",
   gender: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newAccount = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newAccount),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", email: "", gender: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="email">Email</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="accountType"
             id="accountUser"
             value="User"
             checked={form.type === "User"}
             onChange={(e) => updateForm({ type: e.target.value })}
           />
           <label htmlFor="accountUser" className="form-check-label">User</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="accountType"
             id="accountAdmin"
             value="Admin"
             checked={form.type === "Admin"}
             onChange={(e) => updateForm({ type: e.target.value })}
           />
           <label htmlFor="accountAdmin" className="form-check-label">Admin</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="accountType"
             id="accountAdmin"
             value="Other"
             checked={form.type === "Other"}
             onChange={(e) => updateForm({ type: e.target.value })}
           />
           <label htmlFor="accountAdmin" className="form-check-label">Other</label>
         </div>
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create Account"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}