import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { shuffle } from 'lodash'; // Import shuffle function from lodash
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ data }) {

const fetchUserDetails = async () => {
  try {
      // Retrieve username from local storage
      const username = localStorage.getItem('username');
      
      // Retrieve JWT token from local storage
      const token = localStorage.getItem('token');
      const apiUrl = `http://localhost:9090/api/user/${username}`;
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      };
      // Make the GET request to fetch user details
      const response = await axios.get(apiUrl, config);
     
      // Update state with the patient ID
      // console.log(response.data.id);
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('email', response.data.email);
      // console.log(response.data.email)
  } catch (error) {
      console.error('Error fetching user details:', error);
  }
};


const fetchPatientDetails = async () => {
  try {
      // Retrieve username from local storage
      const username = localStorage.getItem('username');
      
      // Retrieve JWT token from local storage
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      const apiUrl = `http://localhost:9090/api/patient/email/${email}`;
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      };
      // Make the GET request to fetch user details
      const response = await axios.get(apiUrl, config);
     
      // Update state with the patient ID
      // console.log(response.data.id);
      localStorage.setItem('pid', response.data.id);
      // console.log(response.data.id)
  } catch (error) {
      console.error('Error fetching user details:', error);
  }
};


  const [shuffledBlogPosts, setShuffledBlogPosts] = useState([]);
  const [shuffledPodcastLinks, setShuffledPodcastLinks] = useState([]);
  const [shuffledJokeImages, setShuffledJokeImages] = useState([]);
  // Sample data for the horizontal scrolling sections
  const imageUrls = [
    { id: 1, url: 'https://th.bing.com/th/id/OIP.t88O5s6_7pKSTNwzPnJo9AHaHv?w=150&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
    { id: 2, url: 'https://th.bing.com/th/id/OIP.ZKH1j1mUZn8wDWXi7zceAQAAAA?w=176&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
    { id: 3, url: 'https://th.bing.com/th/id/OIP.An0SYrEFWyKG04pcbIiPmQAAAA?pid=ImgDet&w=167&h=200&c=7&dpr=1.3' },
    { id: 4, url: 'https://th.bing.com/th/id/OIP.dyv4IutPICZxPAvfFT2WQAAAAA?pid=ImgDet&w=203&h=188&c=7&dpr=1.3' },
    { id: 5, url: 'https://th.bing.com/th/id/OIP.-V_EtXeEQX7i2eZiTCXqggHaKW?pid=ImgDet&w=202&h=283&c=7&dpr=1.3' },
    {id: 6, url: 'https://i.pinimg.com/originals/24/33/a2/2433a2b9f845c684b6be3966c5114363.jpg'},
    {id: 7, url: 'https://i.pinimg.com/474x/b0/72/81/b07281c0ae4c62b541dd1f8b87c13eb5.jpg'},
    { id: 8, url: 'https://i.pinimg.com/736x/66/4b/3c/664b3c6cec623b377c8a8f30ce09b00f.jpg' },
    { id: 9, url: 'https://i.pinimg.com/736x/20/86/0d/20860d0515fb8272df2f374f70fe0a4c.jpg' },
    {id: 10, url: 'https://i.pinimg.com/736x/e2/2d/9c/e22d9c4385362b95185a40fa65f85923.jpg'},
    { id: 11, url: 'https://themindsjournal.com/wp-content/uploads/2021/11/Funny-Quotes-About-Work-Stress-quoteone-400x400.jpg' },
    { id: 12, url: 'https://www.splashlearn.com/blog/wp-content/uploads/2023/08/funny-subject-wise-jokes-that-teachers-can-use-in-the-classroom-1024x1024.jpeg' },
    { id: 13, url: 'https://themindsjournal.com/wp-content/uploads/2021/11/Funny-Quotes-About-Work-Stress-quoteone-unknown.jpg' },
    { id: 14, url: 'https://pbs.twimg.com/media/DTwukznXUAAcWTh.jpg' },
    { id: 15, url: 'https://i.pinimg.com/736x/5a/21/be/5a21bee8e28dd27b4823a0af9a6f432a.jpg' }
  ];

  const blogPosts = [
    // { id: 1, title: 'How to Be Present in the Moment', image: 'https://www.developgoodhabits.com/wp-content/uploads/2020/05/be-present-in-moment.jpg', link:'https://www.developgoodhabits.com/be-present/'},
    { id: 2, title: 'Seemingly Rare and Unique Anxiety System', image: 'https://images.cordial.com/305/260x260/If-you_ve-lost-someone-to-suicide.png' , link:'https://themighty.com/topic/anxiety/uncommon-weird-anxiety-symptoms/'},
    { id: 3, title: 'Symptoms of Anxiety and their Treatment', image: 'https://images.cordial.com/305/260x260/how-to-support-someone-who-is-suicial.png', link:'https://themighty.com/topic/anxiety/physical-symptoms-anxiety-solutions/' },
    { id: 4, title: 'Common Anxiety Misconceptions', image: 'https://images.cordial.com/305/260x260/symptom_management_depression.png', link:'https://themighty.com/topic/anxiety/anxiety-misconceptions-what-its-like/' },
    { id: 5, title: 'Dealing With Anxiety when in Public', image: 'https://images.cordial.com/305/260x260/distraction.png', link:'https://themighty.com/topic/social-anxiety/anxious-on-phone-in-public/?event=' },
    { id: 6, title: 'Helping Children:Face their worries', image: 'https://adaa.org/sites/default/files/styles/extra_large_767px_width_/public/2024-03/iStock-%20social%20anxiety%20woman%20small_0_1.jpg?itok=9_2qJ4Ot', link:'https://adaa.org/learn-from-us/from-the-experts/blog-posts/consumer/helping-children-face-their-worries-and-fears' },
    { id: 7, title: 'The Powerful realisation To heal from stress', image: 'https://cdn.tinybuddha.com/wp-content/uploads/2024/04/Woman-and-the-sun-640x409.png' , link:'https://tinybuddha.com/blog/the-powerful-realizations-that-helped-me-heal-from-chronic-illness/'},
    { id: 8, title: 'Helping Your Child To Heal From Anxiety', image: 'https://adaa.org/sites/default/files/2023-12/iStock-1065218604%20purchased%20children%20anxiety_0.jpg', link:'https://adaa.org/learn-from-us/from-the-experts/blog-posts/consumer/your-child-struggling-anxiety-or-ocd-key' },
    { id: 9, title: 'Aging With Anxiety', image: 'https://adaa.org/sites/default/files/styles/extra_large_767px_width_/public/Aging%20with%20Anxiety.png?itok=0XAk2Efn', link:'https://adaa.org/learn-from-us/from-the-experts/blog-posts/consumer/aging-anxiety' },
    {id: 10, title: 'Gratitude - A Mental Health Game Changer', image: 'https://adaa.org/sites/default/files/styles/extra_large_767px_width_/public/2021-11/iStock-1284238385%20purchased%20gratitude.jpg?itok=YCF1S3u-', link:'https://adaa.org/learn-from-us/from-the-experts/blog-posts/consumer/gratitude-mental-health-game-changer'},
    { id: 11, title: 'Beautiful Voyager', image: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/04/beautiful_voyager_400x400.png?w=525', link:'https://bevoya.com/blog'},
    { id: 12, title: 'Know More About Your Anxiety', image: 'https://khealth.com/wp-content/uploads/2020/10/anxiety.png' , link:'https://www.futurelearn.com/info/blog/what-is-anxiety'},
    { id: 13, title: 'Everyday Anxiety', image: 'https://whackfactoroutdoors.com/wp-content/uploads/2023/02/Anxiety.jpg', link:'https://www.everydayhealth.com/anxiety/guide/' },
    { id: 14, title: 'Anxiety: What it is, what to do', image: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/9475/iStock-693982796.jpg', link:'https://www.health.harvard.edu/blog/anxiety-what-it-is-what-to-do-2018060113955' },
    { id: 15, title: 'Psychology Today', image: 'https://cdn2.psychologytoday.com/assets/default_images/counseling.jpg', link:'https://www.psychologytoday.com/us/basics/anxiety' },
    { id: 16, title: 'Anxiety Disorders and Anxiety Attacks', image: 'https://tse4.mm.bing.net/th?id=OIP.FzoUqQWQaAhCPs3SmXHqjwAAAA&pid=Api&P=0&h=180t', link:'https://www.helpguide.org/articles/anxiety/anxiety-disorders-and-anxiety-attacks.htm' },
    { id: 17, title: 'Managing and treating anxiety', image: 'https://tse3.mm.bing.net/th?id=OIP.tHmU_W356sadOaCueunjFQHaEo&pid=Api&P=0&h=180' , link:'https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/anxiety-treatment-options'},
    { id: 18, title: 'Therapy for Anxiety Disorders', image: 'https://adaa.org/sites/default/files/2023-12/iStock-1065218604%20purchased%20children%20anxiety_0.jpg', link:'https://www.helpguide.org/articles/anxiety/therapy-for-anxiety-disorders.htm' },
    { id: 19, title: 'When Panic, Fear, and Worries Overwhelm', image: 'https://newsinhealth.nih.gov/sites/nihNIH/files/styles/featured_media_breakpoint-large/public/2016/March/illustration-worried-man-apart-circle-friends_0.jpg?itok=BEkIrrCZ', link:'https://newsinhealth.nih.gov/2016/03/understanding-anxiety-disorders' },
    {id: 20, title: 'What We Need To Know About Trauma', image: 'https://tse4.mm.bing.net/th?id=OIP.2_0eE_W-uVMNP_CvAHjQbAHaF9&pid=Api&P=0&h=180', link:'https://www.ourbetterworld.org/series/mental-health/blog/what-we-need-to-know-about-trauma-and-why-it-is-important?type=blog&all=true'}
 
  ];

  const podcastLinks = [
    { id: 1, title: 'The Recovery Warrior',image: 'https://recoverywarriors.com/wp-content/uploads/2023/06/headphone-artwork-image-compressed-1845x2048.png', link: 'https://recoverywarriors.com/podcasts/' },
    { id: 2, title: 'The Anxiety Guy Podcast',image:'https://i.iheart.com/v3/url/aHR0cHM6Ly9zdGF0aWMubGlic3luLmNvbS9wL2Fzc2V0cy83L2IvZS9iLzdiZWI2YTY5NDM0NjYzZTIvNzlBMzYwMjYtNjAzQy00MjdCLTk0OTQtQzYxM0YyQzdFMDlDLmpwZWc?ops=fit(960%2C960)', link: 'https://www.iheart.com/podcast/256-the-anxiety-guy-podcast-30963388/' },
    { id: 3, title: 'The Mindful Kind',image:'https://images.musicrad.io/resizer/?image=aHR0cHM6Ly9zdGF0aWMubGlic3luLmNvbS9wL2Fzc2V0cy9kL2UvYy9iL2RlY2JkODRiMDQ2MTZhY2YvVGhlX01pbmRmdWxfS2luZF9Qb2RjYXN0LnBuZw%3D%3D&width=600&signature=9aV3Bu5qUM52EuTqeDoiYdispV0=' ,link: 'https://www.rachaelkable.com/podcast/category/The+Mindful+Kind+Podcast' },
    { id: 4, title: 'Not Another Anxiety Show', image:'https://deow9bq0xqvbj.cloudfront.net/dir-logo/299175/299175_300x300.jpg',link: 'https://www.podbean.com/podcast-detail/ynf22-490a7/Not-Another-Anxiety-Show-Podcast/' },
    { id: 5, title: 'Anxiety Slayer', image:'https://deow9bq0xqvbj.cloudfront.net/image-logo/196858/SlayeriTunes_300x300.jpg',link: 'https://anxietyslayer.podbean.com/' },
    { id: 6, title: 'Mental Illness Happy Hour', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg7qQ7olwwXZkuKADlpJ7L593KBj5AovW2KuLo5NmVsw&s',link: 'https://open.spotify.com/show/1ax4naBUwDvyB1YDRugdZo' },
    { id: 7, title: 'The Happiness Lab',image:'https://i.scdn.co/image/ab6765630000ba8acad1cf743dc23b0d0cb311ae' ,link: 'https://open.spotify.com/show/3i5TCKhc6GY42pOWkpWveG' },
    { id: 8, title: 'The Calm Collective Podcast',image:'https://ivyfm.s3.amazonaws.com/i320/923392.jpg' ,link: 'https://ivy.fm/podcast/the-calm-collective-podcast-923392' },
    { id: 9, title: 'The Overwhelmed Brain', image:'https://i.scdn.co/image/ab6765630000ba8a418e84b667bb6dd5535e9d53',link: 'https://theoverwhelmedbrain.com/' },
    { id: 10, title: ' Ten Percent Happier',image:'https://assets-global.website-files.com/62cedc1395c80ff6afaa8dbd/642513d8432e0580bbaa6bcc_TPH%20Podcast%20Hero-p-500.webp', link: 'https://www.tenpercent.com/podcast' },
    { id: 11, title: ' End Your Stress Today',image:'https://makeheadway.com/_next/image/?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F181188%2F1089724830%2F812307d9fd7c4b979d82-163494537b6fc7-en.jpg&w=1080&q=75', link: 'https://www.youtube.com/watch?v=LhYRD0XmzOU' },
    { id: 12, title: ' How to cope with anxiety',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUiYuBhvlxTmkm7dgNcYXFlokl4QIHuuUu6wOrXFCzSw&s', link: 'https://www.youtube.com/watch?v=WWloIAQpMcQ' },
    { id: 13, title: ' Overcome Your Fear and Anxiety',image:'https://www.mentalhealth.org.uk/sites/default/files/styles/1296w/public/2023-05/how-to-anxiety-cover.jpg?itok=YSXDvtOa', link: 'https://www.youtube.com/watch?v=cgMvFRUAd0s' },
    { id: 14, title: ' The Antidote Of Anxiety',image:'https://i0.wp.com/www.kt.org/wp-content/uploads/2020/05/scott-templeton-the-antidote-to-anxiety.jpg?fit=460%2C393&ssl=1', link: 'https://www.youtube.com/watch?v=Exx19pVSxuc' },
    { id: 15, title: ' Clear The Clutter to Calm Down',image:'https://images.squarespace-cdn.com/content/v1/5b7dc424a9e0283283f2127c/1583515371621-4UJ37JOQYT0ENOCXBKOV/spring-cleaning-and-mental-health-cta.jpg', link: 'https://www.youtube.com/watch?v=MIr3RsUWrdo' },
    { id: 16, title: ' Detachment from Over-thinking and Anxiety',image:'https://adaa.org/sites/default/files/2023-11/iStock-1472513556%20ocd%20purchased%20small%20woman_0.jpg', link: 'https://www.youtube.com/watch?v=1vx8iUvfyCY' },
    { id: 17, title: ' Overcome Anxiety',image:'https://cdn.policyx.com/images/natural-ways-to-reduce-anxiety-main-banner.webp', link: 'https://www.youtube.com/watch?v=lDEkOzvysm0' },
    { id: 18, title: ' Rewiring The Anxious Brain',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgh2sZ2ir8Pc1USb9LSb9ncGm8sIkcn_v19SaUigM6JA&s', link: 'https://www.youtube.com/watch?v=zTuX_ShUrw0' },
    { id: 19, title: ' Instant Calm from Stress and Anxiety',image:'https://media.istockphoto.com/id/1216791768/photo/hand-flipping-wooden-cubes-for-change-wording-panic-to-calm-mindset-is-important-for-human.jpg?s=612x612&w=0&k=20&c=Q-eBHP46luQy65f-VXXmZwzN_EHCRA2yp32nisC0XYE=', link: 'https://www.youtube.com/watch?v=_QCtzOb8_XA' },
    { id: 20, title: ' Calm Your Anxiety',image:'https://vibrantchristianliving.com/wp-content/uploads/logo-Calm-Your-Anxiety-Tool-Kit.gif', link: 'https://youtube.com/watch?v=16lsf4kAgbM' }

  ];

  const handlePress = (link) => {
    Linking.openURL(link);
  };
   const navigation=useNavigation();
  const handleClick = () =>{
    navigation.navigate('Notifications',item);
  }

  useEffect(() => {
        // Shuffle blog posts and podcast links
        setShuffledBlogPosts(shuffle(blogPosts).slice(0, 5));
        setShuffledPodcastLinks(shuffle(podcastLinks).slice(0, 5));
        setShuffledJokeImages(shuffle(imageUrls).slice(0, 5)); 
        fetchUserDetails();
        fetchPatientDetails();
      }, []);

      const renderJokeItem = ({ item }) => (
        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
          <Image source={{ uri: item.url }} style={styles.jokeImage} />
        </TouchableOpacity>
      );

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* App Icon */}
        <View style={styles.appIconContainer}>
          {/* Your app icon component */}
          <Image source={require('../assets/healofy.png')} style={{ marginRight: 180,width: 100,height: 100,resizeMode: 'contain'}} />
          <TouchableOpacity
      style={{
        backgroundColor: "#124b46", 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 180,
        alignSelf: "center",
        marginBottom:20,
        marginTop:-70,
        marginLeft:180
      }}
      onPress={() => navigation.navigate("Appointment")}
    >
      <Text style={{color: "white", alignSelf:"center" }}>Book an appointment</Text>
    </TouchableOpacity>
    </View>
          <Text style={{ color: "#124b46", alignSelf: "center", fontWeight: "bold", fontSize: 30 }}>Welcome to Healofy!</Text>
         {/* Horizontal scrolling section for podcast links */}
        <Text style={{ color: "#124b46", paddingLeft: 20, paddingTop: 10, paddingBottom: 10,fontWeight:"bold" }}>Podcasts to relieve stress.</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={shuffledPodcastLinks}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item.link)}>
              <View style={styles.podcastLink}>
                <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" /> 
                <Text style={styles.podcastLinkText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
     </View>
     <View>
     <Text style={{ color: "#124b46", paddingLeft: 20, paddingTop: 20, fontWeight:"bold",paddingBottom:10 }}>Jokes to lighten your day!</Text>
<FlatList
        data={shuffledJokeImages}
        renderItem={renderJokeItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
      />
     </View>
       <View>
      <Text style={{ color: "#124b46", paddingLeft: 20, paddingTop: 10, paddingBottom: 10,fontWeight:"bold" }}>Blogs to give you an insight.</Text>
      {/* Horizontal scrolling section for blog posts  */}
      <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={shuffledBlogPosts}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => handlePress(item.link)}>
        <View style={styles.blogLink}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
          <Text style={styles.blogLinkText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )}
    keyExtractor={item => item.id.toString()}
  />
</View>

<View >
    <TouchableOpacity
      style={{
        backgroundColor: "#124b46",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 180,
        alignSelf: "center",
        marginTop:30
      
      }}
      onPress={() => navigation.navigate("Login")}
    >
      <Text style={{color: "white", alignSelf:"center" }}>Logout</Text>
    </TouchableOpacity>
  </View>
        </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appIconContainer: {
    alignItems: 'center',
    marginTop: 20,
    justifyContent:'space-between'
  },
  imageScrollView: {
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor:"#124b46"
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
  },
  podcastLink: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#124b46',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  podcastLinkText: {
    color: 'white',
    fontSize: 16,
    marginTop:15
  },
  blogLink: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#124b46',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blogLinkText: {
    color: 'white',
    fontSize: 16,
    marginTop:15
  },
  horizontalList: {
    marginBottom: 20,
  },
  jokeImage: {
    width: 200,
    height: 200,
    borderRadius: 5,
    marginRight: 10,
  },
});