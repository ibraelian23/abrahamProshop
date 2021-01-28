import React,{useState} from 'react'
import {Form,Button,Col} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import FormContainer from "../components/FormContainer"
import CheckOutSteps from "../components/CheckOutSteps"
import {savePaymentMethod} from "../actions/cartActions"

const PaymentScreen = ({history}) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress){
        history.push("/shipping")
    }

    const [paymentMethod, setPaymentMethod] = useState("PayPal")


    const submitHandler=e =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push("/placeorder")
    }


    return (
        <div>
            <FormContainer>
                <CheckOutSteps step1 step2 step3/>
                <h1>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">
                        Select Method
                    </Form.Label>
                
                <Col>
                    <Form.Check className="py-2" type="radio" label="PayPal or Credit Card" id="PayPal" name="paymentMethod" value="PayPal"
                    checked onChange={(e)=>setPaymentMethod(e.target.value)}
                    ></Form.Check>

                </Col>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default PaymentScreen
