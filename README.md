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
3. **Back me up** — mic opens immediately while the file is analysed into **speech bursts** (length + loudness shape). Quiet gaps are not part of the fingerprint.
4. Status stays **Waiting for speech** until the mic hears actual talking. Match % is hidden while it is quiet.
5. When speech durations and intensities line up with the file, sync auto-starts. Backup plays silently behind by the buffer delay (up to 30 s).
6. **Pauses in the lesson do not trigger cutout** while the file also has a pause at that spot. Cutout only fires if the mic goes quiet where the file still has speech.
7. Tap **Take Over** to continue from the synced spot.

## Test it without an amp

1. Load a track and tap **Back me up** (allow the mic)
2. Turn the phone speaker up and tap **Simulate main amp** — it plays the same file out loud
3. You should see **Heard: quiet** until speech starts, then a match % and a burst count, then **Listening**
4. Natural pauses in the recording should show **expected pause** / **file pause (cutout ignored)**
5. **Pause simulation** during a spoken section — that should offer take-over, because the file still expects speech

Use headphones only if the mic can still hear the playback; speaker facing the room is closer to a real amp.

## PWA

Install from Chrome (**Install** / Add to Home screen). Works offline for the app shell; audio files are loaded from your device each session.

## Android

1. Open the Pages URL in **Chrome**
2. Tap **Install** (or menu → Add to Home screen)
3. Stuck on an old build? force-reload or clear site data

Version: **1.2.0**
