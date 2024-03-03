import React, { useState } from "react";
import "./ProfilePage.css";
import dp from "../../images/dp.jpg";
import uploadIcon from "../../images/upload_dp.svg";
import editIcon from "../../images/edit_icon.svg"; // Import the edit icon

export default function ProfilePage() {
  // Mock user data
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    profilePicture: dp,
    education: "Bachelor's in Computer Science",
    skills: "JavaScript, React, HTML, CSS",
    certifications: "Certified Web Developer",
    hobbies: "Reading, Cooking, Hiking",
    videoResume: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Example link
    additionalVideos: [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    ],
  });

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState(dp);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [isEditing, setIsEditing] = useState({
    education: false,
    skills: false,
    certifications: false,
    hobbies: false,
  });

  // Function to handle profile picture upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle prompt options
  const handleOptionClick = (option) => {
    console.log("Clicked on option:", option);
    if (option === "upload") {
      document.getElementById("upload-input").click();
    } else if (option === "crop") {
      // Implement cropping functionality
    } else if (option === "delete") {
      setProfilePicture(null); // Assuming null means no picture
    }
    setIsPromptOpen(false);
  };

  // Function to handle editing of user data
  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  // Function to handle saving edited content
  const handleSave = (field) => {
    setIsEditing({ ...isEditing, [field]: false });
  };

  // Function to handle uploading additional video
  const handleVideoUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Handle the uploaded video here
          // For example, you can set it in user state or display it directly
          setUser({ ...user, videoResume: reader.result });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="profile-container">
      <div className="overlay" style={{ display: isPromptOpen ? "block" : "none" }} onClick={() => setIsPromptOpen(false)} />
      {/* Prompt for options */}
      {isPromptOpen && (
        <div className="centered-prompt">
          <span className="close-button" onClick={() => setIsPromptOpen(false)}>
            &#10006;
          </span>
          <div className="profile-picture-container">
            <img src={profilePicture} alt="Profile" className="profile-picture" />
          </div>
          <div className="option" onClick={() => handleOptionClick("upload")}>
            Upload a new profile picture
          </div>
          <div className="option" onClick={() => handleOptionClick("crop")}>
            Crop the picture
          </div>
          <div className="option" onClick={() => handleOptionClick("delete")}>
            Delete picture
          </div>
        </div>
      )}
      <div className="profile-section">
        {/* Profile picture with upload option */}
        <div className="upload-label">
          <img
            src={profilePicture}
            alt="Profile"
            className="profile-picture"
          />
          <img src={uploadIcon} alt="Upload" className="upload-icon" onClick={() => setIsPromptOpen(true)} />
        </div>
        <input
          id="upload-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        {/* Rest of your component */}
      </div>
      <div className="main-content">
        <div className="profile-section">
          <h2 className="name">John Doe</h2>
        </div>
        <div className="profile-section">
          <h3 className="section-title">Education</h3>
          {isEditing.education ? (
            <div className="editable-content">
              <input
                type="text"
                value={user.education}
                onChange={(e) => setUser({ ...user, education: e.target.value })}
              />
              <button onClick={() => handleSave("education")}>Save</button>
            </div>
          ) : (
            <div className="editable-content">
              <p>{user.education}</p>
              <img src={editIcon} alt="Edit" className="edit-icon" onClick={() => handleEdit("education")} />
            </div>
          )}
        </div>
        <div className="profile-section">
          <h3 className="section-title">Skills</h3>
          {isEditing.skills ? (
            <div className="editable-content">
              <input
                type="text"
                value={user.skills}
                onChange={(e) => setUser({ ...user, skills: e.target.value })}
              />
              <button onClick={() => handleSave("skills")}>Save</button>
            </div>
          ) : (
            <div className="editable-content">
              <p>{user.skills}</p>
              <img src={editIcon} alt="Edit" className="edit-icon" onClick={() => handleEdit("skills")} />
            </div>
          )}
        </div>
        <div className="profile-section">
          <h3 className="section-title">Certifications</h3>
          {isEditing.certifications ? (
            <div className="editable-content">
              <input
                type="text"
                value={user.certifications}
                onChange={(e) => setUser({ ...user, certifications: e.target.value })}
              />
              <button onClick={() => handleSave("certifications")}>Save</button>
            </div>
          ) : (
            <div className="editable-content">
              <p>{user.certifications}</p>
              <img src={editIcon} alt="Edit" className="edit-icon" onClick={() => handleEdit("certifications")} />
            </div>
          )}
        </div>
        <div className="profile-section">
          <h3 className="section-title">Hobbies</h3>
          {isEditing.hobbies ? (
            <div className="editable-content">
              <input
                type="text"
                value={user.hobbies}
                onChange={(e) => setUser({ ...user, hobbies: e.target.value })}
              />
              <button onClick={() => handleSave("hobbies")}>Save</button>
            </div>
          ) : (
            <div className="editable-content">
              <p>{user.hobbies}</p>
              <img src={editIcon} alt="Edit" className="edit-icon" onClick={() => handleEdit("hobbies")} />
            </div>
          )}
        </div>
        <div className="profile-section">
          <h3 className="section-title">Video Resume</h3>
          <video
            controls
            className="video-frame"
          >
            <source src={user.videoResume} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button className="upload-video-button" onClick={handleVideoUpload}>Upload a Video</button>
        </div>
        <div className="profile-section">
          <h3 className="section-title">Additional Videos</h3>
          <div className="additional-videos-container">
            {user.additionalVideos.map((video, index) => (
              <iframe
                key={index}
                src={video}
                title={`Additional Video ${index + 1}`}
                width="320"
                height="180"
                frameBorder="0"
                allowFullScreen
                className="video-frame"
              ></iframe>
            ))}
          </div>
          <button className="upload-video-button" onClick={handleVideoUpload}>Upload a Video</button>
        </div>
      </div>
    </div>
  );
}
