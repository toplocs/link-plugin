/**
 * @fileoverview Provides link management functionality using GunDB.
 */

import gun from './gun';

/**
 * Represents the data structure for a link.
 */
export interface LinkData {
    /** Unique identifier for the link */
    id: string;
    /** URL the link points to */
    href: string;
    /** Optional descriptive title for the link */
    title?: string;
}

/**
 * Manages link creation and deletion within a specific instance context.
 * 
 * The Link class provides methods to create and delete links stored in GunDB,
 * organizing them under a specific instance namespace.
 */
export class Link {
    // The instance is the gun node this Link is stored under.
    private instance: string;

    constructor(instance: string) {
        this.instance = instance;
    }

    /**
     * Creates a new link from link data.
     * 
     * @param linkData - Link data containing href and optional title
     * @returns Object containing the created Gun node and link data
     */
    async create(linkData: Partial<LinkData>): Promise<LinkData> {
        const id = linkData.id || crypto.randomUUID();
        
        const data: LinkData = {
            id,
            href: linkData.href!,
            title: linkData.title,
        };

        const node = gun.get(`link-plugin/${id}`).put(data);
        gun.get(this.instance).get('links').set(node);

        return data;
    }

    /**
     * Retrieves a link by its ID.
     * 
     * @param id - The unique identifier of the link to retrieve
     * @returns Promise resolving to the link data or null if not found
     */
    async get(id: string): Promise<LinkData | null> {
        return new Promise((resolve) => {
            gun.get(`link-plugin/${id}`).once((data) => {
                if (data && data.id) {
                    resolve(data as LinkData);
                } else {
                    resolve(null);
                }
            });
        });
    }

    /**
     * Updates an existing link with new data.
     * 
     * @param id - The unique identifier of the link to update
     * @param linkData - Partial link data to update
     * @returns Promise resolving to the updated link data or null if not found
     */
    async update(id: string, linkData: Partial<Omit<LinkData, 'id'>>): Promise<LinkData | null> {
        const existingLink = await this.get(id);
        if (!existingLink) {
            return null;
        }

        const updatedData: LinkData = {
            ...existingLink,
            ...linkData,
            id, // Ensure ID cannot be changed
        };

        gun.get(`link-plugin/${id}`).put(updatedData);
        return updatedData;
    }

    /**
     * Deletes a link by its ID.
     * 
     * @param id - The unique identifier of the link to delete
     * @returns Promise resolving to true when deletion is complete
     */
    async delete(id: string) {
        const node = gun.get(`link-plugin/${id}`);
        gun.get(this.instance).get('links').unset(node);
        
        return true;
    }
}