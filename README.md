# Back Me Up — Audio Backup Helper

Arm a backup audio track on your phone, listen via the mic, and take over instantly if the main amplifier cuts out.

Nothing is uploaded. Audio stays on your device.

## Live

**https://azzabazza11.github.io/audio-backup-helper/**

## Local

```bash
cd hi
python3 -m http.server 8080
```

Open **http://localhost:8080/** in Chrome. Mic access requires HTTPS in production; localhost is allowed for dev.

## How it works

1. **Load audio folder** — pick the folder of lesson / instruction audio files. Chrome remembers the folder on this phone; fingerprints of each track are stored locally so the next arm is instant.
2. **Select track** — tap the file that is (or will be) playing on the main amp. A green **fp** mark means that track’s fingerprint is already saved.
3. **Back me up** — Press the button to start tracking. The app starts a user-clocked track timer immediately (no local playback), listens to the amp, and matches clips near the expected file time to measure the trail gap. Once locked, the trail can be adjusted live. Tap **Take Over** when you want local playback to begin from the determined amp position minus trail. If the amp stops unexpectedly the app will prompt you.
4. **Trail time** — on the main screen while active: **−** / **+** adjust how far backup trails the amp (0.5 s steps; hold for faster). In manual mode, the trail starts from your preset and updates when the app measures the gap from the amp; you can nudge it after.
5. When the mic hears sound, the app records a clip and scores it with **rare hashes** (common speech hashes are down-weighted) and coverage **among hashes that exist in the file**, plus a **silence-pattern** check. Talking / other audio should show **MISS** with a reason. The real file should show **HIT** by a wide margin. Lock needs **two hits in a row** that **advance with the file clock** (clip time and wall time stay within 1.25 s) plus the hold time. A clip log on screen lists every attempt (Debug).
6. The backup file sits **behind** the amp by the trail delay (`backup = room − trail`). Confirm time is added to the room clock first, then the full trail is subtracted — the file is never skipped forward. If that would be before 0:00, playback stays paused until the trail has elapsed.
7. After lock, the clock shows **amp** and **backup** positions (backup trails by the trail). Take-over jumps to the amp/room position (where it cut out).
8. **Pauses in the lesson do not trigger cutout** while the file also has a pause at that spot. Brief mic blips under ~1.2 s do not reset the quiet timer. After **Keep listening**, the app records a verify clip and pauses cutout until sync is confirmed.
9. Tap **Take Over** to continue from the tracked backup spot. **Stop** pauses the backup speaker but keeps listening: clips are matched in a ±30 s window around that file time (the window also slides forward with the clock) so the amp can be re-locked if it comes back.

Settings (buffer, clip length, match score, and so on) are saved on this phone.

## PWA

Install from Chrome (**Install** / Add to Home screen). Works offline for the app shell. Chrome can remember the last folder; fingerprints stay in IndexedDB on the phone. The audio files themselves are not copied into the app.

## Android

1. Open the Pages URL in **Chrome**
2. Tap **Install** (or menu → Add to Home screen)
3. Stuck on an old build? force-reload or clear site data

Version: **1.6.6**
