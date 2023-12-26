import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const useUserActivity = () => {
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userActivitiesRef = collection(db, "users", userId, "userActivities");
        const q = query(userActivitiesRef);

        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          const { workoutName, timestamp, targets } = doc.data();
          data.push({
            workoutName,
            timestamp: timestamp.toDate(),
            targets,
          });
        });

        console.log("Fetched workout data:", data);
        setWorkoutData(data);
      } catch (error) {
        console.error("Error fetching workout data: ", error);
      }
    };

    fetchWorkoutData();
  }, []);

  return workoutData;
};

export default useUserActivity;
