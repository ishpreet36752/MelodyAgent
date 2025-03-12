
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ChatInterface } from "./components/ChatInterface";
import CallbackHandler from "./components/CallbackHandler"; 

// const CallbackHandler = ()=>{
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(()=>{
//     const query = new URLSearchParams(location.search);
//     const accessToken = query.get('access_token');
//     const refreshToken = query.get('refresh_token');

//     if(accessToken && refreshToken){
//       localStorage.setItem('spotify_access_token', accessToken);
//       localStorage.setItem('spotify_refresh_token', refreshToken);

//       navigate('/dashboard');
//     }else{
//       navigate('/');
//     }
//   },[location,navigate])
//   return <div>Processing login.....</div>
// }


const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
           <Route path="/dashboard" element={<ChatInterface/>} />
           <Route path="/callback" element={<CallbackHandler/>} />
           {/* <Route path="/chat" element={<ChatComponent/>}/> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  
);

export default App;
