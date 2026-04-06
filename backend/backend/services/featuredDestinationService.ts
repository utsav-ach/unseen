import { SupabaseService } from "../../supabase/supabaseService";
import { FeaturedDestination, FeaturedDestinationSchema, FeaturedDestinationData } from "../schemas";

class FeaturedDestinationService extends SupabaseService<FeaturedDestination> {
    constructor() {
        super('featured_destinations', FeaturedDestinationSchema as any);
    }

    /**
     * Get all featured destinations
     */
    async getFeaturedDestinations() {
        return this.getAll();
    }

    /**
     * Get extensive data for a single destination
     * including nearby guides and detailed info
     */
    async getDestinationDetails(destId: string) {
        return this.execute(async () => {
            const data = await this.callRpc<FeaturedDestinationData>('get_feature_destination_data', { dest_id: destId });
            return data;
        });
    }

    /**
     * Get destinations by tag
     */
    async getByTag(tag: string) {
        return this.execute(async () => {
            const { data, error } = await this.supabase
                .from(this.tablename)
                .select('*')
                .contains('tags', [tag]);
            if (error) throw error;
            return data as FeaturedDestination[];
        });
    }
}

export const featuredDestinationService = new FeaturedDestinationService();
