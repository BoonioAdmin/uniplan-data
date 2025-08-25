# UniPlan Data Files

This repository contains the large JSON data files for the UniPlan application.

## Files

- `university-profiles.json` - Detailed university profiles
- `ucas-comprehensive-v2.4-FINAL-ULTIMATE.json` - UCAS comprehensive data
- `course-details.json` - Detailed course information (138MB)
- `data/opendays-scraped.json` - Open days information

## Usage

These files are loaded by the UniPlan application from:
- Development: Local files
- Production: GitHub raw URLs

## Note

This repository is separate from the main application to avoid Vercel's 100MB file size limit.
