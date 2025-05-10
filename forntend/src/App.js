import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./List/UserList";
import UserFormAdd from "./FormAdd/UserFormAdd";
import UserFormEdit from "./FormEdit/UserFormEdit";
import JenisPermohonanList from "./List/JenisPermohonanList";
import JenisPermohonanAdd from "./FormAdd/JenisPermohonanFormAdd";
import JenisPermohonanEdit from "./FormEdit/JenisPermohonanFormEdit";
import JenisJangkaWaktuList from "./List/JenisJangkaWaktuList";
import JenisJangkaWaktuFormAdd from "./FormAdd/JenisJangkaWaktuFormAdd";
import JenisJangkaWaktuFormEdit from "./FormEdit/JenisJangkaWaktuFormEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user" element={<UserList />} />
        <Route path="/user/add" element={<UserFormAdd />} />
        <Route path="/user/edit/:id" element={<UserFormEdit />} />
        <Route path="/JenisPermohonan" element={<JenisPermohonanList />} />
        <Route path="/JenisPermohonan/create" element={<JenisPermohonanAdd />} />
        <Route path="/JenisPermohonan/edit/:id" element={<JenisPermohonanEdit />} />
        <Route path="/JenisJangkaWaktu" element={<JenisJangkaWaktuList />} />
        <Route path="/JenisJangkaWaktu/tambah" element={<JenisJangkaWaktuFormAdd />} />
        <Route path="/JenisJangkaWaktu/edit/:id" element={<JenisJangkaWaktuFormEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
