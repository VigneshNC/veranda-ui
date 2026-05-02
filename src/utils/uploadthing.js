import { generateReactHelpers } from "@uploadthing/react";

// This helper creates the hooks based on your backend FileRouter
export const { useUploadThing, uploadFiles } = generateReactHelpers();
