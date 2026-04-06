import { SupabaseService } from "../../supabase/supabaseService";
import { Profile, ProfileSchema, UserRole } from "../schemas";

class ProfileService extends SupabaseService<Profile> {
    constructor() {
        super('profiles', ProfileSchema as any);
    }

    /**
     * Get profiles by role
     */
    async getByRole(role: UserRole) {
        return this.execute(async () => {
            const { data, error } = await this.supabase
                .from(this.tablename)
                .select('*')
                .eq('role', role);
            if (error) throw error;
            return data as Profile[];
        });
    }

    /**
     * Get verified profiles
     */
    async getVerifiedProfiles() {
        return this.execute(async () => {
            const { data, error } = await this.supabase
                .from(this.tablename)
                .select('*')
                .eq('is_verified', true);
            if (error) throw error;
            return data as Profile[];
        });
    }

    /**
     * Get complete private profile data for the logged in user
     * aggregates comments, likes, stories, bookings, and reviews
     */
    async getMyPrivateData(userId: string) {
        return this.execute(async () => {
            const data = await this.callRpc<any>('get_my_private_profile_data', { target_user_id: userId });
            return data;
        });
    }
}

export const profileService = new ProfileService();
