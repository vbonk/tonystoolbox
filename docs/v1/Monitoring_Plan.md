# Monitoring Plan

## Uptime
- Tool: UptimeRobot
- Monitored Pages: Homepage, `/projects`, `/newsfeed`, `/api/track-click`
- Alert threshold: 2 consecutive fails
- Notification: Email + Slack integration

## Error Tracking
- Tool: Sentry (>=9.35.0)
- Captures:
  - Frontend rendering issues
  - API route failures
  - Unexpected auth errors
- Custom tags: `user_role`, `page_slug`, `tool_id`

## Logs
- All affiliate link clicks timestamped + IP hashed
- Fallback logs stored on feed cache
