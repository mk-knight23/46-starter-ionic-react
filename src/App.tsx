import { useState } from 'react';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAvatar, IonItem, IonBadge, IonList, IonListHeader } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Home, Search, Plus, Heart, MessageCircle, User, MoreHorizontal, Send, Bookmark } from 'lucide-react';
import { useHaptics } from './hooks/useHaptics';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

const STORIES = [
  { id: 1, name: 'You', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces', hasStory: false },
  { id: 2, name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces', hasStory: true },
  { id: 3, name: 'Mike', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces', hasStory: true },
  { id: 4, name: 'Emma', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces', hasStory: true },
  { id: 5, name: 'James', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces', hasStory: true },
  { id: 6, name: 'Olivia', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces', hasStory: true },
];

const POSTS = [
  {
    id: 1,
    user: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces', handle: '@sarahc' },
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=800&fit=crop',
    caption: 'Exploring the beautiful coastline this weekend! The weather was absolutely perfect.',
    likes: 234,
    comments: 18,
    time: '2h',
  },
  {
    id: 2,
    user: { name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces', handle: '@mikej' },
    image: 'https://images.unsplash.com/photo-1682687220198-88e9bdea9931?w=800&h=800&fit=crop',
    caption: 'New setup is finally complete! Every developer\'s dream workspace.',
    likes: 892,
    comments: 45,
    time: '5h',
  },
];

const StoriesSection: React.FC = () => (
  <div className="flex items-center gap-4 px-4 py-3 overflow-x-auto">
    {STORIES.map((story) => (
      <div key={story.id} className="flex flex-col items-center gap-1 min-w-fit cursor-pointer">
        <div className={`${story.hasStory ? 'app-story-ring' : ''}`}>
          <div className={`${story.hasStory ? 'app-story-inner' : ''}`}>
            <IonAvatar className={`${story.hasStory ? 'w-16 h-16' : 'w-14 h-14'}`}>
              <img src={story.avatar} alt={story.name} className="object-cover" />
            </IonAvatar>
          </div>
        </div>
        <span className="text-xs text-[#8e8e93] truncate w-16 text-center">{story.name}</span>
      </div>
    ))}
  </div>
);

const PostCard: React.FC<{ post: typeof POSTS[0] }> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <IonCard className="mb-4 mx-0">
      <IonCardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <IonAvatar className="w-10 h-10">
            <img src={post.user.avatar} alt={post.user.name} />
          </IonAvatar>
          <div>
            <IonCardTitle className="text-sm">{post.user.name}</IonCardTitle>
            <IonCardSubtitle className="text-xs">{post.time}</IonCardSubtitle>
          </div>
        </div>
        <IonButton fill="clear" size="small">
          <IonIcon slot="icon-only" icon={MoreHorizontal} />
        </IonButton>
      </IonCardHeader>

      <img
        src={post.image}
        alt="Post content"
        className="w-full h-64 object-cover"
        onDoubleClick={() => setLiked(!liked)}
      />

      <IonCardContent>
        <div className="flex items-center gap-4 mb-2">
          <IonButton fill="clear" onClick={() => setLiked(!liked)}>
            <IonIcon slot="icon-only" icon={Heart} className={liked ? 'text-[#ff3b30] fill-current' : ''} />
          </IonButton>
          <IonButton fill="clear">
            <IonIcon slot="icon-only" icon={MessageCircle} />
          </IonButton>
          <IonButton fill="clear">
            <IonIcon slot="icon-only" icon={Send} />
          </IonButton>
          <div style={{ flex: 1 }} />
          <IonButton fill="clear" onClick={() => setBookmarked(!bookmarked)}>
            <IonIcon slot="icon-only" icon={Bookmark} className={bookmarked ? 'text-[#007aff] fill-current' : ''} />
          </IonButton>
        </div>

        <p className="text-sm font-semibold mb-1">{liked ? post.likes + 1 : post.likes} likes</p>
        <p className="text-sm">
          <span className="font-semibold">{post.user.name}</span>
          <span className="ml-2">{post.caption}</span>
        </p>
        <button className="text-[#8e8e93] text-sm mt-2">View all {post.comments} comments</button>
      </IonCardContent>
    </IonCard>
  );
};

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Record<number, boolean>>({});

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SocialApp</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={Heart} className="text-[#ff3b30]" />
            </IonButton>
            <IonButton>
              <IonIcon slot="icon-only" icon={MessageCircle}>
                <IonBadge color="danger" style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', padding: 0 }}></IonBadge>
              </IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="px-4 py-3">
          <IonItem className="app-search-bar rounded-full" lines="none">
            <IonIcon slot="start" icon={Search} className="text-[#8e8e93]" />
            <IonLabel className="text-[#8e8e93]">Search</IonLabel>
          </IonItem>
        </div>

        <StoriesSection />

        <div className="px-4">
          {POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="px-4 py-6">
          <h2 className="text-lg font-bold mb-4">Suggested for You</h2>
        </div>
      </IonContent>
    </IonPage>
  );
};

const SearchPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Discover</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <h2>Explore</h2>
      <p>Discover new content and trends</p>
    </IonContent>
  </IonPage>
);

const CreatePage: React.FC = () => {
  const { triggerClick, triggerToggle, triggerSuccess, triggerWarning, triggerError, isNative } = useHaptics();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2 className="mb-4">Haptics Demo</h2>
        <p className="mb-4 text-[#8e8e93]">
          {isNative ? 'Native haptics enabled' : 'Web haptics (vibration API)'}
        </p>

        <IonList>
          <IonListHeader>
            <IonLabel>Impact Styles</IonLabel>
          </IonListHeader>
          <IonItem button onClick={() => triggerClick()}>
            <IonLabel>Light Impact (Tap)</IonLabel>
            <IonIcon slot="end" icon={Vibrator} />
          </IonItem>
          <IonItem button onClick={() => triggerToggle()}>
            <IonLabel>Medium Impact (Toggle)</IonLabel>
            <IonIcon slot="end" icon={Vibrator} />
          </IonItem>

          <IonListHeader className="mt-4">
            <IonLabel>Notifications</IonLabel>
          </IonListHeader>
          <IonItem button onClick={() => triggerSuccess()}>
            <IonLabel>Success Vibration</IonLabel>
            <IonIcon slot="end" icon={Vibrator} className="text-[#34c759]" />
          </IonItem>
          <IonItem button onClick={() => triggerWarning()}>
            <IonLabel>Warning Vibration</IonLabel>
            <IonIcon slot="end" icon={Vibrator} className="text-[#ff9500]" />
          </IonItem>
          <IonItem button onClick={() => triggerError()}>
            <IonLabel>Error Vibration</IonLabel>
            <IonIcon slot="end" icon={Vibrator} className="text-[#ff3b30]" />
          </IonItem>
        </IonList>

        <div className="mt-6 p-4 bg-[#f2f2f7] rounded-lg">
          <h3 className="font-semibold mb-2">About Haptics</h3>
          <p className="text-sm text-[#8e8e93]">
            Haptic feedback enhances user experience by providing tactile responses to interactions.
            This demo works on both native devices and modern browsers with vibration API support.
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

const NotificationsPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Activity</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <h2>Notifications</h2>
      <p>See who's interacting with your content</p>
    </IonContent>
  </IonPage>
);

const ProfilePage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Profile</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <h2>My Profile</h2>
      <p>Manage your account and settings</p>
    </IonContent>
  </IonPage>
);

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <HomePage />
            </Route>
            <Route exact path="/search">
              <SearchPage />
            </Route>
            <Route exact path="/create">
              <CreatePage />
            </Route>
            <Route exact path="/notifications">
              <NotificationsPage />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom" className="pb-safe">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={Home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="search" href="/search">
              <IonIcon icon={Search} />
              <IonLabel>Discover</IonLabel>
            </IonTabButton>
            <IonTabButton tab="create" href="/create">
              <IonIcon icon={Plus} />
              <IonLabel>Post</IonLabel>
            </IonTabButton>
            <IonTabButton tab="notifications" href="/notifications">
              <IonIcon icon={Heart} />
              <IonLabel>Activity</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              <IonIcon icon={User} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
