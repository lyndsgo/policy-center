import { useEffect, useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { validateIpAddress } from "@/utils/form-validation";
import type { ModalProps } from "@/components/Modal/Modal";
import Modal from "@/components/Modal/Modal";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useGetWhitelist } from "@/hooks/useGetWhitelist";
import { useUpdateWhitelistItem } from "@/hooks/useUpdateWhitelistItem";
import { useCreateWhitelistItem } from "@/hooks/useCreateWhitelistItem";

interface ItemModalProps extends Pick<ModalProps, "open" | "onClose"> {
  id?: string;
}

const ipSchema = z.object({
  ip: z.string().refine((value) => validateIpAddress(value), {
    message: "Please enter a valid IP Address",
  }),
});

type IPValuesType = z.infer<typeof ipSchema>;

const WhitelistItemModal = ({ open, onClose, id }: ItemModalProps) => {
  const { data: whitelist } = useGetWhitelist();

  const createWhitelistItem = useCreateWhitelistItem({ onSuccess: onClose });
  const updateWhitelistItem = useUpdateWhitelistItem({ onSuccess: onClose });

  // we can assume it's an update if there is an id (and therefore "currentItem",
  // if there is not an id, it is a create
  const currentItem = useMemo(
    () => whitelist?.find((i) => i.id === id),
    [id, whitelist],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPValuesType>({
    resolver: zodResolver(ipSchema),
    defaultValues: {
      ip: currentItem?.ip,
    },
  });

  const onSubmit: SubmitHandler<IPValuesType> = (data) => {
    // react-hook-form handles error state
    // if id, it can *only* be an update (because it already exists!)
    if (id) {
      updateWhitelistItem.mutate({ id, ip: data.ip });
    } else {
      createWhitelistItem.mutate({ ip: data.ip });
    }
  };

  useEffect(() => {
    reset({
      ip: currentItem?.ip,
    });
  }, [currentItem, reset, open]);

  return (
    <Modal open={open} onClose={onClose} title="Whitelist an IP Address">
      {/* doing it like this (using void) prevents a ts error*/}
      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
        <FormControl fullWidth>
          <TextField
            className="mt-3 mb-5"
            label="Enter the IP address"
            placeholder="e.g. 192.0.2.2"
            slotProps={{
              inputLabel: { shrink: true, className: "sr-only" },
              htmlInput: { className: "p-3" },
            }}
            variant="filled"
            error={!!errors.ip?.message}
            helperText={errors.ip?.message}
            {...register("ip")}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="ml-auto flex"
        >
          {currentItem ? "Update item" : "Add item"}
        </Button>
      </form>
    </Modal>
  );
};

export default WhitelistItemModal;
