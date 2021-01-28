import React from 'react'
import {Alert} from "react-bootstrap"

const Message = ({varitant,children}) => {
    return (
        <Alert variant={varitant}>
            {children}
        </Alert>
    )
}

Message.defaultProps={
    varitant:"info",
}

export default Message
