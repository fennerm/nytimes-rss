import time

import pytest

from nytimes_rss.lib.rss import RSSEntry, RSSFeed, parse_rss


@pytest.fixture
def feed():
    return {
        "bozo": False,
        "entries": [
            {
                "title": "A title",
                "link": "https://fake_url.com/foo.html",
                "summary": "A summary",
                "author": "John Doe, Jane Doe",
                "published_parsed": time.gmtime(0),
                "media_content": [
                    {
                        "height": "151",
                        "medium": "image",
                        "url": "https://fake_url.com/foo.jpg",
                        "width": "151",
                    }
                ],
            }
        ],
        "feed": {
            "title": "NYT > Technology",
            "href": "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
            "status": 200,
            "encoding": "utf-8",
            "version": "rss20",
        },
    }


def test_parse_rss_with_complete_entry(feed):
    expected_result = RSSFeed(
        [
            RSSEntry(
                title="A title",
                summary="A summary",
                authors="John Doe, Jane Doe",
                publish_date="1970-01-01T00:00:00Z",
                thumbnail_url="https://fake_url.com/foo.jpg",
                url="https://fake_url.com/foo.html",
            )
        ]
    )
    assert parse_rss(feed) == expected_result


def test_parse_rss_with_missing_thumbnail_url(feed):
    feed["entries"][0]["media_content"] = []
    expected_result = RSSFeed(
        [
            RSSEntry(
                title="A title",
                summary="A summary",
                authors="John Doe, Jane Doe",
                publish_date="1970-01-01T00:00:00Z",
                thumbnail_url=None,
                url="https://fake_url.com/foo.html",
            )
        ]
    )
    assert parse_rss(feed) == expected_result


def test_parse_rss_with_missing_authors(feed):
    del feed["entries"][0]["author"]
    expected_result = RSSFeed(
        [
            RSSEntry(
                title="A title",
                summary="A summary",
                authors=None,
                publish_date="1970-01-01T00:00:00Z",
                thumbnail_url="https://fake_url.com/foo.jpg",
                url="https://fake_url.com/foo.html",
            )
        ]
    )
    assert parse_rss(feed) == expected_result


def test_parse_rss_with_missing_publish_date(feed):
    del feed["entries"][0]["published_parsed"]
    expected_result = RSSFeed(
        [
            RSSEntry(
                title="A title",
                summary="A summary",
                authors="John Doe, Jane Doe",
                publish_date=None,
                thumbnail_url="https://fake_url.com/foo.jpg",
                url="https://fake_url.com/foo.html",
            )
        ]
    )
    assert parse_rss(feed) == expected_result
