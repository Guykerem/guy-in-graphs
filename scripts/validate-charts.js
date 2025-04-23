#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Ajv = require('ajv');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option('chart', {
    alias: 'c',
    type: 'string',
    description: 'Validate a specific chart by ID'
  })
  .help()
  .argv;

// Constants
const CHARTS_DIR = path.join(__dirname, '..', 'charts');
const STYLE_GUIDE = require('../charts/style-guide.json');
const CHARTS_INDEX = require('../data/charts.json');

const ajv = new Ajv();

function validateChartDimensions(chart) {
  const issues = [];
  const dimensions = STYLE_GUIDE.style.dimensions;
  
  if (!chart.width || chart.width < dimensions.width.min || chart.width > dimensions.width.max) {
    issues.push(`Width should be between ${dimensions.width.min} and ${dimensions.width.max}`);
  }
  
  if (!chart.height || chart.height < dimensions.height.min || chart.height > dimensions.height.max) {
    issues.push(`Height should be between ${dimensions.height.min} and ${dimensions.height.max}`);
  }
  
  return issues;
}

function validateChartTitle(chart) {
  const issues = [];
  const styleGuideTitle = STYLE_GUIDE.title;
  
  if (!chart.title || typeof chart.title === 'string') {
    issues.push('Title should be an object with proper configuration');
    return issues;
  }
  
  if (chart.title.fontSize !== styleGuideTitle.fontSize) {
    issues.push(`Title fontSize should be ${styleGuideTitle.fontSize}`);
  }
  
  if (chart.title.font !== styleGuideTitle.font) {
    issues.push(`Title font should be ${styleGuideTitle.font}`);
  }
  
  if (chart.title.fontWeight !== styleGuideTitle.fontWeight) {
    issues.push(`Title fontWeight should be ${styleGuideTitle.fontWeight}`);
  }
  
  if (chart.title.anchor !== styleGuideTitle.anchor) {
    issues.push(`Title anchor should be ${styleGuideTitle.anchor}`);
  }
  
  return issues;
}

function validateChartConfig(chart) {
  const issues = [];
  const styleGuideConfig = STYLE_GUIDE.config;
  
  if (!chart.config) {
    issues.push('Missing config object');
    return issues;
  }
  
  // Check axis configuration
  if (!chart.config.axis) {
    issues.push('Missing axis configuration');
  } else {
    const axisConfig = styleGuideConfig.axis;
    Object.entries(axisConfig).forEach(([key, value]) => {
      if (chart.config.axis[key] !== value) {
        issues.push(`Axis ${key} should be ${value}`);
      }
    });
  }
  
  // Check legend configuration
  if (!chart.config.legend) {
    issues.push('Missing legend configuration');
  } else {
    const legendConfig = styleGuideConfig.legend;
    Object.entries(legendConfig).forEach(([key, value]) => {
      if (chart.config.legend[key] !== value) {
        issues.push(`Legend ${key} should be ${value}`);
      }
    });
  }
  
  return issues;
}

function validateChart(chartId) {
  const chartInfo = CHARTS_INDEX.find(c => c.id === chartId);
  if (!chartInfo) {
    console.error(chalk.red(`Chart with ID "${chartId}" not found in charts.json`));
    return false;
  }
  
  const chartPath = path.join(CHARTS_DIR, chartInfo.spec);
  if (!fs.existsSync(chartPath)) {
    console.error(chalk.red(`Chart specification file not found: ${chartPath}`));
    return false;
  }
  
  const chart = require(chartPath);
  const issues = [
    ...validateChartDimensions(chart),
    ...validateChartTitle(chart),
    ...validateChartConfig(chart)
  ];
  
  if (issues.length === 0) {
    console.log(chalk.green(`✓ Chart "${chartId}" passed all style checks`));
    return true;
  } else {
    console.log(chalk.yellow(`⚠ Chart "${chartId}" has style issues:`));
    issues.forEach(issue => {
      console.log(chalk.yellow(`  - ${issue}`));
    });
    return false;
  }
}

async function main() {
  if (argv.chart) {
    validateChart(argv.chart);
  } else {
    let allValid = true;
    for (const chart of CHARTS_INDEX) {
      if (!validateChart(chart.id)) {
        allValid = false;
      }
    }
    
    if (allValid) {
      console.log(chalk.green('\n✓ All charts passed style validation'));
    } else {
      console.log(chalk.yellow('\n⚠ Some charts need style adjustments'));
      process.exit(1);
    }
  }
}

main().catch(error => {
  console.error(chalk.red('Error:', error));
  process.exit(1);
}); 