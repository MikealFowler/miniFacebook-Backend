const express = require('express');
const router = express.Router();
const { allUsers, singleUser, createUser, updateUser,
  allUsersWithPost, createPost, fetchPost, publishPost, deletePost,
  loginUser, allUsersWithPostPublic
} = require('./functions.js');



router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await createUser(name, email, password);
    return res.json({Message: "User Created"})
  } catch (error) {
    console.log("error signing up", error)
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await loginUser(email, password)
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" })
    }
    return res.status(200).json({ message: "Login Worked" })
  } catch (error) {
    console.error(error) 
  }
})

router.get('/user/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await singleUser(id);
    res.json(user)
  } catch (error) {
    console.log("error fetching user", error);
  }
});

router.post('/userupdate', async (req, res) => {
  try {
    const { id, name, email, password } = req.body
    const user = updateUser(id, name, email, password)
    res.json(user)
  } catch (error) {
    console.log("There was an error updating this user")
  }
})

router.get('/allusers', async (req, res) => {
  try {
    const users = await allUsers();
    res.json(users)
  } catch (error) {
    console.log("error fetching all users", error);
  }
});

router.post('/createpost', async (req, res) => {
  try {
    const { id, title, content, } = req.body
    const post = await createPost(id, title, content,)
    res.json(post)
  } catch (error) {
    console.log("Error creating post", error)
  }
})

router.post('/publishpost', async (req, res) => {
  try {
    const { id, postid } = req.body
    const post = await publishPost(id, postid)
    res.json(post)
  } catch (error) {
    console.log("Error publishing post", error)
  }
})

router.get('/usersfeed', async (req, res) => {
  const feed = await allUsersWithPost()
  res.json(feed)
})

router.get('/publicwall', async (req, res ) => {
  const feed = await allUsersWithPostPublic()
  res.json(feed);
})
router.get('/feed', async (req, res) => {
  try {
    const feed = await fetchPost()
    res.json(feed)
  } catch (error) {
    console.log("error fetching all post", error)
  }
})

router.delete('/deletepost', async (req, res) => {
  try {
    const { userId, postId } = req.body
    const post = await deletePost(userId, postId)
    res.json({ message: 'the post has been deleted' })
  } catch (error) {
    console.log("Error deleting post", error)
    return "Error deleting post"
  }
})

module.exports = [router];