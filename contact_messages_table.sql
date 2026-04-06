-- Contact Messages Table
-- Stores messages sent through contact forms

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  phone text,
  is_read boolean DEFAULT false NOT NULL,
  is_replied boolean DEFAULT false NOT NULL,
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index for faster queries
CREATE INDEX idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_is_read ON public.contact_messages(is_read);
CREATE INDEX idx_contact_messages_email ON public.contact_messages(email);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can view all messages
CREATE POLICY "Admins can view all contact messages" 
ON public.contact_messages FOR SELECT 
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (role = 'admin' OR is_admin = true))
);

-- Policy: Admins can update messages (mark as read, add notes)
CREATE POLICY "Admins can update contact messages" 
ON public.contact_messages FOR UPDATE 
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (role = 'admin' OR is_admin = true))
);

-- Policy: Anyone can insert (send contact message)
CREATE POLICY "Anyone can send contact messages" 
ON public.contact_messages FOR INSERT 
WITH CHECK (true);

-- Policy: Admins can delete messages
CREATE POLICY "Admins can delete contact messages" 
ON public.contact_messages FOR DELETE 
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (role = 'admin' OR is_admin = true))
);

-- Add comment
COMMENT ON TABLE public.contact_messages IS 'Stores contact form submissions from users';
