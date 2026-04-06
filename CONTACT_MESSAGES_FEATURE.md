# 📧 Contact Messages Feature

## Overview
The admin panel now includes a complete contact messages management system to handle user inquiries and feedback.

## Database Table

### Table: `contact_messages`

Run this SQL in Supabase to create the table:

```sql
-- See contact_messages_table.sql for full schema
```

**Fields:**
- `id` - UUID primary key
- `name` - Sender's name
- `email` - Sender's email
- `subject` - Message subject (optional)
- `message` - Message content
- `phone` - Phone number (optional)
- `is_read` - Read status (boolean)
- `is_replied` - Reply status (boolean)
- `admin_notes` - Internal admin notes
- `created_at` - Timestamp
- `updated_at` - Timestamp

## Admin Panel Features

### 1. Contact Messages Table
Access via sidebar: **Contact Messages** (cyan mail icon)

### 2. Dashboard Stats
- **Unread Messages** card shows count of unread messages
- Updates in real-time when messages are marked as read/unread

### 3. Message Actions

#### Mark as Read/Unread
- **Unread messages**: Show filled mail icon (cyan)
- **Read messages**: Show outline mail icon (gray)
- Click to toggle read status
- Stats update automatically

#### View Full Message
- Click eye icon to see complete message details
- Shows all fields including:
  - Name, email, phone
  - Subject and full message
  - Read/reply status
  - Admin notes
  - Timestamps

#### Edit Message
- Add admin notes
- Update read/reply status
- Modify any field

#### Delete Message
- Remove messages with confirmation
- Useful for spam or resolved inquiries

### 4. Search & Filter
- Search by name, email, subject, or message content
- Real-time filtering
- Works across all fields

### 5. Export
- Export messages to CSV
- Includes all fields
- Useful for reporting and backup

## Usage Examples

### Viewing New Messages
1. Click "Contact Messages" in sidebar
2. Unread messages show with filled mail icon
3. Click eye icon to read full message
4. Click mail icon to mark as read

### Managing Messages
1. **Read a message**: Click eye icon
2. **Mark as read**: Click filled mail icon
3. **Add notes**: Click edit icon, add admin_notes
4. **Reply**: Mark is_replied as true after responding
5. **Delete spam**: Click trash icon

### Tracking Status
- **Unread Messages** stat card shows pending count
- Filter by is_read status
- Sort by created_at to see newest first

## Integration with Contact Form

### Frontend Contact Form
Create a contact form that submits to the database:

```typescript
const handleSubmit = async (formData) => {
  const { error } = await supabase
    .from('contact_messages')
    .insert([{
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      phone: formData.phone
    }]);
  
  if (!error) {
    alert('Message sent successfully!');
  }
};
```

### Email Notifications (Optional)
Set up Supabase Edge Functions to send email notifications:
- Notify admin when new message arrives
- Auto-reply to user confirming receipt
- Send follow-up emails

## Security

### RLS Policies
- **Anyone can insert** - Public can send messages
- **Admins can view all** - Only admins see messages
- **Admins can update** - Only admins modify messages
- **Admins can delete** - Only admins remove messages

### Data Protection
- Email addresses are protected
- Messages are private
- Only authenticated admins have access

## Best Practices

### Response Workflow
1. Check unread messages daily
2. Mark as read when reviewing
3. Add admin notes for context
4. Reply via email
5. Mark is_replied when done
6. Keep for records or delete

### Organization
- Use admin_notes for internal tracking
- Mark is_replied to track responses
- Export regularly for backup
- Delete spam immediately

### Performance
- Messages load 500 most recent
- Pagination keeps UI responsive
- Search is instant (client-side)
- Stats update on every action

## Access

**Admin Panel URL**: http://localhost:3001/admin

**Contact Messages**: Click "Contact Messages" in sidebar

---

**Status**: ✅ Fully functional and ready to use!
