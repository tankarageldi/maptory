# History Map 🌍

An interactive 3D globe that lets you explore world history by clicking
on countries and browsing events by category. Think of it as a visual
time machine for seeing what happened anywhere in the world.

## What This Project Is

This repo powers **History Map**, a visual history explorer built with:

- **Next.js 14**
- **TypeScript**
- **globe.gl**
- **Supabase**
- **shadcn/ui**

The app handles the visualization.\
**This repository is mainly for maintaining the community-driven
database of historical events.**

## How You Can Contribute

You don't need to download or run the project.\
The most valuable contribution is helping populate the **historical
events database**.

### ✅ Submit a CSV file

Open an **Issue** or **Pull Request** with a `.csv` file containing
historical events for any country.

Your CSV must include the following columns:

    id
    country_code
    year          (use negative numbers for BCE)
    title
    description
    category       (war, politics, culture, religion, natural_disaster, economics, social, discovery, etc.)
    created_at
    updated_at

### Example Row

    UUID, USA, 1776, "Declaration of Independence", "The thirteen colonies declared independence from Great Britain.", politics, NOW(), NOW()

### What You Can Add

- Missing historical events for any country\
- Detailed descriptions or improved context\
- Corrections or new categories (when appropriate)

## Why Contribute?

The goal is to build the **largest community-maintained world history
dataset** --- simple, structured, and visual.\
Your contributions help make the globe richer and more accurate for
everyone.

## Future Ideas

- Timeline slider\
- Historical borders\
- Images or maps in event details\
- Multi-language support\
- Mobile version\
- User accounts for favorites

## License

MIT --- feel free to fork, modify, and contribute.
