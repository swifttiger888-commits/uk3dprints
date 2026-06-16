#!/usr/bin/env python3
import json, os, subprocess, sys

SK = sys.stdin.readline().strip()
if not SK.startswith("sk_"):
    sys.exit(1)

result = subprocess.run(
    ["curl", "-s", "-X", "POST", "https://api.stripe.com/v1/webhook_endpoints",
     "-u", f"{SK}:",
     "-d", "url=https://uk3dprints.com/api/stripe-webhook",
     "-d", "enabled_events[]=checkout.session.completed",
     "-d", "enabled_events[]=checkout.session.expired",
     "-d", "description=UK3D Prints"],
    capture_output=True, text=True
)

with open("/tmp/stripe_wh_result.txt", "w") as f:
    f.write(result.stdout)

data = json.loads(result.stdout)
if "id" in data and data["id"].startswith("we_"):
    print("OK")
    print("ID:", data["id"])
    print("SECRET:", data["secret"])
else:
    print("ERROR:", json.dumps(data))
