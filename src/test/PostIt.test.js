// SPDX-License-Identifier: MIT
const PostIt = artifacts.require('PostIt');
const { expect } = require('chai');
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

contract('PostIt', (accounts) => {
  let postIt;

  beforeEach(async () => {
    postIt = await PostIt.new();
    const userName = web3.utils.utf8ToHex('Alice');
    const profilePicture = web3.utils.utf8ToHex('Qmabcdefg'); // Replace with the IPFS CID of the picture
    await postIt.signUp(userName, profilePicture, { from: accounts[0] });
  });

  it('should allow a user to sign up', async () => {
    const userName = web3.utils.utf8ToHex('Alice');
    const profilePicture = web3.utils.utf8ToHex('Qmabcdefg'); // Replace with the IPFS CID of the picture
    const userCountBefore = await postIt.userCount();
    const result = await postIt.signUp(userName, profilePicture, { from: accounts[0] });
    const userCountAfter = await postIt.userCount();
    expect(userCountAfter).to.be.bignumber.equal(userCountBefore.addn(1));
  });

  it('should create a new post', async () => {
    const contentHash = web3.utils.utf8ToHex('This is my first post');
    const mediaCid = web3.utils.utf8ToHex('Qm123456'); // Replace with the IPFS CID of the media
    const result = await postIt.post(contentHash, mediaCid, { from: accounts[0] });
    const userPosts = await postIt.getUserPosts(accounts[0]);
    expect(userPosts).to.have.lengthOf(1);
    const post = await postIt.getPostById(userPosts[0]);
    expect(post.contentHash).to.equal(contentHash);
    expect(post.mediaCid).to.equal(mediaCid);
    expect(post.tip).to.be.bignumber.equal(new BN(0));
    expect(post.postedBy).to.equal(accounts[0]);
    expectEvent(result, 'PostCreated', {
      id: post.id.toString(),
      postedBy: accounts[0],
    });
  });

  it('should allow a user to tip another user', async () => {
    const contentHash = web3.utils.utf8ToHex('This is a post to tip');
    const mediaCid = web3.utils.utf8ToHex('Qm7890abc'); // Replace with the IPFS CID of the media
    await postIt.post(contentHash, mediaCid, { from: accounts[0], value: web3.utils.toWei('0.1', 'ether') });
    const userPosts = await postIt.getUserPosts(accounts[0]);
    const postId = userPosts[0];

    const tipAmount = web3.utils.toWei('0.1', 'ether');
    const initialBalance = await web3.eth.getBalance(accounts[1]);
    const result = await postIt.tipUser(postId, { from: accounts[1], value: tipAmount });
    const finalBalance = await web3.eth.getBalance(accounts[1]);

    const post = await postIt.getPostById(postId);
    expect(post.tip).to.be.bignumber.equal(new BN(tipAmount));
    expect(finalBalance).to.be.bignumber.equal(new BN(initialBalance).add(new BN(tipAmount)));
  });
});
