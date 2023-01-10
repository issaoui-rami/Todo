import React from "react";

import { useNavigate } from "react-router-dom";

import Textfield from "../../Components/Textfield";
import Button from "../../Components/Button";
import Card from "../../Components/Card/Card";
import Logout from "../../Components/Logout/Logout";

import { RiFilterLine } from "react-icons/ri";

import "./TodoList.scss";

const initialVal = { title: "", description: "" };

const DATA_KEY = "key123";

const TodoList = (props) => {
  const { keyLogin } = props;

  const [taskList, setTaskList] = React.useState([]);
  const [val, setVal] = React.useState(initialVal);
  const [keyEdit, setKeyEdit] = React.useState(0);
  const [filterSort, setFilterSort] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    const isLogin = JSON.parse(localStorage.getItem(keyLogin));
    if (!isLogin) {
      navigate("/login");
    }
  }, [navigate, keyLogin]);

  React.useEffect(() => {
    setTaskList(JSON.parse(localStorage.getItem(DATA_KEY)) || []);
  }, []);

  const localStorageData = (data) => {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
  };

  const onReset = () => {
    setVal(initialVal);
    setKeyEdit(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (keyEdit) {
      /****Update Data if keyEdit = key ****/
      setTaskList((prev) => {
        const newDataUpdate = prev.map((task) => {
          return task.key === keyEdit
            ? {
                ...task,
                title: val.title,
                description: val.description,
              }
            : task;
        });
        localStorageData(newDataUpdate);
        return newDataUpdate;
      });
    } else {
      /****Submit new Data  ****/
      setTaskList((prev) => {
        const newData = [
          ...prev,
          {
            key: prev.length ? prev[prev.length - 1].key + 1 : 1,
            title: val.title,
            description: val.description,
            checked: false,
          },
        ];
        localStorageData(newData);
        return newData;
      });
    }

    /****Reset Form ****/
    onReset();
  };

  const OnCheck = (key) => {
    setTaskList((prev) => {
      const newDataCheck = prev.map((task) => {
        return task.key === key ? { ...task, checked: !task.checked } : task;
      });
      localStorageData(newDataCheck);
      return newDataCheck;
    });
  };

  const onDelete = (key) => {
    console.log("check delete");
    setTaskList((prev) => {
      const newDataDelete = prev.filter((task) => task.key !== key);
      localStorageData(newDataDelete);
      return newDataDelete;
    });
    onReset();
  };

  const onEdit = (key) => {
    const tabEdit = taskList.find((task) => task.key === key);
    setKeyEdit(tabEdit.key);
    setVal({
      title: tabEdit.title,
      description: tabEdit.description,
    });
  };

  const renderCard = (parm) => {
    return taskList
      .filter((taskCompleted) => taskCompleted.checked === parm)
      .map((task) => {
        return (
          <Card
            key={task.key}
            title={task.title}
            description={task.description}
            onDelete={() => {
              onDelete(task.key);
            }}
            onEdit={() => {
              onEdit(task.key);
            }}
            OnCheck={() => OnCheck(task.key)}
            isCheck={task.checked}
          />
        );
      });
  };

  const onChange = (e, key) => {
    setVal((prev) => ({ ...prev, [key]: e.target.value }));
  };
  
  const changeFilter = () => {
    setFilterSort((prev) => (!prev))
  }

  return (
    <div className="todo-page">
      <div className="left-col">
        <div className="logo">Logo</div>
        <div className="logout-btn">
          <Logout keyLogin={keyLogin} />{" "}
        </div>
        <div className="content-form">
          <h1 className="title">
            Organize your <span>works</span>
          </h1>
          <p className="sub-title">Create a task</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <Textfield
              label="Task title"
              name="task_title"
              type="text"
              placeholder="Enter your task"
              size="large"
              value={val.title}
              onChange={(e) => onChange(e, "title")}
            />
            <Textfield
              label="Description"
              name="description"
              type="textarea"
              placeholder="Enter your description"
              size="large"
              value={val.description}
              onChange={(e) => onChange(e, "description")}
            />
            <Button
              color="green"
              type="submit"
              borderRadius="borderRadius4"
              size="large"
              disabled={val.title.length < 3}
            >
              {!keyEdit ? "Add Task" : "Update"}
            </Button>
            {keyEdit !== 0 && (
              <Button
                color="red"
                type="submit"
                borderRadius="borderRadius4"
                size="large"
                onClick={onReset}
              >
                Reset
              </Button>
            )}
          </form>
        </div>
      </div>
      <div className="right-col">
        <Button 
          color="gray" 
          type="submit" 
          borderRadius="borderRadius4"
          onClick={changeFilter}>
          Filter <RiFilterLine />
        </Button>
        <div className={`${filterSort ? "wrap-order-list" : "wrap-order-list-reverse"}`}>
        <div className="tasks-row">
          <h2 className="title">Task Not completed :</h2>
          {renderCard(false)}
        </div>

        <div className="tasks-row">
          <h2 className="title">Task completed :</h2>
          {renderCard(true)}
        </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
