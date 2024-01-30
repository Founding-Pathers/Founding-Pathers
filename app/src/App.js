import Router from './Routes';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router></Router>
      </ThemeProvider>
    </div>
  );
}

export default App;

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = process.env.MONGODB_URI;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// DB testing form

// import { useState } from 'react'
// const [name, setName] = useState("");
// const [email, setEmail] = useState("");
// const handleOnSubmit = async (e) => {
//     e.preventDefault();
//     let result = await fetch(
//     'http://localhost:5000/register', {
//         method: "post",
//         body: JSON.stringify({ name, email }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     result = await result.json();
//     console.warn(result);
//     if (result) {
//         alert("Data saved succesfully");
//         setEmail("");
//         setName("");
//     }
// }
// return (
//     <>
//         <h1>This is React WebApp </h1>
//         <form action="">
//             <input type="text" placeholder="name"
//             value={name} onChange={(e) => setName(e.target.value)} />
//             <input type="email" placeholder="email"
//             value={email} onChange={(e) => setEmail(e.target.value)} />
//             <button type="submit"
//             onClick={handleOnSubmit}>submit</button>
//         </form>

//     </>
// );