import subprocess, json

with open("/tmp/cf_token") as f:
    CF = f.read().strip()

BEARER = "Bearer"
HEADER = "Authorization" + ": " + BEARER + " " + CF

# Check token permissions via token verify with status
r = subprocess.run(
    ["curl", "-s", "https://api.cloudflare.com/client/v4/user/tokens/verify", "-H", HEADER],
    capture_output=True, text=True, timeout=30
)
d = json.loads(r.stdout)
print("Verify:", json.dumps(d, indent=2))

# Try listing zones to check DNS perm
print("\n=== Zones ===")
r = subprocess.run(
    ["curl", "-s", "https://api.cloudflare.com/client/v4/zones", "-H", HEADER],
    capture_output=True, text=True, timeout=30
)
d = json.loads(r.stdout)
print("Success:", d["success"])
for z in d.get("result", []):
    print(f"  {z['name']} ({z['id']}) status={z['status']}")

# Try a direct Pages API call - maybe the format changed?
ACCT = "badd33ce94008f499f2ae75fd3b04574"
# Try creating a project to see exact error
r = subprocess.run(
    ["curl", "-s", "-X", "POST",
     f"https://api.cloudflare.com/client/v4/accounts/{ACCT}/pages/projects",
     "-H", HEADER,
     "-H", "Content-Type: application/json",
     "-d", json.dumps({"name": "test-project", "production_branch": "main"})],
    capture_output=True, text=True, timeout=30
)
d = json.loads(r.stdout)
print("\n=== Create test project ===")
print(json.dumps(d, indent=2))
