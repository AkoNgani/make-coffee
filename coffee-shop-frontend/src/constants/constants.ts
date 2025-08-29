import { CoffeeSize, DeliOption, LatLng, PaymentMethod } from '@/types';

export const APP_NAME = "Make Coffee";

export const GOOGLE_OAUTH_CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID || "";

console.log("Google Client ID:", GOOGLE_OAUTH_CLIENT_ID);


export const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const defaultCoordinate: LatLng = {
  lng: 96.17045650343823,
  lat: 16.785692464382592,
};

export const defaultDeliFee = 50;

export const coffeeSizeOptions = [
  {
    value: CoffeeSize.SMALL,
    label: 'Small',
  },
  {
    value: CoffeeSize.MEDIUM,
    label: 'Medium',
  },
  {
    value: CoffeeSize.LARGE,
    label: 'Large',
  },
];

export const deliOptions = [
  {
    value: DeliOption.DELIVER,
    label: 'Deliver',
  },
  {
    value: DeliOption.PICK_UP,
    label: 'Pick Up',
  },
];

export const paymentMethodOptions = [
  {
    value: PaymentMethod.CASH,
    label: "Cash on Delivery",
    icon: '/images/cash-payment-icon.png',
  },
  {
    value: PaymentMethod.Gcash,
    label: "Gcash",
    icon: '/images/Gcash.png',
  },
  {
    value: PaymentMethod.PayPal,
    label: "PayPal",
    icon: '/images/Paypal.png',
  },
];
