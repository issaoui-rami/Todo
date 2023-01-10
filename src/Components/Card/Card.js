import React from "react";

import "./Card.scss";

import {
  RiEditLine,
  RiDeleteBin3Line,
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";

const Card = (props) => {
  const { title, description, isCheck, onEdit, onDelete, OnCheck } = props;

  return (
    <div className="card-component">
      <div className="col-task-info">
        <input type="checkbox" className="input-check" onChange={OnCheck} />
        {!isCheck ? <RiCheckboxBlankCircleLine /> : <RiCheckboxCircleLine />}
        <div className="task-info">
          <div className="title-task">{title}</div>
          {description && <div className="description-task">{description}</div>}
        </div>
      </div>

      {!isCheck && (
        <div className="box-action">
          <button className="edit-btn" onClick={onEdit}>
            <RiEditLine />
          </button>
          <button className="delete-btn" onClick={onDelete}>
            <RiDeleteBin3Line />
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
