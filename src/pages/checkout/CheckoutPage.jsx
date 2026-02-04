/** @format */

import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import "./CheckoutPage.css";
import "./CheckoutHeader.css";
import { CheckoutHeader } from "./CheckoutHeader.jsx";
import { formatMoney } from "../../utils/money.js";

export function CheckoutPage ({ cartItems })
{
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => { });

    useEffect(() =>
    {
        axios
            .get("/api/delivery-options?expand=estimatedDeliveryTime")
            .then((response) =>
            {
                console.log(response.data);

                setDeliveryOptions(response.data);
            });

        axios.get("/api/payment-summary").then((response) =>
        {
            setPaymentSummary(response.data);
        });
    }, []);
    return (
        <>
            <title>Checkout</title>
            <link rel="icon" href="cart-favicon.png" />

            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {deliveryOptions.length > 0 &&
                            cartItems.map((cartItem) =>
                            {
                                const selectedDeliveryOption = deliveryOptions.find(() =>
                                {
                                    return deliveryOptions.id === cartItems.deliveryOptionId;
                                });
                                return (
                                    <div key={cartItem.productId} className="cart-item-container">
                                        <div className="delivery-date">
                                            Delivery date:{" "}
                                            {dayjs(
                                                selectedDeliveryOption.estimatedDeliveryTimeMs,
                                            ).format("dddd", "MMMM", "D")}
                                        </div>

                                        <div className="cart-item-details-grid">
                                            <img
                                                className="product-image"
                                                src={cartItem.product.image}
                                            />

                                            <div className="cart-item-details">
                                                <div className="product-name">
                                                    {cartItem.product.name}
                                                </div>
                                                <div className="product-price">
                                                    {formatMoney(cartItem.product.priceCents)}
                                                </div>
                                                <div className="product-quantity">
                                                    <span>
                                                        Quantity:{" "}
                                                        <span className="quantity-label">
                                                            {cartItem.quantity}
                                                        </span>
                                                    </span>
                                                    <span className="update-quantity-link link-primary">
                                                        Update
                                                    </span>
                                                    <span className="delete-quantity-link link-primary">
                                                        Delete
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="delivery-options">
                                                <div className="delivery-options-title">
                                                    Choose a delivery option:
                                                </div>
                                                {deliveryOptions.map((deliveryOption) =>
                                                {
                                                    return (
                                                        <div
                                                            key={deliveryOption.id}
                                                            className="delivery-option"
                                                        >
                                                            <input
                                                                type="radio"
                                                                checked={
                                                                    deliveryOption.id ===
                                                                    cartItem.deliveryOptionId
                                                                }
                                                                className="delivery-option-input"
                                                                name={`delivery-option-${cartItem.productId}`}
                                                            />
                                                            <div>
                                                                <div className="delivery-option-date">
                                                                    {dayjs(
                                                                        deliveryOption.estimatedDeliveryTimeMs,
                                                                    ).format("dddd, MMMM D")}
                                                                </div>
                                                                <div className="delivery-option-price">
                                                                    {deliveryOption.priceCents == 0
                                                                        ? "Free Shipping"
                                                                        : `${formatMoney(deliveryOption.priceCents)} - Shipping`}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    {paymentSummary && (
                        <>

                            <div className="payment-summary">
                                <div className="payment-summary-title">Payment Summary</div>

                                <div className="payment-summary-row">
                                    <div>Items (3):</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.productCostCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Shipping &amp; handling:</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.shippingCostCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row subtotal-row">
                                    <div>Total before tax:</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Estimated tax (10%):</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.taxCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row total-row">
                                    <div>Order total:</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.totalCostCents)}
                                    </div>
                                </div>

                                <button className="place-order-button button-primary">
                                    Place your order
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
