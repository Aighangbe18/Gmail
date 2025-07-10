import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inbox from "./pages/Inbox";
import Compose from "./pages/Compose";
import ViewEmail from "./pages/ViewEmail";
import SentMail from "./pages/SentMail";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import CreatedLabels from "./pages/CreatedLabels";
import Upgrade from "./pages/Upgrade";
import Labels from "./pages/Labels";
import ManageLabels from "./pages/ManageLabels";
import Promotions from "./pages/Promotions";
import Forums from "./pages/Forums";
import Updates from "./pages/Updates";
import Social from "./pages/Social";
import Trash from "./pages/Trash";
import Spam from "./pages/Spam";
import AllMail from "./pages/AllMail";
import Scheduled from "./pages/Scheduled";
import Chats from "./pages/Chats";
import Drafts from "./pages/Drafts";
import Snoozed from "./pages/Snoozed";
import Starred from "./pages/Starred";
import Important from "./pages/Important";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

 <Route path="/inbox" element={<Inbox />} />
       
      <Route
        path="/compose"
        element={
          
          <Compose />        
        }
      />
            <Route path="/labels/starred" element={<Starred />} />
            <Route path="/labels/important" element={<Important />} />
            <Route path="/snoozed" element={<Snoozed />} />
            <Route path="/drafts" element={<Drafts />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/scheduled" element={<Scheduled />} />
            <Route path="/all-mail" element={<AllMail />} />
            <Route path="/spam" element={<Spam />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/categories/social" element={<Social />} />
            <Route path="/categories/updates" element={<Updates />} />
            <Route path="/categories/forums" element={<Forums />} />
            <Route path="/categories/promotions" element={<Promotions />} />
            <Route path="/manage-labels" element={<ManageLabels />} />
            <Route path="/create-label" element={<CreatedLabels />} />
            <Route path="/labels" element={<Labels />} />
            <Route path="/upgrade" element={<Upgrade />} />
             <Route path="/settings" element={<Settings />} />
      <Route
        path="/email/:id"
        element={
          <ProtectedRoute>
            <Layout><ViewEmail /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/sent"
        element={
          <ProtectedRoute>
            <SentMail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Layout><AdminPanel /></Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
