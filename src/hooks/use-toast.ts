
// Importing from the existing toast hook
import { useToast as useShadcnToast } from "@/components/ui/use-toast";

// Re-exporting to maintain backwards compatibility
export const useToast = useShadcnToast;
