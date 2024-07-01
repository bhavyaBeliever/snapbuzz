import React, { useState, useEffect, useRef } from 'react';
import axios from "axios"
import { FaCirclePlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import style from "../styles/Create.module.css"
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const navigate =useNavigate();
  const [cloudName, setCloudName] = useState("")
  const [description, setDescription] = useState("")

  const [uploadPreset, setUploadPreset] = useState("")
  // const [uploadUrl, setUploadUrl]=useState("")

  const [preview, setPreview] = useState([]);
  const [error, setError] = useState("")
  useEffect(() => {
    const fetchEnv = async () => {
      try {
        const response = await fetch('/api/env/cloudInfo');
        const data = await response.json();
        setCloudName(data.cloudName);
        setUploadPreset(data.preset);
      } catch (error) {
        console.error('Error fetching environment variables:', error);
      }
    };
    // 
    fetchEnv();
  }, []);
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  }

  const handleFileChange = (event) => {
    event.preventDefault()
    const file = event.target.files[0];
    setSelectedFiles([...selectedFiles, file]);
    // Generate a preview URL for images or videos
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview([...preview, previewUrl]);
    }
  };
  const handleRemove = (index) => {
    const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = preview.filter((_, i) => i !== index);

    setSelectedFiles(newSelectedFiles);
    setPreview(newPreviews);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      let imageUrl = "", photos = [];
      let videoUrl = "", videos = [];
      let uploadUrl = "https://api.cloudinary.com/v1_1/" + cloudName + "/upload"
      // let type=selectedFiles.type.startsWith('image') ? 'image' : 'video'
      let i = 0, len = selectedFiles.length;

      while (i < len) {
        let selectedFile = selectedFiles[i];
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", uploadPreset);

        const dataRes = await axios.post(
          uploadUrl,
          formData
        );
        if (selectedFile.type.startsWith('image')) {
          imageUrl = dataRes.data.url;
          photos = [...photos, imageUrl];
        } else {
          videoUrl = dataRes.data.url;
          videos = [...videos, videoUrl];
        }
        i++;

      }

      const submitPost = {
        photos: photos,
        videos: videos,
        description: description,
        userId: JSON.parse(localStorage.getItem('user'))._id

      };
      const res = await fetch('/posts/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitPost)
      });
      if (res.ok) {
        navigate('/');
      } else {
        const data = await res.json()
        console.log(data.error)
      }
    } catch (err) {
      // err.response.data.msg && setError(err.response.data.msg);
      console.log(err);
    }
  };
  return (
    <div className={style.body}>
      <h1>Upload an Image or Video</h1>
      <form onSubmit={handleSubmit} className={style.createPostForm}>
        <button className={style.button} type="button" onClick={handleClick}>
          Upload a file
        </button>
        <input
          id="uploadInput"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          ref={hiddenFileInput}
          style={{ "display": "none" }}
        />
  
        {preview && (
          <div>
            <h2>Preview:</h2>
            <div className={style.filePreviewContainer}>

              <div className={style.previews}>
                {selectedFiles.map((file, index) => (
                  <div key={index} className={style.previewWrapper}>
                    <button className={style.removeButton} type='button' onClick={()=>handleRemove(index)}>
                      <RxCross2 size={20} />
                    </button>
                    {file.type.startsWith('image/') ? (
                      <img src={preview[index]} alt="Preview" className={style.previewImage} />
                    ) : (
                      <video controls className={style.previewVideo}>
                        <source src={preview[index]} type={file.type} />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <FaCirclePlus style={{ "position": "absolute", "bottom": "20px", "right": "20px", "fontSize": "40px" }} onClick={handleClick} />
          </div>
        )}

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => { setDescription(e.target.value) }}
          placeholder="Write your description here"
          rows="4"
          cols="35"
        />
        <button type='submit' className={style.button}>Submit</button>
      </form>
    </div>
  );
}

export default Create;