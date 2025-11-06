# 🌍 History Map - Design Document

**Version:** 1.0  
**Last Updated:** November 2025  
**Project Status:** Active Development

---

## 📋 Project Overview

An interactive 3D globe application for exploring world history through time. Users can click on any country, select different time periods, and discover historical events from 1000 CE to present day.

**Target Audience:** Students, history enthusiasts, educators, and anyone curious about world history.

---

## ✅ What We've Built So Far (Version 1.0)

### 1. **Interactive 3D Globe**

- Smooth, rotating Earth that you can spin with your mouse
- Click on any country to select it
- Countries light up gold when you hover over them
- Countries lift up slightly on hover for a nice visual effect
- Automatic zoom-in animation when clicking a country
- Each country has a unique color (same country always same color)

### 2. **Timeline Selector (Top Left)**

- Clean, minimal design in white box
- Slider to drag through years 1000-2025 CE
- Text input to type a specific year
- Quick jump buttons (1000, 1500, 2000)
- Shows the era name (Medieval, Early Modern, etc.)

### 3. **Country Info Panel (Below Timeline)**

- Shows selected country name and code
- Displays the selected year
- Placeholder for country flag (will be added from database)
- "Explore History" button (will open detailed view)
- Only appears when a country is selected

### 4. **Database Setup (Supabase)**

- Countries table with country names, codes, and coordinates
- Events table for storing historical events with:
  - Title, description, year, date
  - Category (war, culture, politics, etc.)
  - Image and video URLs
- Connected to the app and ready to use

### 5. **Performance Optimizations**

- Used simplified geographic data for fast 3D rendering
- Smooth animations throughout the app
- No lag when spinning or zooming the globe

---

## 🎯 Future Plans

### **Version 2.0 - Rich Historical Content**

#### 1. **Dynamic Historical Borders**

- Country borders change based on the year selected
- Show historical empires and territories (Ottoman Empire, USSR, etc.)
- Smooth transitions when changing years

#### 2. **Country History Drawer**

- Open a side panel when clicking "Explore History"
- Organized into sections:
  - **War** - Battles, conflicts, military events
  - **Revolution** - Uprisings, political changes
  - **Discovery** - Scientific breakthroughs, explorations
  - **Natural Disaster** - Earthquakes, floods, famines
  - **Politics** - Government changes, elections, laws
  - **Social Changes** - Rights movements, cultural shifts
  - **Economics** - Trade, currency, economic events
  - **Culture** - Art, literature, music, architecture

#### 3. **Rich Media Content**

- Display relevant images for each event
- Embed related videos
- Show historical quotes from important figures
- Link related events together

#### 4. **Country Flags**

- Add historical flags to database
- Show correct flag for the selected time period
- Display in country info panel

#### 5. **Most Popular Tab (Right Side)**

- Show what countries and years other users are exploring
- Real-time updates of trending historical topics
- Click to jump to popular selections

---

### **Version 2.5 - Multi-Country Features**

#### 1. **Compare Multiple Countries**

- Select 2-10 countries at once
- See their events side-by-side
- Compare what was happening simultaneously in different parts of the world

#### 2. **International Relations View**

- Show connections between countries (wars, alliances, treaties)
- Visual lines connecting related countries
- Read about relationships between nations

#### 3. **Full Country History**

- Read a country's complete history from start to present
- Organized like a book with chapters
- Timeline view of all major events

#### 4. **List View Option**

- Alternative to globe view
- Browse countries in a grid/list format
- Easier for finding specific countries quickly
- Search and filter functionality

---

### **Version 3.0 - User Features & Premium**

#### 1. **User Accounts & Dashboard**

- Sign up / log in with Google or email
- Personal dashboard showing:
  - Recently viewed countries
  - Favorite countries and events
  - Custom collections (create your own history topics)
  - Learning progress and achievements

#### 2. **Favorites System**

- Save interesting countries
- Bookmark historical events
- Create collections (e.g., "World War II Events" or "Ancient Civilizations")
- Share collections with others

#### 3. **Monetization (Premium Subscription)**

**Free Tier:**

- View one country at a time
- Basic historical events
- Limited images/videos

**Premium Tier ($5/month):**

- Compare multiple countries
- Full media access (all images and videos)
- International relations view
- Export and print features
- No ads
- Priority support

#### 4. **User-Submitted Content**

- Users can submit historical events
- AI fact-checks submissions for accuracy
- Approved content gets added to database
- Creates a community-driven history platform
- Consider automating approval process with n8n workflow

---

### **Version 4.0 - Mobile & Polish**

#### 1. **iOS App**

- Native mobile app version
- Simplified interface for smaller screens
- Touch gestures for globe interaction
- Offline mode for saved content

#### 2. **Improved Landing Page**

- Beautiful homepage explaining the project
- Example showcases of cool historical connections
- User testimonials
- Clear call-to-action for signup

#### 3. **Enhanced UI/UX**

- More engaging animations
- Better onboarding for new users
- Tutorial mode
- Accessibility improvements

---

## 🛠️ Technical Stack (For Reference)

**Frontend:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui  
**3D Graphics:** globe.gl, Three.js  
**Database:** Supabase  
**Deployment:** Vercel (planned)

---

## 📝 Notes

- Keep the design minimal and focused on content
- Performance is critical - globe must be smooth
- Make learning history fun and engaging
- Build community features to encourage exploration
- Consider educational partnerships for content

<!-- ---

## 🎯 Success Metrics

- User engagement time
- Number of countries explored per session
- Popular historical periods
- Conversion rate to premium
- User-submitted content quality
- Mobile app downloads

--- -->

<!-- ## 📅 Development Timeline

**Q4 2025:**

- Complete v1.0 features
- Populate database with initial historical events
- Launch MVP

**Q1-Q2 2026:**

- Version 2.0 - Rich historical content
- Historical borders implementation
- Media integration

**Q3 2026:**

- Version 2.5 - Multi-country features
- International relations view

**Q4 2026 - Q1 2027:**

- Version 3.0 - User features & monetization
- Premium subscription launch

**2027+:**

- Mobile app development
- Continued content expansion
- Community features

---

**Next Steps:**

1. Populate database with historical events
2. Design and implement the history drawer
3. Add flag images to database
4. Build the most popular tab
5. Set up user authentication system -->
