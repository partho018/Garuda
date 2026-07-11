const fs = require('fs');
const path = require('path');

// 1. Load environment variables from .env.local
const envPath = path.join(process.cwd(), '.env.local');
let accountId = '';
let databaseId = '';
let apiToken = '';

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const accountMatch = envContent.match(/CLOUDFLARE_ACCOUNT_ID\s*=\s*(.*)/);
    const databaseMatch = envContent.match(/CLOUDFLARE_DATABASE_ID\s*=\s*(.*)/);
    const tokenMatch = envContent.match(/CLOUDFLARE_API_TOKEN\s*=\s*(.*)/);

    if (accountMatch) accountId = accountMatch[1].trim();
    if (databaseMatch) databaseId = databaseMatch[1].trim();
    if (tokenMatch) apiToken = tokenMatch[1].trim();
}

if (!accountId || !databaseId || !apiToken) {
    console.error("Error: Missing credentials in .env.local");
    process.exit(1);
}

// Helper to execute SQL queries on Cloudflare D1
async function executeD1(queries) {
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(queries)
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
        throw new Error(data.errors?.[0]?.message || 'D1 Query Execution Failed');
    }
    return data.result;
}

// Import posts from posts.js
const { SAMPLE_POSTS, slugify } = require('./posts.js');

const DEFAULT_CONTENT = `Understanding the design lifecycle is paramount to launching successful digital products. During discovery and framing stages, design practitioners often utilize multiple artifacts to communicate functionality, aesthetics, and navigation logic. Among these, mockups and prototypes serve as standard pillars, yet they target completely different objectives and stages of product development.

## 1. Mockups: Visual Design Representation
A mockup is a static design model that showcases the visual aesthetics of a product. It includes color palettes, typography, iconography, and overall branding elements. Mockups are highly useful for obtaining stakeholder alignment on visual style, layouts, and copy content. However, they do not offer any functional interaction.

## 2. Prototypes: Interaction and User Journeys
Unlike mockups, a prototype is interactive. It simulates how a user moves through paths, clicks buttons, and experiences state changes. Prototypes can range from low-fidelity wireframe flows to high-fidelity animations that mimic production-ready frontend environments. Product teams use them to identify UX bugs, perform validation research, and present live demos to developers.

## Conclusion
Knowing when to design a mockup versus when to build a prototype streamlines collaboration between product owners, designers, and engineering teams. Together, they ensure that the design language converts smoothly from early ideas into highly functional web and mobile platforms.`;

async function main() {
    console.log("Starting Cloudflare D1 migration...");

    // Read the schema.sql to initialize tables first
    const schemaSqlPath = path.join(process.cwd(), 'schema.sql');
    const schemaSql = fs.readFileSync(schemaSqlPath, 'utf8');

    // Split schemaSql into statements (rough split, but D1 API supports batch SQL array)
    // Cloudflare D1 query endpoint supports an array of {sql, params} or just raw SQL queries.
    // Let's create the tables first.
    console.log("Initializing database tables...");
    
    // We can run the raw schema.sql using a single execute command.
    // D1 API allows running raw SQL with multiple statements if it's sent as a single string.
    await executeD1({
        sql: schemaSql,
        params: []
    });
    console.log("Database tables initialized successfully!");

    // Prepare batch inserts for all SAMPLE_POSTS
    console.log(`Migrating ${SAMPLE_POSTS.length} blog posts to D1...`);

    const queries = [];
    const now = new Date().toISOString();
    const dateStr = now.split('T')[0];

    // Clear existing posts to prevent duplicates
    queries.push({
        sql: "DELETE FROM blog_posts",
        params: []
    });

    for (const post of SAMPLE_POSTS) {
        const id = `post-${post.id}`;
        const slug = slugify(post.title);
        const categoriesJson = JSON.stringify([post.category]);
        
        queries.push({
            sql: `INSERT INTO blog_posts (
                id, title, slug, category, categories, shortDesc, content, author, 
                date, tags, status, thumbnail, seoTitle, seoDesc, viewCount, 
                scheduledAt, createdAt, updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, '', ?, ?)`,
            params: [
                id,
                post.title,
                slug,
                post.category,
                categoriesJson,
                post.desc,
                DEFAULT_CONTENT,
                'Abdullah Al Noman',
                dateStr,
                post.category.toLowerCase(),
                'published',
                post.image,
                post.title,
                post.desc,
                now,
                now
            ]
        });
    }

    // Execute in batches of 15 queries to avoid payload size issues
    const batchSize = 15;
    for (let i = 0; i < queries.length; i += batchSize) {
        const batch = queries.slice(i, i + batchSize);
        console.log(`Executing batch ${i / batchSize + 1}...`);
        await executeD1(batch);
    }

    console.log("Migration completed successfully!");
}

main().catch(err => {
    console.error("Migration failed:", err);
});
