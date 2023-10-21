import { BrowserRouter, Routes, Route } from "react-router-dom"
import DesignEditor from "~/views/DesignEditor"
import Dashboard from "~/views/Dashboard"
import PresentationEditor from "./views/DesignEditor/PresentationEditor"
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/manage" element={<DesignEditor />} />
        <Route path="/" element={<DesignEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
