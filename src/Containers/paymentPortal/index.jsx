import React from 'react';
import Script from 'next/script'


const paymentPortal = () => {
  function responseHandler(response) {
    console.log("inside responseHandler")
    if (response.messages.resultCode === "Error") {
      var i = 0;
      while (i < response.messages.message.length) {
        console.log(
          response.messages.message[i].code + ": " +
          response.messages.message[i].text
        );
        i = i + 1;
      }
    } else {
      paymentFormUpdate(response.opaqueData);
    }
  }
  function paymentFormUpdate(opaqueData) {
    document.getElementById("dataDescriptor").value = opaqueData.dataDescriptor;
    document.getElementById("dataValue").value = opaqueData.dataValue;

    document.getElementById("cardNumber").value = "";
    document.getElementById("expMonth").value = "";
    document.getElementById("expYear").value = "";
    document.getElementById("cardCode").value = "";
  }
  return (
    <>
      {/* <script type="text/javascript" src="https://jstest.authorize.net/v3/AcceptUI.js" charset="utf-8"> </script> */}


      <div>Payment Portal</div>
      <form id="paymentForm"
        method="POST"
        action="https://gymnasticbodies-com.vercel.app/api/paymentPortal">
        <input type="hidden" name="dataValue" id="dataValue" />
        <input type="hidden" name="dataDescriptor" id="dataDescriptor" />
        <button type="button"
          className="AcceptUI"
          data-billingaddressoptions='{"show":true, "required":false}'
          data-apiloginid="7F57wRjv"
          data-clientkey=""
          data-acceptuiformbtntxt="Submit"
          data-acceptuiformheadertxt="Card Information"
          data-paymentoptions='{"showCreditCard": true, "showBankAccount": true}'
          data-responsehandler="responseHandler">Pay
        </button>
      </form>
      <Script id="TechnologicGA4Script" src="https://js.authorize.net/v3/AcceptUI.js" />
      

    </>
  )

};

export default paymentPortal;
