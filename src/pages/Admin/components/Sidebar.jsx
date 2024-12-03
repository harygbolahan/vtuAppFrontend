import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-purple-600">VTU Admin</h1>
      </div>
      <nav className="mt-6">
        <Link to="/" className="block py-2 px-4 text-gray-700 hover:bg-purple-100 hover:text-purple-600">
          Dashboard
        </Link>
        <Link to="/users" className="block py-2 px-4 text-gray-700 hover:bg-purple-100 hover:text-purple-600">
          Users
        </Link>
        <Link to="/transactions" className="block py-2 px-4 text-gray-700 hover:bg-purple-100 hover:text-purple-600">
          Transactions
        </Link>
        <Link to="/reports" className="block py-2 px-4 text-gray-700 hover:bg-purple-100 hover:text-purple-600">
          Reports
        </Link>
        <Link to="/settings" className="block py-2 px-4 text-gray-700 hover:bg-purple-100 hover:text-purple-600">
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;

