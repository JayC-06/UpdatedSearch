import { Link } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <header>
      <nav className="nav text-left fixed-top">
        <Link className="nav-link nav-item" to="/">Home</Link>
        <Link className="nav-link nav-item" to="/SavedCandidates">Potential Candidates</Link>
      </nav>
    </header>
  )
};
export default Nav;