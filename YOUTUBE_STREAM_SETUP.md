# FlowState FM - YouTube Live Stream Setup Complete

## ✅ Installation Summary

### Files Created

1. **/opt/flowstate/playlist.txt**
   - Concat demuxer format playlist
   - 6 MP4 files (~8 hours of content)
   - Sorted alphabetically

2. **/opt/flowstate/bin/stream_youtube.sh**
   - Main streaming script
   - Permissions: 755 (executable)
   - Owner: monash:monash

3. **/etc/flowstate/stream.env**
   - Environment file with stream key
   - Currently set to: `STREAM_KEY=__SET_ME__`
   - Permissions: 640 (root:root)
   - **SECURE**: Not readable by regular users

4. **/etc/systemd/system/flowstate-live.service**
   - Systemd service unit
   - Status: Enabled (will start on boot)
   - Restart policy: on-failure (no loop when key missing)

### Current Status

```bash
$ sudo systemctl status flowstate-live.service
○ inactive (dead)
  Process exited successfully with message:
  "Stream key not set; service will remain idle."
```

✅ Service is NOT in a restart loop  
✅ Service will survive reboot  
✅ Service is waiting for stream key  

---

## 🔑 When YouTube Stream Key Arrives

### Step 1: Get Your Stream Key from YouTube Studio

1. Go to: https://studio.youtube.com
2. Click "Go Live" or "Create" → "Go Live"
3. Navigate to "Stream" settings
4. Copy your **Stream Key** (starts with xxxx-xxxx-xxxx-xxxx)
5. **Keep this secret!** Never share or commit to git

### Step 2: Set the Stream Key (Securely)

**Option A: Direct Edit (Recommended)**
```bash
sudo nano /etc/flowstate/stream.env
```

Replace `__SET_ME__` with your actual key:
```bash
STREAM_KEY=your-actual-youtube-stream-key-here
```

Save and exit (Ctrl+X, Y, Enter)

**Option B: One-Liner (Advanced)**
```bash
sudo sed -i 's/STREAM_KEY=__SET_ME__/STREAM_KEY=your-actual-key-here/' /etc/flowstate/stream.env
```

### Step 3: Verify the Key is Set

```bash
# Check file (requires sudo)
sudo cat /etc/flowstate/stream.env

# Should show:
# STREAM_KEY=your-actual-key-here
```

### Step 4: Start the Stream

```bash
sudo systemctl restart flowstate-live.service
```

### Step 5: Monitor the Stream

**Check service status:**
```bash
sudo systemctl status flowstate-live.service
```

Should show:
```
● active (running)
Main PID: [some number] (stream_youtube.sh)
```

**Tail logs in real-time:**
```bash
sudo journalctl -u flowstate-live.service -f
```

Expected log messages:
```
[2026-02-12 18:25:00] Starting FlowState FM live stream...
[2026-02-12 18:25:00] Playlist: /opt/flowstate/playlist.txt
[2026-02-12 18:25:00] Streaming to: rtmp://a.rtmp.youtube.com/live2/xxxx-xxxx...
[2026-02-12 18:25:00] Starting playlist cycle...
```

**Stop watching logs:** Press `Ctrl+C`

### Step 6: Verify on YouTube Studio

1. Go to: https://studio.youtube.com/
2. Navigate to "Go Live" or "Stream" section
3. You should see:
   - **Stream Status**: "Live" or "Starting"
   - **Stream Health**: Good (green)
   - **Video Preview**: Your content playing

**Latency**: Expect 5-10 seconds delay from source to preview

---

## 🔧 Troubleshooting

### Stream Won't Start

**Check if key is set:**
```bash
sudo grep STREAM_KEY /etc/flowstate/stream.env
```

**Check service logs:**
```bash
sudo journalctl -u flowstate-live.service -n 50 --no-pager
```

**Check if ffmpeg is running:**
```bash
ps aux | grep ffmpeg
```

### Stream Disconnects / Restarts

**View recent errors:**
```bash
sudo journalctl -u flowstate-live.service -p err -n 20
```

**Common issues:**
- Invalid stream key → Check YouTube Studio for correct key
- Network interruption → Service auto-recovers (RestartSec=5)
- YouTube quota limits → Check YouTube Studio dashboard

### Check Network Bandwidth

```bash
# Install iftop if not present
sudo apt install iftop -y

# Monitor bandwidth (Ctrl+C to exit)
sudo iftop -i $(ip route | grep default | awk '{print $5}')
```

Expect ~4.5 Mbps upload during streaming.

---

## 📊 Service Management Commands

### View Status
```bash
sudo systemctl status flowstate-live.service
```

### Start Stream
```bash
sudo systemctl start flowstate-live.service
```

### Stop Stream
```bash
sudo systemctl stop flowstate-live.service
```

### Restart Stream
```bash
sudo systemctl restart flowstate-live.service
```

### View Logs (Last 50 lines)
```bash
sudo journalctl -u flowstate-live.service -n 50
```

### View Logs (Real-time)
```bash
sudo journalctl -u flowstate-live.service -f
```

### View Logs (Since boot)
```bash
sudo journalctl -u flowstate-live.service -b
```

### Disable Service (Prevent auto-start on boot)
```bash
sudo systemctl disable flowstate-live.service
```

### Re-enable Service
```bash
sudo systemctl enable flowstate-live.service
```

---

## 🎥 FFmpeg Settings Explained

| Setting | Value | Purpose |
|---------|-------|---------|
| `-re` | Real-time | Reads input at native frame rate |
| `-f concat` | Format | Playlist mode (concat demuxer) |
| `-safe 0` | Unsafe paths | Allows absolute paths in playlist |
| `-c:v libx264` | Video codec | H.264 (required by YouTube) |
| `-preset veryfast` | Encoding speed | Fast encoding, good for live |
| `-tune zerolatency` | Optimization | Minimizes buffering delay |
| `-b:v 4500k` | Video bitrate | 4.5 Mbps (good for 720p30) |
| `-maxrate 4500k` | Max bitrate | Enforces CBR-like behavior |
| `-bufsize 9000k` | Buffer size | 2x bitrate (standard) |
| `-pix_fmt yuv420p` | Pixel format | Compatible with most devices |
| `-g 60` | GOP size | Keyframe every 2 seconds @ 30fps |
| `-keyint_min 60` | Min keyframe | Force keyframes regularly |
| `-sc_threshold 0` | Scene change | Disable auto keyframes |
| `-r 30` | Frame rate | 30 FPS output |
| `-c:a aac` | Audio codec | AAC (required by YouTube) |
| `-b:a 160k` | Audio bitrate | 160 kbps stereo |
| `-ar 44100` | Audio sample rate | 44.1 kHz |
| `-ac 2` | Audio channels | Stereo |
| `-f flv` | Output format | Flash Video (RTMP container) |

### Why These Settings?

- **720p @ 30fps @ 4.5 Mbps** = Good quality, reliable delivery
- **Keyframes every 2 seconds** = Fast seeking, reliable streaming
- **CBR-ish bitrate** = Consistent upload bandwidth usage
- **veryfast preset** = Low CPU usage for 24/7 operation
- **zerolatency tune** = Minimal buffering, faster stream start

---

## 🌐 Website Integration (Later)

Once your stream goes live, you'll need to get the YouTube Live Video ID.

### Get the Live Video ID

1. Go to YouTube Studio → "Go Live"
2. Look at the URL: `https://www.youtube.com/watch?v=[VIDEO_ID]`
3. Copy the VIDEO_ID (e.g., `dQw4w9WgXcQ`)

### Update Website Environment

```bash
cd /home/monash/Git/demo-sites/flowstate-fm

# Edit .env.local
nano .env.local
```

Add or update:
```
NEXT_PUBLIC_YOUTUBE_LIVE_URL=https://www.youtube.com/embed/YOUR_VIDEO_ID
```

### Restart Website Dev Server

```bash
npm run dev
```

The YouTube player will now show your live stream on the `/listen` page.

---

## 🔒 Security Notes

1. **/etc/flowstate/stream.env** is readable only by root
2. Service runs as user `monash` (not root)
3. Stream key never appears in process list (loaded as env var)
4. Protected paths prevent unauthorized writes
5. NoNewPrivileges prevents privilege escalation

---

## 📋 Quick Reference

| Action | Command |
|--------|---------|
| Set stream key | `sudo nano /etc/flowstate/stream.env` |
| Start streaming | `sudo systemctl start flowstate-live.service` |
| Stop streaming | `sudo systemctl stop flowstate-live.service` |
| View live logs | `sudo journalctl -u flowstate-live.service -f` |
| Check status | `sudo systemctl status flowstate-live.service` |
| View playlist | `cat /opt/flowstate/playlist.txt` |
| Test script | `/opt/flowstate/bin/stream_youtube.sh` (won't stream without key) |

---

## ✅ Pre-Launch Checklist

Before adding the stream key:

- [x] ffmpeg installed and working
- [x] All 6 MP4 files validated (audio, video, ~8 hrs total)
- [x] Playlist generated with absolute paths
- [x] Streaming script created and executable
- [x] Environment file created with placeholder
- [x] Systemd service enabled (survives reboot)
- [x] Service in idle state (no restart loop)
- [x] Logs showing "Stream key not set" message

After adding the stream key:

- [ ] Stream key set in `/etc/flowstate/stream.env`
- [ ] Service restarted: `sudo systemctl restart flowstate-live.service`
- [ ] Logs showing "Starting FlowState FM live stream..."
- [ ] YouTube Studio showing "Live" status
- [ ] Video preview playing in YouTube Studio
- [ ] Stream health indicator green/good
- [ ] Website env var updated with live video ID
- [ ] Website `/listen` page displaying live embed

---

**Setup by**: Dev (Linux/DevOps)  
**Date**: 2026-02-12  
**System**: Ubuntu 22.04 LTS  
**Status**: ✅ Ready for stream key
