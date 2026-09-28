/**
 * App identity. Values live in app-identity.json so app.config.ts (loaded by plain Node at
 * build time) and the app share one source. Import the name from here, never hard-code it.
 */
import identity from './app-identity.json';

export const APP_NAME: string = identity.name;
