import { Button, Popover, Tooltip } from "antd";
import { useUploadThing } from "../utils/uploadthing"; // Double check this path (../ vs ./)
import {
  PaperClipOutlined,
  PictureOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { API_URL } from "../utils/constants";
import axios from "axios";
import { useState } from "react";

const AttachmentMenu = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (selectedFile) => {
    // Safety check: ensure a file was actually selected
    if (!selectedFile) return;

    console.log("File selected, starting automatic upload...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    setUploading(true);
    try {
      // Direct upload call
      const response = await axios.post(
        `${API_URL}/api/messages/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response && response.data && response.status == 200) {
        const uploadUrl = response.data.url;

        const uploadResponse = await axios.put(`${uploadUrl}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Upload successful:", uploadResponse.data);

        onUploadSuccess(uploadResponse.data.url, selectedFile.type)
      }

      alert("Upload Complete!");
    } catch (error) {
      console.error("Error during auto-upload:", error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileAction = (acceptType) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = acceptType;
    input.onchange = (e) => {
      uploadFile(e.target.files[0]);
    };
    input.click();
  };

  const content = (
    <div style={{ display: "flex", gap: "15px", padding: "10px" }}>
      <Tooltip title="Image">
        <Button
          shape="circle"
          size="large"
          icon={<PictureOutlined />}
          style={{ background: "#bf5af2", color: "white", border: "none" }}
          onClick={() => handleFileAction("image/*")}
        />
      </Tooltip>
      <Tooltip title="Video">
        <Button
          shape="circle"
          size="large"
          icon={<VideoCameraOutlined />}
          style={{ background: "#ff453a", color: "white", border: "none" }}
          onClick={() => handleFileAction("video/*")}
        />
      </Tooltip>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      placement="top"
      overlayInnerStyle={{ borderRadius: "15px" }} // Make the popover look more like WhatsApp
    >
      <Button
        icon={<PaperClipOutlined style={{ fontSize: 20, opacity: 0.6 }} />}
        type="text"
        shape="circle"
        loading={uploading}
      />
    </Popover>
  );
};

export default AttachmentMenu;
