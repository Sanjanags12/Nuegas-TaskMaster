
import React from "react";
import NavBar from "~/components/navbar/navbar";

//this is the task tab of the app
const Task = () => {
  return (
    <div className=" h-screen ">
      <NavBar/>
      <p className="text-2xl text-center">Task Page</p>
      <br />
      <p className="text-xl">In Progress......</p>
    </div>
  );
};

export default Task;
