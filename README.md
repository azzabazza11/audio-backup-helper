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
3. **Back me up** — the first 15–30 s of the file (default 30) is turned into a **peak-hash fingerprint** (mini-Shazam: loud frequency peaks paired across time). The two-row diagram shows file vs heard **envelopes** (height = loudness shape). Heard is shifted onto the file timeline once a clip matches.
4. When the mic hears sound, the app records a **2–8 s clip** (default 4) of unique PCM and matches it against that fingerprint. Talking and other room noise should score low; the same file through the amp should pile votes on one time offset. Hold only advances on a hit. A miss pauses hold, then resets after a short grace. After lock, two quiet **spot-checks** (~1 min apart) confirm the trail, then it rolls.
5. The backup file sits **behind** the amp by the buffer delay (`backup = room − buffer`). Confirm time is added to the room clock first, then the full buffer is subtracted — the file is never skipped forward. If that would be before 0:00, playback stays paused until the buffer has elapsed.
6. After lock, the clock shows the **backup** position. Take-over jumps to the amp/room position (where it cut out).
7. **Pauses in the lesson do not trigger cutout** while the file also has a pause at that spot.
8. Tap **Take Over** to continue from the synced spot.

## Test it without an amp

1. Load a track and tap **Back me up** (allow the mic)
2. Turn the phone speaker up and tap **Simulate main amp** — it plays the same file out loud
3. You should see a clip recording, then a **clip % / peak-hits** line. Talking should stay a miss; the simulated file should hit and then **Listening**
4. Natural pauses in the recording should show **expected pause** / **file pause (cutout ignored)**
5. **Pause simulation** during a spoken section — that should offer take-over, because the file still expects speech

Use headphones only if the mic can still hear the playback; speaker facing the room is closer to a real amp.

## PWA

Install from Chrome (**Install** / Add to Home screen). Works offline for the app shell. Chrome can remember the last folder; fingerprints stay in IndexedDB on the phone. The audio files themselves are not copied into the app.

## Android

1. Open the Pages URL in **Chrome**
2. Tap **Install** (or menu → Add to Home screen)
3. Stuck on an old build? force-reload or clear site data

Version: **1.4.2**
