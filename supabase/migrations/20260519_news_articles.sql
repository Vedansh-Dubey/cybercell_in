-- Individual news articles table — URL is the dedup key
create table if not exists news_articles (
  id           uuid default gen_random_uuid() primary key,
  url          text unique not null,
  title        text not null,
  excerpt      text default '',
  source       text not null,
  source_slug  text not null,
  published_at date not null,
  category     text not null default 'threat-intel',
  tags         text[] default '{}',
  image_url    text,
  fetched_at   timestamptz default now()
);

create index if not exists news_articles_published_idx
  on news_articles (published_at desc, fetched_at desc);

-- Enable pg_net for edge function HTTP calls from cron
create extension if not exists pg_net with schema extensions;

-- Twice-daily cron: 00:30 UTC (6 AM IST) and 12:30 UTC (6 PM IST)
-- Replace <PROJECT_REF> and <SERVICE_ROLE_KEY> with your actual values
-- or set these up via the Supabase dashboard → Edge Functions → Schedules

-- select cron.schedule(
--   'fetch-news-morning',
--   '30 0 * * *',
--   $$
--     select extensions.net.http_post(
--       url     := 'https://<PROJECT_REF>.supabase.co/functions/v1/fetch-news',
--       headers := jsonb_build_object(
--         'Content-Type',   'application/json',
--         'Authorization',  'Bearer <SERVICE_ROLE_KEY>'
--       ),
--       body    := '{"mode":"fetch"}'::jsonb
--     );
--   $$
-- );

-- select cron.schedule(
--   'fetch-news-evening',
--   '30 12 * * *',
--   $$
--     select extensions.net.http_post(
--       url     := 'https://<PROJECT_REF>.supabase.co/functions/v1/fetch-news',
--       headers := jsonb_build_object(
--         'Content-Type',   'application/json',
--         'Authorization',  'Bearer <SERVICE_ROLE_KEY>'
--       ),
--       body    := '{"mode":"fetch"}'::jsonb
--     );
--   $$
-- );
