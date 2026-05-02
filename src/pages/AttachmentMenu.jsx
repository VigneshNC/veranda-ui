import { Button, Popover, Tooltip } from "antd";
import { useUploadThing } from "../utils/uploadthing"; // Double check this path (../ vs ./)
import {
  PaperClipOutlined,
  PictureOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const AttachmentMenu = ({ onUploadSuccess }) => {
  const { startUpload, isUploading } = useUploadThing("mediaUploader", {
    onClientUploadComplete: (res) => {
      // FIX: Normalize the type so ChatRoom.jsx recognizes it
      // UploadThing 'serverData' or 'type' might be 'image/png'
      const rawType = res[0].type || "";
      let normalizedType = "FILE";

      if (rawType.startsWith("image/")) normalizedType = "IMAGE";
      if (rawType.startsWith("video/")) normalizedType = "VIDEO";

      onUploadSuccess(res[0].url, normalizedType);
    },
    onUploadError: (e) => alert("Upload failed: " + e.message),
  });

  const handleFileAction = (acceptType) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = acceptType;
    input.onchange = (e) => {
      const file = e.target.files[0];
      // Optional: Add a size check here (e.g., if file.size > 4MB)
      if (file) startUpload([file]);
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
        loading={isUploading}
      />
    </Popover>
  );
};

export default AttachmentMenu;
