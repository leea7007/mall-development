import React, { useEffect, useState } from "react";
import RadioBox from "./Sections/RadioBox";
import CheckBox from "./Sections/CheckBox";
import SearchInput from "./Sections/SearchInput";
import CardItem from "./Sections/CardItem";
import axiosInstance from "../../utils/axios";
import { continents, prices } from "../../utils/filterData";

const LandingPage = () => {
  // state
  const limit = 4;
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    continents: [],
    price: [], // DB가 price로 돼있음. 따라가야함.
  });

  useEffect(() => {
    fetchProducts({ skip, limit });
  }, [limit]);

  useEffect(() => {
    fetch("http://localhost:8080/products") // 백엔드 엔드포인트 확인
      .then((res) => res.json())
      .then((data) => {})
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
      searchTerm,
    };
    fetchProducts(body);
    setSkip(skip + limit);
  };

  const handleFilters = (newFilteredData, category) => {
    const newFilters = { ...filters };
    newFilters[category] = newFilteredData;
    if (category === "price") {
      const priceValues = handlePrice(newFilteredData);
      newFilters[category] = priceValues;
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const handlePrice = (value) => {
    let array = [];
    for (let key in prices) {
      if (prices[key]._id === value) {
        // value와 _id의 자료형을 일치시킴
        array = prices[key].array;
      }
    }
    return array;
  };

  const showFilteredResults = (filters) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm,
    };
    fetchProducts(body);
    setSkip(0);
  };

  const checkedPrice = () => {};

  //Search

  const handleSearchTerm = (e) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm: e.target.value,
    };
    setSkip(0);
    setSearchTerm(e.target.value);
    fetchProducts(body);
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
          <RadioBox
            prices={prices}
            checkedPrice={filters.price}
            onFilters={(filters) => handleFilters(filters, "price")}
          />
        </div>
      </div>

      {/* search */}
      <div className="flex justify-end">
        <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
