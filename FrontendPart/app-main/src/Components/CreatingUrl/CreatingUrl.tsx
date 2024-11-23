import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

import { addUrlFailure, addUrlSuccess, createUrl } from "../../Store/Url/actions";
import { addUrl } from "../../Services/urlService";
import { RootState } from "../../Store/store";

const CreatingUrl = () => {
    const [originalUrl, setOriginalUrl] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.urls);
    const { userWithToken } = useSelector((state: RootState) => state.users);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (originalUrl && userWithToken && userWithToken.user && userWithToken.user.ID) {
        const userId = userWithToken.user.ID;
        dispatch(createUrl(originalUrl));
        setOriginalUrl("");
        navigate(-1); // Повернутися назад після додавання
      }
    };
  
    const handleClose = () => {
      navigate(-1); // Повертає на попередню сторінку
    };
  
    return (
      <div className="creating-url">
        <button onClick={handleClose} className="close-button">
          Close
        </button>
        <form onSubmit={handleSubmit} className="input-container">
          <input
            type="text"
            placeholder="Введіть посилання"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="url-input"
            disabled={loading}
          />
          <button type="submit" className="shorten-button" disabled={loading}>
            {loading ? "Завантаження..." : "Скоротити"}
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    );
  };
export default CreatingUrl;


