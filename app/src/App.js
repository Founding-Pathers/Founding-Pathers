// import Router from './Routes';
import React from 'react';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './theme';

// function App() {
//   return (
//     <div className="App">
//       <ThemeProvider theme={theme}>
//         <Router></Router>
//       </ThemeProvider>
//     </div>
//   );
// }

// export default App;

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

import { useState } from 'react';

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost/register', {
                method: "post",
                body: JSON.stringify({ name, email }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            const result = await response.json();
            console.warn(result);
            setSuccessMessage("Data saved successfully");
            setEmail("");
            setName("");
        } catch (error) {
            console.error(error);
            setErrorMessage("Something went wrong. Please try again.");
        }
    }

    return (
        <>
            <h1>This is React WebApp</h1>
            <form>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" onClick={handleOnSubmit}>Submit</button>
            </form>

            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </>
    );
}

export default App;
