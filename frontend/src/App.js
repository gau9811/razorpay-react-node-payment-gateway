import React, {useState, useEffect} from "react"
import logo from "./logo.svg"
import "./App.css"
import Axios from "axios"

function App() {
  const [order, setOrder] = useState([])

  const API = "http://localhost:5000"
  const loadOrder = () => {
    return Axios.get(`${API}/createOrder`)
      .then((data) => {
        setOrder(data.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    loadOrder()
  }, [])

  const payment = async (e) => {
    e.preventDefault()
    const options = {
      key: "rzp_test_nMWFcR2ews8KqK",
      name: "laptop cabinet",
      description: "Some Description",
      order_id: order.id,
      handler: async (response) => {
        const paymentId = response.razorpay_payment_id
        const url = `${API}/payment/${paymentId}`
        const captureResponse = await Axios.post(url, {})
        captureResponse
          .then((data) => {
            console.log(data)
          })
          .catch((err) => console.log(err))
      },
      theme: {
        color: "##EA7773",
      },
    }
    const rzp1 = new window.Razorpay(options)
    rzp1.open()
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={payment}>Pay Now</button>
      </header>
    </div>
  )
}

export default App
