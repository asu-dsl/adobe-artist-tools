# Adobe Export Tools README

This README provides instructions and details for the Adobe Illustrator and Adobe Photoshop export tools.

## Table of Contents

1. [Overview](#overview)
2. [Illustrator Export Tool](#illustrator-export-tool)
3. [Photoshop Export Tool](#photoshop-export-tool)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Troubleshooting](#troubleshooting)

---

## Overview

These export tools are JavaScript-based extensions designed to streamline the export process in Adobe Illustrator and Adobe Photoshop. They automate repetitive export tasks and provide customizable options to suit various project needs.

## Illustrator Export Tool

**Filename:** `illustrator_export.js`

### Features:

- Automated export of assets to multiple file formats (e.g., PNG, JPG, SVG).
- Customizable export settings for resolution and quality.
- Supports batch processing of multiple artboards.

### Requirements:

- Adobe Illustrator 2020 or later.

### Usage Instructions:

1. Open Adobe Illustrator.
2. Load your project file.
3. Run the `illustrator_export.js` script via the ExtendScript Toolkit or Adobe’s File > Scripts menu.
4. Follow the on-screen prompts to customize export options.

## Photoshop Export Tool

**Filename:** `photoshop_export.js`

### Features:

- Automated export of layers or groups to various formats (e.g., PNG, JPG).
- Option to preserve transparency.
- Batch processing support for large projects.

### Usage Instructions:

1. Open Adobe Photoshop.
2. Load your project file.
3. Run the `photoshop_export.js` script via the File > Scripts menu.
4. Configure export settings
- Note that the unity and project asset folder locations require only the location of the main folder. In addition, folders that don't exist (e.g. a folder unique to the screen) will be automatically created.
- Files exported to unity will automatically have "T_UI_" added

## Installation

1. Copy the `.js` files to the following directory for each application:

   - **Illustrator:** `Adobe Illustrator > Presets > en_US > Scripts`
   - **Photoshop:** `Adobe Photoshop > Presets > Scripts`

2. Restart the respective Adobe application.

## Usage

1. Open the desired Adobe application.
2. Navigate to **File > Scripts**.
3. Select the appropriate export tool script.
4. Follow the prompts to customize and execute the export.
- Note that the unity and project asset folder locations require only the location of the main folder. In addition, folders that don't exist (e.g. a folder unique to the screen) will be automatically created.
- Files exported to unity will automatically have "T_UI_" added
- Exported artboards will all have the same filename, except with their artboard number appended.

## Troubleshooting

- **Script Not Showing in Menu:** Ensure the `.js` files are placed in the correct directory and restart the application.
- **Export Errors:** Check that your project file has valid layers or artboards for export.

For further assistance, please contact Cynthia Baragar or consult Adobe’s documentation for scripting support.
