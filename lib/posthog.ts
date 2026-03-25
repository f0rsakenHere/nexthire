import { PostHog } from 'posthog-node'

/**
 * Creates a new PostHog Node client instance.
 * Always call `await posthog.shutdown()` after capturing events in a request.
 */
export function createPostHogClient(): PostHog {
    return new PostHog(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    })
}
