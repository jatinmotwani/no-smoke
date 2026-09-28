/**
 * Content rules from SPEC §12: source IDs exist, health items carry review fields, en/hi key
 * parity, message length, banned terms. `--release` also fails on draft health items and
 * unreviewed Hindi.
 *
 * Stub: the content schema and the rules arrive in P1.8.
 */
const release = process.argv.includes('--release');

console.log(`content:check${release ? ' --release' : ''}: no content yet (rules arrive in P1.8).`);
