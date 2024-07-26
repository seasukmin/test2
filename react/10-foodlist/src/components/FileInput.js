import React, { useEffect, useState } from "react";
import placeholderImg from "../assets/preview-placeholder.png";
import resetImg from "../assets/ic-reset-white.png";
import "./FileInput.css";

function FileInput({ photoUrl, name, value, onChange, initialPreview }) {
  const [preview, setPreview] = useState(initialPreview);
  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };
  // 우리가 가진 파일을 가지고..임시 url을 만ㄷ르어 주는
  const handleClearClick = () => {
    onChange(name, null);
  };
  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);
    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);
  //  요건 value가 없을떈 리턴하고
  // URL.createObjectURL(value) <<??
  return (
    <div className="FileInput">
      <img
        className={`FileInput-preview ${preview ? "selected" : ""}`}
        src={preview || photoUrl}
      />
      <input
        className="FileInput-hidden-overlay"
        type="file"
        onChange={handleChange}
      />
      {value && (
        <button
          className="FileInput-clear-button"
          onClick={handleClearClick}
          type="button"
        >
          <img src={resetImg} />
        </button>
      )}
    </div>
  );
}

export default FileInput;
