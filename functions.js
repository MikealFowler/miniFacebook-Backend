const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function createUser(name, email, password) {
    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        })
        return { message: "User created", user };
    } catch (error) {
        return ("there was an error creating user", error)
    }
};

async function loginUser(email, password) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
                password: password
            }
        })
        return user
    } catch (error) {
        console.error(error)
    }
}

async function singleUser(id) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        return user
    } catch (error) {
        console.log("there was an error fetching a single user", error)
    }
}

async function updateUser(id, name, email, password) {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: name,
                email: email,
                password: password
            }
        })
    } catch (error) {
        console.log('error updating user', error)
    }
}

async function allUsers() {
    try {
        const allUsers = await prisma.user.findMany()
        return allUsers
    } catch (error) {
        console.log("error getting all users", error)
    }

};

async function createPost(id, title, content, authorId) {
    try {
        const user = await singleUser(id)
        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
                authorId: user.id
            }
        })
        return post
    } catch (error) {
        console.log('error creating post', error)
    }
}

async function allUsersWithPost() {
    try {
        const users = await prisma.user.findMany({
            where: {
                posts: {
                    some: {}
                },
            }, include: {
                posts: true
            }
        })
        return users
    } catch (error) {
        console.log("error getting all users with post", error)
    }
}

async function allUsersWithPostPublic() {
    try {
        const users = await prisma.user.findMany({
            where: {
                posts: {
                    some: {
                        published: true
                    }
                }
            }, include: {
                posts: {
                    where: {
                        published: true
                    }
                }
            }
        })
        return users
    } catch (error) {
        console.error(error)
    }

}

async function publishPost(id, postid) {
    try {
        const user = await singleUser(id)
        const post = await prisma.post.update({
            where: {
                id: postid,
                authorId: user.id
            },
            data: {
                published: true
            }
        })
        return post
    } catch (error) {
        console.log("error publishing post", error)
    }
};

async function fetchPost() {
    try {
        const feed = await prisma.post.findMany({
            where: {
                published: true
            }
        })
        return feed
    } catch (error) {
        console.log("error fetching post", error)
    }
}

async function deletePost(userId, postId) {
    try {
        const user = await singleUser(userId)
        if (user) {
            const post = await prisma.post.delete({
                where: {
                    id: postId
                }
            })
            return "Post deleted"
        } else {
            return "wrong User ID"
        }
    } catch (error) {
        console.log("error deleting post", error)
    }
}

async function getPhotos() {
    try {
        const photos = await prisma.pictures.findMany()
        return photos;
    } catch (error) {
        console.log("error getting photos", error)
    }
}

module.exports = {
    allUsers, singleUser, createUser,
    updateUser, allUsersWithPost, createPost,
    fetchPost, publishPost, deletePost, loginUser,
    allUsersWithPostPublic
}
