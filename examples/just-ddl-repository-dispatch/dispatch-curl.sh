#!/usr/bin/env bash
set -euo pipefail

: "${HUB_DISPATCH_TOKEN:?Set HUB_DISPATCH_TOKEN before running this script.}"

curl -fsSL \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${HUB_DISPATCH_TOKEN}" \
  -H "X-GitHub-Api-Version: 2026-03-10" \
  https://api.github.com/repos/Just-Agent/just-ddl/dispatches \
  -d '{
    "event_type": "topic-updated",
    "client_payload": {
      "topic": "ddl",
      "source_repo": "Just-Agent/just-ddl-topic",
      "data_file": "data/items.json"
    }
  }'
