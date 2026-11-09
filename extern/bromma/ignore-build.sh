#!/bin/sh
# Vercel ignoreCommand: exit 0 = hoppa över bygget, exit 1 = bygg.
# Flyttat hit från vercel.json eftersom Vercel max tillåter 256 tecken där.
[ -n "$VERCEL_GIT_PREVIOUS_SHA" ] && git diff --quiet "$VERCEL_GIT_PREVIOUS_SHA" HEAD -- \
  '.' \
  '../../web/app/(demo)/_mall' \
  '../../web/app/(demo)/bromma' \
  '../../web/app/(demo)/gdmaleri/_gd.js' \
  '../../web/public/bromma' \
  '../../web/app/typsnitt' \
  '../../web/app/komponenter' \
  '../../web/app/formular.js' \
  '../../bahkobyra/cloud/brommatradgardsservice'
