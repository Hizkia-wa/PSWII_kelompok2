import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./List/UserList";
import UserFormAdd from "./FormAdd/UserFormAdd";
import UserFormEdit from "./FormEdit/UserFormEdit";
import JenisPermohonanList from "./List/JenisPermohonanList";
import JenisPermohonanAdd from "./FormAdd/JenisPermohonanFormAdd";
import JenisPermohonanEdit from "./FormEdit/JenisPermohonanFormEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user" element={<UserList />} />
        <Route path="/user/add" element={<UserFormAdd />} />
        <Route path="/user/edit/:id" element={<UserFormEdit />} />
        <Route path="/" element={<JenisPermohonanList />} /> {/* Menampilkan daftar post */}
        <Route path="/create" element={<JenisPermohonanAdd />} /> {/* Menampilkan form create */}
        <Route path="/edit/:id" element={<JenisPermohonanEdit />} /> {/* Menampilkan form edit */}
      </Routes>
    </Router>
  );
}

export default App;
