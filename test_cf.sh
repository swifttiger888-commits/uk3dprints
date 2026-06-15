#!/bin/bash
# Read token from file, call Cloudflare API
TOKEN=*** /tmp/cf_token)
ACCT="badd33ce94008f499f2ae75fd3b04574"
curl -s "https://api.cloudflare.com/client/v4/accounts/$ACCT/pages/projects" \
  -H "Authorization: Bearer *** | python3 -c "
import json,sys
d=json.load(sys.stdin)
print('Success:', d['success'])
for p in d.get('result',[]):
    print('Project:', p['name'])
"