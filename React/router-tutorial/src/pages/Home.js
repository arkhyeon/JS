import { Link, Outlet } from "react-router-dom";

function Home() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/posts/1">Post</Link>
                </li>
                <li>
                    <Link to="/users/velopert">User</Link>
                </li>
                <li>
                    <Link to="/optional">Optional without value</Link>
                </li>
                <li>
                    <Link to="/optional/hello">Optional with value</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    );
}

export default Home;
