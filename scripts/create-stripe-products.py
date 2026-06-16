#!/usr/bin/env python3
"""Create Stripe products and prices for UK3D Prints."""
import json, os, subprocess, sys

SK = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("STRIPE_SECRET_KEY")
if not SK or not SK.startswith("sk_"):
    sys.exit("Usage: python3 create-stripe-products.py sk_test_xxx")

API = "https://api.stripe.com/v1"
AUTH = ["-u", f"{SK}:"]

def stripe(method, path, data=None):
    cmd = ["curl", "-s", "-X", method.upper(), f"{API}{path}"] + AUTH
    if data:
        cmd += ["-d", data]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return json.loads(result.stdout)

products = [
    {"name": "Mini Steering Wheel", "description": "Snap-on mini steering wheel for Xbox Series X/S, Xbox One, and Scuf controller thumbsticks. 45mm diameter.",
     "price": 1200, "currency": "gbp"},
    {"name": "Webcam Privacy Covers", "description": "Simple sliding webcam privacy covers. 5-pack, universal fit for most laptops and webcams.",
     "price": 800, "currency": "gbp"},
    {"name": "Cable Clips", "description": "Parametric snap-on cable clips with 3M adhesive backing. 50-pack, mixed diameters 3.5mm-10mm.",
     "price": 1500, "currency": "gbp"},
    {"name": "Custom Nameplate", "description": "Personalised 3D printed nameplate. Choose your text and font. 80x25mm, raised lettering.",
     "price": 1500, "currency": "gbp"},
    {"name": "Headphone Hook", "description": "Under-desk headphone hook. Clamp or screw-mount variant. Fits desks up to 40mm thick.",
     "price": 1400, "currency": "gbp"},
]

results = []
for p in products:
    print(f"Creating: {p['name']}...")
    prod = stripe("POST", "/products",
                  f"name={p['name']}&description={p['description']}")
    pid = prod.get("id", "ERROR")
    print(f"  Product: {pid}")

    price = stripe("POST", "/prices",
                   f"product={pid}&unit_amount={p['price']}&currency={p['currency']}")
    prid = price.get("id", "ERROR")
    print(f"  Price:   {prid} (£{p['price']/100:.2f})")
    results.append((p['name'], pid, prid))

print("\n===== ENV VARS =====")
for name, pid, prid in results:
    key = name.upper().replace(" ", "_").replace("-", "_")
    print(f"STRIPE_PRICE_{key}={prid}")
print()

# Also write to .dev.vars
dev_vars_path = "/opt/uk3dprints-web/.dev.vars"
if os.path.exists(dev_vars_path):
    with open(dev_vars_path) as f:
        content = f.read()
    for name, pid, prid in results:
        key = name.upper().replace(" ", "_").replace("-", "_")
        old = f"{key}=price_replace_me"
        new = f"{key}={prid}"
        if old in content:
            content = content.replace(old, new)
            print(f"Updated .dev.vars: {key}={prid}")
    with open(dev_vars_path, "w") as f:
        f.write(content)
    print("Written to .dev.vars")
