
import NavBar from '../components/NavBar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mt-10">Welcome to the Home Page</h1>
        <p className="text-center mt-4 text-gray-700">This is a simple homepage styled with Tailwind CSS.</p>
      </div>
    </div>
  );
};

export default Home;
