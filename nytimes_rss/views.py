from __future__ import annotations

import logging
from dataclasses import asdict

from django.http import HttpRequest
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from nytimes_rss.lib.rss import fetch_rss_feed, parse_rss

LOG = logging.getLogger(__name__)


class NYTimesRSSView(APIView):
    @method_decorator(cache_page(60 * 15))
    def get(self, request: HttpRequest, format: None = None) -> Response:
        """Fetch the NY times RSS feed."""
        raw_feed = fetch_rss_feed("https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml")
        feed = parse_rss(raw_feed)
        return Response(asdict(feed), status=status.HTTP_200_OK)
