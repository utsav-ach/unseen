-- EXTENSIONS & ENUMS
CREATE EXTENSION IF NOT EXISTS pgcrypto;
create extension if not exists postgis;

-- We will call the markdown text as GFM
CREATE DOMAIN GFM AS TEXT;

-- Enums for strict data integrity
CREATE TYPE user_role AS ENUM ('tourist', 'guide', 'hotel_owner', 'admin');
CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE id_type AS ENUM ('citizenship', 'nid', 'license', 'pan');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'reported');
CREATE TYPE application_status AS ENUM ('pending', 'approved', 'rejected');

-- TABLES

-- Profiles: Extends Supabase Auth.users
-- Security: Users cannot change their own 'role', 'is_verified', 'is_guide', or 'is_admin' status.
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name text, -- Used in stories and comments as initial value show the one in auth table then if user wants to edit alloww them 
  middle_name text, -- Used in stories and comments
  last_name text, -- Used in stories and comments in frontend we recommend to show the name from the auth tables as initial loaded names
  username text UNIQUE, -- Used in stories and comments
  phone_number text, -- the local number of the user to contact different then login
  emergency_contact text, -- Whom to contact in case of emergency
  avatar_url text, -- this field is not used in frontend we recommend to show the avatar from the auth tables as initial loaded avatar
  role user_role DEFAULT 'tourist' NOT NULL,
  
  onboarding_completed boolean DEFAULT false NOT NULL,
  preferences text[] DEFAULT '{}',
  home_location geography(POINT, 4326), -- for backend only 
  home_location_name text, -- Added for frontend compatibility

  is_verified boolean DEFAULT false NOT NULL,
  is_guide boolean DEFAULT false NOT NULL,
  is_admin boolean DEFAULT false NOT NULL,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Guide Applications
CREATE TABLE public.guide_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  document_type id_type NOT NULL,
  id_number text NOT NULL,
  id_photo_url text NOT NULL, -- Path to secure storage
  description GFM,
  previous_experience TEXT,
  known_languages jsonb DEFAULT '[]',
  status application_status default 'pending' not null,
  admin_feedback GFM,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Guides: The public listing table
CREATE TABLE public.guides (
  id uuid REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  bio GFM,
  known_languages jsonb DEFAULT '["Nepali"]',
  location text,
  hourly_rate numeric(10, 2),
  is_available boolean DEFAULT false NOT NULL,
  avg_rating numeric(2, 1) DEFAULT 0
);

-- Service Areas
CREATE TABLE public.guide_service_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id uuid REFERENCES public.guides(id) ON DELETE CASCADE NOT NULL,
  location geography(POINT, 4326) NOT NULL,
  radius_meters numeric NOT NULL CHECK (radius_meters > 0),
  location_name text,
  created_at timestamptz DEFAULT now()
);

-- Bookings: The link between Tourist and Guide
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tourist_id uuid REFERENCES public.profiles(id) NOT NULL,
  guide_id uuid REFERENCES public.guides(id) NOT NULL,

  start_date date NOT NULL,
  end_date date NOT NULL,
  
  -- total_amount is calculated as (end_date - start_date) * hourly_rate
  -- total_amount is stored in the database to avoid recalculation and potential floating point issues
  total_amount numeric(10, 2) NOT NULL,

  -- message from tourist to guide about the booking
  -- it can be what the tourist wants to convey to the guide about the booking 
  -- guide looks this and other factors and decides either to pick or reject
  message text,


  status booking_status DEFAULT 'pending' NOT NULL,
  hired_at timestamptz DEFAULT now(),

  destination_location geography(POINT, 4326),
  destination_name text,
  
  is_payment_recieved bool DEFAULT false
);

-- Reviews: Only for completed bookings
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES public.bookings(id) UNIQUE NOT NULL,
  guide_id uuid REFERENCES public.guides(id) NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- USER STORIES SECTION
CREATE TABLE public.stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  uploader_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description GFM NOT NULL,
  tags text[] DEFAULT '{}',
  likes_count integer DEFAULT 0 NOT NULL,
  comments_count integer DEFAULT 0 NOT NULL,
  is_archived boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Story Likes
CREATE TABLE public.story_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(story_id, user_id)
);

-- Story Comments
CREATE TABLE public.story_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- INDEXES
CREATE INDEX idx_guide_service_areas_location ON public.guide_service_areas USING GIST (location);
CREATE INDEX idx_bookings_destination_location ON public.bookings USING GIST (destination_location);
CREATE INDEX idx_bookings_tourist_id ON public.bookings(tourist_id);
CREATE INDEX idx_bookings_guide_id ON public.bookings(guide_id);
CREATE INDEX idx_guide_application_user_id ON public.guide_applications(user_id);
CREATE INDEX idx_reviews_guide_id ON public.reviews(guide_id);
CREATE INDEX idx_stories_uploader_id ON public.stories(uploader_id);
CREATE INDEX idx_stories_is_archived ON public.stories(is_archived);
CREATE INDEX idx_story_likes_story_id ON public.story_likes(story_id);
CREATE INDEX idx_story_comments_story_id ON public.story_comments(story_id);



-- ENABLE RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guide_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guide_service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_comments ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------
-- PROFILES
-- ---------------------------------------------------------
-- Public: All profiles are viewable
CREATE POLICY "Public profiles are viewable" ON public.profiles FOR SELECT USING (true);

-- Basic: Allowing the user to insert their own profile during signup/upsert
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Basic: Allowing the user to update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);


-- SENSITIVE FIELD PROTECTION (Trigger based)
-- This logic ensures users cannot promote themselves or verify themselves.
CREATE OR REPLACE FUNCTION public.prevent_sensitive_profile_update()
RETURNS trigger AS $$
BEGIN
  IF NEW.role <> OLD.role 
     OR NEW.is_verified <> OLD.is_verified 
     OR NEW.is_guide <> OLD.is_guide 
     OR NEW.is_admin <> OLD.is_admin THEN
    RAISE EXCEPTION 'Restricted: You cannot change role, verification status, or admin/guide flags manually';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER block_sensitive_profile_changes
BEFORE UPDATE ON public.profiles
FOR EACH ROW
WHEN (auth.uid() = OLD.id)
EXECUTE FUNCTION public.prevent_sensitive_profile_update();


-- ---------------------------------------------------------
-- GUIDE APPLICATIONS
-- ---------------------------------------------------------
CREATE POLICY "Users view own application" ON public.guide_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users submit application" ON public.guide_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update pending application" ON public.guide_applications FOR UPDATE 
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Admins full access to applications" ON public.guide_applications USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);


-- ---------------------------------------------------------
-- GUIDES (Listing Details)
-- ---------------------------------------------------------
-- Public: Verified guides are public. Unverified ones are private.
CREATE POLICY "Visible verified guides" ON public.guides FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = guides.id AND is_verified = true));

-- Self: Guides can always see their own entry (even if pending)
CREATE POLICY "Guides can see own entry" ON public.guides FOR SELECT USING (auth.uid() = id);

-- Self: Guides can update their own listing
CREATE POLICY "Guides manage own entry" ON public.guides FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);


-- ---------------------------------------------------------
-- GUIDE SERVICE AREAS
-- ---------------------------------------------------------
CREATE POLICY "Service areas are public" ON public.guide_service_areas FOR SELECT USING (true);
CREATE POLICY "Guides manage own areas" ON public.guide_service_areas FOR ALL 
USING (auth.uid() = guide_id)
WITH CHECK (auth.uid() = guide_id);


-- ---------------------------------------------------------
-- BOOKINGS
-- ---------------------------------------------------------
-- Involved: Participants and Admins can view
CREATE POLICY "Involved parties can view bookings" ON public.bookings FOR SELECT 
USING (
  auth.uid() = tourist_id OR 
  auth.uid() = guide_id OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Creation: Tourists can create bookings
CREATE POLICY "Tourists can create bookings" ON public.bookings FOR INSERT 
WITH CHECK (auth.uid() = tourist_id);

-- Management: Participants can update status/dates (e.g. guide confirming or tourist cancelling)
CREATE POLICY "Involved parties can manage bookings" ON public.bookings FOR UPDATE 
USING (auth.uid() = tourist_id OR auth.uid() = guide_id)
WITH CHECK (auth.uid() = tourist_id OR auth.uid() = guide_id);


-- ---------------------------------------------------------
-- REVIEWS
-- ---------------------------------------------------------
CREATE POLICY "Reviews are public" ON public.reviews FOR SELECT USING (true);

-- Restrited: only for confirmed/completed bookings they participated in
CREATE POLICY "Verified review insertion" ON public.reviews FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE id = booking_id 
    AND tourist_id = auth.uid()
    AND status = 'completed'
  )
);

CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE 
USING (EXISTS (SELECT 1 FROM public.bookings WHERE id = booking_id AND tourist_id = auth.uid()));


-- ---------------------------------------------------------
-- STORIES SECTION
-- ---------------------------------------------------------
CREATE POLICY "Stories are viewed by everyone" ON public.stories FOR SELECT USING (true);
CREATE POLICY "Users can create stories" ON public.stories FOR INSERT WITH CHECK (auth.uid() = uploader_id);
CREATE POLICY "Authors manage own stories" ON public.stories FOR ALL USING (auth.uid() = uploader_id);

-- LIKES
CREATE POLICY "Likes are viewed by everyone" ON public.story_likes FOR SELECT USING (true);
CREATE POLICY "Users can like once" ON public.story_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON public.story_likes FOR DELETE USING (auth.uid() = user_id);

-- COMMENTS
CREATE POLICY "Comments are viewed by everyone" ON public.story_comments FOR SELECT USING (true);
CREATE POLICY "Users can post comments" ON public.story_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage own comments" ON public.story_comments FOR ALL USING (auth.uid() = user_id);


-- ---------------------------------------------------------
-- STORAGE (Vault & Profile Pics Buckets)
-- ---------------------------------------------------------
-- (Assumption: Buckets are already created by the trigger or deployment scripts)

-- Profile Pics: Viewable by anyone
CREATE POLICY "Avatar select" ON storage.objects FOR SELECT USING (bucket_id = 'profile_pics');
CREATE POLICY "Avatar manage" ON storage.objects FOR ALL 
USING (bucket_id = 'profile_pics' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Vault (ID Docs): Private
CREATE POLICY "Vault select owner" ON storage.objects FOR SELECT 
USING (bucket_id = 'vault' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Vault select admin" ON storage.objects FOR SELECT 
USING (bucket_id = 'vault' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Vault insert owner" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'vault' AND (storage.foldername(name))[1] = auth.uid()::text);

-- PROFILE CREATION ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, avatar_url, username)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'first_name', 
    new.raw_user_meta_data->>'last_name', 
    new.raw_user_meta_data->>'avatar_url',
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1) || '_' || substr(new.id::text, 1, 4))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql security definer;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- GUIDE APPLICATION HANDLER
CREATE OR REPLACE FUNCTION public.handle_guide_application_update()
RETURNS trigger AS $$
BEGIN
  IF NEW.status = 'approved' THEN
    UPDATE public.profiles 
    SET is_verified = true, 
        role = 'guide'::user_role,
        is_guide = true
    WHERE id = NEW.user_id;

    INSERT INTO public.guides (id, is_available) VALUES (NEW.user_id, true)
    ON CONFLICT (id) DO NOTHING;
  ELSIF NEW.status = 'rejected' THEN
    UPDATE public.profiles SET is_verified = false, is_guide = false WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql security definer;

CREATE TRIGGER on_guide_application_status_change
  AFTER UPDATE OF status ON public.guide_applications
  FOR EACH ROW EXECUTE FUNCTION public.handle_guide_application_update();


-- GUIDE RATING AUTOMATION
CREATE OR REPLACE FUNCTION public.update_guide_rating()
RETURNS trigger AS $$
BEGIN
  UPDATE public.guides
  SET avg_rating = (
    SELECT ROUND(AVG(rating)::numeric, 1)
    FROM public.reviews
    WHERE guide_id = COALESCE(NEW.guide_id, OLD.guide_id)
  )
  WHERE id = COALESCE(NEW.guide_id, OLD.guide_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql security definer;

CREATE TRIGGER on_review_change
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_guide_rating();

-- STORY COUNTS AUTOMATION
CREATE OR REPLACE FUNCTION public.manage_story_counts()
RETURNS trigger AS $$
BEGIN
  IF TG_TABLE_NAME = 'story_likes' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE public.stories SET likes_count = likes_count + 1 WHERE id = NEW.story_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE public.stories SET likes_count = likes_count - 1 WHERE id = OLD.story_id;
    END IF;
  ELSIF TG_TABLE_NAME = 'story_comments' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE public.stories SET comments_count = comments_count + 1 WHERE id = NEW.story_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE public.stories SET comments_count = comments_count - 1 WHERE id = OLD.story_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql security definer;

CREATE TRIGGER on_story_like_change
  AFTER INSERT OR DELETE ON public.story_likes
  FOR EACH ROW EXECUTE FUNCTION public.manage_story_counts();

CREATE TRIGGER on_story_comment_change
  AFTER INSERT OR DELETE ON public.story_comments
  FOR EACH ROW EXECUTE FUNCTION public.manage_story_counts();

/**
Returns THE complete PRIVATE user profile data.
This is used strictly for the "My Profile" page where the user needs 
all their sensitive data, recent interactions, and history in a single fast fetch.
*/
CREATE OR REPLACE FUNCTION public.get_my_private_profile_data(target_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result jsonb;
BEGIN
    -- Security Check: Only the owner can view this info
    IF auth.uid() != target_user_id THEN
        RAISE EXCEPTION 'Unauthorized: You can only view your own private profile data.';
    END IF;

    SELECT jsonb_build_object(
        'profile', (
            SELECT jsonb_build_object(
                'id', p.id,
                'email', (SELECT email FROM auth.users WHERE id = p.id),
                'first_name', p.first_name,
                'middle_name', p.middle_name,
                'last_name', p.last_name,
                'username', p.username,
                'phone_number', p.phone_number,
                'emergency_contact', p.emergency_contact,
                'avatar_url', p.avatar_url,
                'role', p.role,
                'onboarding_completed', p.onboarding_completed,
                'preferences', p.preferences,
                'home_location_name', p.home_location_name,
                'is_verified', p.is_verified,
                'is_guide', p.is_guide,
                'is_admin', p.is_admin,
                'created_at', p.created_at,
                'updated_at', p.updated_at
            )
        ),
        
        -- Last 10 stories created by me
        'recent_stories', (
            SELECT COALESCE(jsonb_agg(s.*), '[]'::jsonb)
            FROM (
                SELECT * FROM public.stories 
                WHERE uploader_id = target_user_id 
                ORDER BY created_at DESC 
                LIMIT 10
            ) s
        ),

        -- Last 10 story likes (with story context)
        'recent_likes', (
            SELECT COALESCE(jsonb_agg(l.*), '[]'::jsonb)
            FROM (
                SELECT sl.*, s.title as story_title
                FROM public.story_likes sl
                JOIN public.stories s ON sl.story_id = s.id
                WHERE sl.user_id = target_user_id
                ORDER BY sl.created_at DESC
                LIMIT 10
            ) l
        ),

        -- Last 10 story comments (with story context)
        'recent_comments', (
            SELECT COALESCE(jsonb_agg(c.*), '[]'::jsonb)
            FROM (
                SELECT sc.*, s.title as story_title
                FROM public.story_comments sc
                JOIN public.stories s ON sc.story_id = s.id
                WHERE sc.user_id = target_user_id
                ORDER BY sc.created_at DESC
                LIMIT 10
            ) c
        ),

        -- Last 10 bookings as a tourist
        'recent_bookings', (
            SELECT COALESCE(jsonb_agg(b.*), '[]'::jsonb)
            FROM (
                SELECT b.*, p.first_name || ' ' || p.last_name as guide_name, p.avatar_url as guide_avatar
                FROM public.bookings b
                JOIN public.profiles p ON b.guide_id = p.id
                WHERE b.tourist_id = target_user_id
                ORDER BY b.hired_at DESC
                LIMIT 10
            ) b
        ),

        -- Last 10 reviews given by me
        'recent_reviews_given', (
            SELECT COALESCE(jsonb_agg(r.*), '[]'::jsonb)
            FROM (
                SELECT r.*, p.first_name || ' ' || p.last_name as guide_name
                FROM public.reviews r
                JOIN public.bookings b ON r.booking_id = b.id
                JOIN public.profiles p ON b.guide_id = p.id
                WHERE b.tourist_id = target_user_id
                ORDER BY r.created_at DESC
                LIMIT 10
            ) r
        )
    ) INTO result
    FROM public.profiles p
    WHERE p.id = target_user_id;

    RETURN result;
END;
$$;


/**
Returns the complete user profile including the guide data and service areas

uf he/she is guide then it will also return guide data and service areas
or else if not then the guide data is null
but the other data will always be there
*/
CREATE OR REPLACE FUNCTION public.get_complete_user_profile(user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result jsonb;
BEGIN
    SELECT jsonb_build_object(
        'id', p.id,
        'created_at', p.created_at,
        'auth_data', (
            SELECT jsonb_build_object(
                'uid', a.id,
                'email', a.email,
                'email_confirmed_at', a.email_confirmed_at,
                'last_sign_in_at', a.last_sign_in_at
            )
            FROM auth.users a
            WHERE a.id = p.id
        ),
        'profile', p.*,
        'guide_data', (
            SELECT to_jsonb(g.*)
            FROM public.guides g
            WHERE g.id = p.id
        ),
        'service_areas', (
            SELECT jsonb_agg(sa.*)
            FROM public.guide_service_areas sa
            WHERE sa.guide_id = p.id
        ),
        'is_onboarding_completed', p.onboarding_completed
    ) INTO result
    FROM public.profiles p
    WHERE p.id = user_id;

    RETURN result;
END;
$$;


-- RPC FUNCTION for handling the processing in the server side and returning the result to the client
CREATE OR REPLACE FUNCTION public.find_guides_for_destination(
  dest_lat float,
  dest_lon float
)
RETURNS TABLE (
  guide_id uuid,
  first_name text,
  last_name text,
  avatar_url text,
  bio GFM,
  hourly_rate numeric,
  avg_rating numeric,
  distance_from_center float
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.first_name,
    p.last_name,
    p.avatar_url,
    g.bio,
    g.hourly_rate,
    g.avg_rating,
    ST_Distance(
      sa.location,
      ST_SetSRID(ST_MakePoint(dest_lon, dest_lat), 4326)::geography
    ) as distance_from_center
  FROM public.guide_service_areas sa
  JOIN public.guides g ON sa.guide_id = g.id
  JOIN public.profiles p ON g.id = p.id
  WHERE
    ST_DWithin(
      sa.location,
      ST_SetSRID(ST_MakePoint(dest_lon, dest_lat), 4326)::geography,
      sa.radius_meters
    )
    AND p.is_verified = true
    AND g.is_available = true
  ORDER BY g.avg_rating DESC, distance_from_center ASC;
END;
$$;


CREATE OR REPLACE VIEW public.minimal_user_info AS
SELECT 
    id, 
    COALESCE(first_name || ' ' || COALESCE(middle_name || ' ', '') || last_name, username) as full_name, 
    username, 
    avatar_url
FROM public.profiles;

CREATE OR REPLACE FUNCTION public.get_full_story_data(target_story_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result jsonb;
BEGIN
    SELECT jsonb_build_object(
        'id', s.id,
        'title', s.title,
        'description', s.description,
        'tags', s.tags,
        'likes_count', s.likes_count,
        'comments_count', s.comments_count,
        'is_archived', s.is_archived,
        'created_at', s.created_at,
        'updated_at', s.updated_at,
        
        -- Author Object
        'author', (
            SELECT jsonb_build_object(
                'id', m.id,
                'name', m.full_name,
                'username', m.username,
                'avatar', m.avatar_url
            )
            FROM public.minimal_user_info m
            WHERE m.id = s.uploader_id
        ),

        -- Top 10 Comments (Still nested objects)
        'comments', (
            SELECT COALESCE(jsonb_agg(comment_node), '[]'::jsonb)
            FROM (
                SELECT jsonb_build_object(
                    'id', sc.id,
                    'content', sc.content,
                    'created_at', sc.created_at,
                    'user', (
                        SELECT jsonb_build_object(
                            'id', mu.id,
                            'name', mu.full_name,
                            'username', mu.username,
                            'avatar', mu.avatar_url
                        )
                        FROM public.minimal_user_info mu
                        WHERE mu.id = sc.user_id
                    )
                ) as comment_node
                FROM public.story_comments sc
                WHERE sc.story_id = s.id
                ORDER BY sc.created_at DESC
                LIMIT 10
            ) sub
        ),

        -- Liked By UUID Array
        'liked_by', (
            SELECT COALESCE(array_agg(user_id), '{}'::uuid[])
            FROM public.story_likes
            WHERE story_id = s.id
        )
    ) INTO result
    FROM public.stories s
    WHERE s.id = target_story_id AND s.is_archived = false;

    RETURN result;
END;
$$;




/**
Used for initial hydration of the guide profile page
then the need data will be granularly requested
*/
CREATE OR REPLACE FUNCTION public.get_full_guide_data(target_guide_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result jsonb;
BEGIN
    SELECT jsonb_build_object(
        -- Profile & Identity
        'id', p.id,
        'full_name', p.first_name || ' ' || COALESCE(p.middle_name || ' ', '') || p.last_name,
        'username', p.username,
        'avatar_url', p.avatar_url,
        'is_verified', p.is_verified,
        
        -- Guide Specifics
        'bio', g.bio,
        'known_languages', g.known_languages,
        'hourly_rate', g.hourly_rate,
        'avg_rating', g.avg_rating,
        'is_available', g.is_available,

        -- Service Areas (PostGIS Geography to GeoJSON)
        'service_areas', (
            SELECT COALESCE(jsonb_agg(jsonb_build_object(
                'id', sa.id,
                'location_name', sa.location_name,
                'radius_meters', sa.radius_meters,
                'coordinates', ST_AsGeoJSON(sa.location)::jsonb->'coordinates'
            )), '[]'::jsonb)
            FROM public.guide_service_areas sa
            WHERE sa.guide_id = g.id
        ),

        -- Reviews with Reviewer Info
        'reviews', (
            SELECT COALESCE(jsonb_agg(review_node), '[]'::jsonb)
            FROM (
                SELECT jsonb_build_object(
                    'id', r.id,
                    'rating', r.rating,
                    'comment', r.comment,
                    'created_at', r.created_at,
                    'reviewer', (
                        SELECT jsonb_build_object(
                            'id', m.id,
                            'name', m.full_name,
                            'username', m.username,
                            'avatar', m.avatar_url
                        )
                        FROM public.minimal_user_info m
                        WHERE m.id = (SELECT tourist_id FROM public.bookings WHERE id = r.booking_id)
                    )
                ) as review_node
                FROM public.reviews r
                WHERE r.guide_id = g.id
                ORDER BY r.created_at DESC
                LIMIT 20 -- Keep the initial load light
            ) sub
        )
    ) INTO result
    FROM public.profiles p
    JOIN public.guides g ON p.id = g.id
    WHERE p.id = target_guide_id;

    RETURN result;
END;
$$;


/**
Get detailed booking information with guide and tourist profiles
*/
CREATE OR REPLACE FUNCTION public.get_detailed_booking(target_booking_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result jsonb;
BEGIN
    SELECT jsonb_build_object(
        'id', b.id,
        'tourist_id', b.tourist_id,
        'guide_id', b.guide_id,
        'status', b.status,
        'start_date', b.start_date,
        'end_date', b.end_date,
        'total_amount', b.total_amount,
        'message', b.message,
        'hired_at', b.hired_at,
        'destination_name', b.destination_name,
        'is_payment_recieved', b.is_payment_recieved,
        
        -- Nested Guide Info
        'guide', (
            SELECT jsonb_build_object(
                'id', m.id,
                'name', m.full_name,
                'username', m.username,
                'avatar', m.avatar_url
            )
            FROM public.minimal_user_info m
            WHERE m.id = b.guide_id
        ),

        -- Nested Tourist Info
        'tourist', (
            SELECT jsonb_build_object(
                'id', m.id,
                'name', m.full_name,
                'username', m.username,
                'avatar', m.avatar_url
            )
            FROM public.minimal_user_info m
            WHERE m.id = b.tourist_id
        )
    ) INTO result
    FROM public.bookings b
    WHERE b.id = target_booking_id;

    RETURN result;
END;
$$;


/**
Get list of bookings for a user by role ('tourist' or 'guide')
*/
CREATE OR REPLACE FUNCTION public.get_user_bookings(target_user_id uuid, user_role text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result jsonb;
BEGIN
    SELECT COALESCE(jsonb_agg(booking_node), '[]'::jsonb) INTO result
    FROM (
        SELECT jsonb_build_object(
            'id', b.id,
            'status', b.status,
            'start_date', b.start_date,
            'end_date', b.end_date,
            'total_amount', b.total_amount,
            'destination_name', b.destination_name,
            'guide', (
                SELECT jsonb_build_object('name', m.full_name, 'avatar', m.avatar_url)
                FROM public.minimal_user_info m WHERE m.id = b.guide_id
            ),
            'tourist', (
                SELECT jsonb_build_object('name', m.full_name, 'avatar', m.avatar_url)
                FROM public.minimal_user_info m WHERE m.id = b.tourist_id
            )
        ) as booking_node
        FROM public.bookings b
        WHERE 
            (user_role = 'tourist' AND b.tourist_id = target_user_id) OR
            (user_role = 'guide' AND b.guide_id = target_user_id)
        ORDER BY b.hired_at DESC
    ) sub;

    RETURN result;
END;
$$;


-- FEATURED DESTINATIONS TABLE
CREATE TABLE public.featured_destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  coordinates geography(POINT, 4326) NOT NULL,
  radius numeric DEFAULT 25 NOT NULL, -- in KM
  rating numeric(2, 1) CHECK (rating >= 1 AND rating <= 5),
  tags text[] DEFAULT '{}',
  description GFM,
  feature_images text[] DEFAULT '{}' CHECK (array_length(feature_images, 1) BETWEEN 1 AND 10),
  created_at timestamptz DEFAULT now()
);

-- Index for geographic queries
CREATE INDEX idx_featured_destinations_location ON public.featured_destinations USING GIST (coordinates);

-- Enable RLS
ALTER TABLE public.featured_destinations ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Featured destinations are public" ON public.featured_destinations FOR SELECT USING (true);

-- Admin-only write access
CREATE POLICY "Admins manage destinations" ON public.featured_destinations FOR ALL 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

/**
Get featured destination data with nearby guides
*/
CREATE OR REPLACE FUNCTION public.get_feature_destination_data(dest_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $
DECLARE
    result jsonb;
    dest_coords geography;
    dest_radius numeric;
BEGIN
    -- Get destination coordinates and radius
    SELECT coordinates, radius INTO dest_coords, dest_radius
    FROM public.featured_destinations
    WHERE id = dest_id;

    IF dest_coords IS NULL THEN
        RETURN NULL;
    END IF;

    SELECT jsonb_build_object(
        'destination', (
            SELECT to_jsonb(fd.*)
            FROM public.featured_destinations fd
            WHERE fd.id = dest_id
        ),
        'nearby_guides', (
            SELECT COALESCE(jsonb_agg(guide_node), '[]'::jsonb)
            FROM (
                SELECT jsonb_build_object(
                    'id', p.id,
                    'first_name', p.first_name,
                    'last_name', p.last_name,
                    'avatar_url', p.avatar_url,
                    'username', p.username,
                    'avg_rating', g.avg_rating,
                    'hourly_rate', g.hourly_rate,
                    'distance_to_center', ST_Distance(sa.location, dest_coords)
                ) as guide_node
                FROM public.guide_service_areas sa
                JOIN public.guides g ON sa.guide_id = g.id
                JOIN public.profiles p ON g.id = p.id
                WHERE 
                    ST_DWithin(sa.location, dest_coords, dest_radius * 1000) -- Convert KM to meters
                    AND p.is_verified = true
                    AND g.is_available = true
                ORDER BY g.avg_rating DESC, ST_Distance(sa.location, dest_coords) ASC
                LIMIT 20
            ) sub
        )
    ) INTO result;

    RETURN result;
END;
$;
