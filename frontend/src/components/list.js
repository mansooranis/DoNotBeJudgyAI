import { useEffect } from "react";
import ListItem from "./listItem";

export default function List(props) {
    return (
        <>
            {props.response && props.response.data.map((item, index) => {
                return <ListItem fetch={props.fetch} index = {index} project_title={item.project_title} project_image={item.project_image} project_repo_link = {item.project_repo_link} project_link={item.project_link} />
            })}
        </>
    )
}