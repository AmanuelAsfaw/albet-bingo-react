// src/service-worker.js

import { precacheAndRoute } from 'workbox-precaching';

// This will be replaced by the list of files to precache
precacheAndRoute(self.__WB_MANIFEST);