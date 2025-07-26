
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ChatInterfaceWithSidebar } from "./components/ChatInterfaceWithSidebar";
import CallbackHandler from "./components/CallbackHandler";

const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
           <Route path="/dashboard" element={<ChatInterfaceWithSidebar/>} />
           <Route path="/callback" element={<CallbackHandler/>} />
           {/* <Route path="/chat" element={<ChatComponent/>}/> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  
);

export default App;
