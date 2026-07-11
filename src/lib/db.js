// Cloudflare D1 REST API client helper
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

/**
 * Execute SQL query against Cloudflare D1 Database via HTTP REST API.
 * @param {string|Array<{sql: string, params: Array}>} queryOrQueries - SQL string or array of queries
 * @param {Array} [params=[]] - parameters for a single SQL query
 * @returns {Promise<any>}
 */
export async function d1Query(queryOrQueries, params = []) {
    if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_DATABASE_ID || !CLOUDFLARE_API_TOKEN) {
        console.error("D1 Connection Error: Environment variables CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_DATABASE_ID, and CLOUDFLARE_API_TOKEN must be set.");
        throw new Error("D1 Database connection parameters are missing. Please check your environment variables.");
    }

    const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${CLOUDFLARE_DATABASE_ID}/query`;

    let body;
    if (Array.isArray(queryOrQueries)) {
        body = JSON.stringify(queryOrQueries);
    } else {
        body = JSON.stringify({
            sql: queryOrQueries,
            params: params
        });
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: body,
            cache: 'no-store'
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            console.error("D1 Query API Error response:", data);
            throw new Error(data.errors?.[0]?.message || 'Failed to query D1 Database.');
        }

        // D1 API returns query results in the `result` array.
        // If it's a batch query, it returns an array of result objects.
        // For a single query, it returns [ { results: [...], success: true, meta: ... } ].
        return data.result;
    } catch (error) {
        console.error("d1Query error:", error);
        throw error;
    }
}

/**
 * Execute a single query and return the rows.
 * @param {string} sql 
 * @param {Array} params 
 * @returns {Promise<Array<any>>}
 */
export async function queryRows(sql, params = []) {
    const result = await d1Query(sql, params);
    return result?.[0]?.results || [];
}

/**
 * Execute a single query and return the first row.
 * @param {string} sql 
 * @param {Array} params 
 * @returns {Promise<any|null>}
 */
export async function queryRow(sql, params = []) {
    const rows = await queryRows(sql, params);
    return rows.length > 0 ? rows[0] : null;
}

/**
 * Run a command (INSERT, UPDATE, DELETE) and return changes info.
 * @param {string} sql 
 * @param {Array} params 
 * @returns {Promise<{changes: number, lastRowId: number}>}
 */
export async function executeCommand(sql, params = []) {
    const result = await d1Query(sql, params);
    const meta = result?.[0]?.meta || {};
    return {
        changes: meta.changes || 0,
        lastRowId: meta.last_row_id || 0
    };
}
