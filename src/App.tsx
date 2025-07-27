
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ChatInterface } from "./components/ChatInterface";
import CallbackHandler from "./components/CallbackHandler";

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
