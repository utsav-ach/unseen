# 🎯 Admin Panel Guide

## Overview
The admin panel is a comprehensive database management interface that allows you to manage all aspects of your Nepal Travel Guide platform.

## Features

### 1. Dashboard Statistics
- Real-time counts for all major tables
- Visual cards for Profiles, Guides, Applications, Bookings, Reviews, and Stories
- Quick overview of platform health

### 2. Table Management (9 Tables)
- **Profiles** - User accounts and information
- **Guides** - Guide listings and details
- **Guide Applications** - Pending guide applications with approve/reject
- **Bookings** - Tourist-Guide bookings
- **Reviews** - Guide reviews and ratings
- **Stories** - User travel stories
- **Story Comments** - Comments on stories
- **Story Likes** - Story likes tracking
- **Guide Service Areas** - Geographic service coverage

### 3. Advanced Features

#### Search & Filter
- Real-time search across all fields
- Instant filtering of results
- Search works on any column value

#### Pagination
- 10 items per page
- Smart pagination controls
- Shows current page and total results

#### CRUD Operations
- **Create** - Add new records with smart form fields
- **Read** - View detailed information in modal
- **Update** - Edit existing records
- **Delete** - Remove records with confirmation

#### Export
- Export filtered data to CSV
- Includes all visible columns
- Timestamped filename

#### Smart Forms
- Text areas for long content (descriptions, bios)
- Dropdowns for enums (role, status)
- Boolean toggles for yes/no fields
- Validation for required fields

### 4. Special Actions

#### Guide Applications
- **Approve** button (✓) - Approve pending applications
- **Reject** button (✗) - Reject applications
- Status updates automatically

#### View Details
- Eye icon to view full record
- Shows all fields including JSON data
- Pretty-printed objects
- Quick edit from view modal

## Getting Started

### Step 1: Make Yourself Admin

Run this in Supabase SQL Editor:

```sql
UPDATE profiles 
SET is_admin = true, 
    role = 'admin',
    is_verified = true
WHERE id IN (
    SELECT id FROM auth.users WHERE email = 'your@email.com'
);
```

Replace `your@email.com` with your actual email.

### Step 2: Access Admin Panel

1. Login to your account
2. Go to: `http://localhost:3000/admin`
3. You should see the admin dashboard

### Step 3: Explore Tables

1. Click on any table button (Profiles, Guides, etc.)
2. Data loads automatically
3. Use search to filter results
4. Click actions to manage records

## Usage Examples

### Adding a New Profile
1. Click "Profiles" table
2. Click "Add New" button
3. Fill in the form:
   - First Name, Last Name
   - Email, Phone
   - Role (tourist/guide/admin)
   - Set verification flags
4. Click "Save"

### Approving Guide Applications
1. Click "Applications" table
2. Find pending applications
3. Click ✓ (green check) to approve
4. Click ✗ (red X) to reject
5. Status updates immediately

### Editing a Booking
1. Click "Bookings" table
2. Find the booking
3. Click Edit icon (pencil)
4. Modify fields:
   - Status (pending/confirmed/completed)
   - Dates, amounts
   - Messages
5. Click "Save"

### Viewing Full Details
1. Click Eye icon on any record
2. See all fields including:
   - JSON data (formatted)
   - Boolean values (Yes/No badges)
   - Timestamps
   - IDs and references
3. Click "Edit" to modify from view

### Exporting Data
1. Select a table
2. Use search to filter (optional)
3. Click "Export" button
4. CSV file downloads automatically
5. Open in Excel or Google Sheets

### Searching Records
1. Type in search box
2. Searches all fields automatically
3. Results update instantly
4. Pagination resets to page 1

## Tips & Best Practices

### Security
- Only give admin access to trusted users
- Regularly review admin actions
- Use view mode before editing
- Always confirm before deleting

### Data Management
- Export data before bulk changes
- Use search to find specific records
- Check related records before deleting
- Verify changes in view modal

### Performance
- Tables load 500 most recent records
- Pagination keeps UI responsive
- Search is client-side (instant)
- Refresh button reloads data

### Workflow
1. **View** - Check data first
2. **Search** - Find what you need
3. **Edit** - Make changes carefully
4. **Export** - Backup important data
5. **Delete** - Remove only when sure

## Keyboard Shortcuts

- **Escape** - Close modals
- **Enter** - Submit forms (when focused)
- **Tab** - Navigate form fields

## Troubleshooting

### Can't Access Admin Panel
- Check if you're logged in
- Verify admin status in database
- Check browser console for errors

### Data Not Loading
- Click "Refresh" button
- Check Supabase connection
- Verify RLS policies allow admin access

### Can't Edit Records
- Check if record exists
- Verify you have admin role
- Look for error messages

### Export Not Working
- Ensure data is loaded
- Check browser download settings
- Try with fewer records

## Database Schema Reference

### Profiles
- User accounts
- Roles: tourist, guide, hotel_owner, admin
- Verification flags

### Guides
- Public guide listings
- Hourly rates, availability
- Average ratings

### Guide Applications
- Application submissions
- Document verification
- Status: pending, approved, rejected

### Bookings
- Tourist-Guide connections
- Date ranges, amounts
- Status tracking

### Reviews
- Guide ratings (1-5 stars)
- Comments and feedback
- Linked to bookings

### Stories
- User travel stories
- Tags, likes, comments
- Archive functionality

## Support

If you encounter issues:
1. Check browser console
2. Verify database connection
3. Review Supabase logs
4. Check RLS policies

---

**Admin Panel URL**: http://localhost:3000/admin

**Made with ❤️ for Unseen Nepal**
