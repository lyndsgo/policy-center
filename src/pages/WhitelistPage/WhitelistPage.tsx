import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useGetWhitelist } from "@/hooks/useGetWhitelist";
import WhitelistItemModal from "./WhitelistItemModal";
import { useDeleteWhitelistItem } from "@/hooks/useDeleteWhitelistItem";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

interface ModalData {
  isOpen: boolean;
  id?: string;
}
const WhitelistPage = () => {
  const { data: whitelist, isLoading, isError } = useGetWhitelist();

  const [modalData, setModalData] = useState<ModalData>({
    isOpen: false,
  });

  const openAddItemModal = () => {
    setModalData({ isOpen: true });
  };

  const openEditItemModal = (id: string) => {
    setModalData({ isOpen: true, id });
  };

  const closeItemModal = () => {
    setModalData({ isOpen: false });
  };

  const deleteWhitelistItem = useDeleteWhitelistItem({
    onSuccess: closeItemModal,
  });

  const deleteItem = (id: string) => {
    deleteWhitelistItem.mutate({ id });
  };

  //!TODO: proper/better error handling
  if (isError)
    return <Alert severity="error">Error fetching whitelist rules</Alert>;

  return isLoading || !whitelist ? (
    <CircularProgress />
  ) : (
    <>
      <Box>
        <Typography variant="h5" component="h1">
          Whitelist
        </Typography>
        <Typography component="p" className="mt-2">
          Only trusted IP addresses are allowed to prevent unauthorized access
          and block malicious activity. If you need to grant access, you can
          whitelist the IP address.
        </Typography>
        <Typography variant="h6" component="h2" className="mt-6">
          Current List
        </Typography>
        {whitelist.length > 0 ? (
          <ul>
            {whitelist.map((item) => {
              return (
                <li
                  key={item.id}
                  className="flex items-center border-b border-gray-300 py-1 last:border-b-0"
                >
                  {item.ip}
                  <IconButton
                    className="ml-auto"
                    onClick={() => {
                      openEditItemModal(item.id);
                    }}
                    aria-label="Edit"
                    color="primary"
                  >
                    <EditIcon aria-hidden />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      deleteItem(item.id);
                    }}
                    aria-label="Delete"
                    color="primary"
                  >
                    <DeleteIcon aria-hidden />
                  </IconButton>
                </li>
              );
            })}
          </ul>
        ) : (
          <Typography component="p" className="py-2">
            Add your first item
          </Typography>
        )}
        <Button
          onClick={openAddItemModal}
          variant="contained"
          className="mt-4 ml-auto flex"
        >
          Add item
        </Button>
      </Box>
      <WhitelistItemModal
        open={modalData.isOpen}
        onClose={closeItemModal}
        id={modalData.id}
      />
    </>
  );
};

export default WhitelistPage;
