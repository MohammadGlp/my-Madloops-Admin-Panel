import React from "react";
import "../assets/scss/style.scss";

const Skeleton = () => {
  return (
    <tr>
      <td className="chard">
        <div className="chard__header">
          <img className="header__img skeleton" id="logo-img" alt="" />
          <div className="skeleton skeleton-text3"></div>
        </div>
      </td>
      <td>
        <div className="chard__body">
          <div className="skeleton skeleton-text1"></div>
          <div className="skeleton skeleton-text2"></div>
        </div>
      </td>
      <td>
        <div className="chard__body">
          <div className="skeleton skeleton-text1"></div>
          <div className="skeleton skeleton-text2"></div>
        </div>
      </td>
      <td>
        <div className="chard__body">
          <div className="skeleton skeleton-text1"></div>
          <div className="skeleton skeleton-text2"></div>
        </div>
      </td>
      <td>
        <div className="chard__body">
          <div className="skeleton skeleton-text1"></div>
          <div className="skeleton skeleton-text2"></div>
        </div>
      </td>
      <td>
        <div className="chard__body">
          <div className="skeleton skeleton-text1"></div>
          <div className="skeleton skeleton-text2"></div>
        </div>
      </td>
    </tr>
  );
};

export default Skeleton;
