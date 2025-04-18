import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { CiApple } from "react-icons/ci";
import "../styles/EShopSideBar.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesWithSubCategories,
  getProducts,
} from "../store/AsynMethod/ProductMethod";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EShopSideBar() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const { categoriesWithSub } = useSelector((state) => state.ProductReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesWithSubCategories());
  }, []);

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category.id) {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    } else {
      setSelectedCategory(category.id);
      setSelectedSubCategory(category.subCategories[0]?.id || null);
    }
  };

  const handleSubCategoryClick = (subcategory) => {
    setSelectedSubCategory(subcategory?.id);
  };

  useEffect(() => {
    if (selectedCategory && selectedSubCategory) {
      dispatch(getProducts(selectedCategory, selectedSubCategory));
    }
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    if (selectedCategory) {
      if (selectedSubCategory) {
        dispatch(getProducts(selectedCategory, selectedSubCategory));
      } else {
        dispatch(getProducts(selectedCategory));
      }
    } else {
      dispatch(getProducts());
    }
  }, [selectedCategory, selectedSubCategory, dispatch]);

  useEffect(() => {
    console.log("useEffect ");
  }, [setSelectedCategory]);

  return (
    <div>
      <div className={"EShopSideBar bg-white py-4 px-3 "}>
        <h3 className="text-center pb-4">Catagories</h3>
        <Accordion defaultActiveKey="0">
          {categoriesWithSub.map((category) => (
            <Accordion.Item key={category.id} eventKey={category.id.toString()}>
              <Accordion.Header onClick={() => handleCategoryClick(category)}>
                <div className={"d-flex align-items-center gap-2"}>
                  <CiApple />
                  <span>{category.name}</span>
                </div>
              </Accordion.Header>
              <Accordion.Body className={"py-0"}>
                <ul className={"list-unstyled mb-0"}>
                  {category.subCategories.map((subCategory, index) => (
                    <li
                      key={index}
                      onClick={() => handleSubCategoryClick(subCategory)}
                      className={`${
                        selectedSubCategory === subCategory.id
                          ? "text-danger"
                          : null
                      }`}
                    >
                      {subCategory.name}
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        <div>
          <button className={"reset"} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default EShopSideBar;
