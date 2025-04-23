# Chart Standards and Guidelines

## Overview
This document outlines the standards and guidelines for creating and maintaining charts in the guy-in-graphs repository. Following these standards ensures consistency, maintainability, and high quality across all visualizations.

## File Structure
```
/guy-in-graphs/
  ├── charts/                    # Chart specifications
  │   ├── style-guide-template.json  # Master template
  │   └── [chart-name].json     # Individual charts
  ├── data/                      # Data files
  │   ├── [dataset].csv         # CSV data
  │   └── [dataset].json        # JSON data
  ├── charts.json               # Chart registry
  └── scripts/                  # Validation scripts
      └── validate-charts.js    # Chart validation
```

## Style Guide Requirements

### 1. Chart Dimensions and Layout
- Width: 800px
- Height: 400px
- Padding: 20px
- Title position: Centered
- Legend position: Top, horizontal

### 2. Typography
- Font family: Helvetica Neue, sans-serif
- Font sizes:
  - Chart title: 20px
  - Axis titles: 14px
  - Axis labels: 12px
  - Legend labels: 12px

### 3. Colors
```javascript
Primary: "#2f4b7c"
Accent: "#f95d6a"
Standard Palette: [
  "#2f4b7c", // Blue
  "#f95d6a", // Coral
  "#ff7c43", // Orange
  "#ffa600", // Yellow
  "#8ac926", // Green
  "#1982c4", // Light Blue
  "#6a4c93", // Purple
  "#52796f"  // Teal
]
```

### 4. Axes Standards
- Always use 5 tick marks
- No grid lines by default
- No decimal places in labels
- Units in parentheses: "Title (units)"
- Tick color: #ddd

### 5. Data Visualization
- Filter out null/undefined values
- Include meaningful callouts for significant points
- Use tooltips for detailed information
- Smooth line transitions
- Clear visual hierarchy

### 6. Callouts Format
```javascript
{
  mark: {
    type: "circle",
    size: 80,
    fill: "white",
    stroke: "#333",
    strokeWidth: 2
  }
}
```

### 7. Registry Requirements
Each chart must be registered in `charts.json` with:
```json
{
  "id": "chart-name",
  "title": "Human Readable Title",
  "description": "Brief description",
  "specPath": "charts/chart-name.json",
  "dataPath": "data/dataset-name.csv",
  "thumbnail": "thumbnails/chart-name.png"
}
```

## Chart Creation Process

1. **Initialize**
   - Start with style-guide-template.json
   - Choose appropriate chart type
   - Set up basic structure

2. **Data Integration**
   - Add data source
   - Configure transformations
   - Handle null values

3. **Visual Configuration**
   - Apply standard dimensions
   - Set up axes with proper units
   - Configure legend
   - Add callouts

4. **Documentation**
   - Register in charts.json
   - Add description
   - Generate thumbnail

5. **Validation**
   - Run validation script
   - Check all standards
   - Test visualization

## Quality Checklist

- [ ] Follows style guide template
- [ ] Uses correct dimensions
- [ ] Proper font usage
- [ ] Clean axes with units
- [ ] Data properly transformed
- [ ] Null values handled
- [ ] Meaningful callouts added
- [ ] Registered in charts.json
- [ ] Has description
- [ ] Has thumbnail
- [ ] Colors are accessible
- [ ] Responsive at standard dimensions

## Running Validation

```bash
# Check all charts
npm run validate-charts

# Check specific chart
npm run validate-charts -- --chart=chart-name
```

## Common Issues and Solutions

1. **Missing Units**
   - Always include units in parentheses
   - Example: "Temperature (°C)"

2. **Overcrowded Legend**
   - Limit to 8 items maximum
   - Use meaningful categories
   - Consider grouping similar items

3. **Poor Callout Placement**
   - Place callouts at significant points
   - Avoid overlapping
   - Include meaningful context

4. **Inconsistent Styling**
   - Always start from template
   - Use standard color palette
   - Follow font hierarchy

## Updates and Maintenance

1. **Adding New Charts**
   - Copy template
   - Follow process above
   - Run validation
   - Update registry

2. **Updating Existing Charts**
   - Maintain style consistency
   - Document changes
   - Re-run validation
   - Update registry if needed

3. **Style Guide Updates**
   - Update template
   - Document changes
   - Update validation
   - Check existing charts 