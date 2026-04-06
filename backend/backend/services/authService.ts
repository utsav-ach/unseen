import { SupabaseService } from "../../supabase/supabaseService";
import {
    CompleteUserProfile,
    CompleteUserProfileSchema,
    Profile,
    ProfileSchema
} from "../schemas";

/**
 * AuthService
 * Handles the authentication and profile lifecycle of the user
 * 
 * note: Singleton pattern, no business logic, only CRUD and API methods
 */
class AuthService extends SupabaseService<Profile> {
    constructor() {
        // We use 'profiles' as the base table and ProfileSchema for basic validations
        // casted to any because of optional id in BaseSchema vs BaseEntity
        super('profiles', ProfileSchema as any);
    }

    /**
     * Signup with email and password
     */
    async signUp(email: string, password: string, metadata: any = {}) {
        return this.execute(async () => {
            const { data, error } = await this.supabase.auth.signUp({
                email,
                password,
                options: {
                    data: metadata,
                },
            });
            if (error) throw error;
            return data;
        });
    }

    /**
     * Login with email and password
     */
    async loginWithEmail(email: string, password: string) {
        return this.execute(async () => {
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            return data;
        });
    }

    /**
     * Phone authentication (OTP)
     * This starts the OTP process
     */
    async loginWithPhone(phone: string) {
        return this.execute(async () => {
            const { data, error } = await this.supabase.auth.signInWithOtp({
                phone,
            });
            if (error) throw error;
            return data;
        });
    }

    /**
     * Verify OTP for phone/email login
     */
    async verifyOTP(phone: string, token: string) {
        return this.execute(async () => {
            const { data, error } = await this.supabase.auth.verifyOtp({
                phone,
                token,
                type: 'sms',
            });
            if (error) throw error;
            return data;
        });
    }

    /**
     * OAuth Login (Google, etc.)
     */
    async loginWithOAuth(provider: 'google' | 'facebook' | 'apple') {
        return this.execute(async () => {
            const { data, error } = await this.supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
            return data;
        });
    }

    /**
     * Logout
     */
    async logout() {
        return this.execute(async () => {
            const { error } = await this.supabase.auth.signOut();
            if (error) throw error;
            return null;
        });
    }

    /**
     * Fetch complete profile via RPC
     * This avoids multiple hits and returns guides and service areas if present
     */
    async fetchProfile(userId: string) {
        return this.execute(async () => {
            const data = await this.callRpc<CompleteUserProfile>('get_complete_user_profile', { user_id: userId });
            return data;
        });
    }

    /**
     * Check if a username is already taken
     */
    async checkUsernameAvailability(username: string) {
        return this.execute(async () => {
            const { data, error } = await this.supabase
                .from(this.tablename)
                .select('username')
                .eq('username', username.toLowerCase())
                .maybeSingle();

            if (error) throw error;
            return data === null; // If null, username is available
        });
    }

    /**
     * Upload user avatar to 'profile_pics' bucket
     */
    async uploadAvatar(userId: string, file: File) {
        return this.execute(async () => {
            // Check file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) throw new Error("File size must be less than 10MB");

            // Check mime type
            if (!file.type.startsWith('image/')) throw new Error("Only image files are allowed");

            const fileExt = file.name.split('.').pop();
            const filePath = `${userId}/${Math.random()}.${fileExt}`;

            const { error: uploadError } = await this.supabase.storage
                .from('profile_pics')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true
                });

            if (uploadError) throw uploadError;

            const { data } = this.supabase.storage
                .from('profile_pics')
                .getPublicUrl(filePath);

            return data.publicUrl;
        });
    }

    /**
     * Complete Onboarding
     * Fills the profile details and sets the onboarding_completed flag to true
     */
    async onboarding(userId: string, profileData: any) {
        return this.execute(async () => {
            // Validate that we are not sending anything extra or invalid
            const { data, error } = await this.supabase
                .from(this.tablename)
                .update({
                    ...profileData,
                    onboarding_completed: true,
                    updated_at: new Date().toISOString()
                })
                .eq('id', userId)
                .select();

            if (error) throw error;
            if (!data || data.length === 0) throw new Error("Profile not found for update");

            return data[0] as Profile;
        }, profileData, true);
    }

    /**
     * Get the currently authenticated user session
     */
    async getCurrentUser() {
        return this.execute(async () => {
            const { data: { user }, error } = await this.supabase.auth.getUser();
            if (error) throw error;
            return user;
        });
    }
}

export const authService = new AuthService();
