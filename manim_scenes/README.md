# Manim Animation Pipeline

Generate 3Blue1Brown-quality hook animations for NeuroMathica lessons.

## Prerequisites
- Python 3.7+ with `manim` installed: `pip3 install manim`
- FFmpeg: `brew install ffmpeg`
- No LaTeX needed (use `Text()` instead of `Tex()`)

## Render Commands

```bash
# Render all hooks at 720p:
python3 -m manim render -qm --format webm manim_scenes/hooks.py -a

# Render a single scene:
python3 -m manim render -qm --format webm manim_scenes/hooks.py PlaceValueHook

# Render at 1080p (higher quality, larger files):
python3 -m manim render -qh --format webm manim_scenes/hooks.py -a

# Preview (low quality, fast):
python3 -m manim render -ql --format webm manim_scenes/hooks.py PlaceValueHook
```

## Output
Videos are saved to `media/videos/hooks/720p30/`. Copy to `public/videos/`:
```bash
cp media/videos/hooks/720p30/*.webm public/videos/
```

## Using in Lessons

```tsx
import { VideoHook } from "@/components/lessons/VideoHook";

// In your hook stage:
<VideoHook src="/videos/PlaceValueHook.webm" onComplete={advance} />
```

## Adding New Animations

1. Add a new Scene class to `manim_scenes/hooks.py`
2. Use `self.camera.background_color = "#0f172a"` (matches app theme)
3. Use `Text()` with `font="Arial"` (no LaTeX needed)
4. Keep animations under 6 seconds
5. Use project colors: INDIGO=#818cf8, CYAN=#22d3ee, EMERALD=#34d399, AMBER=#fbbf24

## Style Guide
- Dark background (#0f172a)
- Smooth animations (default Manim easing)
- Color-coded elements matching the lesson's palette
- Text in Arial/system font (no LaTeX dependency)
- 720p WebM format (small files, browser-native)
