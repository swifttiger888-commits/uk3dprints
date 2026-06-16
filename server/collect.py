#!/usr/bin/env python3
"""Simple interest-form collector for UK3D Prints.

Runs on the VPS to receive submissions from the Cloudflare Pages Function.
Start:  python3 collect.py
Or bg:  nohup python3 collect.py &
"""

import json, os
from http.server import HTTPServer, BaseHTTPRequestHandler
from datetime import datetime

DATA_FILE = "/opt/uk3dprints-server/interests.jsonl"
PORT = 9877

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)
        record = json.loads(body)
        record["_received_at"] = datetime.utcnow().isoformat() + "Z"

        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        with open(DATA_FILE, "a") as f:
            f.write(json.dumps(record) + "\n")

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(b'{"ok":true}')

        print(f"[interest] {record.get('name','?')} <{record.get('email','?')}> — {record.get('product','?')}")

    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/plain")
        self.end_headers()
        self.wfile.write(b"UK3D Prints interest collector running.\n")

    def log_message(self, fmt, *args):
        pass  # quiet

if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", PORT), Handler)
    print(f"Interest collector listening on :{PORT}")
    server.serve_forever()
