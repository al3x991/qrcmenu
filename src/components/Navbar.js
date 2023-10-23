import { Route, Routes, Link } from 'react-router-dom';
import PDFViewer from '../PDFViewer';
import { useLocation } from 'react-router-dom';
import Form from '../Form';

// All the routes you want to exclude
const withoutSidebarRoutes = ["/menu"];

function Navbar() {
  const { pathname } = useLocation();

  // Validates if the current pathname includes one of the routes you want to hide the sidebar from
  if (withoutSidebarRoutes.some((item) => pathname.includes(item))) {
    return (
        <PDFViewer />
    );
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/edit-menu">Edit Menu</Link>
          </li>
          <li>
            <Link to="/menu">View Menu</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/edit-menu" element={<Form />} />
        <Route path="/menu" element={<PDFViewer />} />
      </Routes>
    </div>
  );
}

export default Navbar;
