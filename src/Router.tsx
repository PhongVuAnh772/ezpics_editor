import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import DesignEditor from "~/views/DesignEditor";
import Download from "../src/pages/components/home/download/DownloadIOS.jsx";
import HomePage from "../src/pages/components/home/HomePage.jsx";
import Contact from "../src/pages/components/contact/Contact.jsx";
import RemoveBackground from "../src/pages/components/home/remove/RemoveBackground.jsx";
import PageSatisfied from "../src/pages/components/page-satisfied/PageSatisfied.jsx";
import Login from "./pages/components/auth/login/Login.jsx";
import SignUp from "./pages/components/auth/signup/SignUp.jsx";
import RequireAuth from "./pages/components/auth/RequireAuth.jsx";
import RequireLogin from "./pages/components/auth/RequireLogin.jsx";
import YourDesignPage from "../src/pages/components/page-satisfied/children/YourDesignPage.jsx";
import YourCollection from "../src/pages/components/page-satisfied/children/YourCollection.jsx";
import Portfolio from "../src/pages/components/page-satisfied/children/Portfolio.jsx";

import InformationPersonal from "./pages/components/information/InformationPersonal.jsx";
import Project from "./pages/components/project/Project.jsx";
import Recommended from "./pages/components/project/components/Recommended.jsx";
import Dashboard from "./pages/components/home/Dashboard/Dashboard.jsx";
import ForYouPage from "./pages/components/home/ForYou/ForYouPage.jsx";
import Category from "./pages/components/home/category/Category.jsx";
import SpecifiedPrint from "./pages/components/home/category/SpecifiedPrint.jsx";
import ThumnailYoutube from "./pages/components/project/components/ThumnailYoutube.jsx";
import CongratSpecified from "./pages/components/project/components/CongratSpecified.jsx";
import Cooking from "./pages/components/project/components/Cooking.jsx";
import LogoSpecified from "./pages/components/project/components/LogoSpecified.jsx";
import BannerSpecified from "./pages/components/project/components/BannerSpecified.jsx";
// import ThumnailYoutube from './pages/components/project/components/ThumnailYoutube.jsx'

import CollectionBuying from "./pages/components/home/category/CollectionBuying.jsx";

import CategoryCollection from "./pages/components/home/category-collection/CategoryCollection.jsx";

import YourDesign from "./pages/components/home/design/YourDesign.jsx";
import PurchaseForm from "./pages/components/home/design/children/PurchaseForm.jsx";
import SaleSample from "./pages/components/home/design/children/SaleSample.jsx";
import PrintedForm from "./pages/components/home/design/children/PrintedForm.jsx";
import TransactionHistory from "./pages/components/transaction/TransactionHistory.jsx";
// import AuthorDesigner from './pages/components/author/authorDesigner.jsx'
import Table from "./pages/components/transaction/Table.jsx";
import TableEcoin from "./pages/components/transaction/TableEcoin.jsx";
import ModalTransaction from "./pages/components/modal/ModalTransaction.jsx";
import ModalQRCode from "./pages/components/modal/ModalQRCode.jsx";
import Gift from "./pages/components/gift/Gift.jsx";
import Endow from "./pages/components/endow/Endow.jsx";
import Congratulation from "./pages/components/congratulation/Congratulation.jsx";
import Banner from "./pages/components/home/Banner/Banner.jsx";
import SocialMedia from "./pages/components/home/social-media/SocialMedia.jsx";
import Event from "./pages/event/Event.jsx";
import LiveStream from "./pages/components/live-stream/LiveStream.jsx";
import CollectionAll from "./pages/components/collection-all/CollectionAll.jsx";
import PurchaseCollection from "./pages/collection/PurchaseCollection.jsx";
import SaleCollection from "./pages/collection/SaleCollection.jsx";
import UnBuyingCollection from "./pages/collection/UnBuyingCollection.jsx";
import DashboardSearch from "./pages/components/home/Dashboard/DashboardSearch.jsx";
import NewProduct from "./pages/components/home/Dashboard/NewProduct.jsx";
import ComparePricing from "./pages/components/pricing-compare/ComparePricing.jsx";
import DesignPrinted from "./views/DesignEditor/DesignPrinted.js";
import Affiliate from "./views/affiliate/Affiliate.jsx";
import SpecifiedPrintMobile from "./pages/components/home/category/SpecifiedPrintMobile.jsx";
function Router() {
  
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <div className="app">
      <Routes location={previousLocation || location}>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* <Route path="/manage" element={<DesignEditor />} /> */}
        <Route path="/design" element={<DesignEditor />} />
        
        <Route path="/specified-print-mobile/:id" element={<SpecifiedPrintMobile />} />
        <Route path="/" element={<HomePage />}>
          <Route path="/pricing-compare" element={<ComparePricing />} />

          <Route path="/printed-image" element={<DesignPrinted /> } />
          <Route
            path="/affiliate"
            element={
              <RequireAuth>
                <Affiliate />
              </RequireAuth>
            }
          />

          <Route path="/download" element={<Download />} />
          <Route path="/new-product" element={<NewProduct />} />

          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<ForYouPage />} />
            <Route path="/endow" element={<Endow />} />
            <Route path="/gift" element={<Gift />} />
            <Route path="/congratulation" element={<Congratulation />} />
            <Route path="/banner" element={<Banner />} />
            <Route path="/social-media" element={<SocialMedia />} />
            <Route path="/event" element={<Event />} />
            <Route path="/live-stream" element={<LiveStream />} />
          </Route>

          <Route path="/collection-all" element={<UnBuyingCollection />}>
            <Route index path="table-1" element={<Table />} />
            <Route path="table-2" element={<TableEcoin />} />
          </Route>
          <Route
            path="/dashboard-search/:search"
            element={<DashboardSearch />}
          />

          <Route
            path="/your-collection"
            element={
              <RequireAuth>
                <CollectionAll />
              </RequireAuth>
            }
          >
            <Route index path="sale-collection" element={<SaleCollection />} />
            <Route
              path="purchase-collection"
              element={<PurchaseCollection />}
            />
          </Route>
          <Route
            path="/category-collection/:id"
            element={<CategoryCollection />}
          />

          <Route path="/category/:id" element={<Category />} />
          <Route path="/specified-printed/:id" element={ <SpecifiedPrint />} />

          <Route path="/collection-buying/:id" element={<CollectionBuying />} />

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
          >
            <Route index path="table-1" element={<Table />} />
            <Route path="table-2" element={<TableEcoin />} />
          </Route>
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

          <Route path="/page-satisfied" element={<PageSatisfied />}>
            <Route index path="your-design" element={<YourDesignPage />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="your-collection" element={<YourCollection />} />
          </Route>
          <Route path="/project" element={<Project />}>
            <Route index path="recommend" element={<Recommended />} />
            <Route path="youtube" element={<ThumnailYoutube />} />
            <Route path="cooking" element={<Cooking />} />
            <Route path="logo" element={<LogoSpecified />} />
            <Route path="congrat" element={<CongratSpecified />} />

            <Route path="banner" element={<BannerSpecified />} />
            <Route path="more" element={<Recommended />} />
          </Route>
          <Route path="/your-design" element={<YourDesign />}>
            <Route index path="purchase-form" element={<PurchaseForm />} />
            <Route path="sale-sample" element={<SaleSample />} />
            <Route path="printed-form" element={<PrintedForm />} />
          </Route>
        </Route>
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path="/modal" element={<ModalTransaction />}>
            <Route path="modal-money" element={<ModalQRCode />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default Router;
