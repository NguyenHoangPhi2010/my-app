import { useEffect, useState, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// There are 3 ways to keep the amount from being stale in our createOrder callback:
// 1. Use amountRef.current to keep track of amount changes
// 2. Use the forceReRender prop (which causes flashing)
// 3. Use the key property (which also causes flashing)

const DonateButton = ({ currency, amount }) => {
    const amountRef = useRef(amount);
    useEffect(() => {
        amountRef.current = amount;
    }, [amount]);

    return (
        <PayPalButtons
            // forceReRender={[currency, amount]}
            style={{ color: "black", label: "donate" }}
            fundingSource="paypal"
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: amountRef.current,
                                breakdown: {
                                    item_total: {
                                        currency_code: currency,
                                        value: amountRef.current
                                    }
                                }
                            },
                            items: [
                                {
                                    name: "Cat Fundraiser",
                                    description:
                                        "All proceeds directly support Furby's care and recovery.",
                                    quantity: "1",
                                    unit_amount: {
                                        currency_code: currency,
                                        value: amountRef.current
                                    },
                                    category: "DONATION"
                                }
                            ]
                        }
                    ]
                });
            }}
        />
    );
};

function DonateForm() {
    const [amount, setAmount] = useState("5.00");
    return (
        <form className="DonateForm">
            <PayPalButtons currency="USD" amount={amount} />
        </form>
    );
}



export function DonateApp() {
    return (
        <PayPalScriptProvider
            options={{
                "client-id": "AbNsDAdyRjAJblfFGrwu_A5CbbLFJkvFN-Ds-RQ5blCdey-_yEriM1OjGU1wreAKOzm3ePOowN4rK7cU",
                components: "buttons",
                currency: "USD"
            }}
        >

            <DonateForm />
        </PayPalScriptProvider>
    );
}
