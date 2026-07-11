export const slugify = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
};

// Deprecated: All posts have been successfully migrated to the Cloudflare D1 database
export const SAMPLE_POSTS = [];
