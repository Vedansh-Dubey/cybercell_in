import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import{NavLink, Link} from 'react-router-dom'
function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		const navbar = navRef.current;
		const navbarBtn = navbar.querySelector(".nav-btn");
		const closeBtn = navbar.querySelector(".nav-close-btn");
	
		navbar.classList.toggle("responsive_nav");
	
		if (navbar.classList.contains("responsive_nav")) {
		  // Lock the scroll when the navbar is open
		  document.body.style.overflow = "hidden";
		  
		  // Hide the hamburger icon when the navbar is open
		  navbarBtn.style.display = "none";
		  
		  // Show the close icon when the navbar is open
		  closeBtn.style.display = "block";
		} else {
		  // Unlock the scroll when the navbar is closed
		  document.body.style.overflow = "";
		  
		  // Show the hamburger icon when the navbar is closed
		  navbarBtn.style.display = "block";
		  
		  // Hide the close icon when the navbar is closed
		  closeBtn.style.display = "none";
		}
	
		// Close the navbar when a link is clicked
		const links = navbar.querySelectorAll(".Links");
		links.forEach(link => {
			link.addEventListener("click", () => {
				navbar.classList.remove("responsive_nav");
				document.body.style.overflow = "";
				navbarBtn.style.display = "block";
				closeBtn.style.display = "none";
			});
		});
	}
	
	  

	return (
		<header className="navbar">
			<Link className="Links" to="/"><h3>Cybercell</h3></Link>
			<nav ref={navRef}>
				<NavLink className="Links" activeclassname="active" to="/">Home</NavLink>
				<NavLink className="Links" activeclassname="active" to="/services">Services</NavLink>
				<NavLink className="Links" activeclassname="active" to="/blogs">Blogs</NavLink>
				<NavLink className="Links" activeclassname="active" to="/about">About Us</NavLink>
				<NavLink className="Links" activeclassname="active" to="/contact">Contact Us</NavLink>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;



      