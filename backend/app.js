let express = require("express")
let cookieParser = require("cookie-parser")
require("dotenv").config()
let Razorpay = require("razorpay")
let app = express()
let cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
})

app.get("/createOrder", (req, res) => {
  let order = instance.orders.create({
    amount: 500 * 100,
    currency: "INR",
    receipt: "receipt#1",
    payment_capture: 0,
  })

  order
    .then((order) => {
      res.json(order)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.post("/payment/:paymentId", (req, res) => {
  instance.payments
    .capture(req.params.paymentId, 500 * 100, "INR")
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.json(error)
    })
})

// view engine setup

app.listen(5000, () => {
  console.log(`server running at 5000`)
})
