import { BrowserRouter, Routes, Route } from "react-router-dom";
import DesignEditor from "~/views/DesignEditor";


// import initialJSON from

function Router() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/manage" element={<DesignEditor />} />
        <Route path="/" element={<DesignEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
