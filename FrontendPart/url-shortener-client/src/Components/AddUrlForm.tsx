import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUrlRequest } from "../Redux/actions/urlActions";
import "../Styles/AddUrlForm.css"

const AddUrlForm: React.FC = () => {
    const [originalUrl, setOriginalUrl] = useState<string>("");
    const dispatch = useDispatch();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (originalUrl.trim() === "") {
        alert("URL cannot be empty.");
        return;
      }
  
      dispatch(createUrlRequest({ originalUrl }));
      setOriginalUrl(""); 
    };
  
    return (
      <form className="add-url-form" onSubmit={handleSubmit}>
        <label htmlFor="original-url">Enter the original URL:</label>
        <input
          type="text"
          id="original-url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="https://example.com"
          required
        />
        <button type="submit">Add URL</button>
      </form>
    );
  };
  
  export default AddUrlForm;