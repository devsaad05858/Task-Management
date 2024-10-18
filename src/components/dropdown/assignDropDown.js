import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import axios from "axios";
import LoaderSpinner from "../common/loaderSpinner";
import { useTranslation } from "react-i18next";

const AssignDropDown = ({ onSelect, assignedUsers }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(assignedUsers || []);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/users");
        if (response && response.status === 200) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    setSelectedUsers(assignedUsers);
  }, [assignedUsers]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserSelection = (user) => {
    const alreadySelected = selectedUsers.includes(user._id);
    const newSelectedUsers = alreadySelected
      ? selectedUsers.filter((id) => id !== user._id)
      : [...selectedUsers, user._id];

    setSelectedUsers(newSelectedUsers);
    onSelect(newSelectedUsers);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-9 left-0 bg-white rounded-lg w-[200px] md:w-[273px] border border-lightBlue/20 z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-3 px-2 md:px-5 flex items-center gap-2.5 border-b border-lightBlue/20 w-full">
        <CiSearch />
        <input
          className="outline-none text-xs md:text-sm font-light lexend-deca-font text-lightBlue"
          placeholder={t("search_or_enter_email")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="px-2.5 pt-4 pb-5 flex flex-col gap-2.5 w-full items-center">
        {loading ? (
          <LoaderSpinner color="text-primary" />
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={"user--" + user._id}
              onClick={() => toggleUserSelection(user)}
              className={`bg-lightBlue/15 px-2.5 py-1.5 flex items-center gap-1.5 w-full rounded-md relative group cursor-pointer ${
                selectedUsers.includes(user._id)
                  ? "bg-primary text-white"
                  : "text-lightBlue"
              }`}
            >
              <Image
                height={26}
                width={26}
                src="/images/default-user.png"
                className="border border-white rounded-full h-5 w-5 md:h-auto md:w-auto"
                alt="assign-user-image"
              />
              <h2 className="font-light text-xs md:text-sm lexend-deca-font">
                {user.name}
              </h2>
            </div>
          ))
        ) : (
          "User Not Found"
        )}
      </div>
    </motion.div>
  );
};

export default AssignDropDown;
