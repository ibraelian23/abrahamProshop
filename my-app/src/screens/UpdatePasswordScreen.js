import React,{useState,useEffect} from 'react'
import {Form,Button} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {changePassword} from "../actions/userActions"


const UpdatePasswordScreen = ({location,history,match}) => {
    const[password,setPassword]=useState("")
    const[confirmPassword,setConfirmPassword]=useState("")
    const[message,setMessage]=useState(null)

    const dispatch = useDispatch()

    const passwordUpdate = useSelector(state => state.passwordUpdate)
    const{loading,success,error} = passwordUpdate

    const {token}=match.params
 
    useEffect(() => {
        if(success){
            setTimeout(() => {
                history.push("/login")
            },1000)
        }
    }, [success,history])

    const submitHandler= e =>{
        e.preventDefault()
        if(password!==confirmPassword){
            setMessage("Passwords do not match")
        } else{
            dispatch(changePassword(token,password))
        }
    }


    return (
        <>
            <h2>Reset Password</h2>
            {message && <Message varitant="danger">{message}</Message>}
            {error && <Message varitant="danger">{error}</Message>}
            {success && <Message varitant="success">Profile Updated</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} >
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Update
                </Button>
            </Form>
                                </>
                )}
export default UpdatePasswordScreen
