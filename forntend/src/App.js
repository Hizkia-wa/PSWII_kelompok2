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
import JangkaWaktuSewaList from './List/JangkaWaktuSewaList';
import JangkaWaktuSewaFormAdd from './FormAdd/JangkaWaktuSewaFormAdd';
import JangkaWaktuSewaFormEdit from './FormEdit/JangkaWaktuSewaFormEdit';
import LokasiObjekRetribusiList from './List/LokasiObjekRetribusiList';
import LokasiObjekRetribusiFormAdd from './FormAdd/LokasiObjekRetribusiFormAdd';
import LokasiObjekRetribusiFormEdit from './FormEdit/LokasiObjekRetribusiFormEdit';
import JenisObjekRetribusiList from "./List/JenisObjekRetribusiList";
import JenisObjekRetribusiFormAdd from "./FormAdd/JenisObjekRetribusiFormAdd";
import JenisObjekRetribusiFormEdit from "./FormEdit/JenisObjekRetribusiFormEdit";
import ObjekRetribusiFormAdd from './FormAdd/ObjekRetribusiFormAdd';
import ObjekRetribusiFormEdit from './FormEdit/ObjekRetribusiFormEdit';
import ObjekRetribusiList from './List/ObjekRetribusiList';
import JenisStatusFormAdd from "./FormAdd/JenisStatusFormAdd";
import JenisStatusFormEdit from "./FormEdit/JenisStatusFormEdit";
import JenisStatusList from "./List/JenisStatusList";
import StatusList from './List/StatusList';
import StatusFormAdd from './FormAdd/StatusFormAdd';
import StatusFormEdit from './FormEdit/StatusFormEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user" element={<UserList />} />
        <Route path="/user/tambah" element={<UserFormAdd />} />
        <Route path="/user/edit/:id" element={<UserFormEdit />} />
        <Route path="/JenisPermohonan" element={<JenisPermohonanList />} />
        <Route path="/JenisPermohonan/tambah" element={<JenisPermohonanAdd />} />
        <Route path="/JenisPermohonan/edit/:id" element={<JenisPermohonanEdit />} />
        <Route path="/JenisJangkaWaktu" element={<JenisJangkaWaktuList />} />
        <Route path="/JenisJangkaWaktu/tambah" element={<JenisJangkaWaktuFormAdd />} />
        <Route path="/JenisJangkaWaktu/edit/:id" element={<JenisJangkaWaktuFormEdit />} />
        <Route path="/JangkaWaktuSewa" element={<JangkaWaktuSewaList />} />
        <Route path="/JangkaWaktuSewa/tambah" element={<JangkaWaktuSewaFormAdd />} />
        <Route path="/JangkaWaktuSewa/edit/:id" element={<JangkaWaktuSewaFormEdit />} />
        <Route path="/lokasiobjekretribusi" element={<LokasiObjekRetribusiList />} />
        <Route path="/lokasiobjekretribusi/add" element={<LokasiObjekRetribusiFormAdd />} />
        <Route path="/lokasiobjekretribusi/edit/:id" element={<LokasiObjekRetribusiFormEdit />} />
        <Route path="/jenisobjekretribusi" element={<JenisObjekRetribusiList />} />
        <Route path="/jenisobjekretribusi/create" element={<JenisObjekRetribusiFormAdd />} />
        <Route path="/jenisobjekretribusi/edit/:id" element={<JenisObjekRetribusiFormEdit />} />
        <Route path="/objekretribusi" element={<ObjekRetribusiList />} />
        <Route path="/objekretribusi/create" element={<ObjekRetribusiFormAdd />} />
        <Route path="/objekretribusi/edit/:id" element={<ObjekRetribusiFormEdit />} />
        <Route path="/jenisstatus" element={<JenisStatusList />} />
        <Route path="/jenisstatus/add" element={<JenisStatusFormAdd />} />
        <Route path="/jenisstatus/edit/:id" element={<JenisStatusFormEdit />} />
        <Route path="/status" element={<StatusList />} />
        <Route path="/status/tambah" element={<StatusFormAdd />} />
        <Route path="/status/edit/:id" element={<StatusFormEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
