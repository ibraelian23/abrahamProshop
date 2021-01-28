import React,{useState} from 'react'
import {Form,Button} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import {sendResetLink} from "../actions/userActions"

const ResetPasswordScreen = () => {
    const[email,setEmail]=useState("")

    const dispatch = useDispatch()

    const userReset = useSelector(state => state.userReset)
    const {loading,error,success} =userReset



    const submitHandler= e =>{
        e.preventDefault()
        dispatch(sendResetLink(email))
    }

    return (
         
    
    <>
    {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : success ? <Message>PASSWORD RESET LINK HAS BEEN SUCCESSFULLY SENT TO YOUR EMAIL</Message> :
    <>
  <FormContainer>
        <h1>Confirm Your Email</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} >

                </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
                Submit
            </Button>
        </Form>
    </FormContainer>
        </>
        }
    </>
    
    
      

    )
}

export default ResetPasswordScreen

// <FormContainer>
// <h1>Confirm Your Email</h1>
// {loading && <Loader/> }
// <Form className="email_confirm" onSubmit={submitHandler}>
// <Form.Label>Email Address</Form.Label>
// <Form.Control className="mt-3" type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
// </Form>
// <Button className="mt-3" type="submit" variant="primary">
//         Submit
// </Button>
// </FormContainer>
