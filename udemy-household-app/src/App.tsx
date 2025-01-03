import { useEffect, useState } from 'react'
// import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import {theme} from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types/index';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "./firebase.ts";
import { formatMonth } from './utils/formatting.ts';

function App() {

  // Firestoreエラーかどうかを判定する型ガード
  function isFireStoreError(err: unknown):err is {code: string, message: string} {
    return typeof err === "object" && err !== null && "code" in err
  }

  const[transactions, setTransactions] = useState<Transaction[]>([]);
  const[currentMonth, setCurrentMonth] = useState(new Date());
  // const a = format(currentMonth, "yyyy-MM");
  // console.log(a);

  useEffect(() => {
    const fechTransactions = async() => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"))
        
        const transactionsData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots 
          // console.log(doc.id, "=>", doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction
        });
      
        console.log(transactionsData);
        setTransactions(transactionsData)
      } catch(err) {
        if(isFireStoreError(err)) {
          console.error("firebaseのエラーは：", err)
          console.error("firebaseのエラーメッセージは：",err.message)
          console.error("firebaseのエラーコードは：",err.code)
        } else {
          console.error("一般的なエラーは：",err)
        }
      }
    }
    fechTransactions();

  },[])

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth))
  })

  console.log("monthlyTransactions:",monthlyTransactions);

  return (
    <>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth}/>}/>
              <Route path="/report" element={<Report />}/>
              <Route path="/*" element={<NoMatch />}/>
            </Route>
          </Routes>
        </Router>
        </ThemeProvider>
    </>
  )
}

export default App
