/**
 * Helpers for validating storage object keys belong to the authenticated user.
 *
 * User files use the prefix `${userId}/...`.
 * Reverse-share uploads use `reverse-shares/...` and are authorized separately.
 */

export type ObjectNameAccessResult =
  | { ok: true }
  | { ok: false; status: 401 | 403; error: string };

export function assertObjectNameAccess(
  objectName: string,
  userId: string | undefined,
  options: { requireOwnerPrefix?: boolean } = {}
): ObjectNameAccessResult {
  if (!userId) {
    return { ok: false, status: 401, error: "Unauthorized" };
  }

  // Reject path traversal / absolute keys
  if (
    objectName.includes("..") ||
    objectName.startsWith("/") ||
    objectName.includes("\\") ||
    objectName.includes("\0")
  ) {
    return { ok: false, status: 403, error: "Invalid object name." };
  }

  const ownerPrefix = `${userId}/`;
  if (objectName.startsWith(ownerPrefix)) {
    return { ok: true };
  }

  if (options.requireOwnerPrefix) {
    return {
      ok: false,
      status: 403,
      error: "Object name must be under your user prefix.",
    };
  }

  return {
    ok: false,
    status: 403,
    error: "Access denied for this object name.",
  };
}
