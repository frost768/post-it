// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract PostIt {
    address owner;
    uint256 public userCount;
    uint256 public postCount;
    
    mapping(address => uint256[]) public  userPosts;
    mapping(uint256 => uint256[]) public postReplies;
    mapping(address => User) public users;
    mapping(uint256 => Post) public posts;

    event UserReplied(uint256 postId, address replier);
    event UserSignedUp(uint256 id, address userAddress);
    event PostCreated(uint256 id, address postedBy);

    struct Post {
        uint256 id;
        bytes32 contentHash;
        bytes32 mediaCid;
        uint256 tip;
        address payable postedBy;
    }

    struct User {
        uint256 id;
        bytes name;
        bytes32 profilePicture;
        bool signedUp;
    }

    modifier isOwner(address ownerAddress) {
        require(ownerAddress == owner, "Only owner of the contract can call this");
        _;
    }

    modifier postMustExist(uint256 id) {
        require(posts[id].id != 0, "Post doesn't exist");
        _;
    }

    modifier userMustExist(address userId) {
        require(users[userId].id != 0, "User doesn't exist");
        _;
    }


    constructor() {
        owner = msg.sender;
    }

    function changeOwner(address newOwner) public 
        isOwner(msg.sender) {
        owner = newOwner;
    }

    function post(bytes32 contentHash, bytes32 mediaCid) 
        userMustExist(msg.sender) external payable {
        postCount++;
        posts[postCount] = Post(postCount, contentHash, mediaCid, 0, payable(msg.sender));
        userPosts[msg.sender].push(postCount);
        emit PostCreated(postCount, msg.sender);
    }
    
    function reply(uint256 postId, bytes32 contentHash, bytes32 mediaCid) external 
        userMustExist(msg.sender) 
        postMustExist(postId) {
        postCount++;
        posts[postCount] = Post(postCount, contentHash, mediaCid, 0, payable(msg.sender));
        userPosts[msg.sender].push(postCount);
        emit PostCreated(postCount, msg.sender);
        postReplies[postId].push(postCount);
        emit UserReplied(postId, msg.sender);
    }

    function signUp(bytes calldata name, bytes32 profilePicture) external {
        require(!users[msg.sender].signedUp, "User must not have an account");
        require(name.length > 0, "User name cannot be empty");
        userCount++;
        users[msg.sender] = User(userCount, name, profilePicture, true);
        emit UserSignedUp(userCount, msg.sender);
    }

    function getPosts(uint256 from, uint256 to) external view returns (Post[] memory _posts) {
        require(to > 0, "''to' must be greater than zero");
        require(from > 0, "''from' must be greater than zero");
        require(to > from, "'from' should be less than 'to'");
        require(to != from, "'from' cannot be equal to 'to'");
        require(to - 1 <= postCount, "'to' cannot be greater than total post count");
        uint256 size = to - from;
        _posts = new Post[](size);
        for (uint256 _from = 0; _from < size; _from++) {
            _posts[_from] = posts[_from + from];
        }
        return _posts;
    }

    function getReplies(uint256 postId) postMustExist(postId) external view returns (Post[] memory _replies) {
        uint256[] memory replyIds = postReplies[postId];
        _replies = new Post[](replyIds.length);
        for (uint256 index = 0; index < replyIds.length; index++) {
             _replies[index] = posts[replyIds[index]];
        }
        return _replies;
    }

    function getUserPosts(address user) external view 
        userMustExist(user) returns (Post[] memory _posts) {
        uint256[] memory postIds = userPosts[user];
        _posts = new Post[](postIds.length);
        for (uint256 i = 0; i < postIds.length; i++) {
            _posts[i] = posts[postIds[i]];
        }
        return _posts;
    }

    function getPostById(uint256 id) external view 
        postMustExist(id) returns (Post memory _post) {
        return posts[id];
    }

    function getUserByAddress(address user) external view
        userMustExist(user) returns (User memory _user) {
        return users[user];
    }

    function getProfile() external
        userMustExist(msg.sender) view returns (User memory _user) {
        return users[msg.sender];
    }

    function getMyPosts() external
        userMustExist(msg.sender) view returns (Post[] memory _userPosts) {
        uint256[] memory postIds = userPosts[msg.sender];
        _userPosts = new Post[](postIds.length);
        for (uint256 i = 0; i < postIds.length; i++) {
            _userPosts[i] = posts[postIds[i]];
        }
        return _userPosts;
    }

    function getUserPostIds(address user) external view
        userMustExist(user) returns (uint256[] memory _postIds) {
        return userPosts[user];
    }

    function tipUser(uint256 postId) external payable
        postMustExist(postId) {
        require(msg.value > 0, "Amount must be greater than zero");
        require(msg.value <= address(this).balance, "Insufficient balance in the contract");
        address payable recipient = posts[postId].postedBy;
        require(msg.sender != recipient, "Cannot tip your own post");
        require(recipient != address(0), "Invalid 'to' address");
        posts[postId].tip += msg.value;
        recipient.transfer(msg.value);
    }
}
