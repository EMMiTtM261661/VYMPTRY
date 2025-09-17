// 代码生成时间: 2025-09-17 14:12:10
// User model representing a user with roles and permissions
class User {
    constructor(id, username, roles = []) {
        this.id = id;
        this.username = username;
        this.roles = roles; // Roles determine the user's permissions
    }

    // Method to check if the user has a specific permission
    hasPermission(permission) {
        return this.roles.some(role => this.checkRolePermissions(role).includes(permission));
    }

    // Method to check permissions based on roles
    checkRolePermissions(role) {
        const rolePermissions = {
            'admin': ['read', 'write', 'delete'],
            'editor': ['read', 'write'],
            'viewer': ['read']
        };
        return rolePermissions[role] || [];
    }
}

// User Permission Manager class
class UserPermissionManager {
    constructor() {
        this.users = []; // Store all user instances
    }

    // Method to add a new user
    addUser(id, username, roles) {
        const user = new User(id, username, roles);
        this.users.push(user);
        return user;
    }

    // Method to remove a user
    removeUser(id) {
        this.users = this.users.filter(user => user.id !== id);
    }

    // Method to update user roles
    updateUserRoles(id, roles) {
        const user = this.findUserById(id);
        if (user) {
            user.roles = roles;
        } else {
            throw new Error('User not found');
        }
    }

    // Private method to find a user by ID
    findUserById(id) {
        return this.users.find(user => user.id === id);
    }

    // Method to check if a user has a specific permission
    checkPermission(id, permission) {
        const user = this.findUserById(id);
        if (user) {
            return user.hasPermission(permission);
        } else {
            throw new Error('User not found');
        }
    }
}

// Example usage
try {
    const userManager = new UserPermissionManager();
    const user1 = userManager.addUser(1, 'Alice', ['admin']);
    const user2 = userManager.addUser(2, 'Bob', ['viewer']);

    console.log(userManager.checkPermission(1, 'write')); // true, since Alice is an admin
    console.log(userManager.checkPermission(2, 'write')); // false, since Bob is only a viewer

    // Update user roles
    userManager.updateUserRoles(2, ['editor']);
    console.log(userManager.checkPermission(2, 'write')); // true, since Bob is now an editor

    // Remove a user
    userManager.removeUser(1);
    console.log(userManager.checkPermission(1, 'write')); // throws Error: User not found
} catch (error) {
    console.error(error.message);
}