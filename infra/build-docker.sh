#!/bin/bash
set -euo pipefail

# Manual multi-arch build/push to GHCR (CI does this on main/tag automatically).
# Prerequisites: docker buildx, logged in to ghcr.io
#   echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

REGISTRY="${REGISTRY:-ghcr.io}"
IMAGE_REPO="${IMAGE_REPO:-bytelake/palmr}"
IMAGE="${REGISTRY}/${IMAGE_REPO}"

echo "Please enter a tag for the build (e.g., v3.3.3-beta, 3.4.0):"
read -r -p "Tag: " TAG

if [ -z "${TAG}" ]; then
  echo "Error: Tag cannot be empty"
  exit 1
fi

echo "Building Palmr for linux/amd64 and linux/arm64..."
echo "Tags: ${IMAGE}:latest and ${IMAGE}:${TAG}"

docker buildx create --name palmr-builder --use 2>/dev/null || docker buildx use palmr-builder

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t "${IMAGE}:latest" \
  -t "${IMAGE}:${TAG}" \
  --push \
  .

echo "Multi-platform build completed."
echo "Pulled as: docker pull ${IMAGE}:${TAG}"
echo "Or use docker compose with image ${IMAGE}:latest"
