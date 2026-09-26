# Deen Clothing Website

A responsive boutique/shopping-style website for Deen Clothing.

## Included features
- Responsive mobile/desktop design
- Product catalogue with categories
- Add-to-bag shopping interaction
- Estimated cart total
- One-click WhatsApp order message
- Phone call button
- Google Maps directions button
- Clothing picture gallery
- About and contact sections
- No backend required; works as a static website

## How to add Deen Clothing's real details

Open `script.js`.

Find:

```js
const BUSINESS = {
  whatsapp: "2348000000000",
  phone: "+234 800 000 0000",
  address: "Deen Clothing, Yola, Adamawa, Nigeria",
  mapsQuery: "Deen Clothing, Yola, Adamawa, Nigeria"
};
```

Replace those values with the real WhatsApp number, phone number and location.

IMPORTANT: The WhatsApp value should contain digits only after the Nigeria country code. Example:
`2348012345678`

## How to add clothing photos

1. Put your JPG/PNG/WebP photos inside the `assets` folder.
2. In `script.js`, change a product's `image` value.

Example:

```js
image:"assets/black-dress.jpg"
```

For the gallery, use the same method:

```js
{title:"New arrivals", image:"assets/new-arrivals.jpg"}
```

## Edit prices/products

All products are near the top of `script.js` in the `products` array. You can change:
- name
- category
- price
- image
- badge

## Deploying

This is a static website, so it can be deployed on GitHub Pages, Netlify, Cloudflare Pages, or another static hosting service.

The website does not process online card payments. Orders are sent to WhatsApp, where Deen Clothing can confirm availability, size, colour, delivery and payment.
