import React from "react";
import { ListGroup } from "react-bootstrap";

interface Props {
    errors: any;
}
export default function ValidationErrors({errors}: Props){
    return (
    <>
        {errors && (
        <ListGroup>
            {errors.map((err: any, i: any) => (
                <ListGroup.Item key = {i} >{err}</ListGroup.Item>
            ))}
            </ListGroup>
        )}
    </>
    )
}