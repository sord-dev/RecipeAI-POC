const users = [{ id: 1, username: 'stef', password: 'test', pantry: [], dislikes: [] }]

class User {
    constructor({ id, username, password, pantry = [], dislikes = [] }) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.pantry = pantry;
        this.dislikes = dislikes;
    }

    static find(userId) {
        let user = users.find(u => u.id == userId) || false;

        if (!user) throw new Error('User not found.');

        return new User({ ...user });
    }

    static findByUsername(username) {
        let user = users.filter(u => u.username == username) || false;

        if (!user.length) throw new Error('User not found.');

        return new User({ ...user[0] });
    }

    updatePantry(type, foodName) {
        let foodIndex = this.pantry.findIndex(f => f.name.toLowerCase() == foodName.toLowerCase())

        switch (type) {
            case 'add':
                if (!foodIndex != -1) return this.pantry[foodIndex].qty++
                else return this.pantry = [...this.pantry, { name: foodName, qty: 1 }]

            case 'removeOne':
                if (foodIndex != -1) {
                    return this.pantry[foodIndex].qty === 1 ? this.pantry = this.pantry.filter(f => f.name.toLowerCase() != foodName.toLowerCase())
                        :
                        this.pantry[foodIndex].qty--
                }

            case 'remove':
                return this.pantry = this.pantry.filter(f => f.name.toLowerCase() != foodName.toLowerCase())

            default:
                return this.pantry
        }
    }
}


module.exports = User;