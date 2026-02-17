# Live Demo Section - Usage Guide

The `LiveDemoSection` component allows you to add interactive HTML demos to any page.

## Basic Usage

```tsx
import { LiveDemoSection } from '@/components/agothe/live-demo-section';

<LiveDemoSection
  title="Live Demo"
  description="Interactive demonstration section"
  htmlContent=""
/>
```

## Example: Adding HTML Content

### Simple Interactive Example

```tsx
<LiveDemoSection
  title="Interactive Demo"
  description="Try clicking the button below"
  htmlContent={`
    <div style="text-align: center; padding: 40px;">
      <h3 style="color: #00f0ff; margin-bottom: 20px;">Interactive Example</h3>
      <button 
        onclick="this.innerHTML = 'Clicked!'; this.style.backgroundColor = '#00f0ff';"
        style="
          background-color: #ff3366;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
        "
      >
        Click Me
      </button>
    </div>
  `}
/>
```

### Example with Animation

```tsx
<LiveDemoSection
  title="Animated Visualization"
  description="Live constraint field monitoring"
  minHeight="600px"
  htmlContent={`
    <style>
      .pulse-dot {
        width: 20px;
        height: 20px;
        background: #00f0ff;
        border-radius: 50%;
        animation: pulse 2s infinite;
        margin: 20px auto;
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.5; }
      }
    </style>
    <div style="text-align: center; padding: 60px;">
      <h3 style="color: #ffffff; margin-bottom: 30px;">Live Monitoring</h3>
      <div class="pulse-dot"></div>
      <p style="color: #64748b; margin-top: 20px;">δ_H: 0.42 (Stable)</p>
    </div>
  `}
/>
```

### Example with External Script

```tsx
<LiveDemoSection
  title="Data Visualization"
  description="Real-time data rendering"
  minHeight="500px"
  htmlContent={`
    <div id="chart-container" style="width: 100%; height: 400px;"></div>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <script>
      const data = [{
        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        y: [10, 15, 13, 17, 19],
        type: 'scatter',
        marker: { color: '#00f0ff' }
      }];
      const layout = {
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        font: { color: '#ffffff' }
      };
      Plotly.newPlot('chart-container', data, layout);
    </script>
  `}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Live Demo"` | Section heading |
| `description` | `string` | `undefined` | Optional description text |
| `htmlContent` | `string` | `""` | HTML/CSS/JS to render |
| `minHeight` | `string` | `"400px"` | Minimum height of demo container |

## Security Note

The component uses `dangerouslySetInnerHTML` to render arbitrary HTML. Only use trusted content or content you control. Never render user-submitted HTML without sanitization.

## Styling

The demo container:
- Uses the `obsidian-glass` class for dark glass styling
- Has padding of `p-6` (24px)
- Inherits the dark theme color scheme
- Links default to teal (`#00f0ff`)
- All text defaults to white

You can override these styles in your HTML content using inline styles or `<style>` tags.
