#!/bin/sh
# Render nginx.conf from templates, then exec nginx in the foreground.
#
# WEBAPP_BASE_URL is a build arg, propagated as an ENV at image build time
# (see Dockerfile). At container start, we:
#   1. Normalize WEBAPP_BASE_URL into BASE_URL_PATH (leading + trailing
#      slashes, e.g. "/admin/") so location/regex blocks match cleanly.
#      Empty -> "/", a sentinel meaning "site root hosting" — we skip the
#      subpath template entirely.
#   2. Compose the final nginx.conf:
#        - root-mode:        copy nginx-root.conf.template verbatim
#        - subpath-mode:     root template with the subpath block inserted
#                            ABOVE the root `location /`
#   3. Substitute ${BASE_URL_PATH} placeholders inside the subpath block.
#   4. Start nginx in the foreground.
set -e

normalize() {
    # Empty / "/" -> "/" (site root). Else: "/<segment>/" with no duplicate
    # or trailing/leading slash issues.
    case "$1" in
        "" | "/") echo "/" ;;
        *) echo "$1" | sed -E 's#/+#/#g; s#^([^/])#/\1#; s#([^/])$#\1/#' ;;
    esac
}

BASE_URL_PATH="$(normalize "${WEBAPP_BASE_URL:-}")"
export BASE_URL_PATH

if [ "$BASE_URL_PATH" = "/" ]; then
    cp /etc/nginx/conf.d/nginx-root.conf.template /etc/nginx/conf.d/default.conf
else
    # Compose: root template, BUT insert the (substituted) subpath block
    # right after `server_tokens off;` so it appears BEFORE the root
    # `location /`. nginx matches the most-specific location first, so the
    # prefix block wins.
    subpath_rendered="$(mktemp)"
    trap 'rm -f "$subpath_rendered"' EXIT
    envsubst '${BASE_URL_PATH}' \
        < /etc/nginx/conf.d/nginx-subpath.conf.template \
        > "$subpath_rendered"

    awk \
        -v prefix_block_file="$subpath_rendered" '
        BEGIN {
            while ((getline line < prefix_block_file) > 0) prefix_block = prefix_block "\n" line
            close(prefix_block_file)
        }
        /server_tokens off;/ && !done {
            print
            print prefix_block
            done = 1
            next
        }
        { print }
        ' /etc/nginx/conf.d/nginx-root.conf.template \
        > /etc/nginx/conf.d/default.conf
fi

# Validate the rendered config; nginx exits non-zero on parse errors.
nginx -t

exec nginx -g 'daemon off;'
