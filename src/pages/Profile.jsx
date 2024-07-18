import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import arrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';
import ListingItem from '../components/ListingItem';

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const { name, email } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const listingsRef = collection(db, 'listings');

        const q = query(
          listingsRef,
          where('userRef', '==', auth.currentUser.uid),
          orderBy('timestamp', 'desc'),
        );

        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
        console.log(listings);
      } catch (error) {
        toast.error('Error gettings user listings');
      }
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error('Could not update profile details');
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onDelete = async (id, listingName) => {
    if (window.confirm(`Are you sure you want to delete ${listingName}?`)) {
      await deleteDoc(doc(db, 'listings', id));
      const updateListings = listings.filter((listing) => listing.id !== id);
      setListings(updateListings);
      toast.success('Successfully deleted listing');
    }
  };

  const onEdit = (id) => {
    navigate(`/edit-listing/${id}`);
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <p className="profileEmail">{email}</p>
          </form>
        </div>
        <Link to={'/create-listing'} className="createListing">
          <img src={homeIcon} alt="home" />
          <p>Sell or rent your home</p>
          <img src={arrowRightIcon} alt="arrow right" />
        </Link>

        {!loading && listings?.length > 0 && (
          <>
            <p className="listingText">Your Listings</p>
            <ul className="listingList">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={onDelete}
                  onEdit={onEdit}
                ></ListingItem>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default Profile;
