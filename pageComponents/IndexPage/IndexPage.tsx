import * as React from "react";
import css from "./IndexPage.module.css";

interface Props extends React.Attributes {}

export default function IndexPage({}: Props) {
  return <div className={css.root}></div>;
}
