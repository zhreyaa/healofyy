import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

export default function Forumscreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [reload, setReload] = useState(0);
  const [flaggedPosts, setFlaggedPosts] = useState({});
  const [flag, setFlag] = useState(0);
  const [isFlagged, setIsFlagged] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [reload]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const loginUrl = "http://localhost:9090/api/posts/allPosts";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(loginUrl, config);
      // console.log("Get done", response.data);
      setPosts(response.data.content);

      // Initialize comments and flagged posts state for each post
      const commentsState = {};
      const flaggedState = {};
      response.data.content.forEach((post) => {
        commentsState[post.id] = "";
        flaggedState[post.id] = post.flag; // Assume flag is a boolean value (true if flagged, false otherwise)
      });
      setComments(commentsState);
      setFlaggedPosts(flaggedState);
    } catch (error) {
      console.log("Some error occurred:", error);
    }
  };

  const addComment = async (postId) => {
    try {
      const commentUrl = `http://localhost:9090/api/posts/${postId}/createComment`;
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        commentUrl,
        { body: comments[postId] },
        config
      );
      console.log("Comment added:", response.data);
      // Refresh posts after adding comment
      fetchPosts();
      // Clear comment input for specific post
      setComments({ ...comments, [postId]: "" });
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      const token = localStorage.getItem("token");
      const deleteUrl = `http://localhost:9090/api/posts/${postId}/comments/${commentId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(deleteUrl, config);
      console.log("Comment deleted:", response.data);
      // Refresh posts after deleting comment
      fetchPosts();
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  };

  const handleHome = () => {
    fetchPosts();
    navigation.navigate("Home");
  };

  const handleFlagPost = async (postId) => {
    try {
      alert("Are you sure you want to flag this post?");
      const token = localStorage.getItem("token");
      if (flaggedPosts[postId] == 0) {
        console.log("Post flag off");
        setFlaggedPosts({
          ...flaggedPosts,
          [postId]: true,
        });
        setFlag(1);
      } else {
        console.log("Post flag on");
        setFlaggedPosts({
          ...flaggedPosts,
          [postId]: false,
        });
        setFlag(0);
      }

      const response = await axios.put(
        `http://localhost:9090/api/posts/postflag/${postId}`,
        { params: { flag: flag } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            flag: flag,
          },
        }
      );

      fetchPosts();
    } catch (error) {
      console.error("Error updating post flag:", error);
    }
  };

  return (
    <View style={{ flex: 1, paddingBottom: 0 }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Image
            style={{ width: 100, height: 60, resizeMode: "contain" }}
            source={require("./../assets/healofy.png")}
          />
        </View>

        <View style={styles.container}>
          {posts.map((post) => {
            return post.flag == 0 ? (
              <View key={post.id} style={styles.postContainer}>
                <View style={{ flexDirection: "row", marginTop: 0 }}>
                  <FontAwesome
                    name="user"
                    size={20}
                    color="#124b46"
                    style={{ marginTop: 9, marginRight: 5 }}
                  />
                  <Text style={styles.postUsername}>{post.name}</Text>
                </View>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postDescription}>{post.description}</Text>
                <Text style={styles.postContent}>{post.content}</Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* Add comment button */}
                  <TouchableOpacity>
                    <FontAwesome name="comment-o" size={18} color="#124b46" />
                  </TouchableOpacity>

                  {/* Flag post button */}
                  <TouchableOpacity
                    onPress={() => handleFlagPost(post.id)}
                    style={{ marginLeft: 20 }}
                  >
                    {/* Render flag icon based on flag status */}
                    {flaggedPosts[post.id] == 0 ? (
                      <FontAwesome name="flag" size={20} color="#124b46" />
                    ) : (
                      <FontAwesome name="flag" size={20} color="red" />
                    )}
                  </TouchableOpacity>

                  {/* Display flag count
                                <Text style={{ marginLeft: 5, fontSize: 16, color: "#000000" }}>
                                    {post.flag}
                                </Text> */}
                </View>

                {/* Add comment input */}
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <TextInput
                    value={comments[post.id]}
                    onChangeText={(text) =>
                      setComments({ ...comments, [post.id]: text })
                    }
                    placeholder="Add Comment"
                    multiline
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      paddingTop: 10,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => addComment(post.id)}
                    style={{
                      backgroundColor: "#124b46",
                      paddingHorizontal: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Render comments */}
                {post.comments.map((comment) => (
                  <View
                    key={comment.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ flex: 1 }}>{comment.body}</Text>
                    <TouchableOpacity
                      onPress={() => deleteComment(post.id, comment.id)}
                    >
                      <FontAwesome name="trash" size={20} color="#FF0000" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : null;
          })}
        </View>

        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "#124b46",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
              width: 180,
              alignSelf: "center",
              marginTop: 30,
              marginBottom:20
            }}
            onPress={handleHome}
          >
            <Text style={{ color: "white", alignSelf: "center" }}>Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fab button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate("Createscreen", { reload, setReload })
        }
      >
        <FontAwesome name="plus" size={24} color="#124b46" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  postUsername: {
    marginTop: 10,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    textDecorationLine: "underline",
  },
  postDescription: {
    color: "black",
    fontSize: 18,
  },
  postContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  postTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    // marginBottom: 5,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#124b46",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#88a5a2",
    borderRadius: 30,
    elevation: 8,
  },
});
