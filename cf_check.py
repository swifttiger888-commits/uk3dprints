import subprocess, json

with open("/tmp/cf_token") as f:
    CF = f.read().strip()
    
BEARER = "Bearer"
HEADER = "Authorization" + ": " + BEARER + " " + CF
ACCT = "badd33ce94008f499f2ae75fd3b04574"
PROJECT = "uk3dprints"

r = subprocess.run(
    ["curl", "-s",
     f"https://api.cloudflare.com/client/v4/accounts/{ACCT}/pages/projects/{PROJECT}/deployments",
     "-H", HEADER],
    capture_output=True, text=True, timeout=30
)
d = json.loads(r.stdout)
for dep in d.get("result", []):
    branch = dep.get("deployment_trigger", {}).get("metadata", {}).get("branch", "?")
    stage = dep.get("latest_stage", {}).get("name", "?")
    status = dep.get("latest_stage", {}).get("status", "?")
    print(f"{dep['id'][:12]}... | branch: {branch} | stage: {stage} | status: {status} | created: {dep.get('created_on','?')[:19]}")
