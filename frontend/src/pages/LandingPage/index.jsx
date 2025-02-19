import React, { useEffect, useState } from "react";
import RadioBox from "./Sections/RadioBox";
import CheckBox from "./Sections/CheckBox";
import SearchInput from "./Sections/SearchInput";
import CardItem from "./Sections/CardItem";
import axiosInstance from "../../utils/axios";
import { continents } from "../../utils/filterData";

const LandingPage = () => {
  // state
  const limit = 4;
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  useEffect(() => {
    fetchProducts({ skip, limit });
  }, [limit]);

  useEffect(() => {
    fetch("http://localhost:8080/products") // 백엔드 엔드포인트 확인
      .then((res) => res.json())
      .then((data) => {
        console.log("Received products:", data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const fetchProducts = async ({
    skip,
    limit,
    loadMore = false,
    filters = {},
    searchTerm = "",
  }) => {
    const params = {
      skip,
      limit,
      filters,
      searchTerm,
    };
    try {
      const response = await axiosInstance.get("/products", { params: params });

      if (loadMore) {
        setProducts([...products, ...response.data.products]);
      } else {
        setProducts(response.data.products);
      }
      setHasMore(response.data.hasMore);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters,
    };
    fetchProducts(body);
    setSkip(skip + limit);
  };

  const handleFilters = (newFilteredData, category) => {
    const newFilters = { ...filters };
    newFilters[category] = newFilteredData;

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const showFilteredResults = (filters) => {
    const body = {
      skip: 0,
      limit,
      filters,
    };
    fetchProducts(body);
    setSkip(0);
  };

  return (
    <section>
      <div className="text-center m-7">
        <h2 className="text=2xl">여행상품 사이트</h2>
      </div>
      {/* filter */}
      <div className="flex gap-3">
        <div className="w-1/2">
          <CheckBox
            continents={continents}
            checkedContinents={filters.continents}
            onFilters={(filters) => handleFilters(filters, "continents")}
          />
        </div>
        <div className="w-1/2">
          <RadioBox />
        </div>
      </div>
      {/* search */}
      <div className="flex justify-end">
        <SearchInput />
      </div>

      {/* card */}
      <div className="grid grid-col-2 sm:grid-cols-4 gap-4">
        {products.map((product) => (
          <CardItem product={product} key={product._id} />
        ))}
      </div>

      {/* learn more */}

      {hasMore && (
        <div className="flex justify-center mt-5">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
          >
            More
          </button>
        </div>
      )}
    </section>
  );
};

export default LandingPage;
