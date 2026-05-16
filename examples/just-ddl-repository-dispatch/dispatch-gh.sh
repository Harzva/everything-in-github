#!/usr/bin/env bash
set -euo pipefail

: "${HUB_DISPATCH_TOKEN:?Set HUB_DISPATCH_TOKEN before running this script.}"

GH_TOKEN="${HUB_DISPATCH_TOKEN}" gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2026-03-10" \
  /repos/Just-Agent/just-ddl/dispatches \
  -f event_type=topic-updated \
  -f client_payload[topic]=ddl \
  -f client_payload[source_repo]=Just-Agent/just-ddl-topic \
  -f client_payload[data_file]=data/items.json
