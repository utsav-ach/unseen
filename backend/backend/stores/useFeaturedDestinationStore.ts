import { create } from 'zustand';
import { featuredDestinationService } from '../services/featuredDestinationService';
import { FeaturedDestination, FeaturedDestinationData } from '../schemas';

interface FeaturedDestinationState {
    destinations: FeaturedDestination[];
    currentDestinationDetails: FeaturedDestinationData | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchDestinations: () => Promise<void>;
    fetchDestinationDetails: (id: string) => Promise<void>;
    fetchByTag: (tag: string) => Promise<void>;
    clearCurrentDetails: () => void;
}

export const useFeaturedDestinationStore = create<FeaturedDestinationState>((set) => ({
    destinations: [],
    currentDestinationDetails: null,
    isLoading: false,
    error: null,

    fetchDestinations: async () => {
        set({ isLoading: true, error: null });
        const result = await featuredDestinationService.getFeaturedDestinations();

        if (result.isSuccess && result.data) {
            set({
                destinations: result.data as FeaturedDestination[],
                isLoading: false
            });
        } else {
            set({
                error: (result.backendError as string) || 'Failed to fetch destinations',
                isLoading: false
            });
        }
    },

    fetchDestinationDetails: async (id) => {
        set({ isLoading: true, error: null });
        const result = await featuredDestinationService.getDestinationDetails(id);

        if (result.isSuccess && result.data) {
            set({
                currentDestinationDetails: result.data as FeaturedDestinationData,
                isLoading: false
            });
        } else {
            set({
                error: (result.backendError as string) || 'Failed to fetch destination details',
                isLoading: false
            });
        }
    },

    fetchByTag: async (tag) => {
        set({ isLoading: true, error: null });
        const result = await featuredDestinationService.getByTag(tag);

        if (result.isSuccess && result.data) {
            set({
                destinations: result.data as FeaturedDestination[],
                isLoading: false
            });
        } else {
            set({
                error: (result.backendError as string) || 'Failed to fetch destinations by tag',
                isLoading: false
            });
        }
    },

    clearCurrentDetails: () => set({ currentDestinationDetails: null, error: null }),
}));
