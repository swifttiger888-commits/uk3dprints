#!/usr/bin/env python3
"""Set Stripe env var on Cloudflare Pages project."""
import json, subprocess, sys

TOKEN = open("/root/.cloudflared/cert.pem").read()
lines = [l for l in TOKEN.strip().split("\n") if not l.startswith("---")]
payload = json.loads(__import__("base64").b64decode("".join(lines)))

TOKEN = payload["apiToken"]
ACCOUNT = payload["accountID"]
SECRET_KEY = "***"

body = json.dumps({
    "deployment_configs": {
        "production": {
            "env_vars": {
                "STRIPE_SECRET_KEY": {
                    "type": "secret_text",
                    "value": SECRET_KEY
                }
            }
        }
    }
})

result = subprocess.run(
    ["curl", "-s", "-X", "PATCH",
     f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT}/pages/projects/uk3dprints",
     "-H", f"Authorization: Bearer {TOKEN}",
     "-H", "Content-Type: application/json",
     "-d", body],
    capture_output=True, text=True
)

data = json.loads(result.stdout)
if data.get("success"):
    print("OK - env var set")
else:
    print("FAIL:", json.dumps(data.get("errors", []), indent=2))
    # Try alternative: list projects to check permissions
    print("\nTrying list to verify API access...")
    r2 = subprocess.run(
        ["curl", "-s", f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT}/pages/projects",
         "-H", f"Authorization: Bearer {TOKEN}"],
        capture_output=True, text=True
    )
    d2 = json.loads(r2.stdout)
    if d2.get("success"):
        projects = [p["name"] for p in d2["result"]]
        print(f"Projects found: {projects}")
    else:
        print("API access failed:", json.dumps(d2.get("errors"), indent=2))
