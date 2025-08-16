const fs = require('fs');
const path = require('path');
const { db } = require('../firebase/firebase');
//const { post } = require('../routes/postRoutes');


exports.getPostData = async (req, res) => {
  //return posts from firebase
  const resObject = {}; 
  try {
    const snapshot = await db.collection('posts').get();
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    resObject.posts = posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch posts' });
  }

  //return group data from firebase
  try {
    const snapshot = await db.collection('groups').get();
    const groups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    resObject.groups = groups;
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch groups' });
  }

  //return poll options from firebase
  try {
    const snapshot = await db.collection('pollOptions').get();
    const pollOptions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    resObject.pollOptions = pollOptions;
  } catch (error) {
    console.error('Error fetching poll options:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch poll options' });
  }

  //fetch user data from firebase
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    resObject.users = users;
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }

  res.json(resObject );
};
