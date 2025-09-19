// Sandbox payment gateway simulation
export async function processPayment(req, res) {
  try {
    const { reservationId, amount, cardDetails } = req.body;

    if (!reservationId || !amount) {
      return res.status(400).json({ 
        message: "reservationId and amount are required" 
      });
    }

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate payment success/failure (90% success rate for demo)
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      // Generate mock transaction ID
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      res.status(200).json({
        success: true,
        transactionId: transactionId,
        message: "Payment processed successfully",
        amount: amount,
        reservationId: reservationId
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment failed. Please try again with a different card.",
        error: "INSUFFICIENT_FUNDS",
        reservationId: reservationId
      });
    }
  } catch (error) {
    console.error("Error in processPayment controller", error);
    res.status(500).json({ 
      success: false,
      message: "Payment processing error" 
    });
  }
}

// Verify payment status
export async function verifyPayment(req, res) {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).json({ message: "Transaction ID is required" });
    }

    // Simulate payment verification
    // In a real implementation, this would check with the payment gateway
    const isValid = transactionId.startsWith('TXN_');
    
    if (isValid) {
      res.status(200).json({
        valid: true,
        status: 'completed',
        transactionId: transactionId
      });
    } else {
      res.status(400).json({
        valid: false,
        message: "Invalid transaction ID"
      });
    }
  } catch (error) {
    console.error("Error in verifyPayment controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
