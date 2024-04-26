import { Outlet, Link } from "react-router-dom";
import '../App.css';
import { useState } from "react";

const Layout = () => {
    const [searchTerm, setSearchTerm] = useState(null);

    const searchItem = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.elements.search.value);
    }

    return (
      <>
        <div className="navigation">
          <div className="navbar">
            <p style={{'marginLeft': '1em'}}><b>HobbyHub</b></p>
            <form className="searchForm" onSubmit={searchItem}>
                <input type="text" name="search" placeholder="Search here..."></input>
                <input type="submit" value="⌕ Search"></input>
            </form>
            
            <nav>
              <div className="links">
                  <Link style={{ color: "white" }} to="/hobby-hub">
                    Home
                  </Link>
              </div>
              <div className="links">
                  <Link style={{ color: "white" }} to="/hobby-hub/create">
                    Create a New Post
                  </Link>
              </div>
            </nav>
          </div>
          <div className='spacing'></div>
          <div className="content">
            <Outlet context={[searchTerm, setSearchTerm]} />
          </div>
        </div>
      </>
    );
  };
  
  export default Layout;