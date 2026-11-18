# Home page image prompts

Paste one prompt into ChatGPT at a time. Every prompt already includes the campaign style. Generate the hero and the phone band in the same conversation so the hillside and the light match.

Do not generate a logo or a portrait. The app already uses the real Bromley mark and George Nayda’s photograph.

Save JPEG files, sRGB, with no text burned into the picture.

## Where each picture sits

The hero is the first screen. On a desktop the photograph is the right column: about 58% of the width and the full viewport height. That frame is nearly square. At 1440×900 the visible area is about 835×900 pixels. At 1920×1080 it is about 1114×1080. A wide 3:2 picture would lose its sides.

On a phone the photograph is a full-width band above the headline. The band is about 4:5, so on a 390-pixel-wide phone it is about 390×488 pixels and the headline still fits on the first screen.

| File | Ask ChatGPT for | Save as | Page crop |
| --- | --- | --- | --- |
| `frontend/public/hero.jpg` | 1:1, 1024×1024 | 2400×2400 | Near-square column, full height |
| `frontend/public/hero-portrait.jpg` | 4:5, 1024×1280 | 1600×2000 | Full-width phone band |
| `frontend/public/hero-detail.jpg` | 1:1, 1024×1024 | 1600×1600 | Optional second photograph |
| `frontend/public/hero-paper.jpg` | 1:1, 1024×1024 | 2000×2000 | Optional paper texture |

If ChatGPT only offers 2:3 for a portrait (1024×1536), use that for the phone band and keep the horizon in the vertical center. The page will crop it to 4:5.

## 1. Hero

Save as `frontend/public/hero.jpg`.

Aspect ratio 1:1. Output 1024×1024 pixels. The page displays this in a near-square column (about 835×900 on a laptop, about 1114×1080 on a desktop) from top to bottom, so keep the villas, the pines, and the horizon inside the center 80% of the square.

```
A square photograph, aspect ratio 1:1, 1024 by 1024 pixels, of the Marbella coast in late afternoon. Pale stone villas step down a green hillside toward a calm blue sea. A few umbrella pines, a quiet empty road, and the Mediterranean in the distance. Clear sky. The villas, pines, and horizon sit in the center of the frame, with open sky above and sea below, so a slight crop still keeps them. Empty of people.

Style: quiet luxury real-estate campaign for Marbella on the Costa del Sol. Editorial photography, natural color, warm late-afternoon light, pale limestone, calm Mediterranean blue, soft shadows, a little haze. Expensive and still, like a page from a high-end property magazine. Shot on a 50mm lens. Not an illustration, not CGI, not HDR, not oversaturated. No text, no letters, no logo, no watermark, no people, no construction cranes.
```

## 2. Phone band

Save as `frontend/public/hero-portrait.jpg`.

Aspect ratio 4:5. Output 1024×1280 pixels. The page shows this full width above the headline, about 390×488 pixels on a phone. Keep the horizon in the upper-middle of the frame so the lower pines are not the only thing left after a small crop.

```
A vertical photograph, aspect ratio 4:5, 1024 by 1280 pixels, of the same Marbella hillside and the same late-afternoon light as the square hero. Mostly sky and calm sea. The tops of pale stone villas and dark umbrella pines sit in the lower half, and the horizon sits in the upper-middle of the frame so it survives a small crop. Empty of people.

Style: quiet luxury real-estate campaign for Marbella on the Costa del Sol. Editorial photography, natural color, warm late-afternoon light, pale limestone, calm Mediterranean blue, soft shadows, a little haze. Expensive and still, like a page from a high-end property magazine. Shot on a 50mm lens. Not an illustration, not CGI, not HDR, not oversaturated. No text, no letters, no logo, no watermark, no people, no construction cranes.
```

## 3. Terrace detail

Save as `frontend/public/hero-detail.jpg`. Optional. Use it only if the page needs a second photograph under the hero.

Aspect ratio 1:1. Output 1024×1024 pixels. Save at 1600×1600.

```
A square photograph, aspect ratio 1:1, 1024 by 1024 pixels, of a modern Marbella terrace in morning light. Pale limestone underfoot, a thin line of pool water across the lower third, one olive tree in a stone planter, and the sea soft beyond a glass balustrade. No furniture, no cushions, no sun loungers. The stone and the water line stay inside the center of the square.

Style: quiet luxury real-estate campaign for Marbella on the Costa del Sol. Editorial photography, natural color, pale limestone, calm Mediterranean blue, soft shadows, a little haze. Expensive and still, like a page from a high-end property magazine. Shot on a 50mm lens. Not an illustration, not CGI, not HDR, not oversaturated. No text, no letters, no logo, no watermark, no people, no construction cranes.
```

## 4. Paper ground

Save as `frontend/public/hero-paper.jpg`. Optional. Use it only if the paper column needs a texture. It tiles, so the edges must match.

Aspect ratio 1:1. Output 1024×1024 pixels. Save at 2000×2000.

```
A seamless square photograph, aspect ratio 1:1, 1024 by 1024 pixels, of warm ivory cotton paper with a faint natural fiber. Even light across the whole frame. No folds, no creases, no shadows, no darker corners. The edges match so the texture can repeat. This is the paper half of a quiet luxury Marbella property campaign: warm off-white, expensive, and still, meant to sit beside photographs of pale limestone and a calm Mediterranean.

Not an illustration, not CGI. No text, no letters, no logo, no watermark.
```
