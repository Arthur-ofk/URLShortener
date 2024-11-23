import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";

import "./UrlManagerStyles.css";
import { API_BASE_URL } from "../../Services/endpoints";
import { useNavigate } from "react-router-dom";
import { fetchUrlsByUserId, getAllUrlsSuccess } from "../../Store/Url/actions";

const UrlManager = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const { urls, loading, error } = useSelector((state: RootState) => state.urls);
  const {userWithToken,userError} = useSelector((state :RootState)=>state.users)
  
  useEffect(() => {
    if (userWithToken && userWithToken.user && userWithToken.user.ID) {
      const userId = userWithToken.user.ID;
      dispatch(fetchUrlsByUserId(userId));
    }
  }, [dispatch, userWithToken]);

  const handleAddClick=()=>
  {
    navigate("/add-url")
  }
  return (
    <div className="url-manager">
      <div className="tableNavBar">
        <h2>URL Manager</h2>
        <button className="button-blue" onClick={handleAddClick}>
          Add
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <table className="url-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Original URL</th>
            <th>Shortened URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{url.originalUrl}</td>
              <td>
                <a
                  href={`${API_BASE_URL}/Urls/${url.shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.shortUrl}
                </a>
              </td>
              <td>
                <button className="button-blue">Details</button>
                <button className="button-blue">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default UrlManager;


