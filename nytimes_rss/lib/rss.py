"""Fetching and parsing RSS feeds."""
from __future__ import annotations

import time
import logging
from dataclasses import dataclass, field

import feedparser
from feedparser.util import FeedParserDict


LOG = logging.getLogger(__name__)

# Fields which must be defined in an RSS entry. If fields are missing, the entry is skipped.
_REQUIRED_FIELDS = ["title", "link"]

_ISO_DATE_FORMAT = "%Y-%m-%dT%H:%M:%SZ"


class RSSParseError(ValueError):
    pass


class RSSFetchError(RuntimeError):
    pass


@dataclass
class RSSEntry:
    """A single entry from an RSS feed."""

    title: str
    summary: str | None
    url: str
    authors: str | None
    thumbnail_url: str | None
    publish_date: str | None


@dataclass
class RSSFeed:
    """An RSS feed with multiple entries."""

    entries: list[RSSEntry] = field(default_factory=list)


def _is_valid_entry(entry: FeedParserDict) -> bool:
    for key in _REQUIRED_FIELDS:
        if key not in entry:
            return False
    return True


def _parse_publish_date(raw_entry: FeedParserDict) -> str | None:
    raw_date: time.struct_time = raw_entry.get("published_parsed")
    if raw_date is None:
        return None

    parsed = time.strftime(_ISO_DATE_FORMAT, raw_date)
    return parsed


def _parse_thumbnail_url(raw_entry: FeedParserDict) -> str | None:
    try:
        thumbnail_url: str | None = [
            item for item in raw_entry["media_content"] if item["medium"] == "image"
        ][0]["url"]
    except (KeyError, IndexError, TypeError):
        LOG.debug(f"Missing thumbnail in RSS entry: {raw_entry}")
        thumbnail_url = None
    return thumbnail_url


def _parse_rss_entry(raw_entry: FeedParserDict) -> RSSEntry:
    """Construct an RSSEntry object from a raw feedparser dict."""

    entry = RSSEntry(
        title=raw_entry["title"],
        summary=raw_entry.get("summary"),
        url=raw_entry["link"],
        authors=raw_entry.get("author"),
        thumbnail_url=_parse_thumbnail_url(raw_entry),
        publish_date=_parse_publish_date(raw_entry),
    )
    return entry


def parse_rss(raw_feed: FeedParserDict) -> RSSFeed:
    """Construct an RSSFeed object from a raw feedparser dict."""
    feed = RSSFeed()
    entries = []
    for raw_entry in raw_feed["entries"]:
        if not _is_valid_entry(raw_entry):
            LOG.warn(f"Ignoring incomplete RSS entry: {raw_entry}")
            continue

        entries.append(_parse_rss_entry(raw_entry))
    feed.entries = entries
    return feed


def _parse_http_status(raw_feed: FeedParserDict) -> int:
    if "status" not in raw_feed:
        raise RSSParseError(f"Missing status code in response from {raw_feed.get('href')}")
    status: int = raw_feed["status"]
    return status


def fetch_rss_feed(url: str) -> FeedParserDict:
    """Fetch an RSS feed from a URL using feedparser."""
    raw_feed: FeedParserDict = feedparser.parse(url)

    status_code = _parse_http_status(raw_feed)
    if status_code >= 500:
        # Retry 5XX errors once before giving up
        # In a real application we might want to be a bit more thorough with our retry logic, but I
        # figure this should be fine for an MVP.
        time.sleep(1)
        raw_feed = feedparser.parse(url)
        status_code = _parse_http_status(raw_feed)
    if status_code >= 400:
        error_msg = raw_feed.get("feed", {}).get("summary")
        raise RSSFetchError(f"HTTP {status_code} error: {error_msg}")

    return raw_feed
