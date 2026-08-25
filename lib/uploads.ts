export const DEFAULT_MAX_UPLOAD_SIZE = 25 * 1024 * 1024;

export function getMaxUploadSize() {
  const configuredSize = Number(process.env.MAX_UPLOAD_SIZE_MB);

  if (!Number.isFinite(configuredSize) || configuredSize <= 0) {
    return DEFAULT_MAX_UPLOAD_SIZE;
  }

  return Math.floor(configuredSize * 1024 * 1024);
}

export function formatUploadLimit(size: number) {
  return `${Math.floor(size / (1024 * 1024))} MB`;
}

export function getSafeStoredExtension(fileName: string) {
  const finalSegment = fileName.split(/[\\/]/).pop() ?? "";
  const lastDot = finalSegment.lastIndexOf(".");

  if (lastDot <= 0) {
    return "";
  }

  const extension = finalSegment.slice(lastDot).toLowerCase();

  return /^\.[a-z0-9]{1,20}$/.test(extension) ? extension : "";
}

export function canDisplayInline(mimeType: string) {
  return (
    mimeType === "application/pdf" ||
    (mimeType.startsWith("image/") && mimeType !== "image/svg+xml") ||
    mimeType.startsWith("audio/") ||
    mimeType.startsWith("video/") ||
    mimeType === "text/plain"
  );
}

export function createContentDisposition(
  disposition: "inline" | "attachment",
  fileName: string
) {
  const fallback =
    fileName
      .replace(/[^\x20-\x7E]/g, "_")
      .replace(/["\\]/g, "_")
      .slice(0, 150) || "download";
  const encoded = encodeURIComponent(fileName).replace(/['()*]/g, (character) =>
    `%${character.charCodeAt(0).toString(16).toUpperCase()}`
  );

  return `${disposition}; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}
