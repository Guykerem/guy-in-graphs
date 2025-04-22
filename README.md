<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Guy in Graphs</title>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      margin: 0;
      padding: 2rem;
      background: #f5f5f5;
      color: #333;
    }

    h1 {
      text-align: center;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      text-align: center;
      font-style: italic;
      margin-bottom: 2rem;
    }

    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: auto;
    }

    .chart-box {
      background: white;
      border-radius: 10px;
      padding: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      transition: transform 0.2s ease;
    }

    .chart-box:hover {
      transform: scale(1.02);
    }

    .chart-title {
      font-weight: bold;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }

    .chart-preview {
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Guy in Graphs</h1>
  <div class="subtitle">Life stories, in neat graphs.</div>

  <div class="gallery">
    <!-- CHART CARD 1 -->
    <div class="chart-box">
      <div class="chart-title">Family Timeline</div>
      <a href="charts/family-timeline.json" target="_blank" class="chart-preview">
        <div id="chart-family"></div>
      </a>
    </div>

    <!-- Add more charts below following this pattern -->
  </div>

  <script>
    vegaEmbed('#chart-family', 'charts/family-timeline.json', {
      actions: false,
      defaultStyle: true
    });
  </script>
</body>
</html>