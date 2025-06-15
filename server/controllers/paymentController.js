const Razorpay = require('razorpay');
const razorpay = new Razorpay({
    key_id: "rzp_test_JfTSs0YHMgmwmw",
    key_secret: "Zkz4KunfStvtYbePxdrBtD0c",
  });
  
const paymentRazorPay = async (req, res) => {
    try {
      const options = {
        amount: 50000, // Amount in the smallest currency unit (50000 paise = ₹500)
        currency: "INR",
        receipt: `receipt_${Math.random()}`, // Generate a unique receipt ID
      };
  
      const order = await razorpay.orders.create(options);
      res.json({
        success: true,
        order,
      });
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again.",
        error,
      });
    }
  };
module.exports = {paymentRazorPay}  