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

1. **Load audio folder** — pick the folder of lesson / instruction audio files
2. **Select track** — tap the file that is (or will be) playing on the main amp
3. **Back me up** — mic opens and analyses the first ~15 s of the track; status shows **Waiting for audio**
4. When the main amp starts and the mic hears a rough match, sync auto-starts and backup plays silently ~1.5 s behind
5. If the main amp **cuts out**, tap **Take Over** to continue from the synced spot

## PWA

Install from Chrome (**Install** / Add to Home screen). Works offline for the app shell; audio files are loaded from your device each session.

## Android

1. Open the Pages URL in **Chrome**
2. Tap **Install** (or menu → Add to Home screen)
3. Stuck on an old build? force-reload or clear site data

Version: **1.1.0**
