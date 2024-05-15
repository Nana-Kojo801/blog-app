import React, { useEffect, useRef, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DropDown from "../components/DropDown";

const AppLayout = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const user = useSelector((state) => state.user.user);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
  };

  const handleShowMenu = (e) => {
  e.stopPropagation();
  e.preventDefault();
  setShowDropDown((prev) => !prev);
};

  useEffect(() => {
    console.log(showDropDown);
  }, [showDropDown]);

  return (
    <div className="app-layout">
      <header>
        <Link to="/">Blog App</Link>
        <form onSubmit={handleSearch}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
          />
        </form>
        <div onClick={handleShowMenu} className="profile-image">
          {user?.image ? (
            <img src={`http://localhost:3000/${user?.image}`} />
          ) : (
            <div className="image-placeholder">{user?.username.charAt(0)}</div>
          )}
        </div>
        {showDropDown && <DropDown handle={() => setShowDropDown(false)} />}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
