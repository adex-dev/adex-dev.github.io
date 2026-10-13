import React from "react";
import {useParams } from "react-router";
const ProjectDetail: React.FC = () => {
 const { id } = useParams();
  return <h1>Project detail {id}</h1>;
};
export default ProjectDetail;
