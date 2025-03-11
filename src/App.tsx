
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ChatInterface } from "./components/ChatInterface";


const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index/>} />
           <Route path="/dashboard" element={<ChatInterface/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  
);

export default App;
