#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'H. Yi\u011fit G\xfcler'
SITENAME = u'Portu\xe7'
SITEURL = ''

TIMEZONE = 'Europe/Paris'

DEFAULT_LANG = u'tr'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

# Blogroll
LINKS = (
    ('Hipo', 'http://hipolabs.com/'),
)

# Social widget
SOCIAL = (
    ('Twitter', 'https://twitter.com/HYigitGuler/'),
)

DEFAULT_PAGINATION = 5

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

STATIC_PATHS = ['css', 'images', 'extra/CNAME']
EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'},}

GOOGLE_ANALYTICS = "UA-51361525-1"
TWITTER_USERNAME = "hyigitguler"
DISQUS_SITENAME = "portuc"
