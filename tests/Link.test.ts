/**
 * @fileoverview Tests for the Link class
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Enhanced mock for Gun.js with proper callback handling
vi.mock('../src/gun', () => {
  const mockNode = {
    put: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    unset: vi.fn().mockReturnThis(),
    once: vi.fn((callback) => {
      // Simulate Gun.js once method by calling the callback with mock data
      if (callback) {
        setTimeout(() => {
          callback({ id: 'test-id', href: 'https://example.com', title: 'Test Link' });
        }, 0);
      }
      return mockNode;
    }),
    get: vi.fn().mockReturnThis(),
  };

  return {
    default: {
      get: vi.fn(() => mockNode),
    },
  };
});

// Mock crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: vi.fn(() => 'test-uuid-123'),
  },
});

// Import after mocking
import { Link, type LinkData } from '../src/services/Link';
import gun from '../src/gun';

describe('Link', () => {
  let link: Link;
  const testInstance = 'test-instance';
  
  // Get the mocked gun to access mock functions
  const mockedGun = vi.mocked(gun);

  beforeEach(() => {
    link = new Link(testInstance);
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create a Link instance with the provided instance', () => {
      const instance = 'my-instance';
      const linkInstance = new Link(instance);

      expect(linkInstance).toBeInstanceOf(Link);
    });
  });

  describe('create', () => {
    it('should create a new link with href only', async () => {
      const linkData: Partial<LinkData> = {
        href: 'https://example.com',
      };

      const result = await link.create(linkData);

      expect(result).toEqual({
        node: expect.any(Object),
        data: {
          id: 'test-uuid-123',
          href: 'https://example.com',
        },
      });
    });

    it('should create a new link with href and title', async () => {
      const linkData: Partial<LinkData> = {
        href: 'https://example.com',
        title: 'Example',
      };

      const result = await link.create(linkData);

      expect(result).toEqual({
        node: expect.any(Object),
        data: {
          id: 'test-uuid-123',
          href: 'https://example.com',
          title: 'Example',
        },
      });
    });
  });

  describe('get', () => {
    it('should call gun.get with correct parameters', async () => {
      const result = await link.get('test-id');
      
      expect(mockedGun.get).toHaveBeenCalledWith('link-plugin/test-id');
      expect(result).toEqual({
        id: 'test-id',
        href: 'https://example.com',
        title: 'Test Link'
      });
    });
  });

  describe('update', () => {
    it('should call gun.get with correct parameters for update', async () => {
      const updateData: Partial<LinkData> = {
        title: 'New Title',
      };

      const result = await link.update('test-id', updateData);
      
      expect(mockedGun.get).toHaveBeenCalledWith('link-plugin/test-id');
      expect(result).toEqual({
        id: 'test-id',
        href: 'https://example.com',
        title: 'New Title'
      });
    });
  });

  describe('delete', () => {
    it('should call gun.get with correct parameters for delete', async () => {
      await link.delete('test-id');
      
      expect(mockedGun.get).toHaveBeenCalled();
    });
  });
});
