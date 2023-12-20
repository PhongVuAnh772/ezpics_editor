import { BrowserRouter, Routes, Route } from "react-router-dom";
import DesignEditor from "~/views/DesignEditor";
import Download from "../src/pages/components/home/download/DownloadIOS.jsx";
import HomePage from "../src/pages/components/home/HomePage.jsx";
import Contact from "../src/pages/components/contact/Contact.jsx";
import RemoveBackground from "../src/pages/components/home/remove/RemoveBackground.jsx";
import PageSatisfied from "../src/pages/components/page-satisfied/PageSatisfied.jsx";
import Login from "./pages/components/auth/login/Login.jsx";
import SignUp from "./pages/components/auth/signup/SignUp.jsx";
import RequireAuth from "./pages/components/auth/RequireAuth.jsx";
import InformationPersonal from "./pages/components/information/InformationPersonal.jsx";
import Project from "./pages/components/project/Project.jsx";
import Recommended from "./pages/components/project/components/Recommended.jsx";
import Dashboard from "./pages/components/home/Dashboard/Dashboard.jsx";
import ForYouPage from "./pages/components/home/ForYou/ForYouPage.jsx";
import Category from "./pages/components/home/category/Category.jsx";
import YourDesign from "./pages/components/home/design/YourDesign.jsx";
import PurchaseForm from './pages/components/home/design/children/PurchaseForm.jsx'
import SaleSample from './pages/components/home/design/children/SaleSample.jsx'
import PrintedForm from './pages/components/home/design/children/PrintedForm.jsx'
import TransactionHistory from './pages/components/transaction/TransactionHistory.jsx'
import AuthorDesigner from './pages/components/author/authorDesigner.jsx'
import Table from './pages/components/transaction/Table.jsx'
import TableEcoin from './pages/components/transaction/TableEcoin.jsx'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/manage" element={<DesignEditor />} />
        <Route path="/design" element={<DesignEditor />} />
        <Route path="/download" element={<Download />} />
        <Route path="/" element={<HomePage />}>
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<ForYouPage />} />
            <Route path="/for-you" element={<ForYouPage />} />
          </Route>
                  <Route path="/author" element={<AuthorDesigner />} />

          <Route path="/category/:id" element={<Category />} />
          <Route
            path="/user-information"
            element={
              <RequireAuth>
                <ForYouPage />
              </RequireAuth>
            }
          />
          <Route
            path="/transaction"
            element={
              <RequireAuth>
                <TransactionHistory />
              </RequireAuth>
            }
          ><Route index path="table-1" element={<Table />} />
            <Route path="table-2" element={<TableEcoin />} /></Route>
          <Route
            path="/user-information"
            element={
              <RequireAuth>
                <ForYouPage />
              </RequireAuth>
            }
          />
          <Route
            path="/user-information/:id"
            element={
              <RequireAuth>
                <ForYouPage />
              </RequireAuth>
            }
          />
          <Route path="/ordered" element={<Contact />} />

          {/* <Route path="/category/:id" element={<Category />} /> */}
          <Route path="/remove" element={<RemoveBackground />} />
          <Route
            path="/information"
            element={
              <RequireAuth>
                <InformationPersonal />
              </RequireAuth>
            }
          />

          <Route path="/page-satisfied" element={<PageSatisfied />} />
          <Route path="/project" element={<Project />}>
            <Route index path="recommend" element={<Recommended />} />
            <Route path="youtube" element={<Recommended />} />
            <Route path="cooking" element={<Recommended />} />
            <Route path="logo" element={<Recommended />} />
            <Route path="congrat" element={<Recommended />} />

            <Route path="banner" element={<Recommended />} />
            <Route path="more" element={<Recommended />} />
          </Route>
          <Route path="/your-design" element={<YourDesign />}>
            <Route index path="purchase-form" element={<PurchaseForm />} />
            <Route path="sale-sample" element={<SaleSample />} />
            <Route path="printed-form" element={<PrintedForm />} />
            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
