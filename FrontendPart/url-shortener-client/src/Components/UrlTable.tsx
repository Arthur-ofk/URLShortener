import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUrlsRequest, deleteUrlRequest } from "../Redux/actions/urlActions";
import { RootState } from "../Redux/store";
import "../Styles/UrlTable.css"
import { useNavigate } from "react-router-dom";
import { logout } from "../Api/authApi";
import { logoutRequest } from "../Redux/actions/authActions";
import { API_URL } from "../Api/urlApi";

const UrlTable: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { urls, loading } = useSelector((state: RootState) => state.urls);

    useEffect(() => {
        dispatch(fetchUrlsRequest());
    }, [dispatch]);

    const handleDelete = (id: string) => {
        dispatch(deleteUrlRequest(id));
    };
    const handleDetails = (id: string) => {
        console.log("Details for URL ID:", id); 
      };
    if (loading) return <p>Loading...</p>;
    const Logout = async () => {
        
       dispatch(logoutRequest())
        
         navigate("/login")
      };
    return (
        <div className="table-container">
             <div className="table-actions">
        <button className="logout-button" onClick={Logout}>
          Logout
        </button>
      </div>
          <table className="table">
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Short URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url.id}>
                  <td>{url.originalUrl}</td>
                  <td ><a href={`${API_URL}/${url.shortUrl}`} >{url.shortUrl}</a></td>
                  <td>
                    <button onClick={() => handleDetails(url.id)}>Details</button>
                    <button className="delete-button" onClick={() => handleDelete(url.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };


export default UrlTable;

function handleLogout(): any {
    throw new Error("Function not implemented.");
}
