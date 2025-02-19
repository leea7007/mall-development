import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";

const continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

const UploadProductPage = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    continents: 1,
    images: [],
  });

  const userData = useSelector((state) => state.user?.userData);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, description, price, continents, images } = product;
    console.log("userData:", userData);
    console.log("writer:", userData?.id);

    const body = {
      writer: userData.id, // ✅ 안전한 접근 연산자 추가
      title,
      description,
      price,
      continents,
      images, // 이미지는 file 업로드 후 받은 파일 이름 배열을 넣기
    };

    try {
      await axiosInstance.post("/products", body);
      navigate("/"); // 성공 시, 홈으로 리디렉션
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: name === "price" || name === "continents" ? Number(value) : value, // ✅ 숫자로 변환
    }));
  };

  const handleImages = (newImages) => {
    console.log(newImages);
    setProduct((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  }; //원래 있던 이미지에서 하나를 더 추가해주는 기능을

  return (
    <section>
      <div className="text-center m-7">
        <h1>예상 상품 업로드</h1>
      </div>

      <form className="mt-6" onSubmit={handleSubmit}>
        <FileUpload images={product.images} onImageChange={handleImages} />{" "}
        {/* ✅ 함수 참조 전달 */}
        <div className="mt-4">
          <label htmlFor="title">name</label>
          <div>
            <input
              className="w-full px-4 py-2 bg-white border rounded-md"
              name="title"
              id="title"
              onChange={handleChange}
              value={product.title}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="description">description</label>
          <div>
            <input
              className="w-full px-4 py-2 bg-white border rounded-md"
              name="description"
              id="description"
              onChange={handleChange}
              value={product.description}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="price">price</label>
          <div>
            <input
              className="w-full px-4 py-2 bg-white border rounded-md"
              name="price"
              id="price"
              type="number"
              onChange={handleChange}
              value={product.price}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="continents">continents</label>
          <div>
            <select
              className="w-full px-4 mt-2 bg-white border rounded-md"
              name="continents"
              id="continents"
              onChange={handleChange}
              value={product.continents}
            >
              {continents.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-700"
          >
            생성하기
          </button>
        </div>
      </form>
    </section>
  );
};

export default UploadProductPage;
