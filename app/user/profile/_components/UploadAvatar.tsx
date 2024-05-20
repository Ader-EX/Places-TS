"use client";
import { PencilIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import FileInput from "./fileUpload";
import Image from "next/image";
import { uploadAvatar } from "@/lib/upload";
import { updateUserAvatar } from "@/lib/actions/user";

const UploadAvatar = ({ userId }: { userId: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = React.useState<File>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  return (
    <div>
      <Button color="primary" onPress={onOpen}>
        <PencilIcon className="w-4 text-white transition-colors" />
        <label htmlFor="avatar">Upload Avatar</label>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload Avatar
              </ModalHeader>
              <ModalBody>
                <FileInput
                  onChange={(e) => setImage((e as any).target.files[0])}
                />
                {image && (
                  <Image
                    alt=""
                    src={URL.createObjectURL(image)}
                    width={300}
                    height={300}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={isLoading}
                  onPress={async () => {
                    setIsLoading(true);
                    // Upload the image
                    if (!image) {
                      onClose();
                      setIsLoading(false);
                      return;
                    }
                    const avatarUrl = await uploadAvatar(image);
                    // Update the user avatar
                    const result = await updateUserAvatar(avatarUrl, userId);

                    setIsLoading(false);

                    onClose();
                    window.location.reload();
                  }}
                >
                  Upload
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UploadAvatar;
