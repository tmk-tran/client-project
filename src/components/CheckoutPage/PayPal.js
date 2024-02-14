export const initPayPalButton = () => {
  paypal
    .Buttons({
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: "1.00", // Update this with the actual amount
              },
            },
          ],
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          alert("Transaction completed by " + details.payer.name.given_name);
          // Call a function to handle the successful payment
        });
      },
      onError: function (err) {
        console.error(err);
        // Handle error
      },
    })
    .render("#paypal-button-container");
};
