const paypal = require('@paypal/checkout-server-sdk');

// Create PayPal environment
let environment = new paypal.core.SandboxEnvironment('AdZnjyBNW8IT9KY-Q3t9X9-GhcnWXLQdQXT2TnUSf3_qFZibJI9dKUYsN2PjlHXqV5vnywYJyPrp1Eln', 'EEHSJByURwCc56t-iFNMS6ah3PozZpgI8Dk7IMsQ1RnynV0eXAMP9cmFhV_MZV4X9N5xpaERaSRD-WnN');

// Create PayPal client
let client = new paypal.core.PayPalHttpClient(environment);
async function createOrder() {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: '100.00'
        }
      }]
    });
  
    try {
      const order = await client.execute(request);
      console.log('Order created successfully:', order.result);
      return order.result;
    } catch (error) {
      console.error(error);
    }
  }
  
  createOrder();

  const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/confirmation',(req,res)=>{
    console.log(req)
})
app.post('/confirmation', (req, res) => {
  const event = req.body;

  // Log the event for debugging
  console.log('Webhook event received:', event);

  // Handle the event according to the event type
  switch (event.event_type) {
    case 'CHECKOUT.ORDER.APPROVED':
      console.log('Order approved:', event);
      break;
    case 'PAYMENT.CAPTURE.COMPLETED':
      console.log('Payment captured:', event);
      break;
    // Add more cases for other events as needed
    default:
      console.log('Unhandled event:', event);
  }

  res.sendStatus(200); // Acknowledge receipt of the event
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

  