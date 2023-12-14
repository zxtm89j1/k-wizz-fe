import axios from "axios";
import { useEffect, useState } from "react";
import { GlobalLoading, show, hide } from "react-global-loading";
import Swal from "sweetalert2";

const MyAccount = () => {
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [token, setToken] = useState(localStorage.getItem("authTokenJWT"));
  const [myInfo, setMyInfo] = useState();
  const [myScores, setMyScores] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateInfo = (e) => {
    setMyInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    let getMyScores = async () => {
      try {
        let response = await axios.get(
          `http://localhost:8000/api/auth/myscores/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setMyScores((prev) => response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMyScores();
  }, []);

  useEffect(() => {
    let getAccountInfo = async () => {
      show();
      let response = await axios.get(
        `http://localhost:8000/api/auth/myaccount/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMyInfo((prev) => response.data.message);
      }
    };

    getAccountInfo();
  }, []);

  const convertTime = (string, type) => {
    let timestampStr = string;
    let timestamp = new Date(timestampStr);
    let options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Manila",
    };

    let phTime = timestamp.toLocaleString("en-US", options);
    let phTimeArray = phTime.split(", ");

    if (type === "date") {
      return phTimeArray[0];
    } else {
      return phTimeArray[1];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setIsEditing((prev) => true);
    await setIsEditing((prev) => true);

    if (isEditing) {
      //   alert("SWAL2");
      Swal.fire({
        title: "Please enter you password for confirmation.",
        input: "password",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Enter",
        showLoaderOnConfirm: true,
        confirmButtonColor: "#db2777",
        preConfirm: async (password) => {
          try {
            //       const githubUrl = `
            //   https://api.github.com/users/${login}
            // `;

            let dataToSend = { ...myInfo, password: password };

            let response = await axios.put(
              `http://localhost:8000/api/auth/editaccount/${userId}`,
              dataToSend,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            // const response = await fetch(githubUrl);
            if (response.status != 200) {
              return Swal.showValidationMessage(`
                Password wrong maybe????
              `);
            } else {
              console.log(response);
            }
            // return response.json();
          } catch (error) {
            // console.log(error);
            if (error.response.data.error) {
              Swal.showValidationMessage(`
        Request failed: ${error.response.data.error}
      `);
            } else
              Swal.showValidationMessage(`
        Request failed: ${error.message}
      `);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Account information successfully updated!",
          }).then(() => window.location.reload());
        }
      });
    }

    // alert("SWAL2");

    // alert("To be edited!");
  };

  const handleCancelEditing = (e) => {
    e.preventDefault();

    setIsEditing((prev) => false);
  };

  return (
    <div className="min-h-screen p-4 flex justify-center items-center flex-col bg-gradient-to-r from-teal-300 via-teal-500 to-teal-700">
      {myInfo && myScores && hide()}

      <GlobalLoading />
      {myInfo && myScores && (
        <form className="mb-8 w-[60vh] block p-5 bg-white bg-opacity-80 rounded-md">
          <h3>My Info</h3>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={myInfo.email}
              onChange={handleUpdateInfo}
              className="w-full border-2 border-pink-500/50 rounded-md px-4 py-2 mb-4 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
              disabled={!isEditing}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold mb-1"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={myInfo.username}
              onChange={handleUpdateInfo}
              className="w-full border-2 border-pink-500/50 rounded-md px-4 py-2 mb-4 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
              disabled={!isEditing}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="block text-sm font-semibold mb-1"
            >
              First Name:
            </label>
            <input
              type="text"
              name="first_name"
              value={myInfo.first_name}
              onChange={handleUpdateInfo}
              className="w-full border-2 border-pink-500/50 rounded-md px-4 py-2 mb-4 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
              disabled={!isEditing}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="last_name"
              className="block text-sm font-semibold mb-1"
            >
              Last Name:
            </label>
            <input
              type="text"
              name="last_name"
              value={myInfo.last_name}
              onChange={handleUpdateInfo}
              className="w-full border-2 border-pink-500/50 rounded-md px-4 py-2 mb-4 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
              disabled={!isEditing}
            />
          </div>
          <div className="flex justify-center ">
            <button
              type="submit"
              className="bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 focus:border-pink-700 focus:outline-none focus:ring-0 px-6 mr-4"
              onClick={handleSubmit}
            >
              {!isEditing ? "Edit Information" : "Save"}
            </button>

            {isEditing ? (
              <button
                type="submit"
                className="bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 focus:border-pink-700 focus:outline-none focus:ring-0 px-6"
                onClick={handleCancelEditing}
              >
                Cancel
              </button>
            ) : (
              <></>
            )}
          </div>
        </form>
      )}

      {myScores ? (
        <div className="mb-8 w-[60vh] block p-5 bg-white bg-opacity-80 rounded-md">
          <h3 className="text-lg font-semibold mb-4">My Scores</h3>
          {myScores.map((score) => (
            <div key={score.id} className="mb-4">
              <div className="font-semibold">{`${score.score}/${score.number_of_questions}`}</div>
              <div>{convertTime(score.created_at, "date")}</div>
              <div>{convertTime(score.created_at, "time")}</div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyAccount;
