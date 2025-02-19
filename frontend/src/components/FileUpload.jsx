import React from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";

const FileUpload = ({ onImageChange, images }) => {
  const handleDrop = async (files) => {
    let formData = new FormData();

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]); //여기서 file은 multer에서 사용

    try {
      const response = await axiosInstance.post(
        "/products/image",
        formData,
        config
      );
      console.log("서버응답:", response.data);

      onImageChange([...images, response.data.fileName]);
    } catch (error) {
      console.error(error);
      console.log("응답 상태 코드:", response.status);
    }
  };

  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    onImageChange(newImages);
  };

  return (
    <div className="flex gap-4">
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="min-w-[300px] h-[300px] boder flex items-center justify-center">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="text-3xl">+</p>
            </div>
          </section>
        )}
      </Dropzone>

      <div className="flex-grow h-[300px] border flex items-center justify-center overflow-x-scroll overflow-y-hidden">
        {images.map((image) => (
          <div key={image} onClick={() => handleDelete(image)}>
            <img
              className="min-w-[300px] h-[300px]"
              src={`${import.meta.env.VITE_SERVER_URL}/uploads/${image}`}
              alt="uploaded"
              onError={(e) => console.error("이미지 로딩 실패:", e.target.src)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
