import subprocess, json

with open("/tmp/cf_token") as f:
    token = f.read().strip()

auth = "Authorization: Bearer *** + token

result = subprocess.run(
    ["curl", "-s", "https://api.cloudflare.com/client/v4/accounts", "-H", auth],
    capture_output=True, text=True, timeout=30
)

data = json.loads(result.stdout)
a = data["result"][0]
print("Account:", a["name"])
print("ID:", a["id"])

# Now get zones
for domain in ["uk3dprints.com", "calicoandcream.com"]:
    r = subprocess.run(
        ["curl", "-s", f"https://api.cloudflare.com/client/v4/zones?name={domain}", "-H", auth],
        capture_output=True, text=True, timeout=30
    )
    d = json.loads(r.stdout)
    zones = d.get("result", [])
    if zones:
        print(f"Zone {domain}: id={zones[0]['id']} status={zones[0]['status']}")
    else:
        print(f"Zone {domain}: NOT IN CLOUDFLARE")

# Get pages projects
account_id = a["id"]
r = subprocess.run(
    ["curl", "-s", f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects", "-H", auth],
    capture_output=True, text=True, timeout=30
)
d = json.loads(r.stdout)
print(f"\nPages projects ({len(d.get('result',[]))}):")
for p in d.get("result", []):
    dep = p.get("canonical_deployment", {}) or {}
    aliases = dep.get("aliases", []) or []
    doms = [x.get("name", "?") for x in aliases]
    print(f"  {p['name']} | domains: {doms} | branch: {p.get('production_branch','?')}")
