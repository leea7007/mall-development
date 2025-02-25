import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import axiosInstance from "../../utils/axios";

const DetailProductPage = () => {
  const { productId } = useParams(); // ✅ 올바르게 productId 가져오기
  const [product, setProduct] = useState(null);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axiosInstance.get(
          `/products/${productId}?type=single`
        ); // ✅ axios.get으로 요청
        setProduct(response.data);
      } catch (error) {
        console.error("상품을 불러오는 중 오류 발생:", error); // 🚀 에러 로그 추가
      }
    }
    fetchProduct();
  }, [productId]); // ✅ useEffect 의존성 수정

  if (!product) {
    return <div>Loading...</div>; // 🚀 데이터가 로드될 때까지 로딩 메시지 추가
  }

  return (
    <section>
      <div className="text-center">
        <h1 className="p-4 text-2xl">{product.title}</h1>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          {/* ProductImage*/}
          <ProductImage product={product} />
        </div>
        <div className="w-1/2">
          {/* ProductImage*/}
          <ProductInfo product={product} />
        </div>
      </div>
    </section>
  );
};

export default DetailProductPage;
