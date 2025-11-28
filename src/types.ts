// User role constants using const object pattern (compatible with erasableSyntaxOnly)
export const UserRole = {
    ADMIN: 'admin',
    MEMBER: 'member'
} as const;

// Type derived from the const object
export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

// Helper function to get all role values
export const getUserRoles = (): UserRole[] => {
    return Object.values(UserRole);
};

// Helper function to get role display name
export const getRoleDisplayName = (role: UserRole): string => {
    const displayNames: Record<UserRole, string> = {
        [UserRole.ADMIN]: 'Admin',
        [UserRole.MEMBER]: 'Member'
    };
    return displayNames[role];
};
