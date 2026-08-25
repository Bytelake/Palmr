#!/bin/sh
# Download storage system binary for the appropriate architecture
# This script is run during Docker build and MUST succeed for internal storage.

set -e

# Last community MinIO release with published linux binaries on dl.min.io / GitHub.
# NOTE: RELEASE.2025-10-15T17-29-55Z was announced as a security tag but has no
# downloadable linux binaries (404); do not use it here.
MINIO_VERSION="RELEASE.2025-09-07T16-13-09Z"
ARCH=$(uname -m)

echo "[BUILD] Downloading storage system ${MINIO_VERSION} for ${ARCH}..."

case "$ARCH" in
    x86_64)
        MINIO_ARCH="linux-amd64"
        ;;
    aarch64|arm64)
        MINIO_ARCH="linux-arm64"
        ;;
    *)
        echo "[BUILD] Unsupported architecture: $ARCH"
        echo "[BUILD] Internal MinIO cannot be installed on this platform"
        exit 1
        ;;
esac

# Prefer GitHub release assets (dl.min.io now redirects there for archived OSS builds)
DOWNLOAD_URLS="
https://dl.min.io/server/minio/release/${MINIO_ARCH}/archive/minio.${MINIO_VERSION}
https://github.com/minio/minio/releases/download/${MINIO_VERSION}/minio.${MINIO_ARCH}.${MINIO_VERSION}
"

DOWNLOAD_OK=0
for DOWNLOAD_URL in $DOWNLOAD_URLS; do
    echo "[BUILD] Trying: $DOWNLOAD_URL"
    if wget -O /tmp/minio "$DOWNLOAD_URL"; then
        # Reject tiny/HTML error pages pretending to be the binary
        SIZE=$(wc -c < /tmp/minio)
        if [ "$SIZE" -gt 1000000 ]; then
            echo "[BUILD] ✓ Download successful (${SIZE} bytes)"
            DOWNLOAD_OK=1
            break
        fi
        echo "[BUILD] Download too small (${SIZE} bytes), trying next URL..."
        rm -f /tmp/minio
    else
        echo "[BUILD] Download failed, trying next URL..."
        rm -f /tmp/minio
    fi
done

if [ "$DOWNLOAD_OK" != "1" ]; then
    echo "[BUILD] ✗ Failed to download MinIO ${MINIO_VERSION}"
    exit 1
fi

chmod +x /tmp/minio
mv /tmp/minio /usr/local/bin/minio

echo "[BUILD] ✓ Storage system installed successfully"
/usr/local/bin/minio --version

exit 0
